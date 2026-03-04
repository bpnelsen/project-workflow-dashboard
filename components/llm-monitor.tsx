'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Zap, Clock, DollarSign, AlertCircle } from 'lucide-react'
import { getCurrentLLMState, getMockLLMHistory, getModelInfo } from '@/lib/llm-monitor'

export default function LLMMonitor() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [llmState] = useState(getCurrentLLMState())
  const [history] = useState(getMockLLMHistory())
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const modelInfo = getModelInfo(llmState.current)
  const thinkingLevelConfig = {
    minimal: { label: 'Minimal', color: 'text-green-600', bg: 'bg-green-100' },
    low: { label: 'Low', color: 'text-blue-600', bg: 'bg-blue-100' },
    medium: { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-100' },
    high: { label: 'High', color: 'text-purple-600', bg: 'bg-purple-100' }
  }

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 hover:bg-gray-50 transition flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-900">LLM Monitor</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="px-2 py-1 bg-teal/10 text-teal rounded font-mono text-xs">
              {modelInfo.name}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatUptime(sessionTime)}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={14} />
              {modelInfo.cost}
            </span>
          </div>
        </div>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
          <div className="px-6 py-4 bg-gradient-to-r from-navy/5 to-teal/5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Current Session</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600 font-medium">MODEL</p>
                <p className="text-sm font-bold text-navy mt-1">{modelInfo.name}</p>
                <p className="text-xs text-gray-600 mt-1">{modelInfo.provider}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">THINKING LEVEL</p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${thinkingLevelConfig[llmState.thinkingLevel].bg} ${thinkingLevelConfig[llmState.thinkingLevel].color}`}>
                  {thinkingLevelConfig[llmState.thinkingLevel].label}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">SESSION TIME</p>
                <p className="text-sm font-bold text-teal mt-1">{formatUptime(sessionTime)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">COST/REQUEST</p>
                <p className="text-sm font-bold text-green-600 mt-1">{modelInfo.cost}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 flex items-start gap-2">
              <Zap size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700">
                <p className="font-semibold mb-1">Performance: {modelInfo.speed}</p>
                <p>Using local Llama 3.2 3B model. No cloud API calls, no cost, no rate limits. ✨</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Activity</h3>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.map((event) => (
                <div key={event.id} className="text-xs border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-600">{event.timestamp}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        event.status === 'completed' ? 'bg-green-100 text-green-700' :
                        event.status === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <span className="text-gray-600">{event.costEstimate}</span>
                  </div>
                  <p className="text-gray-900 font-medium">{event.action}</p>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">
                      {event.model}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                      thinkingLevelConfig[event.thinkingLevel].bg
                    } ${thinkingLevelConfig[event.thinkingLevel].color}`}>
                      {thinkingLevelConfig[event.thinkingLevel].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
            <div className="flex gap-2 text-xs text-blue-900">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Model Configuration</p>
                <p>Primary: Llama 3.2 3B (Local) | Fallback: Claude Haiku 4.5 (if needed)</p>
                <p className="mt-1">All requests route through Llama first for cost optimization.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

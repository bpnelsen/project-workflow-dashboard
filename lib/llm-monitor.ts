// LLM Monitor - Track model usage in real time

export interface LLMEvent {
  id: string
  timestamp: string
  model: string
  thinkingLevel: 'minimal' | 'low' | 'medium' | 'high'
  action: string
  status: 'active' | 'completed' | 'error'
  costEstimate?: string
}

export const getCurrentLLMState = (): {
  current: string
  thinkingLevel: 'minimal' | 'low' | 'medium' | 'high'
  uptime: string
} => {
  const uptime = new Date().toLocaleTimeString()
  
  return {
    current: 'ollama/llama3.2:3b',
    thinkingLevel: 'minimal',
    uptime
  }
}

export const getMockLLMHistory = (): LLMEvent[] => {
  const now = new Date()
  
  return [
    {
      id: '1',
      timestamp: new Date(now.getTime() - 10000).toLocaleTimeString(),
      model: 'ollama/llama3.2:3b',
      thinkingLevel: 'minimal',
      action: 'Processed dashboard query',
      status: 'completed',
      costEstimate: '$0.00 (local)'
    },
    {
      id: '2',
      timestamp: new Date(now.getTime() - 20000).toLocaleTimeString(),
      model: 'ollama/llama3.2:3b',
      thinkingLevel: 'minimal',
      action: 'Generated project suggestions',
      status: 'completed',
      costEstimate: '$0.00 (local)'
    },
    {
      id: '3',
      timestamp: new Date(now.getTime() - 45000).toLocaleTimeString(),
      model: 'ollama/llama3.2:3b',
      thinkingLevel: 'minimal',
      action: 'Analyzed project timeline',
      status: 'completed',
      costEstimate: '$0.00 (local)'
    },
    {
      id: '4',
      timestamp: new Date(now.getTime() - 120000).toLocaleTimeString(),
      model: 'ollama/llama3.2:3b',
      thinkingLevel: 'minimal',
      action: 'Dashboard initialization',
      status: 'completed',
      costEstimate: '$0.00 (local)'
    }
  ]
}

export const getModelInfo = (model: string) => {
  const models: Record<string, { name: string; cost: string; speed: string; provider: string }> = {
    'ollama/llama3.2:3b': {
      name: 'Llama 3.2 3B',
      cost: 'Free',
      speed: 'Instant',
      provider: 'Local (Ollama)'
    },
    'anthropic/claude-haiku-4-5': {
      name: 'Claude Haiku 4.5',
      cost: '$0.25/1M tokens',
      speed: 'Fast',
      provider: 'Anthropic'
    },
    'anthropic/claude-sonnet-4-5': {
      name: 'Claude Sonnet 4.5',
      cost: '$3/1M tokens',
      speed: 'Medium',
      provider: 'Anthropic'
    }
  }
  
  return models[model] || { name: model, cost: 'Unknown', speed: 'Unknown', provider: 'Unknown' }
}

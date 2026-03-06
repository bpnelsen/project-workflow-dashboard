'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Edit2, Save, X } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'paused' | 'complete'
  progress: number
  tasks: Task[]
  team: string[]
  lastUpdated: string
  nextAction?: string
  priority: 'low' | 'medium' | 'high'
  timeline?: string
  notes?: string
  aiAssistant: string
}

// Project data mapping
const projectsData: { [key: string]: Project } = {
  '1': {
    id: '1',
    name: 'EZLY Dashboard',
    description: 'Full-featured contractor marketplace platform with homeowner and contractor workflows',
    status: 'in-progress',
    progress: 95,
    tasks: [
      { id: 't1', title: 'Apply branding colors', completed: false, dueDate: '2026-03-05' },
      { id: 't2', title: 'Activate blog cron job', completed: false, dueDate: '2026-03-04' },
      { id: 't3', title: 'Set up social media automation', completed: false, dueDate: '2026-03-06' },
      { id: 't4', title: 'Final testing & QA', completed: false, dueDate: '2026-03-10' },
    ],
    team: ['You', 'Johnny'],
    lastUpdated: '2026-03-03 21:36',
    nextAction: 'Apply branding colors to dashboard',
    priority: 'high',
    timeline: '2 weeks',
    notes: 'Platform is feature-complete. Working on final polish and branding.',
    aiAssistant: 'Johnny'
  },
  '8': {
    id: '8',
    name: 'Home Builder Financial Research Platform',
    description: 'AI-powered financial platform with 10-K summaries, earnings call analysis, market intelligence, & email alerts',
    status: 'in-progress',
    progress: 95,
    tasks: [
      { id: 't32', title: 'Phase 1: Backend infrastructure', completed: true, dueDate: '2026-03-05' },
      { id: 't33', title: 'Phase 2: AI summaries & automation', completed: true, dueDate: '2026-03-05' },
      { id: 't34', title: 'Phase 3: Frontend (5 pages)', completed: true, dueDate: '2026-03-05' },
      { id: 't35', title: 'Phase 4: SendGrid alerts', completed: true, dueDate: '2026-03-05' },
      { id: 't36', title: 'Phase 4: GitHub Actions workflows', completed: true, dueDate: '2026-03-05' },
      { id: 't37', title: 'Phase 5: Production build', completed: true, dueDate: '2026-03-05' },
      { id: 't38', title: 'Phase 5: Vercel deployment (live)', completed: true, dueDate: '2026-03-05' },
      { id: 't39', title: 'Phase 5: Testing & monitoring', completed: false, dueDate: '2026-03-12' },
    ],
    team: ['You', 'Johnny'],
    lastUpdated: '2026-03-05 11:50',
    nextAction: 'Monitor live deployment at https://homebuilder.vercel.app',
    priority: 'high',
    timeline: '1 week',
    notes: 'Production-ready. Fixing Tailwind color compilation for Navy/Teal branding.',
    aiAssistant: 'Johnny'
  }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [project, setProject] = useState<Project>(projectsData[params.id] || projectsData['1'])

  const [editData, setEditData] = useState<Project>(projectsData[params.id] || projectsData['1'])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)

  const handleSave = () => {
    setProject(editData)
    setIsEditing(false)
  }

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: 't' + Date.now(),
        title: newTaskTitle,
        completed: false,
        dueDate: ''
      }
      setEditData({
        ...editData,
        tasks: [...editData.tasks, newTask]
      })
      setNewTaskTitle('')
      setShowAddTask(false)
    }
  }

  const toggleTask = (taskId: string) => {
    setEditData({
      ...editData,
      tasks: editData.tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    })
  }

  const deleteTask = (taskId: string) => {
    setEditData({
      ...editData,
      tasks: editData.tasks.filter(t => t.id !== taskId)
    })
  }

  const completedTasks = project.tasks.filter(t => t.completed).length
  const totalTasks = project.tasks.length

  const statusOptions = ['planning', 'in-progress', 'paused', 'complete']
  const priorityOptions = ['low', 'medium', 'high']

  const statusConfig = {
    'planning': { color: 'text-blue-600', bg: 'bg-blue-100' },
    'in-progress': { color: 'text-amber-600', bg: 'bg-amber-100' },
    'paused': { color: 'text-red-600', bg: 'bg-red-100' },
    'complete': { color: 'text-green-600', bg: 'bg-green-100' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <Link href="/" className="inline-flex items-center text-navy hover:text-navy/80 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="text-3xl font-bold text-navy outline-none border-b-2 border-navy"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              )}
              <p className="text-gray-600 mt-1">Last updated: {project.lastUpdated}</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => {
                  setEditData(project)
                  setIsEditing(true)
                }}
                className="px-6 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal/90 transition flex items-center gap-2"
              >
                <Edit2 size={18} />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditData(project)
                    setIsEditing(false)
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none resize-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              )}
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Progress</h2>
                {isEditing && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editData.progress}
                    onChange={(e) => setEditData({ ...editData, progress: parseInt(e.target.value) })}
                    className="w-32"
                  />
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Overall Completion</span>
                <span className="text-lg font-bold text-teal">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-navy to-teal h-full rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Tasks ({completedTasks}/{totalTasks})
                </h2>
                {isEditing && !showAddTask && (
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="text-teal font-medium hover:text-teal/80 flex items-center gap-1"
                  >
                    <Plus size={18} />
                    Add Task
                  </button>
                )}
              </div>

              {/* Add Task Form */}
              {isEditing && showAddTask && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="New task..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                    autoFocus
                  />
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Task List */}
              <div className="space-y-2">
                {editData.tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition border border-gray-200"
                  >
                    {isEditing ? (
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 text-teal rounded mt-0.5 cursor-pointer"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={task.completed}
                        disabled
                        className="w-5 h-5 text-teal rounded mt-0.5"
                      />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="text-xs text-gray-600 mt-1">Due: {task.dueDate}</p>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Status & Priority */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Status</label>
                  {isEditing ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={`${statusConfig[project.status].bg} ${statusConfig[project.status].color} px-3 py-1 rounded-full text-sm font-semibold w-fit`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Priority</label>
                  {isEditing ? (
                    <select
                      value={editData.priority}
                      onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                    >
                      {priorityOptions.map(p => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex gap-1">
                      {project.priority === 'high' && <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">🔴 High</div>}
                      {project.priority === 'medium' && <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">🟡 Medium</div>}
                      {project.priority === 'low' && <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">🟢 Low</div>}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Timeline</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.timeline || ''}
                      onChange={(e) => setEditData({ ...editData, timeline: e.target.value })}
                      placeholder="e.g., 2 weeks"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-700">{project.timeline || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Team</label>
                  <div className="flex gap-2">
                    {project.team.map((member, idx) => (
                      <span key={idx} className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">🤖 AI Assistant</label>
                  {isEditing ? (
                    <select
                      value={editData.aiAssistant}
                      onChange={(e) => setEditData({ ...editData, aiAssistant: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                    >
                      <option value="Johnny">Johnny (Development AI)</option>
                      <option value="Fred">🤠 Fred (Personal & Jokes)</option>
                      <option value="Claude">Claude</option>
                      <option value="GPT-4">GPT-4</option>
                      <option value="Llama">Llama</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-teal/10 text-teal rounded-lg text-sm font-semibold">
                      {project.aiAssistant}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next Action */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Next Action</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.nextAction || ''}
                  onChange={(e) => setEditData({ ...editData, nextAction: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                />
              ) : (
                <p className="text-sm text-gray-700 font-medium">{project.nextAction || 'No action specified'}</p>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Notes</h3>
              {isEditing ? (
                <textarea
                  value={editData.notes || ''}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none resize-none"
                />
              ) : (
                <p className="text-sm text-gray-700">{project.notes || 'No notes'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

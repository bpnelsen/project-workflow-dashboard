'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, ChevronRight, CheckCircle2, Clock, AlertCircle, TrendingUp, Users, Target } from 'lucide-react'

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
  aiAssistant: string
}

export default function Dashboard() {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'paused' | 'complete'>('all')
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'EZLY Dashboard',
      description: 'Full-featured contractor marketplace platform',
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
      aiAssistant: 'Johnny'
    },
    {
      id: '2',
      name: 'Listening App',
      description: 'Local speech-to-text transcription system',
      status: 'in-progress',
      progress: 80,
      tasks: [
        { id: 't5', title: 'Set up on local machine', completed: false, dueDate: '2026-03-05' },
        { id: 't6', title: 'Test microphone input', completed: false, dueDate: '2026-03-06' },
        { id: 't7', title: 'Optimize performance', completed: false, dueDate: '2026-03-08' },
      ],
      team: ['You', 'Johnny'],
      lastUpdated: '2026-02-28 14:22',
      nextAction: 'Deploy to local machine with microphone',
      priority: 'medium',
      aiAssistant: 'Johnny'
    },
    {
      id: '3',
      name: 'Skills Setup',
      description: '8 powerful API integrations (SAG, Whisper, OpenAI, etc.)',
      status: 'planning',
      progress: 0,
      tasks: [
        { id: 't8', title: 'Get ElevenLabs API key', completed: false, dueDate: '2026-03-07' },
        { id: 't9', title: 'Get OpenAI API key', completed: false, dueDate: '2026-03-07' },
        { id: 't10', title: 'Set up SAG (TTS)', completed: false, dueDate: '2026-03-08' },
        { id: 't11', title: 'Configure Whisper', completed: false, dueDate: '2026-03-08' },
        { id: 't12', title: 'Test all integrations', completed: false, dueDate: '2026-03-10' },
      ],
      team: ['You', 'Johnny'],
      lastUpdated: '2026-03-03 10:19',
      nextAction: 'Get API keys for ElevenLabs & OpenAI',
      priority: 'medium',
      aiAssistant: 'Johnny'
    },
    {
      id: '4',
      name: 'Blog Automation',
      description: 'Cron job for auto-publishing 8 queued posts',
      status: 'planning',
      progress: 0,
      tasks: [
        { id: 't13', title: 'Verify cron syntax', completed: false, dueDate: '2026-03-04' },
        { id: 't14', title: 'Test first post publication', completed: false, dueDate: '2026-03-05' },
        { id: 't15', title: 'Monitor for 48 hours', completed: false, dueDate: '2026-03-07' },
        { id: 't16', title: 'Optimize schedule', completed: false, dueDate: '2026-03-08' },
      ],
      team: ['Johnny'],
      lastUpdated: '2026-02-28 09:47',
      nextAction: 'Activate cron job: Mon/Wed/Fri 9 AM',
      priority: 'high',
      aiAssistant: 'Johnny'
    },
    {
      id: '5',
      name: 'Social Media Automation',
      description: 'Buffer/Zapier integration for auto-posting to LinkedIn & Facebook',
      status: 'planning',
      progress: 0,
      tasks: [
        { id: 't17', title: 'Sign up for Buffer Pro', completed: false, dueDate: '2026-03-05' },
        { id: 't18', title: 'Connect LinkedIn profile', completed: false, dueDate: '2026-03-05' },
        { id: 't19', title: 'Connect Facebook page', completed: false, dueDate: '2026-03-05' },
        { id: 't20', title: 'Set up RSS auto-post', completed: false, dueDate: '2026-03-06' },
      ],
      team: ['You'],
      lastUpdated: '2026-02-28 15:33',
      nextAction: 'Sign up for Buffer Pro and connect profiles',
      priority: 'low',
      aiAssistant: 'Johnny'
    },
    {
      id: '6',
      name: 'Project Workflow Dashboard',
      description: 'Detailed, intuitive dashboard for tracking all collaborative work',
      status: 'in-progress',
      progress: 45,
      tasks: [
        { id: 't21', title: 'Design dashboard layout', completed: true, dueDate: '2026-03-03' },
        { id: 't22', title: 'Build main dashboard page', completed: true, dueDate: '2026-03-03' },
        { id: 't23', title: 'Create project detail view', completed: false, dueDate: '2026-03-04' },
        { id: 't24', title: 'Add edit functionality', completed: false, dueDate: '2026-03-04' },
        { id: 't25', title: 'Deploy to Vercel', completed: false, dueDate: '2026-03-04' },
      ],
      team: ['Johnny', 'You'],
      lastUpdated: '2026-03-03 21:37',
      nextAction: 'Build project detail view with full CRUD',
      priority: 'high',
      aiAssistant: 'Johnny'
    },
    {
      id: '7',
      name: 'SNA Draw Request Reorganizer',
      description: 'Excel file reorganizer for Arive/Holmes/McArthur/Fieldstone Homes',
      status: 'in-progress',
      progress: 100,
      tasks: [
        { id: 't26', title: 'Build upload interface', completed: true, dueDate: '2026-03-05' },
        { id: 't27', title: 'Create history dashboard', completed: true, dueDate: '2026-03-05' },
        { id: 't28', title: 'Deploy to Vercel', completed: true, dueDate: '2026-03-05' },
        { id: 't29', title: 'Test with real Excel files', completed: false, dueDate: '2026-03-06' },
        { id: 't30', title: 'Add Holmes Homes support', completed: false, dueDate: '2026-03-10' },
        { id: 't31', title: 'Add McArthur/Fieldstone support', completed: false, dueDate: '2026-03-14' },
      ],
      team: ['You', 'Johnny'],
      lastUpdated: '2026-03-05 06:40',
      nextAction: 'Test with real Excel files, then add other companies',
      priority: 'high',
      aiAssistant: 'Johnny'
    },
    {
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
      aiAssistant: 'Johnny'
    }
  ])

  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const filteredProjects = projects.filter(p => filter === 'all' || p.status === filter)

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    complete: projects.filter(p => p.status === 'complete').length,
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length),
    activeTasks: projects.reduce((sum, p) => sum + p.tasks.filter(t => !t.completed).length, 0)
  }

  const statusConfig = {
    'planning': { icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Planning' },
    'in-progress': { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'In Progress' },
    'paused': { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Paused' },
    'complete': { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Complete' }
  }

  const addProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: String(projects.length + 1),
        name: newProjectName,
        description: '',
        status: 'planning',
        progress: 0,
        tasks: [],
        team: ['You', 'Johnny'],
        lastUpdated: new Date().toLocaleString(),
        priority: 'medium',
        aiAssistant: 'Johnny'
      }
      setProjects([...projects, newProject])
      setNewProjectName('')
      setShowNewProject(false)
    }
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy to-teal text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="text-4xl font-bold mb-2">🚀 Project Workflow Dashboard</h2>
          <p className="text-lg text-gray-100">Track, manage, and collaborate on all our projects in one place</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Projects</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{stats.complete}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Avg Progress</p>
            <p className="text-3xl font-bold text-teal mt-1">{stats.avgProgress}%</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Active Tasks</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{stats.activeTasks}</p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {['all', 'in-progress', 'paused', 'complete'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-navy text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNewProject(!showNewProject)}
            className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal/90 transition flex items-center gap-2"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>

        {/* New Project Form */}
        {showNewProject && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Project</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addProject()}
                placeholder="Project name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none"
                autoFocus
              />
              <button
                onClick={addProject}
                className="px-6 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal/90 transition"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewProject(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map(project => {
            const config = statusConfig[project.status]
            const Icon = config.icon
            const completedTasks = project.tasks.filter(t => t.completed).length

            return (
              <div
                key={project.id}
                className={`${config.bg} border-2 ${config.border} rounded-xl p-6 transition hover:shadow-lg`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon size={16} className={config.color} />
                      <span className="text-xs font-semibold" style={{ color: config.color.replace('text-', '') }}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/projects/${project.id}`}>
                      <button className="p-2 hover:bg-white/50 rounded-lg transition">
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-2 hover:bg-white/50 rounded-lg transition"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                )}

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-700">Progress</span>
                    <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-navy to-teal h-full rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="mb-4 pb-4 border-b border-current border-opacity-20">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    {completedTasks}/{project.tasks.length} Tasks
                  </p>
                  <div className="space-y-1">
                    {project.tasks.slice(0, 2).map(task => (
                      <div key={task.id} className="flex items-center gap-2 text-xs">
                        <input type="checkbox" checked={task.completed} className="w-3 h-3" disabled />
                        <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                    {project.tasks.length > 2 && (
                      <p className="text-xs text-gray-600">+{project.tasks.length - 2} more</p>
                    )}
                  </div>
                </div>

                {/* Next Action */}
                {project.nextAction && (
                  <div className="bg-white/40 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-gray-700">NEXT:</p>
                    <p className="text-sm text-gray-900 font-medium">{project.nextAction}</p>
                  </div>
                )}

                {/* Footer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{project.team.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/50 rounded text-xs font-semibold text-gray-700">
                      🤖 {project.aiAssistant}
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <button className="text-teal font-semibold hover:underline flex items-center gap-1">
                        View <ChevronRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-teal" />
            Recent Activity
          </h3>

          <div className="space-y-4">
            {[
              { project: 'Project Workflow Dashboard', action: 'Deployed to Vercel', by: 'Johnny', time: 'Just now' },
              { project: 'EZLY Dashboard', action: 'Completed payment workflow', by: 'Johnny', time: '2 hours ago' },
              { project: 'EZLY Dashboard', action: 'Built project completion system', by: 'Johnny', time: '4 hours ago' },
              { project: 'Skills Setup', action: 'Created comprehensive setup guide', by: 'Johnny', time: '10 hours ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <strong>{activity.project}</strong> - {activity.action}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    by {activity.by} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

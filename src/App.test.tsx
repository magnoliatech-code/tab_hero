import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    // Mock chrome API
    global.chrome = {
      tabs: {
        query: vi.fn().mockResolvedValue([
          { id: 1, windowId: 1, title: 'Google', url: 'https://google.com' },
          { id: 2, windowId: 1, title: 'GitHub', url: 'https://github.com' },
        ]),
        update: vi.fn(),
        remove: vi.fn().mockResolvedValue(undefined),
        onCreated: { addListener: vi.fn(), removeListener: vi.fn() },
        onUpdated: { addListener: vi.fn(), removeListener: vi.fn() },
        onRemoved: { addListener: vi.fn(), removeListener: vi.fn() },
        onMoved: { addListener: vi.fn(), removeListener: vi.fn() },
        onAttached: { addListener: vi.fn(), removeListener: vi.fn() },
        onDetached: { addListener: vi.fn(), removeListener: vi.fn() },
      },
      runtime: {
        sendMessage: vi.fn(),
      },
      windows: {
        update: vi.fn(),
        getCurrent: vi.fn().mockImplementation((cb) => cb({ id: 1 })),
      }
    } as any
  })

  it('renders the title and tab list grouped by window', async () => {
    render(<App />)
    expect(screen.getByText('Tab Hero')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument()
      expect(screen.getByText(/Window 1/i)).toBeInTheDocument()
    })
  })

  it('filters tabs based on search input', async () => {
    render(<App />)
    await waitFor(() => expect(screen.getByText('Google')).toBeInTheDocument())
    
    const input = screen.getByPlaceholderText(/Search tabs/i)
    fireEvent.change(input, { target: { value: 'Git' } })
    
    expect(screen.queryByText('Google')).not.toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('shows duplicate removal button when duplicates exist', async () => {
    ;(chrome.tabs.query as any).mockResolvedValue([
      { id: 1, windowId: 1, title: 'Google', url: 'https://google.com' },
      { id: 2, windowId: 1, title: 'Google Duplicate', url: 'https://google.com' },
    ])
    
    render(<App />)
    await waitFor(() => expect(screen.getByText(/Remove 1 duplicate/i)).toBeInTheDocument())
  })

  it('renders keyboard shortcut instructions', () => {
    render(<App />)
    const toggleButton = screen.getByText(/Configuration Instructions/i)
    fireEvent.click(toggleButton)
    expect(screen.getByText(/chrome:\/\/extensions\/shortcuts/i)).toBeInTheDocument()
  })
})

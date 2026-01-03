import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    // Mock chrome API
    global.chrome = {
      tabs: {
        query: vi.fn().mockResolvedValue([
          { id: 1, title: 'Google', url: 'https://google.com' },
          { id: 2, title: 'GitHub', url: 'https://github.com' },
        ]),
        update: vi.fn(),
        remove: vi.fn().mockResolvedValue(undefined),
      },
      runtime: {
        sendMessage: vi.fn(),
      },
      windows: {
        update: vi.fn(),
      }
    } as any
  })

  it('renders the title and tab list', async () => {
    render(<App />)
    expect(screen.getByText('Tab Hero')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument()
    })
  })

  it('filters tabs based on search input', async () => {
    render(<App />)
    await waitFor(() => expect(screen.getByText('Google')).toBeInTheDocument())
    
    const input = screen.getByPlaceholderText('Search tabs...')
    fireEvent.change(input, { target: { value: 'Git' } })
    
    expect(screen.queryByText('Google')).not.toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('shows duplicate removal button when duplicates exist', async () => {
    ;(chrome.tabs.query as any).mockResolvedValue([
      { id: 1, title: 'Google', url: 'https://google.com' },
      { id: 2, title: 'Google Duplicate', url: 'https://google.com' },
    ])
    
    render(<App />)
    await waitFor(() => expect(screen.getByText(/Remove 1 duplicate/i)).toBeInTheDocument())
  })
})
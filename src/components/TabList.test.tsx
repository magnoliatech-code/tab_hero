import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TabList } from './TabList'

describe('TabList', () => {
  const mockGroups = [
    {
      windowId: 1,
      tabs: [
        { id: 1, title: 'Tab 1', url: 'https://1.com', favIconUrl: '' },
      ],
    },
    {
      windowId: 2,
      tabs: [
        { id: 2, title: 'Tab 2', url: 'https://2.com', favIconUrl: '' },
      ],
    },
  ] as any[]

  it('renders a list of tabs grouped by window', () => {
    render(<TabList groups={mockGroups} onSelect={vi.fn()} onClose={vi.fn()} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText(/Window 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Window 2/i)).toBeInTheDocument()
  })

  it('calls onSelect when a tab is clicked', () => {
    const onSelect = vi.fn()
    render(<TabList groups={mockGroups} onSelect={onSelect} onClose={vi.fn()} />)
    fireEvent.click(screen.getByText('Tab 1'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn()
    render(<TabList groups={mockGroups} onSelect={vi.fn()} onClose={onClose} />)
    const closeButtons = screen.getAllByRole('button', { name: /close/i })
    fireEvent.click(closeButtons[0])
    expect(onClose).toHaveBeenCalledWith(1)
  })
})
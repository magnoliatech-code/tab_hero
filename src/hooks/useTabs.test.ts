import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTabs } from './useTabs'

describe('useTabs hook', () => {
  beforeEach(() => {
    global.chrome = {
      tabs: {
        query: vi.fn().mockResolvedValue([
          { id: 1, title: 'Tab 1', url: 'https://1.com' },
        ]),
        onCreated: { addListener: vi.fn(), removeListener: vi.fn() },
        onUpdated: { addListener: vi.fn(), removeListener: vi.fn() },
        onRemoved: { addListener: vi.fn(), removeListener: vi.fn() },
        onMoved: { addListener: vi.fn(), removeListener: vi.fn() },
        onAttached: { addListener: vi.fn(), removeListener: vi.fn() },
        onDetached: { addListener: vi.fn(), removeListener: vi.fn() },
      },
    } as any
  })

  it('fetches initial tabs on mount', async () => {
    const { result } = renderHook(() => useTabs())
    
    await waitFor(() => {
      expect(result.current.tabs.length).toBe(1)
      expect(result.current.tabs[0].title).toBe('Tab 1')
    })
  })

  it('registers listeners for tab events', async () => {
    renderHook(() => useTabs())
    expect(chrome.tabs.onCreated.addListener).toHaveBeenCalled()
    expect(chrome.tabs.onRemoved.addListener).toHaveBeenCalled()
    expect(chrome.tabs.onUpdated.addListener).toHaveBeenCalled()
  })

  it('unregisters listeners on unmount', () => {
    const { unmount } = renderHook(() => useTabs())
    unmount()
    expect(chrome.tabs.onCreated.removeListener).toHaveBeenCalled()
    expect(chrome.tabs.onRemoved.removeListener).toHaveBeenCalled()
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { filterTabs, findDuplicates, groupTabsByWindow, closeTab, sortTabsByTitle, sortTabsByUrl, mergeAllWindows, mergeSelectedWindows } from './tabs'

describe('Tab Utilities', () => {
  const mockTabs = [
    { id: 1, title: 'Google', url: 'https://google.com' },
    { id: 2, title: 'GitHub', url: 'https://github.com' },
    { id: 3, title: 'GMAIL', url: 'https://gmail.com' },
    { id: 4, title: 'GitHub - Profile', url: 'https://github.com/profile' },
    { id: 5, title: 'Google Duplicate', url: 'https://google.com' },
  ] as any[]

  beforeEach(() => {
    global.chrome = {
      tabs: {
        remove: vi.fn(),
        move: vi.fn(),
        query: vi.fn(),
      },
      windows: {
        getAll: vi.fn(),
        getCurrent: vi.fn(),
      }
    } as any
  })

  describe('filterTabs', () => {
    it('returns all tabs when query is empty', () => {
      expect(filterTabs(mockTabs, '').length).toBe(mockTabs.length)
    })

    it('filters tabs by title (case-insensitive)', () => {
      const filtered = filterTabs(mockTabs, 'git')
      expect(filtered.length).toBe(2)
      expect(filtered[0].title).toContain('GitHub')
    })

    it('filters tabs by URL', () => {
      const filtered = filterTabs(mockTabs, 'google.com')
      expect(filtered.length).toBe(2)
    })
  })

  describe('findDuplicates', () => {
    it('identifies tabs with identical URLs', () => {
      const duplicates = findDuplicates(mockTabs)
      expect(duplicates).toContain(5)
      expect(duplicates).not.toContain(1)
    })

    it('returns an empty array when no duplicates exist', () => {
      const uniqueTabs = mockTabs.slice(0, 3)
      expect(findDuplicates(uniqueTabs)).toEqual([])
    })
  })

  describe('groupTabsByWindow', () => {
    it('groups tabs by windowId', () => {
      const tabs = [
        { id: 1, windowId: 10, title: 'W10-T1' },
        { id: 2, windowId: 20, title: 'W20-T1' },
        { id: 3, windowId: 10, title: 'W10-T2' },
      ] as any[]
      
      const groups = groupTabsByWindow(tabs)
      expect(groups.length).toBe(2)
      expect(groups.find((g: any) => g.windowId === 10)?.tabs.length).toBe(2)
      expect(groups.find((g: any) => g.windowId === 20)?.tabs.length).toBe(1)
    })
  })

  describe('closeTab', () => {
    it('calls chrome.tabs.remove with the correct tab ID', async () => {
      const tabId = 123
      await closeTab(tabId)
      expect(chrome.tabs.remove).toHaveBeenCalledWith(tabId)
    })
  })

  describe('sortTabsByTitle', () => {
    it('sorts tabs alphabetically by title and calls chrome.tabs.move', async () => {
      const tabsToSort = [
        { id: 1, title: 'Zebra', index: 0 },
        { id: 2, title: 'Apple', index: 1 },
        { id: 3, title: 'Banana', index: 2 },
      ] as any[]

      await sortTabsByTitle(tabsToSort)
      expect(chrome.tabs.move).toHaveBeenCalled()
    })
  })

  describe('sortTabsByUrl', () => {
    it('sorts tabs alphabetically by URL and calls chrome.tabs.move', async () => {
      const tabsToSort = [
        { id: 1, url: 'https://z.com', index: 0 },
        { id: 2, url: 'https://a.com', index: 1 },
      ] as any[]

      await sortTabsByUrl(tabsToSort)
      expect(chrome.tabs.move).toHaveBeenCalled()
    })
  })

  describe('mergeAllWindows', () => {
    it('merges all normal windows into the current window', async () => {
      const currentWindow = { id: 1, type: 'normal' }
      const otherWindow = { id: 2, type: 'normal', tabs: [{ id: 10 }, { id: 11 }] }
      const appWindow = { id: 3, type: 'app', tabs: [{ id: 20 }] }

      ;(chrome.windows.getCurrent as any).mockImplementation((cb: any) => cb(currentWindow))
      
      ;(chrome.windows.getAll as any).mockImplementation((_opts: any, cb: any) => {
         cb([currentWindow, otherWindow, appWindow])
      })

      await mergeAllWindows()
      
      expect(chrome.tabs.move).toHaveBeenCalledWith([10, 11], { windowId: 1, index: -1 })
      expect(chrome.tabs.move).not.toHaveBeenCalledWith([20], expect.anything())
    })
  })

  describe('mergeSelectedWindows', () => {
    it('merges selected windows into the target window', async () => {
      const targetWindowId = 1
      const selectedWindowIds = [2, 3]
      
      ;(chrome.tabs.query as any).mockImplementation((query: any) => {
        if (query.windowId === 2) return Promise.resolve([{ id: 20 }, { id: 21 }])
        if (query.windowId === 3) return Promise.resolve([{ id: 30 }])
        return Promise.resolve([])
      })

      await mergeSelectedWindows(targetWindowId, selectedWindowIds)

      expect(chrome.tabs.move).toHaveBeenCalledWith([20, 21], { windowId: 1, index: -1 })
      expect(chrome.tabs.move).toHaveBeenCalledWith([30], { windowId: 1, index: -1 })
    })
  })
})
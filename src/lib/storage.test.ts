import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveHistory, loadHistory } from './storage'

describe('StorageService', () => {
  beforeEach(() => {
    // Mock chrome object
    global.chrome = {
      storage: {
        local: {
          set: vi.fn().mockImplementation((data, cb) => cb?.()),
          get: vi.fn().mockImplementation((key, cb) => cb?.({})),
        },
      },
    } as any
  })

  it('saves the history stack to chrome.storage.local', async () => {
    const stack = [1, 2, 3]
    await saveHistory(stack)
    expect(chrome.storage.local.set).toHaveBeenCalledWith({ tabHistory: stack })
  })

  it('loads the history stack from chrome.storage.local', async () => {
    const stack = [1, 2, 3]
    ;(chrome.storage.local.get as any).mockImplementation((key: string, cb: any) => {
        cb({ tabHistory: stack })
    })

    const loaded = await loadHistory()
    expect(loaded).toEqual(stack)
  })

  it('returns an empty array if no history is found', async () => {
    const loaded = await loadHistory()
    expect(loaded).toEqual([])
  })
})

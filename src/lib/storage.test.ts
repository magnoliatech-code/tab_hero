import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveHistory, loadHistory } from './storage'

describe('StorageService', () => {
  beforeEach(() => {
    // Mock chrome object
    global.chrome = {
      storage: {
        local: {
          set: vi.fn().mockResolvedValue(undefined),
          get: vi.fn().mockResolvedValue({}),
        },
      },
    } as any
  })

  it('saves the history stack and pointer to chrome.storage.local', async () => {
    const stack = [1, 2, 3]
    const pointer = 2
    await saveHistory(stack, pointer)
    expect(chrome.storage.local.set).toHaveBeenCalledWith({ 
      tabHistory: stack,
      historyPointer: pointer 
    })
  })

  it('loads the history stack and pointer from chrome.storage.local', async () => {
    const stack = [1, 2, 3]
    const pointer = 1
    ;(chrome.storage.local.get as any).mockResolvedValue({ 
      tabHistory: stack,
      historyPointer: pointer 
    })

    const loaded = await loadHistory()
    expect(loaded.stack).toEqual(stack)
    expect(loaded.pointer).toBe(pointer)
  })

  it('returns defaults if no history is found', async () => {
    const loaded = await loadHistory()
    expect(loaded.stack).toEqual([])
    expect(loaded.pointer).toBe(-1)
  })
})

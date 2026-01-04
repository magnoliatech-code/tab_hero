export const saveHistory = (stack: number[], pointer: number): Promise<void> => {
  return chrome.storage.local.set({ 
    tabHistory: stack,
    historyPointer: pointer 
  })
}

export const loadHistory = async (): Promise<{ stack: number[], pointer: number }> => {
  const result = await chrome.storage.local.get(['tabHistory', 'historyPointer'])
  return {
    stack: (result.tabHistory as number[]) || [],
    pointer: typeof result.historyPointer === 'number' ? result.historyPointer : -1
  }
}
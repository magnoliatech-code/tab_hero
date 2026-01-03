export const saveHistory = (stack: number[]): Promise<void> => {
  return chrome.storage.local.set({ tabHistory: stack })
}

export const loadHistory = async (): Promise<number[]> => {
  const result = await chrome.storage.local.get('tabHistory')
  return (result.tabHistory as number[]) || []
}

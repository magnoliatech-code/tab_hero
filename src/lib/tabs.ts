export function filterTabs(tabs: chrome.tabs.Tab[], query: string): chrome.tabs.Tab[] {
  if (!query) return tabs

  const lowerQuery = query.toLowerCase()
  return tabs.filter((tab) => {
    const title = tab.title?.toLowerCase() || ''
    const url = tab.url?.toLowerCase() || ''
    return title.includes(lowerQuery) || url.includes(lowerQuery)
  })
}

export function findDuplicates(tabs: chrome.tabs.Tab[]): number[] {
  const seenUrls = new Set<string>()
  const duplicateIds: number[] = []

  tabs.forEach((tab) => {
    if (tab.url) {
      if (seenUrls.has(tab.url)) {
        if (tab.id !== undefined) {
          duplicateIds.push(tab.id)
        }
      } else {
        seenUrls.add(tab.url)
      }
    }
  })

  return duplicateIds
}

export interface TabGroup {
  windowId: number
  tabs: chrome.tabs.Tab[]
}

export function groupTabsByWindow(tabs: chrome.tabs.Tab[]): TabGroup[] {
  const groups: Record<number, chrome.tabs.Tab[]> = {}

  tabs.forEach((tab) => {
    if (tab.windowId !== undefined) {
      if (!groups[tab.windowId]) {
        groups[tab.windowId] = []
      }
      groups[tab.windowId].push(tab)
    }
  })

  return Object.entries(groups).map(([windowId, tabs]) => ({
    windowId: parseInt(windowId),
    tabs,
  }))
}
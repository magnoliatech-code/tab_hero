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



export async function closeTab(tabId: number): Promise<void> {



  if (chrome.tabs) {



    await chrome.tabs.remove(tabId)



  }



}







export async function sortTabsByTitle(tabs: chrome.tabs.Tab[]): Promise<void> {



  if (!chrome.tabs) return







  const sorted = [...tabs].sort((a, b) => (a.title || '').localeCompare(b.title || ''))







  for (let i = 0; i < sorted.length; i++) {



    const tab = sorted[i]



    if (tab.id !== undefined) {



      await chrome.tabs.move(tab.id, { index: i })



    }



  }



}







export async function sortTabsByUrl(tabs: chrome.tabs.Tab[]): Promise<void> {







  if (!chrome.tabs) return















  const sorted = [...tabs].sort((a, b) => (a.url || '').localeCompare(b.url || ''))















  for (let i = 0; i < sorted.length; i++) {







    const tab = sorted[i]







    if (tab.id !== undefined) {







      await chrome.tabs.move(tab.id, { index: i })







    }







  }







}















export async function mergeAllWindows(): Promise<void> {







  if (!chrome.windows || !chrome.tabs) return















  const currentWindow = await new Promise<chrome.windows.Window>((resolve) => {







    chrome.windows.getCurrent((win) => resolve(win))







  })















  if (!currentWindow || !currentWindow.id) return















  const windows = await new Promise<chrome.windows.Window[]>((resolve) => {







    // Ideally use windowTypes in getAll, but type definition might vary.







    // We will filter manually as well.







    chrome.windows.getAll({ populate: true }, (wins) => resolve(wins))







  })















  const tabsToMove: number[] = []















  windows.forEach((win) => {







    if (win.id !== currentWindow.id && win.type === 'normal') {







      win.tabs?.forEach((tab) => {







        if (tab.id) {







          tabsToMove.push(tab.id)







        }







      })







    }







  })















  if (tabsToMove.length > 0) {







    await chrome.tabs.move(tabsToMove, { windowId: currentWindow.id, index: -1 })







  }







}















export async function mergeSelectedWindows(targetWindowId: number, windowIdsToMerge: number[]): Promise<void> {







  if (!chrome.tabs) return















  for (const winId of windowIdsToMerge) {







    if (winId === targetWindowId) continue















    const tabs = await chrome.tabs.query({ windowId: winId })







    const tabIds = tabs.map((t) => t.id).filter((id): id is number => id !== undefined)















    if (tabIds.length > 0) {







      await chrome.tabs.move(tabIds, { windowId: targetWindowId, index: -1 })







    }







  }







}













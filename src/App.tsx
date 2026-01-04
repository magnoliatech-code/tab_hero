import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TabList } from '@/components/TabList'
import { filterTabs, findDuplicates } from '@/lib/tabs'
import { RotateCcw, Trash2, Search } from 'lucide-react'
import { useTabs } from '@/hooks/useTabs'

function App() {
  const { tabs, refresh } = useTabs()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSelect = (tabId: number) => {
    chrome.tabs.update(tabId, { active: true }, (tab) => {
      if (tab?.windowId) {
        chrome.windows.update(tab.windowId, { focused: true })
      }
    })
  }

  const handleClose = async (tabId: number) => {
    await chrome.tabs.remove(tabId)
    refresh()
  }

  const handleClearDuplicates = async () => {
    const duplicateIds = findDuplicates(tabs)
    if (duplicateIds.length > 0) {
      await chrome.tabs.remove(duplicateIds)
      refresh()
    }
  }

  const handleGoBack = () => {
    chrome.runtime.sendMessage({ type: 'NAVIGATE_BACK' }, (response) => {
      // If success, the background script already activated the previous tab.
      // We don't need to close this window since it's a pinned dashboard.
      if (!response?.success) {
         console.error("Failed to go back:", response?.error)
      }
    })
  }

  const filtered = filterTabs(tabs, searchQuery)
  const duplicateCount = findDuplicates(tabs).length

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center pt-10">
      <div className="w-full max-w-3xl p-6 flex flex-col space-y-6 border rounded-lg shadow-sm bg-card">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Tab Hero</h1>
          <Button variant="outline" onClick={handleGoBack}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Back to Previous Tab
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search tabs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'tab' : 'tabs'} open
          </span>
          {duplicateCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearDuplicates}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove {duplicateCount} {duplicateCount === 1 ? 'duplicate' : 'duplicates'}
            </Button>
          )}
        </div>

        <div className="border rounded-md">
            <TabList tabs={filtered} onSelect={handleSelect} onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default App
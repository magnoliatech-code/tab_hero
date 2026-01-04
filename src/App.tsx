import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TabList } from '@/components/TabList'
import { filterTabs, findDuplicates, groupTabsByWindow } from '@/lib/tabs'
import { Trash2, Search, Keyboard } from 'lucide-react'
import { useTabs } from '@/hooks/useTabs'

function App() {
  const { tabs, refresh } = useTabs()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentWindowId, setCurrentWindowId] = useState<number>()

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.windows) {
      chrome.windows.getCurrent((win) => setCurrentWindowId(win.id))
    }
  }, [])

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

  const filtered = filterTabs(tabs, searchQuery)
  const groups = groupTabsByWindow(filtered)

  const sortedGroups = [...groups].sort((a, b) => {
    if (a.windowId === currentWindowId) return -1
    if (b.windowId === currentWindowId) return 1
    return a.windowId - b.windowId
  })

  const duplicateCount = findDuplicates(tabs).length

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center pt-10 pb-20">
      <div className="w-full max-w-3xl p-6 flex flex-col space-y-6 border rounded-lg shadow-sm bg-card h-fit">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Tab Hero</h1>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Keyboard className="mr-1 h-3 w-3" />
              Shortcuts configured in Chrome
            </span>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-md border border-dashed text-sm space-y-2">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
            Configuration Instructions
          </h3>
          <p className="text-muted-foreground">
            To customize shortcuts, navigate to: <br/>
            <code className="bg-muted px-1.5 py-0.5 rounded text-primary">chrome://extensions/shortcuts</code>
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
            <div><strong>Alt+Shift+H:</strong> Open Dashboard</div>
            <div><strong>Alt+Shift+Left:</strong> Jump Back</div>
            <div><strong>Alt+Shift+Right:</strong> Jump Forward</div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search tabs across all windows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-muted-foreground font-medium">
            {filtered.length} {filtered.length === 1 ? 'tab' : 'tabs'} open
          </span>
          {duplicateCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearDuplicates}
              className="h-8"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove {duplicateCount} {duplicateCount === 1 ? 'duplicate' : 'duplicates'}
            </Button>
          )}
        </div>

        <div className="border rounded-md bg-background/50">
          <TabList groups={sortedGroups} onSelect={handleSelect} onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default App

import { describe, it, expect } from 'vitest'
import { filterTabs, findDuplicates } from './tabs'

describe('Tab Utilities', () => {
  const mockTabs = [
    { id: 1, title: 'Google', url: 'https://google.com' },
    { id: 2, title: 'GitHub', url: 'https://github.com' },
    { id: 3, title: 'GMAIL', url: 'https://gmail.com' },
    { id: 4, title: 'GitHub - Profile', url: 'https://github.com/profile' },
    { id: 5, title: 'Google Duplicate', url: 'https://google.com' },
  ] as any[]

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
      // Tab 1 and Tab 5 are duplicates. 
      // Usually we want to return the IDs of tabs to be closed (the "extra" ones).
      expect(duplicates).toContain(5)
      expect(duplicates).not.toContain(1)
    })

    it('returns an empty array when no duplicates exist', () => {
      const uniqueTabs = mockTabs.slice(0, 3)
      expect(findDuplicates(uniqueTabs)).toEqual([])
    })
  })
})

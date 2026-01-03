import { cn } from './utils'
import { describe, it, expect } from 'vitest'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('c1', 'c2')).toBe('c1 c2')
  })

  it('handles conditional classes', () => {
    expect(cn('c1', false && 'c2', 'c3')).toBe('c1 c3')
  })

  it('merges tailwind classes properly', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
  })
})

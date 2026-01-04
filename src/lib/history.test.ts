import { describe, it, expect, beforeEach } from 'vitest'
import { HistoryStack } from './history'

describe('HistoryStack', () => {
  let stack: HistoryStack

  beforeEach(() => {
    stack = new HistoryStack(5) // Limit of 5
  })

  it('initializes with an empty stack', () => {
    expect(stack.getStack()).toEqual([])
    expect(stack.getCurrent()).toBeUndefined()
  })

  it('pushes a tab ID to the stack', () => {
    stack.push(1)
    expect(stack.getStack()).toEqual([1])
    expect(stack.getCurrent()).toBe(1)
  })

  it('moves existing tab ID to the top when pushed again', () => {
    stack.push(1)
    stack.push(2)
    stack.push(1)
    expect(stack.getStack()).toEqual([2, 1])
    expect(stack.getCurrent()).toBe(1)
  })

  it('moves back and forward in history', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    
    expect(stack.getCurrent()).toBe(3)
    
    expect(stack.back()).toBe(2)
    expect(stack.getCurrent()).toBe(2)
    
    expect(stack.back()).toBe(1)
    expect(stack.getCurrent()).toBe(1)
    
    expect(stack.back()).toBeUndefined() // Already at start
    
    expect(stack.forward()).toBe(2)
    expect(stack.getCurrent()).toBe(2)
    
    expect(stack.forward()).toBe(3)
    expect(stack.getCurrent()).toBe(3)
    
    expect(stack.forward()).toBeUndefined() // Already at end
  })

  it('clears forward history when pushing a new item', () => {
    stack.push(1)
    stack.push(2)
    stack.back() // Pointer at index 0 (value 1)
    stack.push(3) // Should remove 2 and add 3 after 1
    expect(stack.getStack()).toEqual([1, 3])
    expect(stack.forward()).toBeUndefined()
  })

  it('respects the maximum size limit', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    stack.push(5)
    stack.push(6)
    expect(stack.getStack()).toEqual([2, 3, 4, 5, 6])
    expect(stack.getCurrent()).toBe(6)
  })

  it('removes a tab ID from the stack and adjusts pointer', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.back() // at 2 (index 1)
    stack.remove(2) // remove 2, stack is [1, 3], pointer should probably move to 1 or 3
    // Standard behavior: if current is removed, move to next or previous.
    // Let's say it moves to previous if possible.
    expect(stack.getStack()).toEqual([1, 3])
    expect(stack.getCurrent()).toBe(1)
  })
})
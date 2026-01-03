import { describe, it, expect, beforeEach } from 'vitest'
import { HistoryStack } from './history'

describe('HistoryStack', () => {
  let stack: HistoryStack

  beforeEach(() => {
    stack = new HistoryStack(5) // Limit of 5
  })

  it('initializes with an empty stack', () => {
    expect(stack.getStack()).toEqual([])
  })

  it('pushes a tab ID to the stack', () => {
    stack.push(1)
    expect(stack.getStack()).toEqual([1])
  })

  it('moves existing tab ID to the top when pushed again', () => {
    stack.push(1)
    stack.push(2)
    stack.push(1)
    expect(stack.getStack()).toEqual([2, 1]) // Top is the last element
  })

  it('pops the current tab to go back', () => {
    stack.push(1)
    stack.push(2)
    const previous = stack.pop()
    expect(previous).toBe(1)
    expect(stack.getStack()).toEqual([1])
  })

  it('returns undefined when popping an empty stack', () => {
    expect(stack.pop()).toBeUndefined()
  })

  it('respects the maximum size limit', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    stack.push(5)
    stack.push(6)
    expect(stack.getStack().length).toBe(5)
    expect(stack.getStack()).toEqual([2, 3, 4, 5, 6])
  })

  it('identifies the previous tab without removing it', () => {
    stack.push(1)
    stack.push(2)
    expect(stack.peekPrevious()).toBe(1)
    expect(stack.getStack()).toEqual([1, 2])
  })

  it('removes a tab ID from the stack', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.remove(2)
    expect(stack.getStack()).toEqual([1, 3])
  })
})

export class HistoryStack {
  private stack: number[] = []
  private maxSize: number

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize
  }

  push(tabId: number) {
    // Remove if already exists to move to top (end of array)
    this.stack = this.stack.filter((id) => id !== tabId)

    this.stack.push(tabId)

    // Respect maxSize
    if (this.stack.length > this.maxSize) {
      this.stack.shift()
    }
  }

  pop(): number | undefined {
    // Current tab is usually at the end, so pop it to get the previous one
    if (this.stack.length > 1) {
      this.stack.pop()
      return this.stack[this.stack.length - 1]
    }
    // If only one tab left, we can't really go "back" from it in this simple stack
    // but the test expected popping 2 elements [1, 2] to return 1.
    // Wait, the test:
    // stack.push(1); stack.push(2); const previous = stack.pop(); expect(previous).toBe(1); expect(stack.getStack()).toEqual([1]);
    
    // My pop implementation should return the new top of the stack after removal.
    // Or does it? Let's check the test expectation.
    // It expect stack.pop() to return 1 and stack.getStack() to be [1].
    // So it removes the top element (2) and returns the new top (1).
    
    this.stack.pop()
    return undefined
  }

  peekPrevious(): number | undefined {
    if (this.stack.length > 1) {
      return this.stack[this.stack.length - 2]
    }
    return undefined
  }

  getStack(): number[] {
    return [...this.stack]
  }

  remove(tabId: number) {
    this.stack = this.stack.filter((id) => id !== tabId)
  }
}

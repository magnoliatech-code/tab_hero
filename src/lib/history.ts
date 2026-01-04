export class HistoryStack {
  private stack: number[] = []
  private pointer: number = -1
  private maxSize: number

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize
  }

  push(tabId: number) {
    // If we are pushing while pointer is not at the end, clear "forward" history
    if (this.pointer < this.stack.length - 1) {
      this.stack = this.stack.slice(0, this.pointer + 1)
    }

    // Remove if already exists to move to top (standard browser history doesn't usually do this, 
    // but our spec implies a stack of unique tabs).
    // Actually, if I want undo/redo, removing duplicates from the middle might be confusing.
    // But the previous implementation did it.
    // Let's stick to the user's previous preference but adjust for pointer.
    this.stack = this.stack.filter((id) => id !== tabId)

    this.stack.push(tabId)
    this.pointer = this.stack.length - 1

    // Respect maxSize
    if (this.stack.length > this.maxSize) {
      this.stack.shift()
      this.pointer--
    }
  }

  back(): number | undefined {
    if (this.pointer > 0) {
      this.pointer--
      return this.stack[this.pointer]
    }
    return undefined
  }

  forward(): number | undefined {
    if (this.pointer < this.stack.length - 1) {
      this.pointer++
      return this.stack[this.pointer]
    }
    return undefined
  }

  getCurrent(): number | undefined {
    if (this.pointer >= 0 && this.pointer < this.stack.length) {
      return this.stack[this.pointer]
    }
    return undefined
  }

  peekPrevious(): number | undefined {
    if (this.pointer > 0) {
      return this.stack[this.pointer - 1]
    }
    return undefined
  }

  getStack(): number[] {
    return [...this.stack]
  }

  getPointer(): number {
    return this.pointer
  }

  remove(tabId: number) {
    const index = this.stack.indexOf(tabId)
    if (index !== -1) {
      this.stack.splice(index, 1)
      if (this.pointer >= index) {
        this.pointer = Math.max(-1, this.pointer - 1)
      }
    }
  }
}
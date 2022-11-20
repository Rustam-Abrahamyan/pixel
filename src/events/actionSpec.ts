type LastEventState = {
  active: boolean,
  stopPropagation: boolean
}

class ActionSpec {
  private items: Map<string, LastEventState> = new Map()

  has (id: string) {
    return this.items.has(id)
  }

  set (id: string) {
    this.items.set(id, { active: true, stopPropagation: false })
  }

  clear (id: string) {
    this.items.delete(id)
  }

  setStopPropagation (id: string) {
    if (!this.items.has(id)) return
    this.items.get(id)!!.stopPropagation = true
  }

  isStopPropagation (id: string) {
    return this.items.get(id)!!.stopPropagation
  }

  clearAll () {
    this.items.clear()
  }
}

export default ActionSpec;
export type PointType =  {
  x: number
  y: number
}

class Point implements PointType {
  x: number
  y: number

  constructor (point: { x: number; y: number })
  constructor (x: number, y: number)
  constructor (...args: Array<any>) {
    this.x = 0
    this.y = 0
    if (args.length === 1) {
      this.x = args[0].x
      this.y = args[0].y
    }
    if (args.length === 2) {
      this.x = args[0]
      this.y = args[1]
    }
  }

  add (v: number): Point
  // eslint-disable-next-line no-dupe-class-members
  add (x: number, y: number): Point
  // eslint-disable-next-line no-dupe-class-members
  add (point: PointType): Point
  // eslint-disable-next-line no-dupe-class-members
  add (...args: Array<any>): Point {
    return this.#overload(args, (x, y) => this.#add(x, y))
  }

  dec (x: number, y: number): Point
  // eslint-disable-next-line no-dupe-class-members
  dec (point: PointType): Point
  // eslint-disable-next-line no-dupe-class-members
  dec (...args: Array<any>): Point {
    return this.#overload(args, (x, y) => this.#add(-x, -y))
  }

  mul (v: number): Point
  // eslint-disable-next-line no-dupe-class-members
  mul (x: number, y: number): Point
  // eslint-disable-next-line no-dupe-class-members
  mul (point: PointType): Point
  // eslint-disable-next-line no-dupe-class-members
  mul (...args: Array<any>): Point {
    return this.#overload(args, (x, y) => this.#mul(x, y))
  }

  distance (v: number): number
  // eslint-disable-next-line no-dupe-class-members
  distance (x: number, y: number): number
  // eslint-disable-next-line no-dupe-class-members
  distance (point: PointType): number
  // eslint-disable-next-line no-dupe-class-members
  distance (...args: Array<any>): number {
    return this.#overload(args, (x, y) => this.#distance(x, y))
  }

  /** @deprecated */
  static sum (point1: Point, point2: Point): Point {
    return new Point(point1.x + point2.x, point1.y + point2.y)
  }

  /** @deprecated */
  static mul (point1: Point, point2: Point): Point {
    return new Point(point1.x * point2.x, point1.y * point2.y)
  }

  static get zero (): Point {
    return new Point(0, 0)
  }

  static is (point: unknown): boolean {
    const p = point as PointType
    return p && typeof p.x !== 'undefined' && typeof p.y !== 'undefined'
  }

  toString () {
    return `{ x: ${this.x}, y: ${this.y} }`
  }

  #overload<T> (args: Array<any>, a: (x: number, y: number) => T) {
    if (args.length === 1 && Point.is(args[0])) {
      const { x, y } = args[0]
      return a(x, y)
    }

    if (args.length === 1 && typeof args[0] === 'number') {
      const v = args[0]
      return a(v, v)
    }

    if (args.length === 2 && !args.some(p => typeof p !== 'number')) {
      const [x, y] = args
      return a(x, y)
    }

    throw new Error('The signature is not found for the method')
  }

  #add (x: number, y: number) {
    return new Point(this.x + x, this.y + y)
  }

  #mul (x: number, y: number) {
    return new Point(this.x * x, this.y * y)
  }

  #distance (x: number, y: number): number {
    const dx = Math.pow(x - this.x, 2)
    const dy = Math.pow(y - this.y, 2)
    return Math.sqrt(dx + dy)
  }
}

export default Point;
import { AbstractFractal } from '../abstract'

export class BifurcationFractal extends AbstractFractal {

  constructor ({
    x, // (r)
    y = 0.5, // (p)
    minX,
    minY,
    maxX,
    maxY,
    width,
    height,
    depth
  }) {
    super(...arguments)

    this.x = x
    this.y = y
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
    this.cursor = 0
  }

  setup () {
    this.clear()

    this.deltas = {
      x: (this.maxX - this.minX) / this.width,
      y: (this.maxY - this.minY) / this.height
    }
  }

  moveUnit (cursor) {
    const scale = this.minX + this.deltas.x * cursor

    this.y = this.y * scale * (1 - this.y)
  }

  renderUnit (cursor) {
    // waits to give the function time to converge
    if (cursor > 100) {
      const x = this.cursor
      const y = this.height - (this.y - this.minY) / this.deltas.y

      this.context.fillRect(x, y, 1, 1)
    }
  }

  // TODO: clean up this.cursor vs. cursor, highly confusing
  iterate (cursor = this.cursor) {
    this.y = 0.5

    for (let at = 0; at < 200; at += 1) {
      this.moveUnit(this.cursor)
      this.renderUnit(at)
    }

    if (++this.cursor < this.width) {
      this.iterate(cursor)
    }
  }

}

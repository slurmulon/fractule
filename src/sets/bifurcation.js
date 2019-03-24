import { AbstractFractal } from '../abstract'

export class BifurcationFractal extends AbstractFractal {

  constructor ({
    ratio = 0.5, // (p)
    min = {
      x: 0,
      y: 0
    },
    max = {
      x: 0,
      y: 0
    },
    width,
    height,
    depth
  }) {
    super(...arguments)

    this.ratio = ratio
    this.min = min
    this.max = max
    this.cursor = 0
  }

  setup () {
    this.clear()

    this.deltas = {
      x: (this.max.x - this.min.x) / this.width,
      y: (this.max.y - this.min.y) / this.height
    }
  }

  moveUnit (cursor) {
    const scale = this.min.x + this.deltas.x * cursor
    const diff = 1 - this.ratio

    this.ratio = this.ratio * scale * diff
  }

  renderUnit (cursor) {
    // waits to give the function time to converge
    if (cursor > 100) {
      const x = this.cursor
      const y = this.height - (this.ratio - this.min.y) / this.deltas.y

      this.context.fillRect(x, y, 1, 1)
    }
  }

  iterate (axiom = this.cursor) {
    this.ratio = 0.5

    for (let at = 0; at < 200; at += 1) {
      this.moveUnit(this.cursor)
      this.renderUnit(at)
    }

    if (++this.cursor < this.width) {
      this.iterate(axiom)
    }
  }

}

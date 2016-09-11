import { AbstractFractal } from '../abstract'

export class TreeFractal extends AbstractFractal {

  constructor ({
    scale,
    epsilon, // TODO: set default to .5 for bifurcation
    offset,
    width,
    height,
    depth
  }) {
    super(...arguments)

    this.points = [null]
    this.angles = [
      -Math.PI / 4,
      Math.PI / 4
    ]

    this.context.lineWidth = 2
  }

  randomize (delta = 2) {
    this.angles = [
      -Math.PI / delta * Math.random(),
       Math.PI / delta * Math.random()
    ]
  }

  scaleUnit (depth, size) {
    return -size * (1 - this.epsilon)
  }

  renderUnit (depth, size, angle) {
    this.context.stroke()
    this.context.translate(0, this.scaleUnit(depth, size))

    if (depth === 0) {
      this.drawBranch(depth, size * this.epsilon, this.angles[0])
      this.drawBranch(depth, size * this.epsilon, this.angles[1])
    } else {
      this.drawUnit(depth - 1, size * this.epsilon, this.angles[0])
      this.drawUnit(depth - 1, size * this.epsilon, this.angles[1])
    }
  }

  drawBranch (depth, size, angle) {
    this.setupUnit()
    this.directUnit(depth, size, angle)
    this.context.moveTo(0, 0)
    this.context.lineTo(0, -size)
    this.context.stroke()
    this.exitUnit()
  }

  draw () {
    this.clear()
    this.translate(0.5, 0.9)
    this.iteration(null, this.height * 0.75)
  }
}

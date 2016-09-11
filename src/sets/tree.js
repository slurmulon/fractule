import { AbstractFractal } from '../abstract'

export default class TreeFractal extends AbstractFractal {

  constructor ({
    scale,
    epsilon,
    offset,
    width,
    height,
    depth
  }) {
    super(...arguments)

    this.angles = [
      -Math.PI / 2 * Math.random(),
       Math.PI / 2 * Math.random()
    ]
  }

  scaleUnit (depth, size, angle) {
    return -size * (1 - this.epsilon)
  }

  renderUnit (depth, size, angle) {
    this.context.stroke()
    this.context.translate(0, this.scaleUnit(depth, size))

    if (depth === 0) {
      // done. draw branches.
      this.drawBranch(depth, size * this.epsilon, angles[0])
      this.drawBranch(depth, size * this.epsilon, angles[1])
    } else {
      // more. draw two mini trees instead of branches.
      this.drawUnit(depth - 1, size * this.epsilon, angles[0])
      this.drawUnit(depth - 1, size * this.epsilon, angles[1])
    }
  }

  drawBranch(depth, size, angle) {
    this.setupUnit()
    this.positionUnit(depth, size, angle)
    this.context.stroke()
    this.exitUnit()
  }
}

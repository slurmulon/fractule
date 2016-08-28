import AbstractFractal from './abstract'

export default class TreeFractal extends AbstractFractal {

  constructor () {
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
      drawBranch(depth, size * this.epsilon, angles[0]);
      drawBranch(depth, size * this.epsilon, angles[1]);
    } else {
      // more. draw two mini trees instead of branches.
      drawUnit(depth - 1, size * scaleFactor, angles[0]);
      drawUnit(depth - 1, size * scaleFactor, angles[1]);
    }
  }

  drawBranch(depth, size, angle) {
    this.setupUnit()
    this.positionUnit(depth, size, angle)
    this.context.stroke()
    this.exitUnit()
  }
}

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
    const scaledSize = size * this.epsilon
    const [leftAngle, rightAngle] = this.angles

    this.context.stroke()
    this.context.translate(0, this.scaleUnit(depth, size))

    if (depth === 0) {
      this.drawBranch(depth, scaledSize, leftAngle)
      this.drawBranch(depth, scaledSize, rightAngle)
    } else {
      this.drawUnit(depth - 1, scaledSize, leftAngle)
      this.drawUnit(depth - 1, scaledSize, rightAngle)
    }
  }

  moveBranch (size) {
    this.context.moveTo(0, 0)
    this.context.lineTo(0, -size)
    this.context.stroke()
  }

  drawBranch (depth, size, angle) {
    this.setupUnit()
    this.directUnit(depth, size, angle)
    this.moveBranch(size)
    this.exitUnit()
  }

  draw () {
    this.clear()
    this.translate(0.5, 0.9)
    this.iteration(null, this.height * 0.75)
  }
}

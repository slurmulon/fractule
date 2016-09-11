import { AbstractFractal } from '../abstract'

export class TreeFractal extends AbstractFractal {

  constructor ({
    scale,
    epsilon,
    offset,
    width,
    height,
    depth
  }) {
    super(...arguments)

    this.points = [{}]
    this.angles = [
      -Math.PI / 4,
      Math.PI / 4
    ]
  }

  randomize() {
    this.angles = [
      -Math.PI / 2 * Math.random(),
       Math.PI / 2 * Math.random()
    ]
  }

  scaleUnit (depth, size) {
    return -size * (1 - this.epsilon)
  }

  renderUnit (depth, size, angle) {
    this.context.stroke()
    this.context.translate(0, this.scaleUnit(depth, size))

    if (depth === 0) {
      // done. draw branches.
      this.drawBranch(depth, size * this.epsilon, this.angles[0])
      this.drawBranch(depth, size * this.epsilon, this.angles[1])
    } else {
      // more. draw two mini trees instead of branches.
      this.drawUnit(depth - 1, size * this.epsilon, this.angles[0])
      this.drawUnit(depth - 1, size * this.epsilon, this.angles[1])
    }

    this.context.restore()
  }

  drawBranch (depth, size, angle) {
    this.setupUnit()
    this.context.rotate(angle)
    this.context.beginPath()
    this.context.moveTo(0, 0)
    this.context.lineTo(0, -size)
    this.context.stroke()
    this.exitUnit()
  }

  draw () {
    this.clear()
    this.context.translate(this.width * this.scale, this.height * this.scale) // TODO: place this in `centerDrawing` or the like

    const size = this.height * .9

    this.iteration(null, size, 0)
  }
}

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

    this.points = [{}]
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
      console.log('--- depth is 0')
      // done. draw branches.
      this.drawBranch(depth, size * this.epsilon, this.angles[0])
      this.drawBranch(depth, size * this.epsilon, this.angles[1])
    } else {
      console.log('--- depth > 0', depth)
      // more. draw two mini trees instead of branches.
      this.drawUnit(depth - 1, size * this.epsilon, this.angles[0]) // FIXME: context is messed up, something along the way
      this.drawUnit(depth - 1, size * this.epsilon, this.angles[1])
    }
  }

  drawBranch (depth, size, angle) {
    // this.setupUnit()
    // this.directUnit()
    // this.context.moveTo(0, 0)
    // this.context.lineTo(0, -size)
    // this.context.stroke()
    // this.exitUnit()
 
    console.log('drawing branch (size, angle): ', size, angle)
    this.context.save();
    this.context.rotate(angle);
    this.context.beginPath();
    console.log('branch position lineto', -size)
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -size);
    this.context.stroke();
    this.context.restore();
    console.log('done with branch')
  }

  draw () { // TODO: make this redundant
    this.clear()
    this.translate(0.5, 0.9)

    const size = this.height * .8

    this.iteration(null, size)
  }
}

import { eucledian } from './distance'

export class AbstractFractal {

  constructor({
    scale,
    epsilon, // length of each sub-segment
    dist,    // length of the main segment
    points = [ ],
    offset = 0,
    width  = window.innerWidth,
    height = window.innerHeight,
    depth  = 0
  }) {
    if (new.target === AbstractFractal) {
      throw 'cannot instantiate an abstract fractal (unless you have the right drugs)'
    }

    this.scale   = scale
    this.epsilon = epsilon // aka. scaleFactor or unit
    this.points  = points
    this.offset  = offset
    this.width   = width
    this.height  = height
    this.depth   = depth

    this.canvas  = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')

    this.size  = { height, width }
    this.pipes = [ ] // TODO: allow arbitary piping / mapping on fractal units (drawUnit)
  }

  get data () {
    return this.datums
  }

  set data (data) {
    if (data instanceof Array) {
      this.datums = data
    }
  }

  get dimension() {
    // @see pg. 5 section 1.3.2, PAFS
  }

  set size ({ height, width }) {
    this.height = this.canvas.height = height
    this.width  = this.canvas.width  = width
  }

  // TODO: use point
  iteration (point, size = this.size, angle = 0, depth = this.depth) {
    // this.context.save()
    // this.context.translate(this.dist, 0)
    // // this.context.translate(this.width / 2, this.height)
    // this.context.scale(this.epsilon, this.epsilon)

    this.drawUnit(depth, size, angle)

    // if (depth > 0) {
    //   this.iteration(point, size, angle, depth - 1)
    // }

    // this.context.restore()
  }

  // TODO: integrate setInterval and clearInterval, or use generators
  iterate (intervals = false) {
    return this.points.map(this.iteration.bind(this))
  }

  translate (xScale = this.scale, yScale = this.scale) {
    const x = this.width  * xScale
    const y = this.height * yScale

    this.context.translate(x, y)
  }

  draw () {
    this.clear()
    this.translate()

    return this.iterate()
  }

  drawUnit (depth = 0, size = 1, angle = 0) {
    [ this.setupUnit,
      this.directUnit,
      this.moveUnit,
      this.renderUnit,
      this.exitUnit
    ].forEach(step => step.call(this, depth, size, angle))
  }

  setupUnit (depth = 0, size = 1, angle = 0) {
    console.log('\t1. setup')
    this.context.save()
  }

  scaleUnit (depth = 0, size = 1, angle = 0) {
    return -size
  }

  directUnit (depth = 0, size = 1, angle = 0) {
    console.log('\t2. direct')

    this.context.rotate(angle)
    this.context.beginPath()
  }

  moveUnit (depth = 0, size = 1, angle = 0) {
console.log('\t3. move unit position lineto:', this.scaleUnit(depth, size, angle))
    this.context.moveTo(0, 0)
    this.context.lineTo(0, this.scaleUnit(depth, size, angle))
  }

  renderUnit (depth = 0, size = 1, angle = 0) {
    this.context.stroke()
  }

  exitUnit (depth = 0, size = 1, angle = 0) {
    this.context.restore()
  }

  distance (p0, p1) { // TODO: integrate
    return eucledian(p0, p1)
  }

  clear (color) {
    if (color) {
      this.context.fillStyle = color
      this.context.fillRect(0, 0, this.width, this.height)
    } else {
      this.context.clearRect(0, 0, this.width, this.height)
    }
  }

}

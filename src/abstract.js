import Promise from 'bluebird'
import { eucledian } from './distance'

export default class AbstractFractal {

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
    this.depth   = maxDepth

    this.canvas  = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')

    this.size = { height, width }
  }

  get data () {
    return this.$datums
  }

  set data (data) {
    if (data instanceof Array) {
      this.$datums = data
    }
  }

  get dimension() {
    // @see pg. 5 section 1.3.2, PAFS
  }

  set size ({ height, width }) {
    this.height = this.canvas.height = height
    this.width  = this.canvas.width  = width
  }

  // TODO: maybe, would be nice to use generators so people
  // can generate data from time-intensive resources
  // setup()

  iteration (point, size, angle, depth = this.depth) {
    this.context.save()
    this.context.translate(dist, 0) // chaos.context.translate(chaos.width / 2, chaos.height)
    this.context.scale(scaleFactor, scaleFactor)

    drawUnit(depth, size, angle)

    if (depth > 0) {
      iteration(point, depth - 1)
    }

    this.context.restore()
  }

  // TODO: integrate setInterval and clearInterval, or use generators
  iterate (intervals = false) {
    return this.points.map(this.iteration)
  }

  draw () {
    this.clear()

    return this.iterate()
  }

  drawUnit (depth = 0, size = 1, angle = 0) {
    const params = arguments

    [
      this.setupUnit,
      this.positionUnit,
      this.renderUnit,
      this.exitUnit
    ].forEach(step => step.apply(this, params))
  }

  setupUnit (depth = 0, size = 1, angle = 0) {
    chaos.context.save()
  }

  positionUnit (depth = 0, size = 1, angle = 0) {
    chaos.context.rotate(angle)
    chaos.context.beginPath()
    chaos.context.moveTo(0, 0)
    chaos.context.lineTo(0, -size)
  }

  renderUnit (depth = 0, size = 1, angle = 0) {
    chaos.context.stroke()
  }

  exitUnit (depth = 0, size = 1, angle = 0) {
    chaos.context.restore()
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

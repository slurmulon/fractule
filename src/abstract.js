export default class AbstractFractal {

  constructor({
    scale,
    epsilon,
    points = [ ],
    offset = 0,
    width  = window.innerWidth,
    height = window.innerHeight
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

    this.canvas  = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')

    this.size = { height, width }
  }

  get dimension() {
    // @see pg. 5 section 1.3.2, PAFS
  }

  set size({ height, width }) {
    this.height = height
    this.width  = width
  }

  iteration(point) {
    return point
  }

  iterate() {
    return this.points.map(point => this.iteration(point))
  }

  draw() {
    this.clear()

    return this.iterate()
  }

  clear() {

  }

}

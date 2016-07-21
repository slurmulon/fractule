export class AbstractFractal {

  constructor({
    scale, epsilon,
    points = [ ],
    offset = 0,
    width  = window.innerWidth,
    height = window.innerHeight
  }) {
    if (new.target === AbstractFractal) {
      throw 'cannot instantiate an abstract fractal'
    }
    
    this.scale   = scale
    this.epsilon = epsilon // aka. scaleFactor
    this.points  = points
    this.offset  = offset
    this.width   = width
    this.height  = height

    this.canvas  = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')

    this.setSize(width, height)
  }

  get dimension() {

  }

  set size({height, width}) {
    this.height = height
    this.width  = width
  }

  iterate() {

  }

  on(event, cb) {

  }

  clear() {

  }

}

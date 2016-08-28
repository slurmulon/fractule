import keycode from 'keycode'

export default class FractalControls {

  constructor (elem, fractal) {
    this.elem    = elem
    this.fractal = fractal
  }

  bind () {
    this.elem.addEventListener('mouseup',   this.mouseUp, true)
    this.elem.addEventListener('mousedown', this.mouseUp, true)
    this.elem.addEventListener('keyUp',     this.keyUp,   true)
    this.elem.addEventListener('keyDown',   this.keyDown, true)
  }

  which (event) {
    return keycode(event)
  }

  keyUp (event) {
    const key = this.which(event)

    switch (key) {
      case 'space':
        this.fractal.iterate()
        break
      default:
        break
    }

    return key
  }

  keyDown (event) {
    return this.which(event)
  }

  mouseUp (event) {
    return true
  }

  mouseDown (event) {
    return true
  }

}

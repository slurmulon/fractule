export default class FractalControls {

  constructor (elem) {
    this.elem = elem
  }

  bind() {
    this.elem.addEventListener('mouseup',   this.mouseUp, true)
    this.elem.addEventListener('mousedown', this.mouseUp, true)
    // TODO: keyUp, keyDown
  }

  keyUp (event) {
    return true
  }

  keyDown (event) {
    return true
  }

  mouseUp (event) {
    return true
  }

  mouseDown (event) {
    return true
  }

}

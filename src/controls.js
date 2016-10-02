import keycode from 'keycode'

export class FractalControls {

  constructor (fractal, elem = document.body) {
    this.fractal = fractal
    this.elem    = elem
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
      case 'p':
        this.popImage()
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

  popImage () {
    const win = window.open('', 'Canvas Fractal Image')
    const src = this.fractal.canvas.toDataURL('image/png')

    win.document.write(`<img src="${src}" width="${this.width}" height="${this.height}"/>`)
  }

}

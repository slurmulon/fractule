export default class LSystemDimensions {

  constructor ({
    min = {
      x: 0,
      y: 0
    },
    max = {
      x: 0, // window.innerWidth
      y: 0 // window.innerHeight
    }
  }) {
    this.min = min
    this.max = max
  }

}

export default class LSystemDimensions {

  constructor ({
    minX = 0,
    minY = 0,
    maxX = 0, // window.innerWidth
    maxY = 0 // window.innerHeight
  }) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

}

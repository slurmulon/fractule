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

  get deltas () {
    return {
      x: this.max.x - this.min.x,
      y: this.max.y - this.min.y
    }
  }

  scale (ratio) {
    this.min.x *= ratio
    this.max.x *= ratio
    this.min.y *= ratio
    this.max.y *= ratio
  }

}

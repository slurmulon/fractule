export class LSystemRenderer {

  constructor (system, colors = []) {
    this.system = system
    this.colors = colors
  }

  process (system = this.system) {
    const { angle, distance } = system
    let lastX, lastY

    this.stack = []


    // call ths tokens in the supplied grammar
  }

}

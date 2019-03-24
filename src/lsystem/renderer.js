import { LSystemPosition } from '../lsystem'

// Bridges together an abstract LSystem and an LSystemGrammar
// Can probably just bake this into abstract LSystem since it already supports a custom grammar and already owns most of the rendering logic
//  - ALREADY HAPPENING!!!
export class LSystemRenderer {

  constructor ({ system, grammar, colors = [] }) {
    this.system = system
    this.grammar = grammar
    this.colors = colors
  }

  process (system = this.system) {
    const { commands, angle, distance } = system

    let position = new LSystemPosition()
    let lastX, lastY

    this.stack = []

    for (const command of commands) {
      // this.system.grammar.process(position, command)
      const action = this.grammar[command](this)

      if (action instanceof Function) {
        action(position)
      } else {
        // TODO: Normal draw behavior
      }
    }
    // this.system.grammar.process(commands
    // call ths tokens in the supplied grammar
  }

  left (position) {
    position.heading += this.system.angle
  }

  right (position) {

  }

  push (position) {

  }

  pop (position) {

  }

  style (position) {

  }

}

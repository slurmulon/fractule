import { AbstractFractal } from './abstract'
import TurtleGrammar from './lsystem/grammars/turtle'

export class LSystemFractal extends AbstractFractal {

  /*
   * axiom: 'FX'
   * constants: 'F',
   * rules: {
   *   'X': 'X+YF',
   *   'Y': 'FX-Y'
   * }
   */

  // TODO: Consider accepting grammar
  constructor ({
    scale,
    dist,
    width,
    height,
    depth,
    angle = 120,
    // distance = 10
    // variables: [], // TODO: If we want to force all potential variables to be declared up-front
    constants = [], // FIXME: Think this needs to be explicitly handled
    rules = {}, //[],
    axiom = null,
    iterations = 1,
    grammar = TurtleGrammar
  }) {
    super(...arguments)

    this.angle = angle
    // this.variables = variables
    this.constants = constants
    this.rules = rules
    this.axiom = axiom
    this.iterations = iterations
    this.grammar = grammar
    this.cursor = null
    this.stack = []

    // this.process()
  }

  get commands () {
    let { axiom } = this
    let commands = [] //null

    for (let i = 0; i < this.iterations; i++) {
      if (i > 0) {
        axiom = commands.join('')
      }

      commands = []

      for (const token of axiom) {
        const rule = rules[token]

        commands.push(rule !== null ? rule : token)

        if (commands.length > 1000000000) {
          throw 'Way too many commands, bro'
        }
      }
    }

    return result.join('')
  }

  // render ({ grammar = this.grammar, colors }) {
  draw ({ grammar = this.grammar, colors }) {
    // const renderer = new LSystemRenderer({ system: this, grammar, colors })

    // renderer.process()

    const { commands, angle, distance } = this

    // let position = new LSystemPosition()
    let radian, lastX, lastY

    this.cursor = new LSystemPosition()
    this.stack = []

    for (const command of commands) {
      const action = grammar[command](this)

      if (action instanceof Function) {
        action(this.cursor)
      } else {
        radian = this.cursor.heading * RADIAN
        lastX = this.cursor.x
        lastY = this.cursor.y

        // TODO: Normal draw behavior
        // this.drawUnit(null, null, this.angle)

        this.context.beginPath()
        this.context.moveTo(lastX, this.height - (lastY)) //+ yOffset
        this.context.moveTo(position.x, this.height - (position.y)) //+ yOffset
      }
    }
  }

  left (position) {
    position.heading += this.angle

    return position
  }

  right (position) {
    position.heading -= this.angle

    return position
  }

  push (position) {
    this.stack.push(new LSystemPosition(position))
  }

  pop () {
    this.cursor = this.stack.pop()
  }

  // -----

  // renderUnit (depth, size, angle) {

  // }

}

// TODO: Move to src/lsystem/position.js
export class LSystemPosition {

  constructor ({
    x = 0,
    y = 0,
    heading = 90,
    color = -1
  }) {
    this.x = x
    this.y = y
    this.heading = heading
    this.color = color
  }

}

export const RADIAN = Math.PI / 180.0

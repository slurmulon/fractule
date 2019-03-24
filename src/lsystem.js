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
    // dist = 10,
    width,
    height,
    depth,
    angle = 120,
    distance = 10,
    axiom = '', // null
    // distance = 10
    // variables: [], // TODO: If we want to force all potential variables to be declared up-front
    constants = '',
    rules = {}, //[],
    iterations = 1,
    grammar = TurtleGrammar,
    ceiling = 1000000000
  }) {
    super(...arguments)

    this.angle = angle
    this.distance = distance
    // this.variables = variables
    this.constants = constants
    this.rules = rules
    this.axiom = axiom
    this.iterations = iterations
    this.grammar = grammar

    this.cursor = null
    this.stack = []
  }

  get commands () {
    let { axiom, rules, ceiling } = this
    let commands = []

    for (let i = 0; i < this.iterations; i++) {
      if (i > 0) {
        axiom = commands.join('')
      }

      commands = []

      for (const token of axiom) {
        const rule = rules[token]

        commands.push(rule !== null ? rule : token)

        if (commands.length > ceiling) {
          throw 'Way too many commands, bro'
        }
      }
    }

    return commands.join('')
  }

  draw (grammar = this.grammar, colors) {
    const { commands, angle, distance, constants } = this
    let radian, lastX, lastY

    this.cursor = new LSystemPosition({})
    this.stack = []
    this.context.strokeStyle = 'rgb(0,0,0)'

    this.setup()

    for (const command of commands) {
      console.log('processing command', command)
      const action = grammar[command]

      if (action instanceof Function) {
        action(this).call(this, this.cursor)
      } else if (!constants.includes(command)) {
        lastX = this.cursor.x
        lastY = this.cursor.y
        radian = this.cursor.heading * RADIAN

        this.cursor.x += distance * Math.cos(radian)
        this.cursor.y += distance * Math.sin(radian)

        // TODO: Normal draw behavior
        // this.drawUnit(null, null, this.angle)
      
        console.log('cursor', this.cursor, radian)
        console.log('dims', this.height, this.width)

        this.context.beginPath()
        this.context.moveTo(lastX, this.height - (lastY)) //+ yOffset
        this.context.lineTo(this.cursor.x, this.height - (this.cursor.y)) //+ yOffset
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

  // TODO!
  style (position) {
    return 'rgba(140, 80, 60, 0.75)'
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

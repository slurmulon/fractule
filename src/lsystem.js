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
    width = window.innerWidth,
    height = window.innerHeight,
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
    dimensions = new LSystemDimensions({}),
    offsets = { x: 0, y: 0 },
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
    this.dimensions = dimensions
    this.offsets = offsets

    this.cursor = null
    this.stack = []
  }

  // TODO: Consider making these analogous to "points" so that they can be automagically processed by `this.iterate`
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

  // TODO: Move a lot of this into `translate` override
  setup () {
    this.clear()

    const { dimensions, distance, height, width } = this

    let scaledDistance

    if (dimensions.maxX - dimensions.minX > dimensions.maxY - dimensions.minY) {
      scaledDistance = (width / Math.max(1, dimensions.maxX - dimensions.minX)) * distance
    } else {
      scaledDistance = (height / Math.max(1, dimensions.maxY - dimensions.minY)) * distance
    }

    console.log('OLD DIMENSIONS', dimensions, scaledDistance)

    dimensions.minX = 0 //(scaledDistance / distance)
    dimensions.maxX = (scaledDistance / distance)
    dimensions.minY = 0 //(scaledDistance / distance)
    dimensions.maxY = (scaledDistance / distance)

    console.log('NEW DIMENSIONS', dimensions)

    this.offsets.x = (width / 2) - (((dimensions.maxX - dimensions.minX) / 2) + dimensions.minX)
    this.offsets.y = (height / 2) - (((dimensions.maxY - dimensions.minY) / 2) + dimensions.minY)

    this.context.translate(this.offsets.x, 0)
    this.context.strokeStyle = 'rgb(0,0,0)'
  }

  draw (grammar = this.grammar, colors) {
    const { commands, angle, distance, constants } = this
    let radian, lastX, lastY

    this.cursor = new LSystemPosition({})
    this.stack = []

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

        const yOffset = this.offsets.y //0 //1000

        console.log('yoffset', yOffset)

        this.context.beginPath()
        this.context.moveTo(lastX, this.height - (lastY + yOffset))
        this.context.lineTo(this.cursor.x, this.height - (this.cursor.y + yOffset))
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

export class LSystemDimensions {

  constructor ({
    minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0
  }) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

}

export const RADIAN = Math.PI / 180.0

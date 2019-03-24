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
    // width = window.innerWidth,
    // height = window.innerHeight,
    depth,
    angle = 120,
    distance = 100, //10,
    axiom = '', // null
    // distance = 10
    // variables: [], // TODO: If we want to force all potential variables to be declared up-front
    constants = '',
    rules = {}, //[],
    iterations = 1,
    grammar = TurtleGrammar,
    // dimensions = new LSystemDimensions({}),
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
    // this.dimensions = dimensions
    this.offsets = offsets

    this.cursor = null
    this.stack = []
  }

  get dimensions () {
    return new LSystemDimensions({
      minX: 0,
      minY: 0,
      maxX: this.canvas.width,
      maxY: this.canvas.height
    })
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

        console.log('--- [command parse], rule, token, axiom', rule, token, axiom)

        commands.push(rule != null ? rule : token)

        if (commands.length > ceiling) {
          throw 'Way too many commands, bro'
        }
      }
    }

    return commands.join('')
  }

  // process (drawv) {

  // }

  // TODO: Move a lot of this into `translate` override
  // TODO: Copypasta `calcOffsets` (but try to avoid, it literally processes everything twice lol)
  setup () {
    this.clear()

    // const { dimensions, distance, height, width } = this
    const { dimensions, distance } = this
    const { height, width } = this.canvas

    console.log('canvas height, width', height, width)

    let scaledDistance

    if (dimensions.maxX - dimensions.minX > dimensions.maxY - dimensions.minY) {
      // scaledDistance = (width / Math.max(1, dimensions.maxX - dimensions.minX)) * distance
      scaledDistance = (width / (dimensions.maxX - dimensions.minX)) * distance
      console.log('largest delta: x', width, scaledDistance)
    } else {
      // scaledDistance = (height / Math.max(1, dimensions.maxY - dimensions.minY)) * distance
      scaledDistance = (height / (dimensions.maxY - dimensions.minY)) * distance
      console.log('largest delta: y', height, scaledDistance)
    }

    console.log('OLD DIMENSIONS', dimensions, distance, scaledDistance)

    dimensions.minX *= (scaledDistance / distance)
    dimensions.maxX *= (scaledDistance / distance)
    dimensions.minY *= (scaledDistance / distance)
    dimensions.maxY *= (scaledDistance / distance)

    console.log('NEW DIMENSIONS', dimensions)

    // dimensions.minX = 0
    // dimensions.maxX = this.width
    // dimensions.minY = 0
    // dimensions.maxY = this.height

    this.offsets.x = (width / 2) - (((dimensions.maxX - dimensions.minX) / 2) + dimensions.minX)
    this.offsets.y = (height / 2) - (((dimensions.maxY - dimensions.minY) / 2) + dimensions.minY)

    console.log('NEW OFFSETS', this.offsets)

    this.distance = scaledDistance

    this.context.translate(this.offsets.x, 0)
    this.context.strokeStyle = 'rgb(0,0,0)'
  }

  draw (grammar = this.grammar, colors) {
    const { commands, angle, distance, constants } = this
    let radian, lastX, lastY

    this.cursor = new LSystemPosition({})
    this.stack = []

    console.log('starting cursor', this.cursor)

    this.setup()

    console.log('commands', commands)

    for (const command of commands) {
      console.log('processing command', command)
      const action = grammar[command]

      if (action instanceof Function) {
        action(this).call(this)
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

        // TODO: Support 'F' and 'G' (break out into `forward` and `move`)
        this.context.lineWidth = 1
        this.context.beginPath()
        this.context.moveTo(lastX, this.height - (lastY + yOffset))
        this.context.lineTo(this.cursor.x, this.height - (this.cursor.y + yOffset))
        //
        this.context.closePath()
        this.context.stroke()
      }
    }

    this.context.restore()
  }

  left () {
    console.log('left prev, next', this.cursor.heading, this.cursor.heading + this.angle)
    this.cursor.heading += this.angle
    // this.cursor.heading -= this.angle
    console.log('left new cursor', this.cursor.heading)
  }

  right (position) {
    this.cursor.heading -= this.angle
    // this.cursor.heading += this.angle
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
    maxX = 0, // window.innerWidth
    maxY = 0 // window.innerHeight
  }) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

}

export const RADIAN = Math.PI / 180.0

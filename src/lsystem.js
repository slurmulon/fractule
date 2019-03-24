import { AbstractFractal } from './abstract'
import LSystemDimensions from './lsystem/dimensions'
import LSystemPosition from './lsystem/position'
import TurtleGrammar from './lsystem/grammars/turtle'

// TOOD: Integrate this more elegantly with AbstractFractal
export class LSystemFractal extends AbstractFractal {

  constructor ({
    scale,
    depth,
    angle = 120,
    distance = 10,
    axiom = '',
    // variables: '', // TODO: If we want to force all potential variables to be declared up-front
    constants = '',
    rules = {},
    iterations = 1,
    grammar = TurtleGrammar,
    offsets = { x: 0, y: 0 },
    colors = [],
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
    this.offsets = offsets
    this.colors = colors

    this.cursor = null
    this.stack = []
    this.dimensions = new LSystemDimensions({
      minX: 0,
      minY: 0,
      maxX: this.canvas.width, //this.width,
      maxY: this.canvas.height //this.height
    })
  }
  //
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

        commands.push(rule != null ? rule : token)

        if (commands.length > ceiling) {
          throw `Depth is too great and results in Way too many commands: ${commands.length}`
        }
      }
    }

    return commands.join('')
  }

  // TODO: Move a lot of this into `translate` override
  setup () {
    this.clear()

    const { dimensions, distance } = this
    const { height, width } = this.canvas

    let scaledDistance

    if (dimensions.maxX - dimensions.minX > dimensions.maxY - dimensions.minY) {
      scaledDistance = (width / (dimensions.maxX - dimensions.minX)) * distance
    } else {
      scaledDistance = (height / (dimensions.maxY - dimensions.minY)) * distance
    }

    const relativeDistance = scaledDistance / distance

    this.distance = scaledDistance

    this.dimensions.minX *= relativeDistance
    this.dimensions.maxX *= relativeDistance
    this.dimensions.minY *= relativeDistance
    this.dimensions.maxY *= relativeDistance

    this.offsets.x = (width / 2) - (((this.dimensions.maxX - this.dimensions.minX) / 2) + this.dimensions.minX)
    this.offsets.y = (height / 2) - (((this.dimensions.maxY - this.dimensions.minY) / 2) + this.dimensions.minY)

    this.context.translate(this.offsets.x, 0)
    this.context.strokeStyle = 'rgb(0,0,0)'
  }

  focus () {
    this.process({
      commit: step => {
        if (this.cursor.x < this.dimensions.minX) {
          this.dimensions.minX = this.cursor.x
        } else if (this.cursor.x > this.dimensions.maxX) {
          this.dimensions.maxX = this.cursor.x
        }

        if (this.cursor.y < this.dimensions.minY) {
          this.dimensions.minY = this.cursor.y
        } else if (this.cursor.y > this.dimensions.maxY) {
          this.dimensions.maxY = this.cursor.y
        }

        if (this.stack.length > this.depth) {
          this.depth = this.stack.length
        }
      }
    })

    this.setup()
  }

  draw ({
    grammar = this.grammar,
    colors = this.colors
  } = {}) {
    this.focus()
    this.process({
      grammar,
      colors,
      after: () => this.context.restore(),
      commit: step => {
        this.context.lineWidth = Math.max(this.depth - this.stack.length, 1)

        this.context.beginPath()
        this.context.moveTo(step.lastX, this.height - (step.lastY + this.offsets.y))
        this.context.lineTo(this.cursor.x, this.height - (this.cursor.y + this.offsets.y))
        //
        this.context.closePath()
        this.context.stroke()
      }
    })
  }

  process ({
    grammar = this.grammar,
    colors = this.colors,
    commit = () => {},
    after  = () => {}
  } = {}) {
    const { commands, angle, distance, constants } = this
    let radian, lastX, lastY

    this.cursor = new LSystemPosition({})
    this.stack = []

    for (const command of commands) {
      const action = grammar[command]

      if (action instanceof Function) {
        action(this).call(this)
      } else if (!constants.includes(command)) {
        lastX = this.cursor.x
        lastY = this.cursor.y
        radian = this.cursor.heading * RADIAN

        this.cursor.x += distance * Math.cos(radian)
        this.cursor.y += distance * Math.sin(radian)

        commit({ lastX, lastY, radian })
      }
    }

    if (after instanceof Function) after()
  }

  left () {
    this.cursor.heading += this.angle
  }

  right () {
    this.cursor.heading -= this.angle
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

export const RADIAN = Math.PI / 180.0

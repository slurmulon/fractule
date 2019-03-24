import { AbstractFractal } from './abstract'

export class LSystem extends AbstractFractal {

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
    width,
    height,
    depth,
    angle = 120,
    // distance = 10
    // variables: [],
    constants: [],
    rules = {}, //[],
    axiom = null,
    iterations = 1
  }) {
    super(...arguments)

    this.angle = angle
    // this.variables = variables
    this.constants = constants
    this.rules = rules
    this.axiom = axiom
    this.iterations = iterations

    // this.process()
  }

  process () {
    // rules
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

  render () {
    // const renderer = new LSystemRenderer(this.commands, [])
  }

}

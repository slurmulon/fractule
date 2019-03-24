import LSystemGrammar from '../grammar'

export class TurtleLSystemGrammmar extends LSystemGrammar {

  constructor () {
    super(...arguments)

    this.tokens = {
      '+': null, // turn anti-clockwise
      '-': null, // turn clockwise
      '[': null, // push
      ']': null, // pop
      'C': null, // color
    }
  }

}

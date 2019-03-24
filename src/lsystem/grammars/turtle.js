import LSystemGrammar from '../grammar'

// export class TurtleLSystemGrammmar extends LSystemGrammar {

//   constructor () {
//     super(...arguments)

//     // TODO: Consider reversing the key/values here
//     this.tokens = {
//       '+': this.left, // turn anti-clockwise
//       '-': this.right, // turn clockwise
//       '[': this.push, // push
//       ']': this.pop, // pop
//       'C': this.style, // color
//     }
//   }

// }

export default {
  '+': system => system.left,
  '-': system => system.right,
  '[': system => system.push,
  ']': system => system.pop,
  'C': system => system.style
}

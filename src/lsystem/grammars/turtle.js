import LsysGrammar from '../grammar'

// pg. 80 of Computational Beauty of Nature

export default {
  // 'F': sys => sys.forward, // AKA draw forward
  // 'G': sys => sys.move, // AKA move forward
  '+': sys => sys.left,
  '-': sys => sys.right,
  '[': sys => sys.push,
  ']': sys => sys.pop,
  'C': sys => sys.style
}

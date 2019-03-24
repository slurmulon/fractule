// pg. 80 of Computational Beauty of Nature

export default {
  // 'F': lsys => lsys.forward, // AKA draw forward
  // 'G': lsys => lsys.move, // AKA move forward
  '+': lsys => lsys.left,
  '-': lsys => lsys.right,
  '[': lsys => lsys.push,
  ']': lsys => lsys.pop,
  'C': lsys => lsys.style
}

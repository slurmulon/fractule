// @see pg. 5 - 7, particularly box counting method in Fig. 1.3.2
// @see pg. 52 - global vs. local dimension

export function euclidean (p0, p1) {
  const dx = p1.x - p0.x
  const dy = p1.y - p0.y

  return Math.sqrt(dx * dx + dy * dy)
}

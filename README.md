# fractule

> :space_invader: Fractal mathematics and visualization API

---

fractule is an attempt to establish a human-friendly programming API for defining, visualizing, analyzing and interacting with fractal / chaotic functions.

It is strongly influenced by [Playing with Chaos](http://www.playingwithchaos.net/) by Keith Peters, an incredible and intuitive introduction to coding fractal equations.

fractule will eventually extend beyond this work in order to help establish the real-world scientific uses of fractals, particularly in the world of physics. This includes but is not limited to:

* Logarithmic analysis
* Multi-fractal analysis
* Fractal dimension analysis
* Non-deterministic fractals
* Heterogenous fractals
* Bifurcations
* Distributions

## API

This API is certainly bound to change, but it currently defines an HTML5 canvas interface for preparing, scaling, transforming and rendering fractal shapes.  Although the visualization API described below will slowly evolve, most of the additional work will be towards the mathematics API (which as of now, is really just `dimension`):

* `iterate`

  Kicks off the fractal iteration process

* `iteration`

  Called on each depth iteration of a fractal

* `translate`

  Prepares the fractal by translating its position

* `drawUnit`

  Invokes the overall drawing process of a single fractal unit

* `setupUnit`

  Prepares a fractal unit context for rendering (typically `this.context.save()`)

* `scaleUnit`

  Returns a scaled size based on the current depth, size and angle of a fractal unit

* `directUnit`

  Prepares a fractal unit for movement by changing its direction / rotating it

* `moveUnit`

  Changes the position of the fractal unit context according to the scale

* `renderUnit`

  Render the fractal unit as an SVG stroke

* `exitUnit`

  Cleanup step that gets called after a fractal unit is successfully rendered

* `distance`

  Determines the Euclidean distance between two points (utility function)

* `clear`

  Clears out a canvas that may have one or more fractals on it. Supports a custom fill color

## Sets

fractule implements various "sets", which are simply common fractal equations that can be visualized via configuration:

- [X] Tree
- [ ] Koch Curve
- [ ] Koch Snowflake
- [ ] Sierpinski Triangle
- [ ] Mandelbrot
- [ ] Julia
- [X] Bifurcation
- [ ] Lorenz Strange Attractor
- [ ] Coastlines
- [ ] Lightning

And there will of course be more to come!

## Install

`npm install slurmulon/fractule`

## Examples

As of now, every fractal visualization generated by fractule can be viewed at the [Playing with Chaos](http://www.playingwithchaos.net) home page.

### Tree

```js
import { TreeFractal } from 'fractule'

const tree = new TreeFractal({
  epsilon : .5,
  depth   : 2,
  height  : 600, // defaults to window.innerHeight
  width   : 800  // defaults to window.innerWidth
})

tree.randomize()
tree.draw()
```

![Tree Fractal Example](./assets/tree.png)

### Bifurcation

```js
import { BifurcationFractal } from 'fractule'

const bifur = new BifurcationFractal({
  minX: 2,
  maxX: 4,
  minY: 0,
  maxY: 1
})

bifur.draw()
```

![Bifurcation Fractal Example](./assets/bifurcation.png)

## Contributing

I am always looking for contributors, so if you're interested simply open up a PR or message me at me@madhax.io!

## Roadmap

- [ ] Controls (zoom, pop, etc.)
- [ ] Colors (background, fill, transformation function / matrix, etc.)
- [ ] Math API
- [ ] Scientific notation (like Wolfram)
- [ ] Parallel renderings
- [ ] Custom interpreters
- [ ] Separate math and visualizations more
- [ ] TypeScript
- [ ] Tests

## License

MIT

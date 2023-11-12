function draftSkirt({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  absoluteOptions,
  part,
  store,
  sa,
  expand,
  macro,
  snippets,
  Snippet,
  scale,
}) {
  if (!options.skirt || !expand) return part.hide()

  // We really don't want the skirt to be smaller than the suit itself, so do a little sanity check here.
  const skirtWidth = measurements.waist * Math.max(options.waistEase, options.skirtWidth)
  const skirtLength = measurements.waistToUpperLeg * options.skirtLength

  points.topLeftCorner = new Point(0, 0)
  points.bottomLeftCorner = new Point(0, skirtLength)
  points.bottomRightCorner = new Point(skirtWidth / 2, skirtLength)
  points.topRightCorner = new Point(skirtWidth / 2, 0)

  paths.hemBase = new Path()
    .move(points.bottomLeftCorner)
    .line(points.bottomRightCorner)
    .addClass('fabric')
    .hide(true)

  paths.saBase = new Path()
    .move(points.bottomRightCorner)
    .line(points.topRightCorner)
    .addClass('fabric')
    .hide()

  paths.waistBase = new Path()
    .move(points.topRightCorner)
    .line(points.topLeftCorner)
    .addClass('fabric')
    .hide()

  paths.foldBase = new Path().move(points.topLeftCorner).line(points.bottomLeftCorner).hide()

  paths.seam = paths.hemBase
    .join(paths.saBase)
    .join(paths.waistBase)
    .join(paths.foldBase)
    .close()
    .addClass('fabric')

  macro('vd', {
    id: 'hSkirt',
    from: points.topLeftCorner,
    to: points.bottomLeftCorner,
    x: -(sa + 15),
  })
  macro('hd', {
    id: 'wSkirt',
    from: points.topLeftCorner,
    to: points.topRightCorner,
    y: -(sa + 15),
  })

  points.cutonfoldFrom = points.topLeftCorner
  points.cutonfoldTo = points.bottomLeftCorner
  macro('cutonfold', {
    from: points.cutonfoldFrom,
    to: points.cutonfoldTo,
    grainline: true,
  })

  store.cutlist.addCut({ cut: 1, from: 'fabric' })

  points.title = new Point(skirtWidth / 4, skirtLength / 2)
  macro('title', { at: points.title, nr: 9, title: 'skirt' })
  points.logo = points.title.shift(180, 50 * scale)
  snippets.logo = new Snippet('logo', points.logo)

  if (sa) {
    paths.sa = new Path()
      .move(points.bottomLeftCorner)
      .line(points.bottomLeftCorner.translate(0, absoluteOptions.skirtHem))
      .line(points.bottomRightCorner.translate(sa, absoluteOptions.skirtHem))
      .line(points.topRightCorner.translate(sa, -absoluteOptions.skirtWaistband))
      .line(points.topLeftCorner.translate(0, -absoluteOptions.skirtWaistband))
      .line(points.topLeftCorner)
      .addClass('fabric sa')
  }

  return part
}

export const skirt = {
  name: 'onyx.skirt',
  draft: draftSkirt,
  measurements: ['waist'],
  options: {},
}

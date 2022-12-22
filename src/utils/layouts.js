import { interpolateViridis } from 'd3-scale-chromatic'

export const normalize = data => {
  const total = data.reduce((aco, { priority }) => priority + aco, 0)
  return data
    .map(branch => ({
      ...branch,
      norm: branch.priority / total
    }))
}

export const squarified = (data, width, height, aco = [], offsetX = 0, offsetY = 0, isInverted = false) => {
  if (data.length === 0 && aco.length === 0) {
    return []
  }

  if (aco.length === 0) {
    return squarified(data.slice(1), width, height, [data[0]], offsetX, offsetY, isInverted)
  }

  const isWorst = data.length === 0 || worst(aco, height) < worst([...aco, data[0]], height)

  if (!isWorst) {
    return squarified(data.slice(1), width, height, [...aco, data[0]], offsetX, offsetY, isInverted)
  }

  const area = aco.reduce((aco, { area }) => area + aco, 0)
  const base = area / height

  return [
    ...calcAreaPosition(aco, base, offsetX, offsetY, isInverted),
    ...squarified(data, height, width - base, [], offsetY, offsetX + base, !isInverted)
  ]
}

export const squarifiedPlus = (data, width, height, aco = [], offsetX = 0, offsetY = 0, isInverted = false) => {
  if (data.length === 0 && aco.length === 0) {
    return []
  }

  if (aco.length === 0) {
    return squarifiedPlus(data.slice(1), width, height, [data[0]], offsetX, offsetY, isInverted)
  }

  const isWorst = data.length === 0 || worst(aco, height) < worst([...aco, data[0]], height)

  if (!isWorst) {
    return squarifiedPlus(data.slice(1), width, height, [...aco, data[0]], offsetX, offsetY, isInverted)
  }

  const area = aco.reduce((aco, { area }) => area + aco, 0)

  const isWorstIvert = worst(aco, width) > worst(aco, height)

  if (!isWorstIvert) {
    const base = area / width
    return [
      ...calcAreaPosition(aco, base, offsetY, offsetX, !isInverted),
      ...squarifiedPlus(data, height - base, width, [], offsetY + base, offsetX, !isInverted)
    ]
  }

  const base = area / height
  return [
    ...calcAreaPosition(aco, base, offsetX, offsetY, isInverted),
    ...squarifiedPlus(data, height, width - base, [], offsetY, offsetX + base, !isInverted)
  ]
}

const calcAreaPosition = (data, base, offsetX, offsetY, isInverted) => data
  .map(branch => ({
    ...branch,
    width: isInverted ? branch.area / base : base,
    height: isInverted ? base : branch.area / base
  }))
  .reduce((acc, branch, i) => [
    ...acc,
    {
      ...branch,
      top: !isInverted ? i !== 0 ? acc[i - 1].top + acc[i - 1].height : offsetY : offsetX,
      left: isInverted ? i !== 0 ? acc[i - 1].left + acc[i - 1].width : offsetY : offsetX
    }
  ], [])

export const interpolate = data => {
  const min = Math.min(...data.map(d => d.priority))
  const max = Math.max(...data.map(d => d.priority))
  const t = v => (v - min) / (max - min)

  return data.map(d => ({ ...d, interpolation: t(d.priority) }))
}

export const calcColor = data => data
  .map(d => ({ ...d, color: interpolateViridis(d.interpolation) }))

const worst = (data, a) => {
  const areas = data.map(({ area }) => area)
  const b = areas.reduce((aco, area) => area + aco, 0) / a
  const b2 = b * b

  return data.reduce((aco, { area }) => aco + Math.abs(2 - b2 / area - area / b2), 0) / data.length
}

export const calcAreaByBranch = area => data => data
  .map(branch => ({
    ...branch,
    area: area * branch.norm
  }))

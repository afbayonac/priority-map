import { log } from "./log"

export const squarified = (data, width, height, aco = [],  offsetX = 0, offsetY = 0, isInverted = false) => {  

  if (data.length === 0 && aco.length === 0) {
    return []
  }

  if(aco.length === 0) {
    return squarified(data.slice(1), width, height, [data[0]], offsetX, offsetY, isInverted)
  }

  const isWorst = data.length === 0 || worst(aco, height) < worst([...aco, data[0]], height)

  if(!isWorst) {
    return squarified(data.slice(1), width, height, [...aco, data[0]], offsetX, offsetY, isInverted)
  }

  const area = aco.reduce((aco, { area }) => area + aco, 0)
  const base = area / height

  log({isInverted, isInvertedX: !isInverted, data})
  return [
    ...calcAreaPosition(aco, base, offsetX, offsetY, isInverted),
    ...squarified(data, height, width - base, [], offsetY, offsetX + base, !isInverted)
  ]
}


const calcAreaPosition = (data, base, offsetX, offsetY, isInverted) => {

  return data
    .map(branch => ({
      ...branch,
      width: isInverted ? branch.area / base: base,
      height: isInverted ? base : branch.area / base,
    }))
    .reduce((acc, branch, i) =>[
      ...acc,
      {
        ...branch,
        top: !isInverted ? i !== 0 ? acc[i - 1].top + acc[i - 1].height: offsetY : offsetX,
        left: isInverted ? i !== 0 ? acc[i - 1].left + acc[i - 1].width: offsetY : offsetX,
      }
    ], [])
}



const worst = (data, a) => {
  const areas = data.map(({area}) => area)
  const b = areas.reduce((aco, area) => area + aco, 0) / a
  
  return Math.max(
    Math.abs(1 - b / (Math.min(...areas) / b)), 
    Math.abs(1 - b / (Math.min(...areas) / b))
  )
}


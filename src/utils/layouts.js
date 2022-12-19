import { log } from "./log"

export const squarified = (data, width, height, aco = [],  offsetX = 0, offsetY = 0) => {
  if (data.length === 0) {
    return calcAreaPosition(aco, width,  height, offsetX, offsetY )
  }
  

  if(aco.length === 0) {
    return squarified(data.slice(1), width, height, [data[0]], offsetX, offsetY)
  }

  log('ok')
  log(worst(aco, height))
  log(worst([...aco, data[0]], height))
  if(worst(aco, height) < worst([...aco, data[0]], height)) {

    log(worst(aco, height))
    log(worst([...aco, data[0]], height))

    const b = aco.reduce((aco, { area }) => area + aco, 0) / height

    return [
      ...calcAreaPosition(aco, width,  height, offsetX, offsetY ),
      ...squarified(data, width - b, height, [], offsetX + b, 0)
    ]
  }

  return squarified(data.slice(1), width, height, [...aco, data[0]], offsetX, offsetY)
}


const calcAreaPosition = (data, width, height, offsetX, offsetY) => {
  const b = data.reduce((aco, { area }) => area + aco, 0) / height
  return data
    .map((branch) => ({
      ...branch,
      width: b,
      height: branch.area / b,
      ar: b / (branch.area / b),
    }))
    .reduce((acc, branch, i) =>[
      ...acc,
      {
        ...branch,
        top: i !== 0 ? acc[i - 1].top  + acc[i - 1].height: offsetY,
        left: i !== 0 ? acc[i - 1].left : offsetX
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


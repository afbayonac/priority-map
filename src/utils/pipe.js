export const pipe = (input, ...args) => args.reduce((aco, fn) => fn(aco), input)

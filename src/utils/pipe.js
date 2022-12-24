export const pipe = (...args) => args.reduce((aco, fn) => fn(aco), null)

export const uniq = (array) => [...new Set(array)]

export const uniqAdd = (array, val) => {
  if (Array.isArray(val)) return uniq([...array, ...val])
  else return uniq([...array, val])
}

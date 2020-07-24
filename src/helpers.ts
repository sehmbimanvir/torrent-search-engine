export const getSize = (size: string): number => {
  if (!size) {
    return 0
  }
  size = size.replace(',', '').toLowerCase()
  let sizeNum = parseFloat(size)
  let units = ['kb', 'mb', 'gb']
  for (let i = 0; i < units.length; i++) {
    sizeNum *= 1000

    if (size.includes(units[i])) {
      break
    }
  }
  return sizeNum
}
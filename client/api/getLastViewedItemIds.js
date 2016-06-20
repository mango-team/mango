const getLastViewedItemIds = ({views, itemType, take}) => {
  const sortedViews = views.filter(view => view.itemType === itemType).sort((c1, c2) => {
    const a = c1.importDate
    const b = c2.importDate
    return a > b ? -1 : a < b ? 1 : 0
  }).reverse()
  const results = []
  const matches = []

  for (let i = 0; i < sortedViews.length; i++) {
    if (matches.length === take) {
      break
    }

    const { itemId } = sortedViews[i]
    if (matches.indexOf(itemId) < 0) {
      matches.push(itemId)
      results.push(sortedViews[i])
    }
  }

  return results
}

export default getLastViewedItemIds

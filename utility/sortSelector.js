function sortSelector(sort) {
  /*方法一
  switch (sort) {
    case 'name_asc':
      return { name: 'asc' }
    case 'name_desc':
      return { name: 'desc' }
    case 'category_asc':
      return { category: 'asc' }
    case 'location_asc':
      return { location: 'asc' }
  } */

  //方法二
  if(!sort) { //若點擊首頁(無sort排序)，則不必往下執行，否則會出現錯誤
    return
  }
  const [property, sortBy] = sort.split('_')
  return { [property]: sortBy }
}

module.exports = sortSelector

//require express & express-Router()
const express = require('express')
const router = express.Router()
//require Restaurant model
const Restaurant = require('../../models/restaurant')

//搜尋功能
//1.關鍵字前後多打了空白鍵還是能搜到餐廳
//2.以餐廳地區或餐廳類別搜尋也是可行的
//3.搜尋欄未填入字串就搜尋時導回首頁
router.get('/', (req, res) => {

  //若未填入字串就按搜尋，則導回首頁
  if (!req.query.keyword) {
    return res.redirect("/")
  }

  //將使用者輸入的搜尋字串刪去前後空格、轉為小寫，並以keyword變數存下來
  const keyword = req.query.keyword.trim().toLowerCase()

  //從資料庫抓取所有餐廳資料，整理後，存入變數restaurantsData
  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      //過濾變數restaurantsData，將符合搜尋條件的餐廳資料存入變數filterRestaurantsData
      const filterRestaurantsData = restaurantsData.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.location.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      )

      //把keyword搜尋不到結果情況存起來
      const noMatchResult = !filterRestaurantsData.length

      //由index樣板根據變數filterRestaurantsData、keyword、noMatchResult渲染出HTML格式
      res.render("index", { restaurants: filterRestaurantsData, keyword, noMatchResult })
    })
    .catch(err => console.log(err))
})

//export router
module.exports = router
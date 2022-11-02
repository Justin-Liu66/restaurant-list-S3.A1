//require express & express-Router()
const express = require('express')
const router = express.Router()
//require Restaurant model
const Restaurant = require('../../models/restaurant')
const sortSelector = require('../../utility/sortSelector')


//define route of homepage (瀏覽全部餐廳)
router.get('/', (req, res) => {
  let sort = req.query.sort
  const userId = req.user._id
  Restaurant.find({ userId }) //取出Restaurant model裡的所有資料
    .lean()
    .sort(sortSelector(sort))
    .then(restaurants => res.render('index', { restaurants })) //把資料傳給index樣板
    .catch(err => console.log(err)) //錯誤處理
})

//export router
module.exports = router
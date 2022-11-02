//require express & express-Router()
const express = require('express')
const router = express.Router()
//require Restaurant model
const Restaurant = require('../../models/restaurant')

////route setting
//新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new') //渲染出新增餐廳頁面
})

//新增餐廳
router.post('/', (req, res) => {
  const userId = req.user._id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  //根據使用者所輸入的內容及userId，在資料庫中新增一筆餐廳資料
  Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/')) //重新導回首頁
    .catch(err => console.log(err))
})

//瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id //以id存取使用者點擊的餐廳
  return Restaurant.findOne({ _id, userId }) //從資料庫中找出該餐廳
    .lean() //整理資料
    .then((restaurant) => res.render('show', { restaurant })) //以該筆資料渲染show頁面
})

//修改特定餐廳資訊的頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id //以id存取使用者點擊欲修改的餐廳
  return Restaurant.findOne({ _id, userId }) //透過id從資料庫中找出該筆欲修改的餐廳資料
    .lean()
    .then((restaurant) => res.render('edit', { restaurant })) //使用edit為樣板，根據該餐廳資料製作出修改資訊頁
    .catch(err => console.log(err))
})

//修改特定餐廳資訊
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const body = req.body
  //透過id從資料庫中找出該筆欲修改的資料
  return Restaurant.findOne({ _id, userId })
    //將該筆資料重新賦值成使用者所輸入的內容
    .then(restaurant => {
      restaurant = Object.assign(restaurant, body)
      //資料庫存檔
      return restaurant.save()
    })
    //修改完成後重新導回"瀏覽該餐廳頁面"
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

//刪除特定一間餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id //存下使用者欲刪除的餐廳之id
  return Restaurant.findOneAndRemove({ _id, userId }) //根據id從資料庫中找出該餐廳資料並刪除
    .then(() => res.redirect('/')) //刪除完成後重新導回首頁
    .catch(err => console.log(err))
})

//export router
module.exports = router
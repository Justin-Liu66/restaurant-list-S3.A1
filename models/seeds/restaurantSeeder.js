const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')


const SEED_USER1 = {
  name: '',
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_USER2 = {
  name: '',
  email: 'user2@example.com',
  password: '12345678'
}

const SEED_USER = [SEED_USER1, SEED_USER2]

db.once('open', () => {
  for (let i = 0; i <= 1; i++) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      }))

      .then(user => {
        const userId = user._id
        for (let j = i * 3; j < (i + 1) * 3; j++) {
          restaurantList[j].userId = userId
        }
        return Promise.all(
          [Restaurant.create(restaurantList.slice(i * 3, (i + 1) * 3))]
        )
      })

      .then(() => {
        console.log('done.')
        process.exit()
      })
  }
})

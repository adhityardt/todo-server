const Users = require('../models/user.model.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  registerUser (req, res) {
    let password = req.body.password
    let role = 'user'
    Users
      .findOne({
        username: req.body.username
      })
      .then(function (userData) {
        let salt = bcryptjs.genSaltSync(10)
        let hash = bcryptjs.hashSync(password, salt)
        Users
          .create({
            username: req.body.username,
            fullname: req.body.fullname,
            password: hash,
            role: role
          })
          .then(function (result) {
            res.status(200).json({
              message: 'success register a new user',
              result: result
            })
          })
          .catch(function (err) {
            res.status(400).json({
              message: 'error when creating a new user',
              error: err
            })
          })
      })
  },
  deleteUserById (req, res) {
    Users.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(200).json({
          message: 'success delete User',
          result
        })
      })
      .catch(error => {
        res.status(error.status).json({
          error
        })
      })
  },
  loginUser (req, res) {
    Users
      .findOne({
        username: req.body.username
      })
      .then(function (userData) {
        if (!userData) {
          res.status(400).json({
            message: 'username is not registered'
          })
        } else {
          bcryptjs.compare(req.body.password, userData.password, function (err, result) {
            if (!result) {
              res.json({ message: 'incorrect username or password' })
            } else {
              let token = jwt.sign({
                id: userData._id,
                username: userData.username
              }, 'hacktiv8')
              res.json({
                message: 'Success Login',
                token: token,
                id: userData._id,
                fullname: userData.fullname,
                username: userData.username
              })
            }
          })
        }
      })
      .catch(function (err) {
        res.status(400).json({
          message: 'error when login user',
          error: err
        })
      })
  }
}

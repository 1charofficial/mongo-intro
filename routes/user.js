const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController.js')


router.get('/', userController.getSignup)

router.get.post('/signup', userController.postSignUp)

router.get('/login', userController.getLogIn)

router.post('/login', userController.postLogIn)

router.get('/profile', userController.getProfile)

router.post('/profile', userController.postProfile)



module.exports = router




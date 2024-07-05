import express from 'express'
import { signin, signup } from '../controllers/authController.js'
import { test } from '../controllers/userController.js'
const router=express.Router()


router.get('/test',test)
router.post('/signup',signup)
router.post('/signin',signin)

export default router
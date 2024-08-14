import * as dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import morgan from 'morgan'
import router from './router.js'
import {protectMiddleware} from './modules/auth.js'
import {createUser, signIn} from './handlers/user.js'
import {
  globalErrorHandlerMiddleware,
  handleExpressValidatorErrorsMiddleware,
} from './modules/middleware.js'
import {body} from 'express-validator'

const app = express()
const port = process.env.NODE_DOCKER_PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (_, response) => {
  response.status(200).send('Hello World!')
})

app.use('/api', protectMiddleware, router)
app.post(
  '/user',
  [
    body('name').isString().notEmpty(),
    body('password').isString().notEmpty(),
    handleExpressValidatorErrorsMiddleware,
  ],
  createUser,
)
app.post(
  '/signin',
  [
    body('name').isString().notEmpty(),
    body('password').isString().notEmpty(),
    handleExpressValidatorErrorsMiddleware,
  ],
  signIn,
)

app.use(globalErrorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})

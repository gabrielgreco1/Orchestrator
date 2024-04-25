import express from 'express'
import router from '../route/routes.js'

const app = express()

app.use('/automation/', router)

export default app

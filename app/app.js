import express from 'express'
import routerMultas from '../route/routesMultas.js'

const app = express()

app.use('/automation/multas', routerMultas)
// app.use('/automation/frotas', routerFrotas)
// app.use('/automation/financeiro', routerFin)

export default app

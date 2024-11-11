import fastify from 'fastify'
import { env } from './env'
import { transacionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.register(transacionsRoutes,{
  prefix: 'transactions'
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server runnig!🔥')
  })

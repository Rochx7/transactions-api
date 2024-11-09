import fastify from 'fastify'
import { env } from './env'
import { transacionsRoutes } from './routes/transactions'

const app = fastify()

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

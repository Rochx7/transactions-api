import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './databse'
import { env } from './env'

const app = fastify()

app.get('/', async() => {
  const transaction = await knex('transactions').where('amount', 1000).select('*')

  

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server runnig!🔥')
  })

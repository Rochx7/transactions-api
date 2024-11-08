import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './databse'

const app = fastify()

app.get('/', async() => {
  const transaction = await knex('transactions').where('amount', 1000).select('*')

  

  return transaction
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server runnig!🔥')
  })

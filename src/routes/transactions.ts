import { randomUUID } from "crypto"
import { FastifyInstance } from "fastify"

import { z } from "zod"
import { knex } from "../databse"

export async function transacionsRoutes(app: FastifyInstance){

  app.get('/', async()=>{
    const transactions = await knex('transactions').select()

    return {
      transactions
    }
  })

  app.get('/:id', async(req)=>{
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(req.params)
    const transaction = await knex('transactions').where('id', id).first()

    return {
      transaction
    }
  })

  app.get('/summary', async()=>{
    const summary = await knex('transactions').sum('amount', {as: 'amount'}).first()

    return {
      summary
    }
  })

  app.post('/', async(req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })
    const { title, amount, type } = createTransactionBodySchema.parse(req.body)
    
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })
    
    return reply.status(201).send()
  })
}
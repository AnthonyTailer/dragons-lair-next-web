import { NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite'

export default async function userById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./dragons.sqlite')

  switch (req.method) {
    case 'GET': {
      const { id } = req.query

      if (!id) {
        res.status(422).json({
          message: 'The User is required'
        })
      }

      const user = await db.get(
        'SELECT id, name, email FROM user WHERE id = ?',
        [id]
      )

      if (!user) {
        res.status(422).json({
          message: 'Invalid data! Please verify your request'
        })
      }

      res.status(201).json({ user })

      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

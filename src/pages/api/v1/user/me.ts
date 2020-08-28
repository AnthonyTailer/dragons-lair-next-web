import { NextApiResponse, NextApiRequest } from 'next'
import { authenticated } from './[uid]/dragon'
import sqlite from 'sqlite'

export default authenticated(async function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./dragons.sqlite')

  const { method, body } = req

  switch (method) {
    case 'GET': {
      const decodedUser = body?.decodedToken

      if (!decodedUser) {
        res.status(422).json({
          message: 'Invalid data'
        })
      } else {
        try {
          const user = await db.get(
            'SELECT id, name, email FROM user WHERE id = ?',
            [decodedUser.sub]
          )

          res.status(200).json({ user: user })
        } catch (e) {
          res.status(401).json({ message: 'Unauthorized' })
        }
      }

      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
})

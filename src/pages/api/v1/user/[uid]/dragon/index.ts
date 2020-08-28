import { verify } from 'jsonwebtoken'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite'
const secret = '0e900be1-0ac5-4e6a-bf4b-38f8b21a189b'

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!req.headers.authorization) {
      throw new Error()
    }

    const [, token] = req.headers.authorization.split(' ')
    const decodedToken = verify(token, secret)

    if (decodedToken) {
      req.body = { ...req.body, decodedToken }
      return await fn(req, res)
    }
  } catch (err) {
    res.status(401).json({ message: 'Sorry you are not authenticated' })
  }
}

export default authenticated(async function dragon(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./dragons.sqlite')

  const { method, body } = req

  switch (method) {
    case 'GET': {
      try {
        const decodedUser = body?.decodedToken

        if (!decodedUser) {
          res.status(422).json({
            message: 'Invalid data'
          })
        } else {
          const userDragons = await db.all(
            'SELECT id, name, type, createdAt FROM dragon WHERE ownerId = ?',
            [decodedUser.sub]
          )

          console.log('USER DRAGONS --> ', userDragons)

          res.status(200).json({ dragons: userDragons })
        }
      } catch (e) {
        res.status(500).json({ message: e?.message })
      }
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
})

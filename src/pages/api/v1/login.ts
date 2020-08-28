import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import sqlite from 'sqlite'
const secret = '0e900be1-0ac5-4e6a-bf4b-38f8b21a189b'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open('./dragons.sqlite')

  switch (req.method) {
    case 'POST': {
      const { email, password } = req.body

      if (!email || !password) {
        res.status(422).json({
          message: 'The E-mail and Password fields are required'
        })
        return
      }

      const user = await db.get(
        'SELECT id, name, email, password FROM user WHERE email = ?',
        [email]
      )

      console.log({ user })

      if (!user) {
        res.status(422).json({
          message: 'Invalid data! Please verify the Name and Password fields'
        })
        return
      }

      compare(password, user.password, function (err, result) {
        if (!err && result) {
          const claims = { sub: user.id, userEmail: user.email }
          const jwt = sign(claims, secret, {
            expiresIn: '1h'
          })
          res.json({
            authToken: jwt,
            user: { id: user.id, name: user.name, email: user.email }
          })
        } else {
          res.status(422).json({
            message: 'Invalid data! Please verify the Name and Password fields'
          })
        }
      })
      break
    }
    default: {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

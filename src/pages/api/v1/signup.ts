import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite'

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./dragons.sqlite')

  switch (req.method) {
    case 'POST': {
      const { name, email, password } = req.body

      if (!email || !password || !name) {
        res.status(422).json({
          message: 'The Name, E-mail and Password fields are required'
        })
        return
      }

      const user = await db.get(
        'SELECT id, name, email FROM user WHERE email = ?',
        [email]
      )

      if (user) {
        res.status(422).json({
          message: 'E-mail already used'
        })
        return
      }

      try {
        const hashPass = await hash(password, 12)
        const statement = await db.prepare(
          'INSERT INTO user (name, email, password) values (?, ?, ?)'
        )
        const result = await statement.run(name, email, hashPass)
        result.finalize()

        const user = await db.get(
          'SELECT id, name, email FROM user WHERE name = ? AND email = ?',
          [name, email]
        )
        res.status(201).json({ user, message: 'User created sucessfully' })
      } catch (e) {
        res.status(500).json({
          message: 'Internal Server Error',
          e
        })
      }
      break
    }
    default: {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

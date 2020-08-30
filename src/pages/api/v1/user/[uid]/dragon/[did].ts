import { NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite'
import { authenticated } from '.'

export default authenticated(async function dragonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open('./dragons.sqlite')

  switch (req.method) {
    case 'GET': {
      const { uid, did } = req.query

      if (!uid) {
        res.status(422).json({
          message: 'The User is required'
        })
        return
      }

      if (!did) {
        res.status(422).json({
          message: 'The Dragon is required'
        })
        return
      }

      const dragon = await db.get(
        'SELECT * FROM dragon WHERE ownerId = ? AND id = ?',
        [uid, did]
      )

      if (!dragon) {
        res.status(422).json({
          message: 'Invalid data! Please verify your request'
        })
      }

      res.status(200).json({ dragon })

      break
    }
    case 'PUT': {
      try {
        const { uid, did } = req.query
        const { name, type, description, avatarUrl } = req.body

        if (!uid) {
          res.status(422).json({
            message: 'The User is required'
          })
          return
        }

        if (!did) {
          res.status(422).json({
            message: 'The Dragon is required'
          })
          return
        }

        if (!name || !type) {
          res.status(422).json({
            message: 'Invalid data'
          })
        } else {
          const updatedDragon = await db.run(
            `UPDATE dragon SET 
                name = ?,
                type = ?,
                description = ?,
                avatarUrl = ?,
                updatedAt = datetime('now', 'localtime')
              WHERE id = ? AND ownerId = ?
            `,
            [name, type, description, avatarUrl, did, uid]
          )

          res.status(200).json({ dragon: updatedDragon })
        }
      } catch (e) {
        res.status(500).json({ message: e?.message })
      }
      break
    }
    case 'DELETE': {
      try {
        const { uid, did } = req.query

        if (!uid) {
          res.status(422).json({
            message: 'The User is required'
          })
          return
        }

        if (!did) {
          res.status(422).json({
            message: 'The Dragon is required'
          })
          return
        }

        const deletedDragon = await db.run(
          'DELETE FROM dragon WHERE ownerId = ? AND id = ?',
          [uid, did]
        )

        res.status(200).json({ dragon: deletedDragon })
      } catch (e) {
        res.status(500).json({ message: e?.message })
      }
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
})

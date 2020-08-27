/* eslint-disable @typescript-eslint/no-var-requires */
const sqlite = require('sqlite')

async function setup() {
  try {
    const db = await sqlite.open('./dragons.sqlite')
    await db.migrate({ force: 'last' })

    const user = await db.all('SELECT * FROM user')
    console.log('ALL USERS', JSON.stringify(user, null, 2))

    const dragons = await db.all('SELECT * FROM dragon WHERE ownerId = 1')
    console.log('ALL USER DRAGONS', JSON.stringify(dragons, null, 2))
  } catch (e) {
    console.log(e)
  }
}

setup()

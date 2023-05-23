import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: {email: 'test@test.com'},
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password: ''
    },
  })
  console.log({user})
}
main()
  .then(() => prisma.sdisconnet())
  .catch(async (e) => {
    console.error(e)
    await prisma.sdisconnect()
    process.exit(1)
  })
import { hash } from "bcrypt"
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from "uuid"

const prisma = new PrismaClient()

async function main() {
  const id = uuid();
  const password = await hash("ven", 8);

  const createRoles = await prisma.roles.create({
    data: {
      name: "Admin"
    },
  })

  const createPermissions = await prisma.permissions.create({
    data: {
      key: "cms.news"
    }
  })

  const userVenSoftware = await prisma.user.create({
    data: {
      uuid: id,
      password,
      email: "vensoftware@info.pt",
      firstName: "VEN",
      active: true,
      roles: {
        connect: { id: createRoles.id }
      },
      permissions: {
        connect: {
          id: createPermissions.id
        }
      }
    },
  })

  console.log('created permissions: ', { createPermissions });
  console.log('created roles: ', { createRoles });
  console.log('created user: ', { userVenSoftware })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

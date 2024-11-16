import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPermission = await prisma.permission.create({
    data: {
      name: 'Admin',
      description:
        'Permissão para administrar artigos e usuários. Ações: Ler, Criar, Editar e Apagar artigos e usuários.',
    },
  });

  await prisma.permission.create({
    data: {
      name: 'Editor',
      description:
        'Permissão para administrar artigos. Ações: Ler, Criar, Editar e Apagar artigos.',
    },
  });

  await prisma.permission.create({
    data: {
      name: 'Reader',
      description: 'Permissão para apenas ler artigos. Ações: Ler artigos.',
    },
  });

  const hashedPassword = await bcrypt.hash('root@1234', 10);
  await prisma.user.create({
    data: {
      name: 'Root User',
      email: 'root@example.com',
      password: hashedPassword,
      permissionId: adminPermission.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

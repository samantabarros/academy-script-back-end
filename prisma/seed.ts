import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usuario = await prisma.usuario.create({
    data: {
      "email": "admin@gmail.com",
      "senha": "$2b$10$3JEcQYwkwgtT1sM0pwQn.eLRfDYZQR1YVP3JGZr.d0VCkog6YQ3oe"
    }
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})
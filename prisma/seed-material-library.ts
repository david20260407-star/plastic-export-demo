import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating product images...')

  // Update one by one to avoid issues
  const updates = [
    { code: 'PP-HOM-INJ', image: '/images/materials/fQpj07ofs.jpeg' },
    { code: 'PP-COP-IMP', image: '/images/materials/fQpj07ofs.jpeg' },
    { code: 'HDPE-INJ', image: '/images/materials/fQpj07ofs.jpeg' },
    { code: 'LDPE-FILM', image: '/images/materials/fQpj07ofs.jpeg' },
    { code: 'GPPS-GP', image: '/images/materials/fQpjEh0ES.jpeg' },
    { code: 'HIPS-IMP', image: '/images/materials/fQpjEh0ES.jpeg' },
    { code: 'ABS-GP', image: '/images/materials/fQpjQf1nH.jpeg' },
    { code: 'POM-COP', image: '/images/materials/fQpjQf1nH.jpeg' },
    { code: 'PA66-UNF', image: '/images/materials/fQpjc3ROR.jpeg' },
    { code: 'PA66-GF30', image: '/images/materials/fQpjc3ROR.jpeg' },
    { code: 'PBT-UNF', image: '/images/materials/fQpjc3ROR.jpeg' },
    { code: 'PBT-GF30', image: '/images/materials/fQpjc3ROR.jpeg' },
    { code: 'PC-GP', image: '/images/materials/fQpjnJy0O.jpeg' },
    { code: 'PET-BOTTLE', image: '/images/materials/fQpjnJy0O.jpeg' },
    { code: 'PMMA-GP', image: '/images/materials/fQpjnJy0O.jpeg' },
  ]

  for (const u of updates) {
    await prisma.product.updateMany({
      where: { code: u.code },
      data: { image: u.image },
    })
    console.log(`Updated ${u.code}`)
  }

  console.log('All product images updated!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
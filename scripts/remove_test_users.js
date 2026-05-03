const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Load .env manually if dotenv is not available
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const prisma = new PrismaClient();

async function main() {
  console.log('Searching for test users to remove...');
  const where = {
    email: {
      contains: 'deploy',
      endsWith: '@example.com',
    },
  };

  const found = await prisma.user.findMany({ where, select: { id: true, email: true } });
  if (!found.length) {
    console.log('No matching test users found.');
    return;
  }

  console.log(`Found ${found.length} users:`);
  found.forEach(u => console.log(`- ${u.email} (id: ${u.id})`));

  const deleted = await prisma.user.deleteMany({ where });
  console.log(`Deleted ${deleted.count} users.`);
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

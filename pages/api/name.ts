import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;

    // Save the name in the database
    const newName = await prisma.name.create({
      data: { name },
    });

    res.status(200).json(newName);
  } else if (req.method === 'GET') {
    // Fetch the most recent name
    const recentName = await prisma.name.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(recentName);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

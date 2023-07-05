import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { workValidationSchema } from 'validationSchema/works';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.work
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWorkById();
    case 'PUT':
      return updateWorkById();
    case 'DELETE':
      return deleteWorkById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWorkById() {
    const data = await prisma.work.findFirst(convertQueryToPrismaUtil(req.query, 'work'));
    return res.status(200).json(data);
  }

  async function updateWorkById() {
    await workValidationSchema.validate(req.body);
    const data = await prisma.work.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWorkById() {
    const data = await prisma.work.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

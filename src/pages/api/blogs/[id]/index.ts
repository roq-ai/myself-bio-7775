import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { blogValidationSchema } from 'validationSchema/blogs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.blog
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBlogById();
    case 'PUT':
      return updateBlogById();
    case 'DELETE':
      return deleteBlogById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBlogById() {
    const data = await prisma.blog.findFirst(convertQueryToPrismaUtil(req.query, 'blog'));
    return res.status(200).json(data);
  }

  async function updateBlogById() {
    await blogValidationSchema.validate(req.body);
    const data = await prisma.blog.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBlogById() {
    const data = await prisma.blog.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

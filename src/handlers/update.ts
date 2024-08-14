import {type User, type Update} from '@prisma/client'
import {type Request, type Response} from 'express'
import prisma from '../modules/db.js'
import {NotFoundError} from '../modules/error.js'

export const getUpdates = async (
  request: Request & {user: User},
  response: Response,
) => {
  const allUpdates = await prisma.update.findMany({
    where: {
      product: {
        userId: request.user.id,
      },
    },
  })

  response.json({data: allUpdates})
}

export const getUpdateById = async (
  request: Request & {user: User},
  response: Response,
) => {
  const foundUpdate = await prisma.update.findUnique({
    where: {
      id: request.params.id,
    },
  })
  if (!foundUpdate) {
    throw new NotFoundError('Update not found')
  }

  response.json({data: foundUpdate})
}

export const createUpdate = async (
  request: Request & {user: User},
  response: Response,
) => {
  const body = request.body as Update

  const foundProduct = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: body.productId,
        userId: request.user.id,
      },
    },
  })
  if (!foundProduct) {
    throw new NotFoundError('Product not found')
  }

  const createdUpdate = await prisma.update.create({
    data: {
      asset: body.asset,
      title: body.title,
      status: body.status,
      content: body.content,
      version: body.version,
      productId: body.productId,
    },
  })

  response.json({data: createdUpdate})
}

export const updateUpdate = async (
  request: Request & {user: User},
  response: Response,
) => {
  const body = request.body as Update

  const foundUpdate = await prisma.update.findUnique({
    where: {
      id: request.params.id,
      product: {
        userId: request.user.id,
      },
    },
  })
  if (!foundUpdate) {
    throw new NotFoundError('Update not found')
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: request.params.id,
      product: {
        userId: request.user.id,
      },
    },
    data: body,
  })

  response.json({data: updatedUpdate})
}

export const deleteUpdate = async (
  request: Request & {user: User},
  response: Response,
) => {
  const foundUpdate = await prisma.update.findUnique({
    where: {
      id: request.params.id,
      product: {
        userId: request.user.id,
      },
    },
  })
  if (!foundUpdate) {
    throw new NotFoundError('Update not found')
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: request.params.id,
      product: {
        userId: request.user.id,
      },
    },
  })

  response.json({data: deletedUpdate})
}

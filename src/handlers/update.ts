import {type Product, type User, type Update} from '@prisma/client'
import {type Request, type Response} from 'express'
import prisma from '../modules/db.js'

export const getUpdatesForAllProducts = async (
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
  const foundUpdate = await prisma.update.findUniqueOrThrow({
    where: {
      id: request.params.id,
    },
  })

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
    response.status(404).json({error: 'Product not found'})
    return
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
    response.status(404).json({error: 'Update not found'})
    return
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
    response.status(404).json({error: 'Update not found'})
    return
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

import {type Product, type User} from '@prisma/client'
import {type Request, type Response} from 'express'
import prisma from '../modules/db.js'

export const getProducts = async (
  request: Request & {user: User},
  response: Response,
) => {
  const foundUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: request.user.id,
    },
    include: {
      products: true,
    },
  })

  response.json({data: foundUser.products})
}

export const getProductById = async (
  request: Request & {user: User},
  response: Response,
) => {
  const foundProduct = await prisma.product.findUniqueOrThrow({
    where: {
      id_userId: {
        id: request.params.id,
        userId: request.user.id,
      },
    },
  })

  response.json({data: foundProduct})
}

export const createProduct = async (
  request: Request & {user: User},
  response: Response,
) => {
  const createdProduct = await prisma.product.create({
    data: {
      userId: request.user.id,
      name: (request.body as Product).name,
    },
  })

  response.json({data: createdProduct})
}

export const updateProduct = async (
  request: Request & {user: User},
  response: Response,
) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id_userId: {
        id: request.params.id,
        userId: request.user.id,
      },
    },
    data: {
      name: (request.body as Product).name,
    },
  })

  response.json({data: updatedProduct})
}

export const deleteProduct = async (
  request: Request & {user: User},
  response: Response,
) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id_userId: {
        id: request.params.id,
        userId: request.user.id,
      },
    },
  })

  response.json({data: deletedProduct})
}

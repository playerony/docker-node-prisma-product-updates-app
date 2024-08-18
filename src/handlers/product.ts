import {type Product, type User} from '@prisma/client'
import {type NextFunction, type Request, type Response} from 'express'
import prisma from '../modules/db.js'
import {NotFoundError} from '../modules/error.js'

export const getProducts = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: request.user.id,
      },
    })

    response.json({data: products})
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const foundProduct = await prisma.product.findUnique({
      where: {
        id_userId: {
          id: request.params.id,
          userId: request.user.id,
        },
      },
    })
    if (!foundProduct) {
      throw new NotFoundError('Product not found')
    }

    response.json({data: foundProduct})
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const createdProduct = await prisma.product.create({
      data: {
        userId: request.user.id,
        name: (request.body as Product).name,
      },
    })

    response.json({data: createdProduct})
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id_userId: {
          id: request.params.id,
          userId: request.user.id,
        },
      },
    })

    response.json({data: deletedProduct})
  } catch (error) {
    next(error)
  }
}

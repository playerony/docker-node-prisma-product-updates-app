import {type User, type Update} from '@prisma/client'
import {type NextFunction, type Request, type Response} from 'express'
import prisma from '../modules/db.js'
import {NotFoundError} from '../modules/error.js'

export const getUpdates = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const allUpdates = await prisma.update.findMany({
      where: {
        product: {
          userId: request.user.id,
        },
      },
    })

    response.json({data: allUpdates})
  } catch (error) {
    next(error)
  }
}

export const getUpdateById = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const foundUpdate = await prisma.update.findUnique({
      where: {
        id: request.params.id,
      },
    })
    if (!foundUpdate) {
      throw new NotFoundError('Update not found')
    }

    response.json({data: foundUpdate})
  } catch (error) {
    next(error)
  }
}

export const createUpdate = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

export const updateUpdate = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

export const deleteUpdate = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

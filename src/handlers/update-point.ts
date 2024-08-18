import {type UpdatePoint, type User} from '@prisma/client'
import {type NextFunction, type Request, type Response} from 'express'
import prisma from '../modules/db.js'
import {NotFoundError} from '../modules/error.js'

export const getUpdatePoints = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const allUpdatePoints = await prisma.updatePoint.findMany({
      where: {
        update: {
          product: {
            userId: request.user.id,
          },
        },
      },
    })

    response.json({data: allUpdatePoints})
  } catch (error) {
    next(error)
  }
}

export const getUpdatePointById = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const foundUpdate = await prisma.updatePoint.findUnique({
      where: {
        id: request.params.id,
        AND: {
          update: {
            product: {
              userId: request.user.id,
            },
          },
        },
      },
    })
    if (!foundUpdate) {
      throw new NotFoundError('Update point not found')
    }

    response.json({data: foundUpdate})
  } catch (error) {
    next(error)
  }
}

export const createUpdatePoint = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const body = request.body as UpdatePoint

    const foundUpdate = await prisma.update.findUnique({
      where: {
        id: body.updateId,
        product: {
          userId: request.user.id,
        },
      },
    })
    if (!foundUpdate) {
      throw new NotFoundError('Update not found')
    }

    const createdUpdatePoint = await prisma.updatePoint.create({
      data: {
        name: body.name,
        updateId: body.updateId,
        description: body.description,
      },
    })

    response.json({data: createdUpdatePoint})
  } catch (error) {
    next(error)
  }
}

export const updateUpdatePoint = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const body = request.body as UpdatePoint

    const foundUpdatePoint = await prisma.updatePoint.findUnique({
      where: {
        id: request.params.id,
        AND: {
          update: {
            product: {
              userId: request.user.id,
            },
          },
        },
      },
    })
    if (!foundUpdatePoint) {
      throw new NotFoundError('Update point not found')
    }

    const updatedUpdatePoint = await prisma.updatePoint.update({
      where: {
        id: request.params.id,
        AND: {
          update: {
            product: {
              userId: request.user.id,
            },
          },
        },
      },
      data: body,
    })

    response.json({data: updatedUpdatePoint})
  } catch (error) {
    next(error)
  }
}

export const deleteUpdatePoint = async (
  request: Request & {user: User},
  response: Response,
  next: NextFunction,
) => {
  try {
    const foundUpdatePoint = await prisma.updatePoint.findUnique({
      where: {
        id: request.params.id,
        AND: {
          update: {
            product: {
              userId: request.user.id,
            },
          },
        },
      },
    })
    if (!foundUpdatePoint) {
      throw new NotFoundError('Update point not found')
    }

    const deletedUpdate = await prisma.updatePoint.delete({
      where: {
        id: request.params.id,
        AND: {
          update: {
            product: {
              userId: request.user.id,
            },
          },
        },
      },
    })

    response.json({data: deletedUpdate})
  } catch (error) {
    next(error)
  }
}

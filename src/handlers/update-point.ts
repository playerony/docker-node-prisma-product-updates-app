import {type UpdatePoint, type User} from '@prisma/client'
import {type Request, type Response} from 'express'
import prisma from '../modules/db.js'

export const getUpdatePoints = async (
  request: Request & {user: User},
  response: Response,
) => {
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
}

export const getUpdatePointById = async (
  request: Request & {user: User},
  response: Response,
) => {
  const foundUpdate = await prisma.updatePoint.findUniqueOrThrow({
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

  response.json({data: foundUpdate})
}

export const createUpdatePoint = async (
  request: Request & {user: User},
  response: Response,
) => {
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
    response.status(404).json({error: 'Update not found'})
    return
  }

  const createdUpdatePoint = await prisma.updatePoint.create({
    data: {
      name: body.name,
      updateId: body.updateId,
      description: body.description,
    },
  })

  response.json({data: createdUpdatePoint})
}

export const updateUpdatePoint = async (
  request: Request & {user: User},
  response: Response,
) => {
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
    response.status(404).json({error: 'Update not found'})
    return
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
}

export const deleteUpdatePoint = async (
  request: Request & {user: User},
  response: Response,
) => {
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
    response.status(404).json({error: 'Update point not found'})
    return
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
}

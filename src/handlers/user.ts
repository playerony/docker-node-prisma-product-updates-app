import type {NextFunction, Request, Response} from 'express'
import {type User} from '@prisma/client'
import type * as core from 'express-serve-static-core'
import {comparePassword, createToken, hashPassword} from '../modules/auth.js'
import prisma from '../modules/db.js'
import {UnauthorizedError} from '../modules/error.js'

export const createUser = async (
  request: Request<core.ParamsDictionary, any, User>,
  response: Response,
  next: NextFunction,
) => {
  try {
    const hasedPassword = await hashPassword(request.body.password)

    const user = await prisma.user.create({
      data: {
        name: request.body.name,
        password: hasedPassword,
      },
    })
    const token = createToken({id: user.id, name: user.name})

    response.json({token})
  } catch (error) {
    next(error)
  }
}

export const signIn = async (
  request: Request<core.ParamsDictionary, any, User>,
  response: Response,
  next: NextFunction,
) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        name: request.body.name,
      },
    })
    if (!foundUser) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const isPasswordValid = await comparePassword(
      request.body.password,
      foundUser.password,
    )
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = createToken({id: foundUser.id, name: foundUser.name})

    response.json({token})
  } catch (error) {
    next(error)
  }
}

import { comparePassword, createToken, hashPassword } from '../modules/auth';
import prisma from '../modules/db';

export const createUser = async (request, response) => {
  const hasedPassword = await hashPassword(request.body.password);

  const user = await prisma.user.create({
    data: {
      name: request.body.name,
      password: hasedPassword,
    },
  });

  const token = createToken({ id: user.id, name: user.name });

  response.json({ token });
}

export const signIn = async (request, response) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      name: request.body.name,
    },
  });

  if (!foundUser) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await comparePassword(request.body.password, foundUser.password);

  if (!isPasswordValid) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }

  const token = createToken({ id: foundUser.id, name: foundUser.name });

  response.json({ token });
}

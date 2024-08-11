import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const createToken = ({ id, name }) => {
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
}

export const protectMiddleware = (request, response, next) => {
  const fullToken = request.headers.authorization;

  if (!fullToken) {
    return response.status(401).send('Unauthorized');
  }

  const [prefix, token] = fullToken.split(' ');
  if (prefix !== 'Bearer') {
    return response.status(401).send('Unauthorized');
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    request.user = tokenPayload;
    next();
  } catch (error) {
    return response.status(401).send('Unauthorized');
  }
}

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
}

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
}

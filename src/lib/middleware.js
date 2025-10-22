import { auth } from './auth';

export async function authMiddleware(request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    throw new Error('No authorization header');
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = await auth.verifyToken(token);
    request.user = decoded;
    return true;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
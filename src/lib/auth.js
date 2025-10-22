import { query } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = {
  async login(email, password) {
    const { rows } = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user, token };
  },

  async register(userData) {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    
    const { rows } = await query(
      `INSERT INTO users (
        email,
        password_hash,
        name,
        role,
        created_at
      ) VALUES ($1, $2, $3, $4, NOW())
      RETURNING *`,
      [userData.email, passwordHash, userData.name, userData.role]
    );

    const user = rows[0];
    delete user.password_hash;

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user, token };
  },

  async verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};
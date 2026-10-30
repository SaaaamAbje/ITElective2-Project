import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
// Fixed import path to match your root models directory
const db = require(path.join(__dirname, '../../models/index.cjs'));
const { User } = db;

export const register = async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;
    const userEmail = email || username;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    if (!userEmail) {
      return res.status(400).json({ error: 'Email or Username is required' });
    }

    const existingUser = await User.findOne({ where: { email: userEmail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save using passwordHash or password based on available model attribute
    const userData = {
      email: userEmail,
      role: role || 'member'
    };

    if ('passwordHash' in User.rawAttributes) {
      userData.passwordHash = hashedPassword;
    } else if ('password_hash' in User.rawAttributes) {
      userData.password_hash = hashedPassword;
    } else {
      userData.password = hashedPassword;
    }

    const user = await User.create(userData);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const userEmail = email || username;

    if (!userEmail) {
      return res.status(400).json({ error: 'Email or Username is required' });
    }

    const user = await User.findOne({ where: { email: userEmail } });
    const invalidAuthMessage = { error: 'Invalid email or password' };

    if (!user) {
      return res.status(401).json(invalidAuthMessage);
    }

    // Retrieve the hashed password from whatever attribute name the User model uses
    const storedHash = user.password || user.passwordHash || user.password_hash;

    if (!storedHash) {
      return res.status(500).json({ error: 'Password field missing on user model' });
    }

    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      return res.status(401).json(invalidAuthMessage);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};
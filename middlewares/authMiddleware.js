import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by the decoded token's userId
    req.user = await userModel.findById(decoded.userId);

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Continue to the next middleware if everything is fine
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(401).json({ message: error.message || 'Invalid token' }); // Return a meaningful error message
  }
};

export default userAuth;

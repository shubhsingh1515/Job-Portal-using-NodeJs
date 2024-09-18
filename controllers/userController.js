import userModel from '../models/userModel.js'; 
import bcrypt from 'bcrypt';

export const updateUserController = async (req, res, next) => {
  try {
    const { name, email, lastname, password } = req.body;
    if (!name || !email || !lastname || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.lastname = lastname;
    user.password = await bcrypt.hash(password, 10); 

    await user.save();

    const token = user.createJWT(); 

    res.json({
      success: true,
      message: 'User updated successfully',
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

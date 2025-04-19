
import { HTTP_CODES } from '../../../utils/httpCodes';
import { ErrorMessages  } from '../../../utils/errorMessage';
import {User,IUser } from '../models/user';

export const authService = {
  signup: async (email: string, password: string, name: string): Promise<any> => {
    console.log("checking for existing user");

    const existing = await User.findOne({ email });
    if (existing) throw new Error(ErrorMessages.USER_ALREADY_EXISTS);
    console.log("user already exists");
    const user = new User({ email, password, name });
    await user.save();
    console.log("user saved");
    // const token = generateToken({ id: user._id, role: user.role });
    // res.status(HTTP_CODES.CREATED).json({ token });
    // return res.status(HTTP_CODES.CREATED).json({ user });
    return user;
  },

  login: async (email: string, password: string): Promise<any> => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error(ErrorMessages.INVALID_CREDENTIALS);
    }
    return user;
  },
};
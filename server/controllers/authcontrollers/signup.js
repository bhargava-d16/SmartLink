import UserModel from "../../models/users.js";
import bcrypt from "bcrypt";
import joi from "joi";
import generateToken from "../../libs/utils.js";

const registerUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);

  if (validationError) {
    return res
      .status(400)
      .json({ message: validationError.details[0].message });
  }
  const {email, password } = req.body;
  try {
    const formattedEmail = email.toLowerCase();
    const existingUser = await UserModel.findOne({
      email: formattedEmail,
    });
    if (existingUser) {
      return res.status(400).json({ message: "This user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email: formattedEmail,
      password: hashedPassword,
    });
    const token=generateToken(newUser._id, res);
    await newUser.save();
    res
      .status(200)
      .json({
        token,
        newUser,
        message: "User registered successfully",
      });
  } catch (err) {
    next(err);
  }
};
export default registerUser;

function validateUser(data) {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(12).required(),
  });
  return userSchema.validate(data);
}

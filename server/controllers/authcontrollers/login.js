import UserModel from "../../models/users.js";
import bcrypt from "bcrypt";
import joi from "joi";
import generateToken from "../../libs/utils.js";

const loginUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);

  if (validationError) {
    return res
      .status(400)
      .json({ message: validationError.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const formattedEmail = email.toLowerCase();
    const isUser = await UserModel.findOne({ email: formattedEmail });
    if (!isUser) {
      return res.status(400).json({ message: "The user does not exist" });
    }
    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect pasword" });
    }
   const token= generateToken(isUser._id, res);
    res
      .status(200)
      .json({
        token,
        message: "Login successfull",
        status: true,
        isUser,
      });
  } catch (err) {
    next(err);
  }
};

export default loginUser;

function validateUser(data) {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(12).required(),
  });
  return userSchema.validate(data);
}

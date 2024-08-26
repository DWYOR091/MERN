const Users = require("../../api/v1/users/model");
const { Unauthorized, BadRequestError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError(`Please provided email and password!`);
  const result = await Users.findOne({ email });
  if (!result) throw new Unauthorized(`Invalid credentials!`);
  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) throw new Unauthorized(`Invalid credentials!`);

  const token = createJWT({ payload: createTokenUser(result) });
  return token;
};

module.exports = { signin };

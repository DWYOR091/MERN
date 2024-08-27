const Organizers = require("../../api/v1/organizers/model");
const Users = require("../../api/v1/users/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, name, email, password, confirmPassword, role } = req.body;

  //cek pw
  if (password !== confirmPassword)
    throw new BadRequestError(`Password dan confirm password tidak sama!`);

  const response = await Organizers.create({ organizer });

  const user = await Users.create({
    name,
    email,
    password,
    role,
    organizer: response._id,
  });
  delete user._doc.password;

  return user;
};

const createUser = async (req) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const { organizer } = req.user;
  //cek pw
  if (password !== confirmPassword)
    throw new BadRequestError(`Password dan confirm password tidak sama!`);

  const user = await Users.create({
    name,
    email,
    password,
    role,
    organizer: organizer,
  });
  delete user._doc.password;

  return user;
};

const getAllUsers = async () => {
  const response = Users.find().populate("organizer");

  return response;
};

module.exports = { createOrganizer, createUser, getAllUsers };

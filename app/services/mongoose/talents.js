const Talents = require("../../api/v1/talents/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingImage } = require("./image");

const getAllTalents = async (req) => {
  const { keyword } = req.query;
  let condition = { organizer: req.user.organizer };
  if (keyword)
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };

  const response = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return response;
};

const getOneTalent = async (req) => {
  const { id } = req.params;
  const response = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!response) throw new NotFoundError(`Tidak ada talent dengan id: ${id}`);

  return response;
};

const createTalent = async (req) => {
  const { name, role, image } = req.body;
  //cek id img
  await checkingImage(image);

  //cek name duplikat
  const check = await Talents.findOne({ name, organizer: req.user.organizer });
  if (check) throw new BadRequestError(`Name talent sudah ada!`);

  const response = await Talents.create({
    name,
    role,
    image,
    organizer: req.user.organizer,
  });
  return response;
};

const updateTalent = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;
  checkingImage(image);
  //cek name
  const check = await Talents.findOne({
    name: { $regex: name, $options: "i" },
    organizer: req.user.organizer,
    _id: { $ne: id },
  });
  if (check) throw new BadRequestError(`Nama talent sudah ada!`);

  const response = await Talents.findByIdAndUpdate(
    id,
    { name, role, image, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );
  if (!response) throw new NotFoundError(`tidak ada talent dengan id: ${id}`);
  return response;
};

const deleteTalent = async (req) => {
  const { id } = req.params;
  const response = await Talents.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!response) throw new NotFoundError(`tidak ada talent dengan id: ${id}`);

  return response;
};

const checkingTalent = async (id) => {
  const response = await Talents.findOne({ _id: id });
  if (!response) throw new NotFoundError(`tidak ada talent dengan id: ${id}`);
  return response;
};
module.exports = {
  getAllTalents,
  getOneTalent,
  createTalent,
  updateTalent,
  deleteTalent,
  checkingTalent,
};

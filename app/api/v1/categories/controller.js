const Categories = require("./model");

const index = async (req, res, next) => {
  try {
    const response = await Categories.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Categories.findOne({ _id: id });
    if (!response) return res.status(404).json({ msg: "data not found" });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await Categories.create({ name });
    res.status(201).json({
      msg: "Categories created",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const response = await Categories.findByIdAndUpdate(
      id,
      { name },
      { new: true, rundValidators: true }
    );
    res.status(200).json({
      msg: "Categories updated",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Categories.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Categories deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  find,
  create,
  update,
  destroy,
};

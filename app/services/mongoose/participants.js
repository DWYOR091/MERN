const Participants = require("../../api/v1/participants/model");
const Events = require("../../api/v1/events/model");
const Orders = require("../../api/v1/orders/model");
const Payments = require("../../api/v1/payments/model");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../../errors");
const { otpMail, invoiceMail } = require("../mail");
const { createJWT, createTokenParticipant } = require("../../utils");
const { checkingEvent } = require("./events");

const signupParticipants = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;
  const otp = Math.floor(Math.random() * 9999) + 1000;

  let result = await Participants.findOne({ email, status: "tidak aktif" });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.email = email;
    result.password = password; // Password akan di-hash di middleware
    result.role = role;
    result.otp = otp;
    await result.save();
  } else {
    result = await Participants.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp,
    });
  }

  await otpMail(email, result);

  // Menggunakan `toObject()` agar hasilnya berupa objek JavaScript biasa
  result = result.toObject();

  // Menghapus properti sensitif
  delete result.password;
  delete result.otp;

  return result;
};

const activateParticipants = async (req) => {
  const { email, otp } = req.body;
  const check = await Participants.findOne({ email });
  if (!check) throw new BadRequestError(`Participant belum terdaftar!`);
  if (check && check.otp !== otp)
    throw new BadRequestError(`Kode OTP yang dimasukan salah!`);
  console.log(check.otp);

  const result = await Participants.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true }
  );

  delete result._doc.password;
  return result;
};

const signinParticipants = async (req) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new NotFoundError(`Please provided your email and password`);

  const result = await Participants.findOne({ email });
  if (!result) throw new UnauthorizedError(`Invalid Credentials`);

  if (result.status !== "aktif")
    throw new UnauthorizedError(`Akun anda belum aktif!`);

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthorizedError(`Invalid Credetials`);

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllEvents = async () => {
  const response = await Events.findOne({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  if (!response) throw new BadRequestError("Tidak ditemukan/Belum ada!");
  return response;
};

const getOneEvent = async (req) => {
  const { id } = req.params;

  const response = await Events.findOne({ _id: id, statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  if (!response) throw new BadRequestError(`Tidak ada event dengan id: ${id}`);
  return response;
};

const getAllOrders = async (req) => {
  const { id } = req.participant;
  console.log(id);
  const response = await Orders.findOne({ participant: id });
  return response;
};

const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body

  const checkEvent = await checkingEvent(event)

  const checkingPayment = await Payments.findOne({ _id: payment })
  if (!checkingPayment) throw new NotFoundError(`Tidak ada payment dengan id: ${id}`)

  let totalPayment = 0, totalOrderTicket = 0;

  for (const tic of tickets) {
    for (const ticket of checkEvent.tickets) {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new BadRequestError('Stock event tidak mencukupi');
        } else {
          ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPayment += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    }
  }

  // Simpan perubahan jika diperlukan
  await checkEvent.save();

  const historyEvent = {
    title: checkEvent.title,
    date: checkEvent.date,
    about: checkEvent.about,
    tagline: checkEvent.tagline,
    keyPoint: checkEvent.keyPoint,
    venueName: checkEvent.venueName,
    image: checkEvent.image,
    category: checkEvent.category,
    talent: checkEvent.talent,
    organizer: checkEvent.organizer
  }
  const response = await Orders.create({
    date: new Date(),
    personalDetail,
    totalPay: totalPayment,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    payment,
    event,
    historyEvent
  })

  await invoiceMail(personalDetail.email, response)

  return response
}

const getAllPaymentsByOrganizer = async (req) => {
  const { organizer } = req.params
  const response = await Payments.find({ organizer })
  return response
}

module.exports = {
  signupParticipants,
  activateParticipants,
  signinParticipants,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getAllPaymentsByOrganizer
};

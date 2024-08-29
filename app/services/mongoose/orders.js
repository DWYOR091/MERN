const Orders = require('../../api/v1/orders/model');

const getAllOrders = async (req) => {
    const { limit = 10, pages = 1, startDate, endDate } = req.query;
    const { role, organizer } = req.user;

    // Pastikan limit dan pages diubah menjadi angka
    const limitNum = parseInt(limit, 10);
    const pagesNum = parseInt(pages, 10);

    let condition = {};

    if (role !== "owner") {
        condition = { ...condition, 'historyEvent.organizer': organizer };
    }

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Set waktu awal hari dan akhir hari
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        condition = {
            ...condition, 'date': { $gte: start, $lt: end } // Filter berdasarkan rentang tanggal
        };
    }

    const response = await Orders.find(condition)
        .limit(limitNum)
        .skip(limitNum * (pagesNum - 1))
        .exec();

    // Hitung total dokumen sesuai kondisi pencarian
    const count = await Orders.countDocuments(condition);

    return {
        data: response,
        pages: Math.ceil(count / limitNum),
        total: count
    };
};

module.exports = { getAllOrders };

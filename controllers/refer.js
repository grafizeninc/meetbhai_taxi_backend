const base = require("./base");
const Refer = require("../models/refer");

exports.addRefer = async (req, res, next) => {
  try {
    const referData = await Refer.find({});
    if (referData && referData.length > 0) {
      const data = await Refer.findOneAndUpdate({_id: referData[0]._id}, {referPrice: req.body.referPrice}, {upsert: true, new: true});

      return res.status(201).json({
        status: "success",
        data: data
      });
    }

    const refer = await Refer.create({
      referPrice: req.body.referPrice
    });

    return res.status(201).json({
      status: "success",
      data: refer
    });
  } catch (err) {
    next(err);
  }
};
const express = require("express");
const router = express.Router();

const addressModel = require("../models/UpdateAddressModel");

router.put("/updateaddress", async (req, res) => {
  try {
    let userId = req.body.userId;
    let type = req.body.type;
    let line1 = req.body.line1;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let postal_code = req.body.postal_code;
    let lat = req.body.lat;
    let lng = req.body.lng;

    let _hasId = await addressModel.findOne({ userId });
    let resData = {};

    if (_hasId) {
      resData = await addressModel.findOneAndUpdate(
        { userId: userId },
        {
          userId: userId,
          type: type,
          line1: line1,
          city: city,
          state: state,
          country: country,
          postal_code: postal_code,
          lat: lat,
          lng: lng,
        }
      );
    } else {
      resData = await addressModel.create({
        userId: userId,
        type: type,
        line1: line1,
        city: city,
        state: state,
        country: country,
        postal_code: postal_code,
        lat: lat,
        lng: lng,
      });
    }

    if (resData) {
      try {
        let _hasId = await addressModel.findOne({ userId });

        if (_hasId) {
          return res.json({ success: true, data: _hasId });
        } else return res.json({ success: false });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "System error" });
      }
    }

    return res.json({ success: true, message: "Done", data: resData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "System error" });
  }
});

module.exports = router;

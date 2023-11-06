const express = require("express");
const router = express.Router();

const addressModel = require("../models/UpdateAddressModel");
router.post("/getaddress", async (req, res) => {
  try {
    let userId = req.body.userId;

    console.log(userId);

    let _hasId = await addressModel.findOne({ userId });

    if (_hasId) {
      return res.json({ success: true, data: _hasId });
    } else return res.json({ success: false });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "System error" });
  }
});

module.exports = router;

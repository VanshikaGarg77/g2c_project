// const { getModelProfile } = require("../models/modelProfile");
// const ModelProfile = getModelProfile();
const ModelProfile=require("../models/modelProfile");
const path = require("path");

function doSave(req, res) {
  let filename = "nopic.jpg";

  if (req.files != null) {
    filename = req.files.ppic.name;
    var filepath = path.join(__dirname, "..", "uploads", filename);
    req.files.ppic.mv(filepath);
    console.log(filename);
  }
  req.body.ppic = filename;

  console.log(req.body);
  const doc = new ModelProfile(req.body);
  doc
    .save()
    .then((retDoc) => {
      res.set("json");
      res.json({ status: true, rec: retDoc }); //retDoc is an object
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

function doUpdate(req, res) {
  let filename = req.body.hdn;

  if (req.files != null) {
    filename = req.files.ppic.name;
    var filepath = path.join(__dirname, "..", "uploads", filename);
    req.files.ppic.mv(filepath);
    console.log(filename);
  }
  req.body.ppic = filename;

  ModelProfile.updateOne(
    { email: req.body.email },
    {
      $set: {
        fname: req.body.fname,
        lname: req.body.lname,
        village: req.body.village,
        mobile: req.body.mobile,
        city: req.body.city,
        address: req.body.address,
        aadhar: req.body.aadhar,
        ppic: req.body.ppic,
      },
    }
  )
    .then((result) => {
      if (result.matchedCount == 1)
        res.json({ status: true, msg: "Profile updated" });
      else res.json({ status: true, msg: "Invalid Email ID" });
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

function findOne(req, res) {
  console.log(req.query);

  ModelProfile.findOne({ email: req.query.email })
    .then((result) => {
      if (result) {
        // console.log(result);
        res.json({ status: true, prod: result });
      } else {
        res.json({ status: false, err: "No matching email id found" });
      }
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

module.exports = { doSave, doUpdate, findOne };

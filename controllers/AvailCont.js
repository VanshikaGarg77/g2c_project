const { getModelAvail } = require("../models/modelAvail");
const modelAvail = getModelAvail();
const ModelProfile = require("../models/modelProfile");
const path = require("path");

async function doSave(req, res) {
  let filename = "nopic.jpg";

  if (req.files != null) {
    filename = req.files.ppic.name;
    var filepath = path.join(__dirname, "..", "uploads", filename);
    req.files.ppic.mv(filepath);
    console.log(filename);
  }
  req.body.ppic = filename;

  await ModelProfile.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        req.body.city = result.city;
        console.log(req.body);
        const doc = new modelAvail(req.body);
        doc
          .save()
          .then((retDoc) => {
            res.set("json");
            res.json({ status: true, rec: retDoc, msg: "Product availed" }); //retDoc is an object
          })
          .catch((err) => {
            res.json({ status: false, err: err.message });
          });
      } else res.json({ status: true, msg: "Fill profile form" });
    })
    .catch((err) => {
      res.json({ status: false, msg: err.message });
    });

  // console.log(req.body);
  // const doc = new modelAvail(req.body);
  // doc
  //   .save()
  //   .then((retDoc) => {
  //     res.set("json");
  //     res.json({ status: true, rec: retDoc }); //retDoc is an object
  //   })
  //   .catch((err) => {
  //     res.json({ status: false, err: err.message });
  //   });
}

function addItem(req, res) {
  console.log(req.query);

  modelAvail
    .find({ email: req.query.email })
    .then((result) => {
      if (result) {
        res.json({ status: true, prod: result });
      } else {
        res.json({ status: false, err: "No matching email id found" });
      }
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

function doUpdate(req, res) {
  modelAvail
    .deleteOne({ email: req.query.email,items: req.query.items ,category:req.query.category})
    .then((result) => {
      if (result.deletedCount == 1)
        res.json({ status: true, msg: "Item removed.." });
      else res.json({ status: true, msg: "Invalid email id" });
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

function fetchItem(req, res) {
  console.log(req.query);

  modelAvail
    .find({ items: new RegExp(req.query.items, "i") }) //i for not case-sensitive
    .then((result) => {
      if (result) {
        res.json({ status: true, prod: result });
      } else {
        res.json({ status: false, err: "No matching email id found" });
      }
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

function findGrower(req, res) {
  console.log(req.query);

  modelAvail
    .find({ city: req.query.city, items: new RegExp(req.query.items, "i") })
    .then((result) => {
      if (result) {
        res.json({ status: true, prod: result });
      } else {
        res.json({ status: false, err: "No matching email id found" });
      }
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}

function contact(req,res)
{
  console.log(req.query);

  ModelProfile
    .findOne({ email: req.query.email })
    .then((result) => {
      if (result) {
        res.json({ status: true, prod: result });
      } else {
        res.json({ status: false, err: "No matching email id found" });
      }
    })
    .catch((err) => {
      res.json({ status: false, err: err.message });
    });
}
module.exports = { doSave, addItem, doUpdate, fetchItem, findGrower,contact};

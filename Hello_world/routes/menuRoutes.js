const express = require("express");
const router = express.Router();
const menu = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newitem = new menu(data);
    const response = await newitem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data =await menu.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Internal server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const response = await menu.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;

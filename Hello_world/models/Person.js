const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

PersonSchema.pre("save", async function (next) {
  const Person = this;

  if (!Person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(Person.password, salt);

    Person.password = hashedpassword;
    next();
  } catch (error) {
    return next(error);
  }
});

PersonSchema.methods.comparepassword=async function (candidatepassword) {
    try {
        const ismatch=await bcrypt.compare(candidatepassword,this.password);
        return ismatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
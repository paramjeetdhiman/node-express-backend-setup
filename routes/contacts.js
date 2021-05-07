const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../modals/User");
const Contact = require("../modals/Contact");

/// when we need to protects routes we need this...
const auth = require("../middleware/auth");

/// @route      GET api/contacts
/// @desc       Get all user contacts
/// @access     Private

router.get("/", auth, async (req, res) => {
  /// auth make it protected route

  try {
    /// -1 for most recent first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/// @route      POST api/contacts
/// @desc       add new contacts
/// @access     Private

router.post(
  "/",
  [auth, [check("name", "Name is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

/// @route      PUT api/contacts/:id
/// @desc       Update contact
/// @access     Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  ///Build a contact object
  const contactFilds = {};
  if (name) contactFilds.name = name;
  if (email) contactFilds.email = email;
  if (phone) contactFilds.phone = phone;
  if (type) contactFilds.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    /// make sure user own the contact show update privately not others
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    ////actual update contact
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFilds,
      },
      { new: true }
    );
    res.json({ contact });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

/// @route      DELTE api/contacts/:id
/// @desc       Delete contact
/// @access     Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    /// make sure user own the contact show update privately not others
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    ////actual update contact
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;

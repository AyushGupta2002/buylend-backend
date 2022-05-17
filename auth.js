const express = require("express");
const { sendMail } = require("./Functions/sendMail");
const { getOTP } = require("./Functions/getOTP");
const jwt = require("jsonwebtoken");
const { addUser, verifyUser } = require("./src/controllers/user");
const router = express.Router();
// body parser middleware

router.post("/verify-email", function (req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Invalid access" });
  const otp = getOTP();
  const hashedOTP = jwt.sign({ otp }, "123456789");
  const mail = sendMail(email, otp);
  if (!mail) return res.status(500).json({ error: "Cannot send email" });
  res.cookie("hash", hashedOTP, { httpOnly: true, maxAge: 5 * 60 * 1000 });
  res.status(201).json({ success: true });
});

router.post("/verify-otp", (req, res) => {
  try {
    const { enteredOTP } = req.body;
    const hashedOTP = req.cookies.hash;
    if (!hashedOTP)
      return res.status(404).json({ error: "Please regenerate OTP" });
    const decode = jwt.verify(hashedOTP, "123456789");
    const { otp } = decode;
    if (!otp || !enteredOTP)
      return res.status(400).json({ error: "Invalid access" });
    if (enteredOTP == otp) {
      res.cookie("hash", "");
      return res.status(201).json({ success: true });
    }
    res.status(404).json({ error: "Invalid OTP" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password, phone_number, address } = req.body;
    if (!name || !email || !password || !phone_number || !address)
      return res.status(400).json({ error: "invalid access" });
    console.log(req.body);
    console.log(1);
    // const { user, error } = await addUser(
    //   name,
    //   email,
    //   password,
    //   phone_number,
    //   address
    // );
    const user = req.body;
    console.log(user);

    await addUser(name, email, password, phone_number, address);
    if (user) return res.status(201).json({ success: true });
    res.status(400).json({ error: "sign up failed" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "invalid access" });

    const user = await verifyUser(email, password);
    // console.log(user);
    const token = jwt.sign({ userId: user.id }, "neijfnifbrefbeubfreuf");
    if (user) return res.status(201).json({ success: true, token: token });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`app is live at ${PORT}`);
// });

module.exports = router;

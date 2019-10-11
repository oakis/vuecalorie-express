import { Router } from 'express';
import auth from "../middleware/auth";
import bcrypt from "bcrypt";
import { User, validate } from "../models/user";

const router = Router();

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { e } = validate(req.body);
  if (e) return res.status(400).send(e.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email
  });
});

router.post("/login", async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) return res.status(400).send({ message: "Username and password required." })
        var user = await User.findOne({ username: req.body.username }).exec();
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

export default router;
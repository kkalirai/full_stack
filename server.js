var express = require("express");
const bodyParser = require("body-parser");
var cookies = require("cookie-parser");
const mongoose = require("mongoose");
var app = express();
const bcrypt = require("bcrypt");
var cors = require("cors");

const userModel = require("./models/user");
const surveyModel = require("./models/survey");
const responseModel = require("./models/response");

const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookies());
app.use(cors());

// Function to generate the JWT Token

mongoose.connect(
  "mongodb+srv://karan:karan@cluster0.xgfhdcv.mongodb.net/?retryWrites=true&w=majority"
);

// Middleware to check if the user is registered or not

// Registration and Login Api

app.get("/user/dashboard", tokenAuth, async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    const { userID } = jwt.verify(token, "mysecretkey");
    let user = await userModel.findById(userID).exec();
    let surveys = user.survey;
    let obj = {};
    for (let i = 0; i < surveys.length; i++) {
      const survey = await surveyModel.findById(surveys[i]).exec();
      let responses = survey?.response;
      obj[survey?.title] = responses?.length;
    }
    res.status(200).json({ responses: obj });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/survey", async (req, res) => {
  const surveyData = await surveyModel.find();
  // res.send("GOt it ")
  res.send(surveyData);
});

//   const { username, password } = req.body;

//   // Check for user existence
//   const user = await userModel.findOne({ username }).exec();
//   if (!user) {
//     return res.status(401).send({ message: "Invalid username or password" });
//   }

//   // Comparing Hashed Password
//   const isValidPassword = await bcrypt.compare(password, user.password);
//   if (!isValidPassword) {
//     return res.status(401).send({ message: "Invalid username or password" });
//   }

//   const token = jwt.sign({ userID: user._id }, "mysecretkey", {
//     expiresIn: "5d",
//   });

//   res.cookie("auth_token", token, { httpOnly: true });

//   // Send successful login response with token and user data
//   res.redirect("/user/dashboard");
//   // res.send({ message: 'Login successful', token, user: { username: user.username, email: user.email } });
// });
app.post("/user/login", async (req, res) => {
  console.log("response is ", req.body);
  const { username, password } = req.body;

  // Check for user existence
  const user = await userModel.findOne({ username }).exec();
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  // Comparing Hashed Password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ userID: user._id }, "mysecretkey", {
    expiresIn: "5d",
  });

  //   res.cookie("auth_token", token, { httpOnly: true });
  return res
    .status(200)
    .send({ message: "Login successful", auth_token: token });

  // Send successful login response with token and user data
  //   res.redirect("/user/dashboard");
  // res.send({ message: 'Login successful', token, user: { username: user.username, email: user.email } });
});

app.post("/user/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  // Check if user already exists or not
  const existingUser = await userModel.findOne({ username: username }).exec();
  if (existingUser) {
    return res.status(409).send({ message: "Username already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();

    const token = jwt.sign({ userID: newUser._id }, "mysecretkey", {
      expiresIn: "5d",
    });
    return res.status(200).send({ message: "User created", auth_token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

async function tokenAuth(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.redirect("/user/login");
  }
  next();
}

app.post("/user/create-survey", async (req, res) => {
  const title = req.body.survey_title;
  const agreeDisagree = req.body.agreeDisagree;
  const shortAnswer = req.body.shortAnswer;

  // Get the token from the cookie
  const token = req.body.auth_token;
  console.log("yaha tk theek hia");
  const { userID } = jwt.verify(token, "mysecretkey");
  let user = await userModel.findById(userID).exec();

  const newSurvey = new surveyModel({
    title: title,
    ownerName: user.username,
    ownerID: userID,
    agreeDisagree: agreeDisagree,
    shortAnswer: shortAnswer,
  });
  newSurvey.save();

  await userModel.findOneAndUpdate(
    { _id: userID },
    { $push: { survey: newSurvey._id } },
    { new: true }
  );
  return res.status(200).send({ message: "Survey created" });
});

app.post("/submit-response/:surveyID", async (req, res) => {
  const surveyID = req.params.surveyID;

  const survey = await surveyModel.findById(surveyID).exec();
  // console.log(name, survey.ownerID);
  const newReponse = new responseModel({
    username: req.body.name,
    surveyID: surveyID,
    ownerID: survey.ownerID,
  });
  newReponse.save();

  await surveyModel.findOneAndUpdate(
    { _id: surveyID },
    { $push: { response: newReponse._id } },
    { new: true }
  );

  return res.status(200).send({ message: "Survey submitted" });
});

app.set("view engine", "ejs");
var port = 3000;
app.listen(port, () => {
  console.log("Server is running at port 3000");
});

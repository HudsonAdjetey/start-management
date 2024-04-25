const express = require("express");
require("dotenv").config();
const path = require("path");
const connDB = require("./config/dbConfig");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const { logger } = require("./middleware/logger");
const schoolRoute = require("./router/schoolRouter");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");
/* DATABASE */
const PORT = process.env.PORT || 5010;
connDB();

const app = express();
app.use(logger);

/* CORS */
app.use(cors(corsOption));
/* COOKIE PARSER */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ROUTER */
app.use("/api-bill/student-system/", schoolRoute);
app.use("/api-bill/user-system/", userRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    // send to html page
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    // send json response
    return res.send({ error: "Not found" });
  } else if (req.accepts("xml")) {
    // send xml response
    return res.type("text/plain").send("Not Found");
  } else {
    // default to plain text
    return res.type("text/plain").send("Not Found");
  }
});

app.listen(PORT, () => console.log(`Page running on port ${PORT}`));

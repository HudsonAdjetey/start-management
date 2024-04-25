const { format } = require("date-fns");
const { v4: uuid } = require("uuidv4");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, fileName) => {
  const timeIntit = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  let dataToWrite = `${timeIntit}\t${message}\t${uuid}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "/", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "/", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "/", "logs", fileName),
      dataToWrite
    );
  } catch (error) {
    console.log(error?.message);
  }
};

const logger = (req, res, next) => {
  req._startTime = process.hrtime();
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  next();
};
module.exports = { logEvents, logger };

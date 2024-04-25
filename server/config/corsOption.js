const allowedOrigins = require("./allowedOrigins");

const corsOption = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      console.log(`Blocked CORS request from ${origin}`);
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOption;

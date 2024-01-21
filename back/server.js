const express = require('express')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const indexRouter = require('./routes/index')
const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api",indexRouter)

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});

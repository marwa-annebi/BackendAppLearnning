const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const courseRoute=require("./routes/courseRoute")
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");
const app = express();
app.use(express.json());
dotenv.config();
ConnectDB();
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));

const express = require("express");
const forecastRouter = require("./routes/forecasts.routes");
const usersRouter = require("./routes/users.routes");
const postsRouter = require("./routes/posts.routes");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api", forecastRouter);
app.use("/api", usersRouter);
app.use("/api", postsRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

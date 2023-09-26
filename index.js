const express = require("express");
const app = express();

app.use(express.json());
const PORT = 5550;

const { authRouter, userAdminRouter, eventAdminRouter } = require("./routers");
const { verifyToken } = require("./middleware/auth");

app.use("/auth", authRouter);
app.use("/admin/events", eventAdminRouter);
app.use("/admin/users", userAdminRouter);

app.get("/", (req, res) => {
  res.send({
    message: "silahkan ke /auth/login sebelum /admin ",
  });
});

app.get("/admin", (req, res) => {
  res.send({
    message: "silahkan ke /admin/events atau /admin/users ",
  });
});

app.get("/test", verifyToken, (req, res) => {
  res.send({
    message: "silahkan ke /admin/events atau /admin/users ",
  });
});

app.listen(PORT, () => {
  console.log("server run on port = ", PORT);
});

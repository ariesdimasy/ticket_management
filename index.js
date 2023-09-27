const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("Public"));
const PORT = 5550;

const { authRouter, userAdminRouter, eventAdminRouter } = require("./routers");
const { verifyToken } = require("./middleware/auth");
const { multerUpload } = require("./middleware/multer");

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

app.post("/singel-upload", multerUpload.single("file"), (req, res) => {
  let file = req.file;
  res.send({
    message: file.filename,
  });
});

app.listen(PORT, () => {
  console.log("server run on port = ", PORT);
});

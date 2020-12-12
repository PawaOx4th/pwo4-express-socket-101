const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);

const dayjs = require("dayjs");
const locale = require("dayjs/locale/de");

const io = require("socket.io")(server);

const PORT = 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(res.headersSent);
});

io.on("connection", (socket) => {
  console.log(`🐤 User has Connected : ${socket.id}`);

  socket.on("start", (data) => {
    // console.log(`User Emit : ${data}`);
    console.log(`${socket.id} : 💬`);
    const formatMsg = {
      id: socket.id,
      content: data,
      createAt: dayjs()
        .locale("th")
        .format("HH:MM:ss"),
    };
    io.emit("start", formatMsg);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} has left this Chat Room 🏠`);
    // io.emit("userLeft", socket.username);
    // users.splice(users.indexOf(socket), 1);
  });
});

server.listen(PORT, () => {
  console.log(`Server Start : ${PORT}`);
});

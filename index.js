const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);

const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var advanced = require("dayjs/plugin/advancedFormat");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);
let day = dayjs()
  .tz("Asia/Bangkok")
  .format("DD/MM/YYYY HH:mm:ss");

const io = require("socket.io")(server);
const PORT = 4000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World At :", day);
  console.log(res.headersSent);
});

io.on("connection", (socket) => {
  console.log(`🐤 User has Connected : ${socket.id}`);

  socket.on("start", (data) => {
    // console.log(`User Emit : ${data}`);
    console.log(`${socket.id} : 💬`);
    console.log(`🕤: ${day}`);
    const formatMsg = {
      id: socket.id,
      content: data,
      createAt: day,
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

const chat = require("../models/chat");
const Chat = require("../models/chat");
const socket = require("socket.io");
function initializeSocket(server) {
  // Yahan Socket.IO server create ho raha hai.
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userName, userId, targetId, toUserName }) => {
      console.log("user id", userId);
      console.log("touser id", targetId);

      const joinId = [userId, targetId].sort().join("_");
      console.log(userName + " joining the room " + toUserName);
      console.log(joinId);

      socket.join(joinId);
    });

    socket.on("sendMessages", async ({ userName, userId, targetId, text }) => {
      const roomId = [userId, targetId].sort().join("_");
      try {
        let chat = await Chat.findOne({
          participents: { $all: [userId, targetId] },
        });

        if (!chat) {
          chat = new Chat({
            participents: [userId, targetId],
            messages: [],
          });
        }
        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();
        io.to(roomId).emit("messagesRecieved", {
          senderId: userId,
          userName,
          text,
        });
        console.log(userName + " " + text);
      } catch (err) {
        console.log(err);
      }
    });
    //  socket.on(("disconnects")=>{})
  });
}

module.exports = { initializeSocket };

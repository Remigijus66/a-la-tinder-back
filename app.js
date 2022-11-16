const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http").createServer(app)
const socketIo = require("socket.io")

const io = socketIo(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

require("dotenv").config()

http.listen(4001)

app.set('socketio', io);

const users = []
const fans = []
const messages = []


io.on("connection", socket => {
    socket.on('register', (data) => {
        users.push({
            name: data.name,
            photo: data.photo,
            id: socket.id
        })
        socket.broadcast.emit('newUser', users);
        // socket.join(data.name)
        // console.log(users)
    })
    socket.on('usersAvailable', () => {
        socket.emit('newUser', users);
        // console.log(users)
    })
    socket.on('like', (data) => {
        console.log(fans)
        console.log(data)
        if (fans.filter((e) => e.liked === data.liked && e.fanName === data.fanName && e.fanPhoto === data.fanPhoto).length === 0)
            fans.push(data)
        // console.log(fans)
        socket.broadcast.emit('newFan', fans);

    })
    socket.on('message', (data) => {
        console.log(data)
        messages.push(data)
        socket.broadcast.emit('newMessage', messages)
    })



})
    // socket.on('joinRoom', (data) => {
    //     console.log(data)
    //     socket.join(data.roomName)
    //     const msg = `${data.user} has joined the room ${new Date}`
    //     socket.to(data.roomName).emit("newUser", msg);
    // })

    // socket.on('leaveTheRoom', (data) => {
    //     console.log(data)
    //     socket.leave(data.roomName)
    //     const msg = `${data.user} has farted and left the room. Bastard`
    //     socket.to(data.roomName).emit("newUser", msg);
    // })



    // socket.on('chatMessage', data => {
    //     // console.log(data)
    //     const messageData = {
    //         name: data.name, message: data.message, time: data.time
    //     }
    //     // console.log(messageData)
    //     if (data.roomName === "pirmas") {
    //         chatLogPirmas.push(messageData)
    //         // console.log(chatLog)
    //         io.in(data.roomName).emit("newchatmsg", chatLogPirmas)
    //     }
    //     if (data.roomName === "antras") {
    //         chatLogAntras.push(messageData)
    //         // console.log(chatLog)
    //         io.in(data.roomName).emit("newchatmsg", chatLogAntras)
    //     }
    //     if (data.roomName === "trecias") {
    //         chatLogTrecias.push(messageData)
    //         // console.log(chatLog)
    //         io.in(data.roomName).emit("newchatmsg", chatLogTrecias)
    //     }
    // })



    // // SEND MESSAGE TO OWN SOCKET
    // // socket.emit("message", "hello, how are you ")

    // // RECEIVE EVENT FROM FRONT END
    // // socket.on("something", data => {
    // //     console.log(data)

    //     // SEND MESSAGE TO ALL SOCKETS IN APP
    //     // io.emit("message", data)

    //     // SEND MESSAGE TO ALL SOCKETS EXCEPT ME (SENDER)
    //     socket.broadcast.emit("message", data)
    // })


    // socket.on('color', data => {
    //     // console.log(data)
    //     socket.broadcast.emit("color", data)
    // })

    // socket.on('countOthers', data => {
    //     // console.log(data)
    //     socket.broadcast.emit("countOthers", data)
    // })
    // socket.on('countMe', data => {
    //     // console.log(data)
    //     socket.emit("countMe", data)
    // })
    // socket.on('countAll', data => {
    //     // console.log(data)
    //     io.emit("countAll", data)
    // })









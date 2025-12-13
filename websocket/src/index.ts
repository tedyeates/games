import express from "express";
import cors from "cors"
import dotenv from 'dotenv';

import { createServer } from "http";
import { Server } from "socket.io";
import { addPlayer, getRoom, createRoom, removePlayer, addPlayerData } from "./room";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", ""]
    }
});


const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

app.use(express.json())
app.use(cors(corsOptions));

io.on("connection", async (socket) => {
    console.log("Client connected:", socket.id);
    await addPlayer(socket.id)

    async function leave() {
        console.log(socket.id, "leaving");
        let room = null;
        try {
            room = await removePlayer(socket.id);
        } catch (err) {
            console.log((err as {message: string}).message)
            socket.emit("leave-error", (err as {message: string}).message);
            return;
        }
        const roomCode = room?.roomCode;
        if (!roomCode) {
            socket.emit("leave-error", "Room not found");
            return;
        }

        socket.leave(roomCode);

        const updatedRoom = await getRoom(roomCode);
        if (!updatedRoom) {
            socket.emit("leave-error", "Room not found");
            return;
        }

        io.to(roomCode).emit("room-update", {
            roomCode,
            players: updatedRoom.players
        });
    }

    socket.on("join-room", async ({ roomCode, name }) => {
        console.log(name, "joining", roomCode);

        if (!roomCode) {
            socket.emit("join-error", "No room code supplied");
            return;
        }

        if (!name) {
            socket.emit("join-error", "No player name supplied");
            return;
        }
            

        try {
            await addPlayerData(roomCode, name, socket.id);
        } catch (err) {
            console.log((err as {message: string}).message)
            socket.emit("join-error", (err as {message: string}).message);
            return;
        }

        socket.join(roomCode);

        // Broadcast updated room state
        const room = await getRoom(roomCode);

        if (!room) {
            socket.emit("join-error", "Room not found");
            return;
        }

        io.to(roomCode).emit("room-update", {
            roomCode,
            players: room.players
        });
    });

    socket.on("leave-room", async () => {
        leave()
    });

    socket.on("disconnect", async () => {
        console.log("Socket disconnected:", socket.id);
        leave()
    });
});

const port = "3000";

app.post("/api/room/:room/player/create", (req, res) => {
    const roomCode = req.params.room
    if (!roomCode) return res.status(400).send({message: "No room code supplied"})

    const { name } = req.body
    if (!name) return res.status(400).send({message: "No player name supplied"})
    
    res.cookie("player", JSON.stringify({ name }), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    res.status(201).send({message: `Player ${ name }`})
});

app.post("/api/room/create", async (req,res) => {
    console.log("hello")
    const room = await createRoom()
    res.status(200).json({ success: true, room })
})

app.get("/api/room/:room", async (req, res) => {
    const room = await getRoom(req.params.room)
    console.log(room)
    if (!room) return res.status(400).send({message: "Room not found"})
    
    res.status(200).json({ room })
})

server.listen(port, () => {
    console.log(`Server + Socket.IO listening on port ${port}`);
});
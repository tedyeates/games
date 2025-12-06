import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Handle } from "@sveltejs/kit";
import { addPlayer, getRoom } from "$lib/server/rooms";

let io: SocketIOServer | null = null;

type NodePlatform = {
	server: HTTPServer;
	env?: Record<string, string>;
}

// This hook runs on every server request
export const handle: Handle = async ({ event, resolve }) => {
	// Create Socket.IO server only once
	if (!io) {
        const nodePlatform = event.platform as NodePlatform | undefined;
		const httpServer = nodePlatform?.server;

		if (!httpServer) {
			console.error("❌ No platform.server found. Use adapter-node.");
		} else {
			io = new SocketIOServer(httpServer, {
				cors: { origin: "*" }
			});

			console.log("🔥 Socket.IO started");

			io.on("connection", (socket) => {
				console.log("Client connected:", socket.id);

				socket.on("join-room", ({ roomCode, name }) => {
					console.log(name, "joining", roomCode);

					try {
						addPlayer(roomCode, name);
					} catch (err) {
						socket.emit("join-error", (err as {message: string}).message);
						return;
					}

					socket.join(roomCode);

					// Broadcast updated room state
					const room = getRoom(roomCode);

					io!.to(roomCode).emit("room-update", {
						roomCode,
						players: Array.from(room!.players.values())
					});
				});

				socket.on("disconnect", () => {
					console.log("Socket disconnected:", socket.id);
				});
			});
		}
	}

	return resolve(event);
};

export { io };
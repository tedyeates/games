import { io, type Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import { PUBLIC_EXPRESS_BASE } from '$env/static/public';

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

if (!socket){
    socket = io(PUBLIC_EXPRESS_BASE);
}

export { socket };
export type Player = {
    id: number;
    name?: string;
    socketId: string;
    ready: boolean;
    roomId?: number;
    isHost: boolean;
}
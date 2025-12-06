export type Player = {
    name: string
}

export type Room = {
    players: Map<string,Player>
    createdAt: number
    roomCode: string
}
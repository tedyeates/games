export type Player = {
    name: string
    ready: boolean
}

export type Room = {
    players: Map<string,Player>
    createdAt: number
    roomCode: string
}
import { Color, RuleCategory, RuleRestriction, RuleType, type Room, type Rule } from "../prisma/generated/prisma/client";
import type { RuleCreateInput } from "../prisma/generated/prisma/models";
import prisma from "./prisma";
import { baseColor, shuffle } from "./utils";

export async function getRoom(roomCode: string) {
    return await prisma.room.findUnique({
        where: {
            roomCode
        },
        include: { players: true}
    });
}

export async function deleteRoom(roomCode: string) {
    return await prisma.room.delete({
        where: { roomCode },
    });
}

export async function addPlayerData(roomCode: string, name: string, socketId: string) {
    const room = await getRoom(roomCode);
    if (!room) throw Error("Room not found")

    const existingPlayer = await prisma.player.findFirst({
        where: {
            name: name,
            room: { roomCode: roomCode },
        },
    });

    if (existingPlayer) throw Error("Player already exists");

    const playerCount = await prisma.player.count({
        where: { roomId: room.id },
    });

    const isHost = playerCount === 0;

    return await prisma.player.update({
        where: {
            socketId: socketId
        },
        data: {
            name: name,
            roomId: room.id,
            isHost
        }
    });
}

export async function addPlayer(socketId: string) {
    return await prisma.player.create({
        data: {
            socketId: socketId
        }
    });
}

export async function removePlayer(socketId: string) {
    return await prisma.$transaction(async (tx) => {
        const player = await tx.player.findUnique({
            where: { socketId },
            include: { room: true }, // include their room
        });

        if (!player) throw Error("Player does not exist");

        const playerRoom = player?.room
        await tx.player.deleteMany({
            where: {
                socketId: socketId
            }
        });

        if (player.isHost && playerRoom) {
            const nextHost = await tx.player.findFirst({
                where: { roomId: playerRoom.id },
                orderBy: { id: "asc" }, // pick the first player by id
            });

            if (nextHost) {
                await tx.player.update({
                    where: { id: nextHost.id },
                    data: { isHost: true },
                });
            }
        }

        return playerRoom
    });
}

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ"; 
function randomCode(len = 4) {
    let out = "";
    for (let i = 0; i < len; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}

export async function createRoom() {
    while (true) {
        const roomCode = randomCode(4);
        console.log(roomCode)

        try {
            const room = await prisma.room.create({
                data: { roomCode }
            });

            return room; // SUCCESS — return the created room
        } catch (err: any) {
            // P2002 = unique constraint failed
            if (err.code === 'P2002') {
                // roomCode collision → try again
                continue;
            }

            // Any other error → throw it
            throw err;
        }
    }
}

function createRule(type: RuleType) {
    const easyRules: RuleCreateInput[] = [
        {
            type: RuleType.easy,
            category: RuleCategory.greater,
            restriction: RuleRestriction.none,
            color: shuffle([...baseColor(), Color.ANY])[0] as Color,
            total: shuffle([2, 3, 4])[0] as number
        },
        {
            type: RuleType.easy,
            category: RuleCategory.less,
            restriction: RuleRestriction.none,
            color: shuffle([...baseColor(), Color.ANY])[0] as Color,
            total: shuffle([8, 9, 10])[0] as number
        },
    ];

    const mediumRules: RuleCreateInput[] = [
        {
            type: RuleType.medium,
            category: RuleCategory.greater,
            restriction: RuleRestriction.none,
            color: shuffle(baseColor())[0] as Color,
            total: shuffle([4, 5, 6, 7, 8])[0] as number
        },
        {
            type: RuleType.medium,
            category: RuleCategory.less,
            restriction: shuffle([RuleRestriction.odd, RuleRestriction.even, RuleRestriction.none])[0] as RuleRestriction,
            color: shuffle(baseColor())[0] as Color,
            total: shuffle([6, 7])[0] as number
        },
        {
            type: RuleType.medium,
            category: RuleCategory.greater,
            restriction: shuffle([RuleRestriction.odd, RuleRestriction.even])[0] as RuleRestriction,
            color: shuffle(baseColor())[0] as Color,
            total: shuffle([5, 6, 7, 8])[0] as number
        }
    ];

    const hardRules: RuleCreateInput[] = [
        {
            type: RuleType.hard,
            category: RuleCategory.equal,
            restriction: RuleRestriction.none,
            color: shuffle(baseColor())[0] as Color,
            total: shuffle([1, 2, 3, 4, 5, 6, 7])[0] as number
        },
        {
            type: RuleType.hard,
            category: RuleCategory.less,
            restriction: RuleRestriction.none,
            color: shuffle(baseColor())[0] as Color,
            total: shuffle([3, 4, 5])[0] as number
        },
        
    ];

    return shuffle({
        easy: easyRules,
        medium: mediumRules,
        hard: hardRules
    }[type])[0]
}

const rules = [
    [
        createRule("easy")
    ],
    [
        createRule("easy"),
        createRule("easy")
    ],
    [
        createRule("easy"),
        createRule("easy"),
        createRule("medium")
    ],
    [
        createRule("easy"),
        createRule("medium"),
        createRule("medium")
    ],
    [
        createRule("easy"),
        createRule("medium"),
        createRule("hard")
    ],
    [
        createRule("medium"),
        createRule("medium"),
        createRule("hard")
    ]
]

export async function createRounds(room: Room, roundCount: number) {
    return await prisma.round.createMany({
        data: Array.from({length: roundCount}, (_, i) => (
            {
                order: i + 1,
                roomId: room.id,
                rules: {
                    create: rules[i]
                }
            }
        ))
    });
}

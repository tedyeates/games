import { Color, DiceLocation, Role, type Dice, type Player, type Room, type Side } from "../prisma/generated/prisma/client";
import type { TransactionClient } from "../prisma/generated/prisma/internal/prismaNamespace";
import prisma from "./prisma";
import { getRoom } from "./room";
import { shuffle } from "./utils";

const normalDie = {
    sides: ["1", "2", "3", "4", "5", "6"],
}

const blueDie = {
    ...normalDie,
    color: Color.BLUE
}

const greenDie = {
    ...normalDie,
    color: Color.GREEN
}

const redDie = {
    ...normalDie,
    color: Color.RED
}

const unionistDie = {
    sides: ["⚒", "⚒", "3", "3", "2", "2"],
    color: Color.ORANGE
}

const playerDeck = [
    blueDie,
    blueDie,
    blueDie,
    blueDie,
    greenDie,
    greenDie,
    greenDie,
    redDie,
    redDie,
    redDie,
]


const unionistDeck = [
    blueDie,
    blueDie,
    blueDie,
    greenDie,
    greenDie,
    greenDie,
    greenDie,
    redDie,
    unionistDie,
    unionistDie,
]

async function saveRoles(santa: Player, unionists: Player[], others: Player[]){
    await prisma.$transaction([
        prisma.player.updateMany({
            where: { id: { in: unionists.map(p => p.id) } },
            data: { role: Role.UNIONIST }
        }),
        prisma.player.updateMany({
            where: { id: { in: others.map(p => p.id) } },
            data: { role: Role.ELF }
        })
    ])
}

async function saveDeck(player: Player, role: Role) {
    const deck = {
        [Role.UNIONIST]: unionistDeck,
        [Role.ELF]: playerDeck
    }[role]

    if (!deck) return

    const mappedDeck = deck.map(die => ({
        color: die.color,
        sides: die.sides.map(side => ({
                value: side
            }))
        }
    ))

    await prisma.$transaction([
        // Remove existing deck
        prisma.dice.deleteMany({
            where: { playerId: player.id }
        }),

        // Create new deck
        prisma.player.update({
            where: { id: player.id },
            data: {
                deck: {
                    create: shuffle(mappedDeck).map((die, index) => ({
                        color: die.color,
                        order: index,
                        location: DiceLocation.DECK,
                        sides: {
                            create: die.sides
                        }
                    }))
                }
            }
        })
    ])
}

export async function assignRoles(roomCode: string) {
    const room = await getRoom(roomCode)
    if (!room) throw Error("Room not found")

    const playerNumber = room.players.length
    if (playerNumber < 5) throw Error("Not enough players")

    const unionistsNumber = {
        7: 2,
        8: 2,
        9: 3,
        10: 3,
    }[playerNumber] ?? 1;

    const shuffled = shuffle(room.players);

    const santa = shuffled[0] as Player
    const unionists = shuffled.slice(1, unionistsNumber + 1)
    const others = shuffled.slice(unionistsNumber + 1)

    await saveRoles(santa, unionists, others)
    await Promise.all([
        ...unionists.map(p => saveDeck(p, Role.UNIONIST)),
        ...others.map(p => saveDeck(p, Role.ELF))
    ])
}

async function addToHand(tx: TransactionClient, deck: Dice[]){
    await tx.dice.updateMany({
        where: { id: { in: deck.map(d => d.id) } },
        data: { location: "HAND" },
    });
}

export async function drawDice(player: Player, count: number) {
    return await prisma.$transaction(async (tx) => {
        // Take count dice from deck in order
        const fromDeck = await tx.dice.findMany({
            where: {
                playerId: player.id,
                location: "DECK",
            },
            orderBy: { order: "asc" },
            take: count,
            include: { sides: true }
        });

        let diceToDraw: Dice[] = [...fromDeck];


        // Exit if we have enough dice drawn
        if (diceToDraw.length >= count) {
            await addToHand(tx, diceToDraw);
            return diceToDraw;
        }

        // If not enough need to reshuffle the discard
        const discard = await tx.dice.findMany({
            where: {
                playerId: player.id,
                location: "DISCARD",
            },
            include: { sides: true }
        });

        if (discard.length === 0) {
            await addToHand(tx, diceToDraw);
            return diceToDraw;
        }

        const shuffled = shuffle(discard);
        const remaining = shuffled.slice(0, count - diceToDraw.length);
        const rest = shuffled.slice(count - diceToDraw.length);

        await Promise.all(
            rest.map((die, index) =>
                tx.dice.update({
                    where: { id: die.id },
                    data: {
                        location: "DECK",
                        order: index,
                    },
                })
            )
        )

        
        diceToDraw.push(...remaining);
        await addToHand(tx, diceToDraw);
        return diceToDraw;
    });
}

type DiceSides = Dice & { sides: Side[] }

export async function rollDie(dice: DiceSides[], player: Player){
    return await prisma.$transaction(async (tx) => {
        const rolledDice = dice.map(die => ({
            selected: false,
            color: die.color,
            total: shuffle(die.sides)[0]?.value as string
        }))

        await tx.total.deleteMany({
            where: { playerId: player.id }
        }),

        await tx.player.update({
            where: { id: player.id},
            data: {
                totals: {
                    create: rolledDice
                }
            }
        });
    });
}

export async function selectTotals(player: Player, room: Room, totalsSelected: number[]) {
    if (totalsSelected.length === 0) throw Error("No totals selected");
    if (totalsSelected.length > 2) throw Error("Please select 2 totals");

    await prisma.$transaction(async (tx) => {
        await tx.total.updateMany({
            where: {
                playerId: player.id,
                id: {
                    in: totalsSelected
                }
            },
            data: {
                selected: true
            }
        })

        // Todo: add totals to round
    });

}

export async function getPlayer(socketId: string) {
    return await prisma.player.findUnique({
        where: {
            socketId: socketId
        },
        include: {
            deck: true,
            totals: true
        }
    
    });
}
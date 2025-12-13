import { Color } from "../prisma/generated/prisma/enums";

export function shuffle<T>(deck: readonly T[]): T[] {
    const result = [...deck];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j] as T, result[i] as T];
    }
    return result;
}

export function baseColor(): Color[] {
    return [
        Color.RED,
        Color.BLUE,
        Color.GREEN
    ]
}
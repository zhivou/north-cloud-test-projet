// Strips the leading `$` and returns the numeric value (e.g. "$29.99" → 29.99)
export function parsePrice(priceString: string): number {
    return Number.parseFloat(priceString.slice(1));
}

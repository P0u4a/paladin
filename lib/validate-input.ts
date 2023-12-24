export function validateInput(input: string | undefined | null) {
    if (input === null || input === undefined) return false;

    if (input.indexOf(' ') === -1) return true;

    return false;
}

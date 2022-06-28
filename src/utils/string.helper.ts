export function lowercaseFirstLetter(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function uppercaseFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatMoney = (data: number) =>
    data.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });

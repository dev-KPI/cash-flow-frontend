export const Omiter = (key: string[], obj: Object) =>  {
    const exclude: Set<string> = new Set(key)
    return JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(obj).filter(e => !exclude.has(e[0])))))
}

export function numberWithCommas(x: number | undefined) {
    if (x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
        return x
}
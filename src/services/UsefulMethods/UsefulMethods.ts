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

export const parseColors = (hex: string) => {
    switch (hex) {
        case '#4C6FFF':
            return 'var(--main-blue)';
        case '#FF6E01':
            return 'var(--main-orange)';      
        case '#FF2D55':
            return 'var(--main-red)';
        case '#28CD41':
            return 'var(--main-green)';
        case '#D96FF8':
            return 'var(--main-purple)';
        default:
            return hex
    }
}
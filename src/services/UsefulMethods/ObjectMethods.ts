export const Omiter = (key: string[], obj: Object) =>  {
    const exclude: Set<string> = new Set(key)
    return JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(obj).filter(e => !exclude.has(e[0])))))
}

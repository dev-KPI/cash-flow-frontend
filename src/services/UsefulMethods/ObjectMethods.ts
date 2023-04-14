//this method exclude some fields of object, which is setted in props keys = ['test', 'id']
export const addFieldToObject = <T extends object, K extends string, V>(obj: T, key: K, value: V): T & { [k in K]: V } => {
    return {
      ...obj,
      [key]: value,
    } as T & { [k in K]: V };
}

export const Omiter = (key: string[], obj: Object) =>  {
    const exclude: Set<string> = new Set(key)
    return JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(obj).filter(e => !exclude.has(e[0])))))
}


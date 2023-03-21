import { kMaxLength } from 'buffer';
import DateServiceClass from './DateService';
import DateService from './DateService';

export const lastSomeDays = (ctx: typeof DateServiceClass, i: number) => {
    const now = new Date();
    return {
        day: ctx.days[+(new Date(now.getTime() - (i) * 24 * 60 * 60 * 1000).getDay())],
        date: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000).getDate(), 
        month: ctx.months[new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000).getMonth()], 
        year: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000).getFullYear(), 
        datetime: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000)
    }
}

export const lastWeek = (ctx: typeof DateServiceClass, i: number) => {
    const now = new Date();
    now.setDate(now.getDate() - now.getDay())
    return {
        day: ctx.days[+(new Date(now.getTime() - (i) * 24 * 60 * 60 * 1000).getDay())],
        date: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000).getDate(), 
        month: ctx.months[new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000).getMonth()], 
        year: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000).getFullYear(),
        datetime: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000)
    }
}

export const someMonth = (ctx: typeof DateServiceClass, month: number, i: number, year?: number) => {
    if (!year) {year = DateService.getCurrentYear()}
    const now = new Date(year, month, 0)
    return {
        day: ctx.days[+(new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000).getDay())],
        date: new Date(now.getTime() - (i) * 24 * 60 * 60 * 1000).getDate(), 
        month: ctx.months[new Date(now.getTime() - (i) * 24 * 60 * 60 * 1000).getMonth()], 
        year: new Date(now.getTime() - (i) * 24 * 60 * 60 * 1000).getFullYear(), 
        datetime: new Date(now.getTime() - (i)  * 24 * 60 * 60 * 1000)
    }
}
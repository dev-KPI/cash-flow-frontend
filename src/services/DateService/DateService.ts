import {startOfDay, addDays, startOfMonth, endOfMonth, isSameDay} from 'date-fns'

class DateServiceClass {

    months: string[];
    days: string[];

    constructor() {
        this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    getDays(): string[] {
        return this.days
    }
    getCurrentDay(): string {
        return this.days[new Date().getDate()]
    }
    getCurrentDayIdx(): number {
        return new Date().getDate()
    }
    getMonths(): string[] {
        return this.months
    }
    getCurrentDate(): number {
        return new Date().getDay()
    }
    getCurrentMonth(): string {
        return this.months[new Date().getMonth()]
    }
    getCurrentMonthIdx(): number {
        return new Date().getMonth() + 1
    }
    getCurrentYear(): number {
        return new Date().getFullYear()
    }
    getMonthIdxByName(month: string): number {
        return this.months.indexOf(month) + 1
    }
    getMonthNameByIdx(month: number): string {
        return this.months[month]
    }
    getFormatedDate(date: number): string {
        return date < 10 ? '0' + date : date + ''
    }
    getFormatedMonth(month: number): string {
        return month < 10 ? '0' + month : month + ''
    }
    getFormatedDateForStore(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month + ''}-${day < 10 ? '0' + day : day + ''}`
    }
    getTime(date: Date, short?: boolean): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${short ? String(year).slice(2) : year} ${
            date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    }
    getYearMonth(year: number, month: string): string {
        return `${year}-${this.getMonthIdxByName(month) < 10 ? '0' + this.getMonthIdxByName(month) : this.getMonthIdxByName(month)}`
    }
    getDatesInRange(startDate: Date, endDate: Date): Date[] {
        const dates: Date[] = [];
        let currentDate = startOfDay(startDate);
    
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }
    
        return dates;
    }
    getLocalISOString(date: Date): string {
        let t: Date = new Date(date);
        let z: number = t.getTimezoneOffset() * 60 * 1000;
        let tLocal: Date = new Date(t.getTime() - z);
        tLocal = new Date(tLocal);
        return  tLocal.toISOString();
    }
    getFormattedRangeTitle(date: Date): string {
        return `${date.getDate()} ${this.getMonthNameByIdx(date.getMonth()).slice(0, 3)} ${date.getFullYear()}`
    }
    getQueryDate(date: Date): string {
        return this.getLocalISOString(date).slice(0, 10);
    }
    getQueryEndDate(date: Date): string {
        return this.getQueryDate(addDays(date, 1));
    }
    isAllTime(startDate: Date, endDate: Date): boolean {
        return isSameDay(startDate, new Date(2023, 5, 1))
            && isSameDay(endDate, new Date())
    }
    isMonth(startDate: Date, endDate: Date): boolean {
        return isSameDay(startOfMonth(startDate), startDate)
            && isSameDay(endOfMonth(endDate), endDate)
    }
}
const DateService = new DateServiceClass();
export default DateService
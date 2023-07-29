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
    getTime(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${date.getHours()}:${date.getMinutes()}`
    }
    getYearMonth(year: number, month: string): string {
        return `${year}-${this.getMonthIdxByName(month) < 10 ? '0' + this.getMonthIdxByName(month) : this.getMonthIdxByName(month)}`
    }
}
const DateService = new DateServiceClass();
export default DateService
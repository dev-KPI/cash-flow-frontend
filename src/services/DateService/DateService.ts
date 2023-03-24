class DateServiceClass {

    months: string[];
    days: string[];

    constructor(){
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
    getCurrentYear(): number{
        return new Date().getFullYear()
    }
    getMonthIdxByName(month: string): number{
        return this.months.indexOf(month) + 1
    }
    getMonthNameByIdx(month: number): string{
        return this.months[month]
    }
}
const DateService =  new DateServiceClass();
export default DateService
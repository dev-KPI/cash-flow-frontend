import { IDatesPerTime } from "./DateServiceInterfaces";
import { lastSomeDays, lastWeek, someMonth } from "./DateServiceDTOS";

class DateServiceClass {

    months: string[];
    days: string[];

    constructor(){
        this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    //array
    getArrayFromDatesPerLastSevenDays = (): IDatesPerTime[] => {
        let res: IDatesPerTime[] = [];
        for (let i = 7; i > 0 ; i--){
            res.push(lastSomeDays(this, i))
        }
        return res;
    }
    getArrayFromDatesPerLastThirtyDays = (): IDatesPerTime[] => {
        let res: IDatesPerTime[] = [];
        for (let i = this.getDaysInLastMonth(); i > 0; i--){
            res.push(lastSomeDays(this, i))
        }
        return res;
    }
    getArrayFromDatesPerLastWeek = (): IDatesPerTime[] => {
        let res: IDatesPerTime[] = [];
        for (let i = 7; i > 0; i--){
            res.push(lastWeek(this, i))
        }
        return res;
    }
    getArrayFromDatesPerSomeMonth = (month: number, year?: number): IDatesPerTime[] => {
        let res: IDatesPerTime[] = [];
        year = year ? year : this.getCurrentYear()
        for (let i = 0; i < this.getDaysInSomeMonth(month); i++){
            res.push(someMonth(this, month, i, year))
        }
        return res;
    }
    getArrayFromDatesPerYear = (year?: number): IDatesPerTime[] => {
        let res: IDatesPerTime[]  = []
        year = year ? year : DateService.getCurrentYear();
        for (let i = 0; i < this.months.length; i++){
            for (let j = 0; j < this.getDaysInSomeMonth(j); j++){
                res.push(someMonth(this, j, i, year))
            }
        }
        return res;
    }
    //item
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
        return new Date().getMonth()
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
    
    getDaysInLastMonth(): number {
        return new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
    }
    getDaysInCurrentMonth(): number {
        return new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
    }
    getDaysInSomeMonth(month: number): number {
        return new Date(new Date().getFullYear(), month, 0).getDate();
    }
    //sorts
    sortArrayByDate(arr: IDatesPerTime[]): IDatesPerTime[]  {
        const compare = (a: IDatesPerTime, b: IDatesPerTime) => a.date - b.date;
        return arr.sort(compare)
    }
    sortArrayByMonth(arr: IDatesPerTime[]): IDatesPerTime[]  {
        const compare = (a: IDatesPerTime, b: IDatesPerTime) => this.getMonthIdxByName(a.month) - this.getMonthIdxByName(b.month);
        return arr.sort(compare)
    }
}
const DateService =  new DateServiceClass();
export default DateService
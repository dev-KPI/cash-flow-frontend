import { IDatesPerTime } from "./DateServiceInterfaces";
import { lastSomeDays, lastWeek, someMonth } from "./DateServiceDTOS";

class DateServiceClass {

    months: string[];
    days: string[];

    constructor(){
        this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    
    getArrayFromMonth(): string[] {
        return this.months
    }
    getArrayFromDays(): string[] {
        return this.days
    }
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
        year = year ? year : 2023;
        for (let i = 0; i < this.getDaysInSomeMonth(month); i++){
            res.push(someMonth(this, month, year, i))
        }
        return res;
    }
    getDaysInLastMonth(): number {
        return new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
    }
    getDaysInSomeMonth(month: number): number {
        return new Date(new Date().getFullYear(), month, 0).getDate();
    }
    // filterArrayByDate(arr: IDatesPerTime[]): IDatesPerTime[]  {
    //     return arr.filter(el => el.date.getTime() >= fromDate.getTime() &&
    //     item.date.getTime() <= toDate.getTime();)
    // }
}
const DateService =  new DateServiceClass();
export default DateService
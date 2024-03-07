import { FC, useState } from 'react';
import DatePicker from 'rsuite/DatePicker';

// UI
import './LocalDate.css'


interface ILocalDateProps {
    initialDate: Date;
    setSelectedDate: (time: Date) => void;
}

const LocalDate:FC<ILocalDateProps> = ({ initialDate, setSelectedDate }) => {
    const [date, setDate] = useState<Date | null>(initialDate);

    const handleChange = (value: Date | null) => {
      setDate(value);
      setSelectedDate(value || new Date());
    };
    return (
        <div className="localdate">
             <DatePicker 
                format="yyyy/MM/dd HH:mm"  
                placement="auto"
                // oneTap
                value={date} 
                onChange={handleChange}
                defaultValue={initialDate}
                calendarDefaultDate={initialDate}
                cleanable={false}
                />
        </div>
    )
}
   
export default LocalDate;
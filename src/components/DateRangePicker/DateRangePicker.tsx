//UI
import React, { useCallback, useEffect, useState } from 'react';
import { ClassNames, DateRangePicker, Range, RangeFocus, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import classes from './DateRangePicker.module.css';
import SmallModal from '@components/ModalWindows/SmallModal/SmallModal';
//logic
import UsePortal from '@hooks/layoutHooks/usePortal/usePortal';
import { useWindowSize } from 'usehooks-ts';
import { format, isWeekend, isSameDay, subWeeks, subDays, addDays, startOfWeek, endOfWeek, 
    startOfMonth, endOfMonth, parseISO} from 'date-fns';
import DateService from '@services/DateService/DateService';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { MonthPickerActions } from '@store/UI_store/MonthPickerSlice/MonthPickerSlice';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';


export interface ITimeRangePickerProps {
    isTimeRangePicker: boolean,
    setIsTimeRangePicker: React.Dispatch<React.SetStateAction<boolean>>
}

const TimeRangePicker: React.FC<ITimeRangePickerProps> = ({isTimeRangePicker, setIsTimeRangePicker}) => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [focusedRange, setFocusedRange] = useState<RangeFocus | undefined>(undefined);
    const [timeRanges, setTimeRanges] = useState<{ selection: Range }>({
        selection: {
            startDate: new Date(MonthPickerStore.startDate),
            endDate: new Date(MonthPickerStore.endDate),
            key: 'selection',
        },
    });

    const classnamesDateRangePicker: ClassNames = {
        definedRangesWrapper: classes.DefinedRangesWrapper,
        dateRangePickerWrapper: classes.DateRangePickerWrapper,
        staticRange: classes.StaticRange,
        staticRanges: classes.StaticRanges,
        staticRangeLabel: classes.StaticRangeLabel,
        day: classes.Day,
        days: classes.Days,
        calendarWrapper: classes.CalendarWrapper,
        monthAndYearPickers: classes.MonthAndYearPickers,
        dayToday: classes.TodayDay,
        inRange: classes.InRange,
        month: classes.Month,
        months: classes.Months,
        monthAndYearWrapper: classes.MonthAndYearWrapper,
        dayNumber: classes.DayNumber,
        dateDisplayWrapper: classes.DateDisplayWrapper,
        dateDisplay: classes.DateDisplay,
        dateDisplayItemActive: classes.DateDisplayItemActive,
        dateDisplayItem: classes.DateInput,
        weekDays: classes.WeekDays,
        weekDay: classes.WeekDay,
        monthName: classes.MonthName
    }

    const {width, height} = useWindowSize();
    const [dateChangeCount, setDateChangeCount] = useState<number>(0);

    const initTimeRangePicker = useCallback(() => {
        if(isTimeRangePicker && dateChangeCount >= 2){
            if(timeRanges.selection.startDate && timeRanges.selection.endDate){
                const localStartDate: Date = timeRanges.selection.startDate
                const localEndDate: Date = timeRanges.selection.endDate
                if(MonthPickerStore.rangesFromFastNav){
                    if(MonthPickerStore.isPickedWeekMonth){
                        MonthPickerDispatch.setStartDate(addDays(new Date(localStartDate), 1).toISOString())
                        MonthPickerDispatch.setEndDate(addDays(new Date(localEndDate), 1).toISOString())
                    } else {
                        MonthPickerDispatch.setStartDate(new Date(localStartDate).toISOString())
                        MonthPickerDispatch.setEndDate(addDays(new Date(localEndDate), 1).toISOString())
                    }
                    
                }   else {
                    MonthPickerDispatch.setStartDate(addDays(new Date(localStartDate), 1).toISOString())
                    MonthPickerDispatch.setEndDate(addDays(new Date(localEndDate), 2).toISOString())
                }
            }
            MonthPickerDispatch.setIsPickedWeekMonth(false);
            MonthPickerDispatch.setDateTimeByRangePickerEndDate();
            MonthPickerDispatch.setRangesFromFastNavStatus(false);
            setDateChangeCount(0);
            setTimeRanges({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                }
            });
            setIsTimeRangePicker(false);
        } 
    }, [dateChangeCount, timeRanges]);

    const closeTimeRangePicker = useCallback(() => {
        MonthPickerDispatch.setDateTimeByRangePickerEndDate();
        MonthPickerDispatch.setRangesFromFastNavStatus(false);
        setDateChangeCount(0);
        setTimeRanges({
            selection: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
        });
        setIsTimeRangePicker(false);
    }, []);

    const today = new Date();

    useEffect(() => {
        initTimeRangePicker()
    }, [initTimeRangePicker])

    return (
    <UsePortal
    className={classes.wrapperModal}
    title='Select range'
    containerWidth={width > 1024 ? 860 : 680}
    isModalOpen={isTimeRangePicker}
    setIsModalOpen={setIsTimeRangePicker}>
        <div className={classes.contentWrapper}>
            <ul className={classes.FastNav}>
                <li 
                style={{color: `${(isSameDay(new Date() || 0, timeRanges.selection.startDate || 0) &&
                isSameDay(new Date() || 0, timeRanges.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('today')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true);    
                    setTimeRanges({selection: {
                        startDate: new Date(),
                        endDate: new Date(),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>Today</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(subDays(new Date(), 1) || 0, timeRanges.selection.startDate || 0) &&
                isSameDay(subDays(new Date(), 1) || 0, timeRanges.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('yesterday')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true);    
                    setTimeRanges({selection: {
                        startDate: subDays(new Date(), 1),
                        endDate: subDays(new Date(), 1),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>Yesterday</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(addDays(startOfWeek(new Date()), 1) || 0, timeRanges.selection.startDate || 0) &&
                isSameDay(addDays(endOfWeek(new Date()), 1) || 0, timeRanges.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('week'); 
                    MonthPickerDispatch.setRangesFromFastNavStatus(true);    
                    MonthPickerDispatch.setIsPickedWeekMonth(true);
                    setTimeRanges({selection: {
                        startDate: addDays(startOfWeek(new Date()), 1),
                        endDate: addDays(endOfWeek(new Date()), 1),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>This week</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(addDays(startOfWeek(subWeeks(new Date(), 1)), 1) || 0, timeRanges.selection.startDate || 0) &&
                isSameDay(addDays(endOfWeek(subWeeks(new Date(), 1)), 1) || 0, timeRanges.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('lastweek'); 
                    MonthPickerDispatch.setRangesFromFastNavStatus(true);    
                    MonthPickerDispatch.setIsPickedWeekMonth(true);
                    setTimeRanges({selection: {
                        startDate: addDays(startOfWeek(subWeeks(new Date(), 1)), 1),
                        endDate: addDays(endOfWeek(subWeeks(new Date(), 1)), 1),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>Last week</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(startOfMonth(new Date()) || 0, timeRanges.selection.startDate || 0) &&
                    isSameDay(endOfMonth(new Date()) || 0, timeRanges.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('month'); 
                    MonthPickerDispatch.setRangesFromFastNavStatus(true);    
                    MonthPickerDispatch.setIsPickedWeekMonth(true);
                    setTimeRanges({selection: {
                        startDate: startOfMonth(new Date()),
                        endDate: endOfMonth(new Date()),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>This month</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(new Date(2023, 0, 1) || 0, timeRanges.selection.startDate || 0) &&
                    isSameDay(new Date() || 0, timeRanges.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('alltime')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true);    
                    setTimeRanges({selection: {
                        startDate: new Date(2023, 0, 1),
                        endDate: new Date()
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>All time</h3>
                    </button>
                </li>
            </ul>
            <div className={classes.leftSection}>
                <DateRangePicker
                    showPreview={true}
                    classNames={classnamesDateRangePicker} 
                    showMonthAndYearPickers={false}
                    onChange={(item) => {
                        setTimeRanges({ ...timeRanges, ...item })
                    }}
                    maxDate={new Date()}
                    weekStartsOn={1}
                    months={width > 768 ? 2 : 1}
                    ranges={[timeRanges.selection]}
                    dragSelectionEnabled={true}
                    focusedRange={focusedRange}
                    onRangeFocusChange={(focus) => {
                      setFocusedRange(focus);
                    }}
                    calendarFocus={'backwards'}
                    direction="horizontal"
                    rangeColors={['var(--main-green)']}
                />
                <div className={classes.SubmitBlock}>
                    <CustomButton
                    type='primary'
                    icon='submit'
                    callback={() => setDateChangeCount(2)}
                    isPending={false}>Submit</CustomButton>
                    <CustomButton
                    type='danger'
                    icon='refuse'
                    callback={() => closeTimeRangePicker()}
                    isPending={false}>Cancel</CustomButton>
                </div>
            </div>
        </div>
    </UsePortal>);
}

export default TimeRangePicker
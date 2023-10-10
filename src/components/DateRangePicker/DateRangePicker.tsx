//UI
import React, { useCallback, useEffect, useState } from 'react';
import { ClassNames, DateRangePicker, RangeFocus } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import classes from './DateRangePicker.module.css';
//logic
import UsePortal from '@hooks/layoutHooks/usePortal/usePortal';
import { useWindowSize } from 'usehooks-ts';
import { format, isWeekend, isSameDay, subWeeks, subDays, addDays, startOfWeek, endOfWeek, 
    startOfMonth, endOfMonth, parseISO, startOfDay, endOfDay, addMonths
} from 'date-fns';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { MonthPickerActions } from '@store/UI_store/MonthPickerSlice/MonthPickerSlice';
import CustomButton from '@components/Buttons/CustomButton/CustomButton'

export interface ITimeRangePickerProps {
    isDateRangePicker: boolean,
    setIsDateRangePicker: React.Dispatch<React.SetStateAction<boolean>>
}

const defineds = {
    startOfWeek: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endOfWeek: endOfWeek(new Date(), { weekStartsOn: 1 }),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const DateRangePickerCard: React.FC<ITimeRangePickerProps> = ({isDateRangePicker, setIsDateRangePicker}) => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [focusedRange, setFocusedRange] = useState<RangeFocus | undefined>(undefined);
    const [range, setRange] = useState<{ startDate: Date, endDate: Date }>(
        {
            startDate: MonthPickerStore.startDate,
            endDate: MonthPickerStore.endDate
        });
    useEffect(() => {
        setRange({
            startDate: MonthPickerStore.startDate,
            endDate: MonthPickerStore.endDate
        })
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    const checkRange = {
        isThisMonth: isSameDay(range.startDate, defineds.startOfMonth) && isSameDay(range.endDate, defineds.endOfMonth),
        isLastWeek: isSameDay(range.startDate, defineds.startOfLastWeek) && isSameDay(range.endDate, defineds.endOfLastWeek),
        isThisWeek: isSameDay(range.startDate, defineds.startOfWeek) && isSameDay(range.endDate, defineds.endOfWeek),
        isYesterday: isSameDay(range.startDate, defineds.startOfYesterday) && isSameDay(range.endDate, defineds.endOfYesterday),
        isToday: isSameDay(range.startDate, defineds.startOfToday) && isSameDay(range.endDate, defineds.endOfToday),
        isAllTime: isSameDay(new Date(2023, 5, 1), range.startDate) && isSameDay(new Date(), range.endDate)
    }
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

    const closeWithNewRange = () => {
        MonthPickerDispatch.setStartDate(range.startDate);
        MonthPickerDispatch.setEndDate(range.endDate);
        setIsDateRangePicker(false);
    }
    const closeWithInitialRange = () => {
        setRange({
            startDate: MonthPickerStore.startDate,
            endDate: MonthPickerStore.endDate
        })
        setIsDateRangePicker(false);
    }

    return (
    <UsePortal
    className={classes.wrapperModal}
    title='Select range'
    callback={() => closeWithInitialRange() }
    containerWidth={width > 1024 ? 860 : 680}
    isModalOpen={isDateRangePicker}
    setIsModalOpen={setIsDateRangePicker}>
        <div className={classes.contentWrapper}>
            <ul className={classes.FastNav}>
                <li 
                    style={{ color: checkRange.isToday ? 'var(--main-green)' : '' }}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => setRange({startDate: defineds.startOfToday, endDate: defineds.endOfToday}) }
                    className={classes.FastRangeButton}>
                        <h3>Today</h3>
                    </button>
                </li>
                <li 
                    style={{ color: checkRange.isYesterday ? 'var(--main-green)' : '' }}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => setRange({ startDate: defineds.startOfYesterday, endDate: defineds.endOfYesterday })}
                    className={classes.FastRangeButton}>
                        <h3>Yesterday</h3>
                    </button>
                </li>
                <li 
                    style={{ color: checkRange.isThisWeek ? 'var(--main-green)' : '' }}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => setRange({startDate: defineds.startOfWeek, endDate: defineds.endOfWeek} )}
                    className={classes.FastRangeButton}>
                        <h3>This week</h3>
                    </button>
                </li>
                <li 
                    style={{ color: checkRange.isLastWeek ? 'var(--main-green)' : '' }}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => setRange({startDate: defineds.startOfLastWeek, endDate: defineds.endOfLastWeek})}
                    className={classes.FastRangeButton}>
                        <h3>Last week</h3>
                    </button>
                </li>
                <li 
                style={{color: checkRange.isThisMonth ? 'var(--main-green)' : ''}}
                className={classes.FastNav__Item}>
                    <button
                    onClick={() => setRange({startDate: defineds.startOfMonth, endDate: defineds.endOfMonth} )}
                    className={classes.FastRangeButton}>
                        <h3>This month</h3>
                    </button>
                </li>
                <li 
                style={{  color: checkRange.isAllTime ?  'var(--main-green)' : ''}}
                className={classes.FastNav__Item}>
                    <button
                    onClick={() => setRange({ startDate: new Date(2023, 5, 1), endDate: new Date() }) }
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
                        setRange({
                            startDate:item.selection.startDate || new Date(),
                            endDate: item.selection.endDate || new Date()
                        })
                    }}
                    maxDate={new Date()}
                    weekStartsOn={1}
                    months={width > 768 ? 2 : 1}
                    ranges={[{
                        startDate: range.startDate,
                        endDate: range.endDate,
                        key: 'selection',
                    }]}
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
                    callback={() => closeWithNewRange() }
                    isPending={false}>Submit</CustomButton>
                    <CustomButton
                    type='danger'
                    icon='refuse'
                    callback={() => closeWithInitialRange() }
                    isPending={false}>Cancel</CustomButton>
                </div>
            </div>
        </div>
    </UsePortal>);
}

export default DateRangePickerCard
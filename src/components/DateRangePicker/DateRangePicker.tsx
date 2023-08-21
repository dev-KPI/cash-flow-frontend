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
    isDateRangePicker: boolean,
    setIsDateRangePicker: React.Dispatch<React.SetStateAction<boolean>>,
    offRangePicker: () => void
}

const DateRangePickerCard: React.FC<ITimeRangePickerProps> = ({isDateRangePicker, setIsDateRangePicker, offRangePicker}) => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [focusedRange, setFocusedRange] = useState<RangeFocus | undefined>(undefined);
    const [dateRanges, setDateRanges] = useState<{ selection: Range }>({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    });
    const [dateRangesFromFastNav, setDateRangesFromFastNav] = useState<{ selection: Range }>({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
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
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const [isRefused, setIsRefused] = useState<boolean>(false);

    const closeRangePickerWithConditions = useCallback(() => {
        setIsDateRangePicker(false)
        setIsSubmited(false)
    }, [])

    const setNullDateStates = useCallback(() => {
        if(MonthPickerStore.rangesFromFastNav || isRefused){
            setIsRefused(false)
            setDateRanges({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            })
        } else if (!MonthPickerStore.rangesFromFastNav || isRefused) {
            setIsRefused(false)
            setDateRangesFromFastNav({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            })
        }
    }, [MonthPickerStore.rangesFromFastNav, MonthPickerStore.rangeType, isRefused])

    const closeRangePicker = useCallback(() => {
        const userTimezoneOffsetMinutes = new Date().getTimezoneOffset();
        const userTimezoneOffsetMilliseconds = userTimezoneOffsetMinutes * 60 * 1000;
        if(isDateRangePicker && isSubmited && !isRefused && dateRanges.selection.startDate && dateRanges.selection.endDate &&
            dateRangesFromFastNav.selection.startDate && dateRangesFromFastNav.selection.endDate){
            if(MonthPickerStore.rangesFromFastNav){
                const startDateInUserTimezone = new Date(dateRangesFromFastNav.selection.startDate.getTime() - userTimezoneOffsetMilliseconds);
                const endDateInUserTimezone = new Date(dateRangesFromFastNav.selection.endDate.getTime() - userTimezoneOffsetMilliseconds);
                const adjustedStartDate = startDateInUserTimezone.toISOString();
                const adjustedEndDate = endDateInUserTimezone.toISOString();
                MonthPickerDispatch.setStartDate(adjustedStartDate)
                MonthPickerDispatch.setEndDate(addDays(new Date(adjustedEndDate), 1).toISOString())
            } else {
                const startDateInUserTimezone = new Date(dateRanges.selection.startDate.getTime() - userTimezoneOffsetMilliseconds);
                const endDateInUserTimezone = new Date(dateRanges.selection.endDate.getTime() - userTimezoneOffsetMilliseconds);
                const adjustedStartDate = startDateInUserTimezone.toISOString();
                const adjustedEndDate = endDateInUserTimezone.toISOString();
                MonthPickerDispatch.setStartDate(adjustedStartDate)
                MonthPickerDispatch.setEndDate(addDays(new Date(adjustedEndDate), 1).toISOString())
            }
            MonthPickerDispatch.setIsChangedRangeFromMount(true)
            setDateRanges({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            })
            setDateRangesFromFastNav({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            })
            closeRangePickerWithConditions()
        } else if(!MonthPickerStore.isChangedRangeFromMount && isDateRangePicker && isSubmited && !isRefused) {
            const startDateInUserTimezone = new Date(new Date().getTime() - userTimezoneOffsetMilliseconds);
            const endDateInUserTimezone = new Date(new Date().getTime() - userTimezoneOffsetMilliseconds);
            const adjustedStartDate = startDateInUserTimezone.toISOString();
            const adjustedEndDate = endDateInUserTimezone.toISOString();
            MonthPickerDispatch.setStartDate(adjustedStartDate)
            MonthPickerDispatch.setEndDate(addDays(new Date(adjustedEndDate), 1).toISOString())
            MonthPickerDispatch.setIsChangedRangeFromMount(true)
            MonthPickerDispatch.setRangeType('today')
            closeRangePickerWithConditions()
        } else if(isRefused){
            closeRangePickerWithConditions()
            setDateRanges({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            })
            setDateRangesFromFastNav({
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            })
        }
    }, [isSubmited, isRefused]);

    useEffect(() => {
        closeRangePicker()
        setNullDateStates()
    }, [closeRangePicker, setNullDateStates])

    return (
    <UsePortal
    className={classes.wrapperModal}
    title='Select range'
    callback={() => setIsRefused(true)}
    containerWidth={width > 1024 ? 860 : 680}
    isModalOpen={isDateRangePicker}
    setIsModalOpen={setIsDateRangePicker}>
        <div className={classes.contentWrapper}>
            <ul className={classes.FastNav}>
                <li 
                style={{color: `${(isSameDay(new Date() || 0, dateRangesFromFastNav.selection.startDate || 0) &&
                isSameDay(new Date() || 0, dateRangesFromFastNav.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('today')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true)
                    setDateRangesFromFastNav({selection: {
                        startDate: new Date(),
                        endDate: new Date(),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>Today</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(subDays(new Date(), 1) || 0, dateRangesFromFastNav.selection.startDate || 0) &&
                isSameDay(subDays(new Date(), 1) || 0, dateRangesFromFastNav.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('yesterday')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true)
                    setDateRangesFromFastNav({selection: {
                        startDate: subDays(new Date(), 1),
                        endDate: subDays(new Date(), 1),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>Yesterday</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(addDays(startOfWeek(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date()), 1) || 0, dateRangesFromFastNav.selection.startDate || 0) &&
                isSameDay(addDays(endOfWeek(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date()), 1) || 0, dateRangesFromFastNav.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('week')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true)
                    setDateRangesFromFastNav({selection: {
                        startDate: addDays(startOfWeek(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date()), 1),
                        endDate: addDays(endOfWeek(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date()), 1),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>This week</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(addDays(startOfWeek(subWeeks(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date(), 1)), 1) || 0, dateRangesFromFastNav.selection.startDate || 0) &&
                isSameDay(addDays(endOfWeek(subWeeks(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date(), 1)), 1) || 0, dateRangesFromFastNav.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                    className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('lastweek')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true)
                    setDateRangesFromFastNav({selection: {
                        startDate: addDays(startOfWeek(subWeeks(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date(), 1)), 1),
                        endDate: addDays(endOfWeek(subWeeks(new Date().getDay() === 0 ? subDays(new Date(), 1) : new Date(), 1)), 1),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>Last week</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(startOfMonth(new Date()) || 0, dateRangesFromFastNav.selection.startDate || 0) &&
                    isSameDay(endOfMonth(new Date()) || 0, dateRangesFromFastNav.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('month')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true)
                    setDateRangesFromFastNav({selection: {
                        startDate: startOfMonth(new Date()),
                        endDate: endOfMonth(new Date()),
                    }})}}
                    className={classes.FastRangeButton}>
                        <h3>This month</h3>
                    </button>
                </li>
                <li 
                style={{color: `${(isSameDay(new Date(2023, 0, 1) || 0, dateRangesFromFastNav.selection.startDate || 0) &&
                    isSameDay(new Date() || 0, dateRangesFromFastNav.selection.endDate || 0)) ? 'var(--main-green)' : ''}`}}
                className={classes.FastNav__Item}>
                    <button
                    onClick={() => {
                    MonthPickerDispatch.setRangeType('alltime')
                    MonthPickerDispatch.setRangesFromFastNavStatus(true)
                    setDateRangesFromFastNav({selection: {
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
                        setDateRanges({ ...dateRanges, ...item })
                        MonthPickerDispatch.setRangesFromFastNavStatus(false)
                        MonthPickerDispatch.setRangeType('range')
                    }}
                    maxDate={new Date()}
                    weekStartsOn={1}
                    months={width > 768 ? 2 : 1}
                    ranges={MonthPickerStore.rangesFromFastNav ? [dateRangesFromFastNav.selection] : [dateRanges.selection]}
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
                    callback={() => setIsSubmited(true)}
                    isPending={false}>Submit</CustomButton>
                    <CustomButton
                    type='danger'
                    icon='refuse'
                    callback={() => {
                        setIsRefused(true)
                        closeRangePickerWithConditions()
                    }}
                    isPending={false}>Cancel</CustomButton>
                </div>
            </div>
        </div>
    </UsePortal>);
}

export default DateRangePickerCard
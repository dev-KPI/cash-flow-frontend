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
import { format, isWeekend, isSameDay, lastDayOfMonth } from 'date-fns';
import DateService from '@services/DateService/DateService';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { MonthPickerActions } from '@store/UI_store/MonthPickerSlice/MonthPickerSlice';


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

    const closeTimeRangePicker = useCallback(() => {
        if(isTimeRangePicker && dateChangeCount >= 2){
            if(timeRanges.selection.startDate && timeRanges.selection.endDate){
                MonthPickerDispatch.setStartDate(timeRanges.selection.startDate.toISOString())
                MonthPickerDispatch.setEndDate(timeRanges.selection.endDate.toISOString())
            }
            MonthPickerDispatch.setDateTimeByRangePickerEndDate();
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
    
    const staticRanges = defaultStaticRanges.map((el, i) => {
        if(i === 5) {
            return {
                label: "All time",
                range: () => ({
                  startDate: new Date(2023, 1, 1),
                  endDate: new Date()
                }),
                isSelected(range: Range) {
                    const definedRange = el.range();
                    setDateChangeCount(1);
                    return (
                        isSameDay(range.startDate || 0, definedRange.startDate || 0) &&
                        isSameDay(range.endDate || 0, definedRange.endDate|| 0)
                    );
                }
            }
        }
        else {
            return {
                ...el,
                isSelected(range: Range) {
                    const definedRange = el.range();
                    setDateChangeCount(1);
                    return (
                        isSameDay(range.startDate || 0, definedRange.startDate || 0) &&
                        isSameDay(range.endDate || 0, definedRange.endDate|| 0)
                    );
                }
            }
        }
    })

    useEffect(() => {
        closeTimeRangePicker()
    }, [closeTimeRangePicker])

    return (
    <UsePortal
    className={classes.wrapperModal}
    title='Select range'
    containerWidth={width > 1024 ? 960 : 680}
    isModalOpen={isTimeRangePicker}
    setIsModalOpen={setIsTimeRangePicker}>
        <DateRangePicker
            showPreview={true}
            classNames={classnamesDateRangePicker} 
            showMonthAndYearPickers={false}
            onChange={(item) => {
                if(isTimeRangePicker){setDateChangeCount(dateChangeCount + 1)}
                setTimeRanges({ ...timeRanges, ...item })
            }}
            maxDate={new Date()}
            months={width > 520 ? 2 : 1}
            ranges={[timeRanges.selection]}
            dragSelectionEnabled={true}
            focusedRange={focusedRange}
            onRangeFocusChange={(focus) => {
              setFocusedRange(focus);
            }}
            staticRanges={staticRanges}
            calendarFocus={'backwards'}
            direction="horizontal"
            rangeColors={['var(--main-green)']}
        />
    </UsePortal>);
}

export default TimeRangePicker
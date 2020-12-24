import * as datesConstants from "../data/constants/DatesRelatedConstants";

export const collectDates = (reservedDates) => {
    let reservedDatesDateTimes = [];
    reservedDates.forEach((reservedDate) => {
        const reservedDateDateTime = new Date(
            reservedDate.year,
            reservedDate.month,
            reservedDate.day,
            reservedDate.hour
        );
        reservedDatesDateTimes.push(reservedDateDateTime);
    });
    return reservedDatesDateTimes;
};

export const determineFirstAvailableDay = () => {
    let curDate = new Date();
    if(curDate.getHours() >= datesConstants.CLOSING_HOUR) {
        curDate = curDate.setDate(curDate.getDate() + 1);
    }
    return setOnMondayIfIsWeekend(curDate);
};

export const setOnMondayIfIsWeekend = (currentDate) => {
    if(currentDate.getDay() === 0) {
        return new Date(currentDate.setDate(currentDate.getDate() + 1));
    } else if (currentDate.getDay() === 6 ) {
        return new Date(currentDate.setDate(currentDate.getDate() + 2));
    }
    return currentDate;
};

export const collectOnlyCurrentProcessedDayDates = (
    selectedDates,
    curDate
) => {
    return selectedDates.filter(
        (selectedDate) =>
            selectedDate.getFullYear() === curDate.getFullYear() &&
            selectedDate.getMonth() === curDate.getMonth() &&
            selectedDate.getDate() === curDate.getDate()
    );
};

export const findLastAvailableDate = () => {
    let curDate = determineFirstAvailableDay();
    for (
        let currentDay = 1;
        currentDay < datesConstants.DAYS_RANGE;
        currentDay++
    ) {
        curDate.setDate(curDate.getDate() + 1);
        curDate = setOnMondayIfIsWeekend(curDate);
    }
    return curDate;
}
export const dateIsToday = (date) => {
    const today = new Date();
    return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}
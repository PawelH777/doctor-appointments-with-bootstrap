import React from "react";

import {
    collectDates,
    determineFirstAvailableDay,
    setOnMondayIfIsWeekend,
    collectOnlyCurrentProcessedDayDates,
    dateIsToday
} from './dateUtilties';
import * as datesConstants from "../data/constants/DatesRelatedConstants";

const OPENING_HOURS = {
    openingHour: datesConstants.OPENING_HOUR,
    closingHour: datesConstants.CLOSING_HOUR,
};

export const prepareAppointmentDateElement = (date, hour) => {
    return (
        <div>
            <h6>{hour}:00</h6>
            <h5>{date}</h5>
        </div>
    );
};

export const prepareAppointmentsMap = (reservedDates) => {
    const alreadySelectedDates = collectDates(reservedDates);
    let curDate = determineFirstAvailableDay();
    const actualSelectedDates = alreadySelectedDates.filter((selectedDate) => selectedDate >= curDate);
    let appointmentsMap = {
        [curDate.toLocaleDateString()]: buildDatesForStartingDay(curDate, OPENING_HOURS, actualSelectedDates),
    };
    for (
        let currentDay = 1;
        currentDay < datesConstants.DAYS_RANGE;
        currentDay++
    ) {
        curDate.setDate(curDate.getDate() + 1);
        curDate = setOnMondayIfIsWeekend(curDate);
        const reservedDatesInCurrentDay = collectOnlyCurrentProcessedDayDates(
            actualSelectedDates,
            curDate
        );
        const datesObjects = buildDatesForCurrentDay(
            curDate,
            OPENING_HOURS,
            reservedDatesInCurrentDay
        );
        appointmentsMap = {
            ...appointmentsMap,
            [curDate.toLocaleDateString()]: datesObjects,
        };
    }
    return appointmentsMap;
};

const buildDatesForStartingDay = (curDate, openingHours, actualSelectedDates) => {
    const reservedDatesInCurrentDay = collectOnlyCurrentProcessedDayDates(
        actualSelectedDates,
        curDate
    );
    const dates = [];
    const dateInLocalDateFormat = curDate.toLocaleDateString();
    for (
        let currentHour = openingHours.openingHour;
        currentHour < openingHours.closingHour;
        currentHour++
    ) {
        const date = {
            id: currentHour + dateInLocalDateFormat,
            year: curDate.getFullYear(),
            month: curDate.getMonth(),
            day: curDate.getDate(),
            date: dateInLocalDateFormat,
            hour: currentHour,
            isReserved: isCurrentHourAvailable(currentHour, reservedDatesInCurrentDay, curDate, dateIsToday(curDate)),
        };
        dates.push(date);
    }
    return dates;
}

const isCurrentHourAvailable = (hour, selectedDates, currentDate, isToday) => {
    if (!isToday || hour > currentDate.getHours()) {
        return isCurrentHourReserved(hour, selectedDates);
    }
    return true;
}

const buildDatesForCurrentDay = (
    curDate,
    openingHours,
    reservedDatesInCurrentDay
) => {
    const dates = [];
    const dateInLocalDateFormat = curDate.toLocaleDateString();
    for (
        let currentHour = openingHours.openingHour;
        currentHour < openingHours.closingHour;
        currentHour++
    ) {
        const date = {
            id: currentHour + dateInLocalDateFormat,
            year: curDate.getFullYear(),
            month: curDate.getMonth(),
            day: curDate.getDate(),
            date: dateInLocalDateFormat,
            hour: currentHour,
            isReserved: isCurrentHourReserved(currentHour, reservedDatesInCurrentDay),
        };
        dates.push(date);
    }
    return dates;
};

const isCurrentHourReserved = (currentHour, reservedDates) => {
    let isReserved = false;
    reservedDates.forEach((reservedDate) => {
        if (reservedDate.getHours() === currentHour) {
            isReserved = true;
        }
    });
    return isReserved;
};

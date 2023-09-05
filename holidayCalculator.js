function calculateHolidays(year) {
    // OLD method below
    // How to calculate bank holiday allowance:
    // (Number of bank holidays * 0.8) - bank holidays that fall on my working days (Tues - Fri)

    // Total = normal allowance + bank holiday allowance + birthday allowance

    const bankHolidayYears = {
        2022: [
            'January 3',
            'April 15',
            'April 18',
            'May 2',
            'June 2',
            'June 3',
            'August 29',
            'September 19',
            'December 26',
            'December 27'
        ],
        2023: [
            'January 2',
            'April 7',
            'April 10',
            'May 1',
            'May 8',
            'May 29',
            'August 28',
            'December 25',
            'December 26'
        ],
        2024: [
            'January 1',
            'March 29',
            'April 1',
            'May 6',
            'May 27',
            'August 26',
            'December 25',
            'December 26'
        ]
    }

    // 2023 calculation: hey Andy so your entitlement is correct, 27.5 of which 20 A/L and 7.5 BH allowance (calculated on 9 BH this year)

    const roundedUp = total => Math.ceil(total / 0.5) * 0.5 // Vicky's calculation rounds up to the nearest 0.5, so matching that here

    const prettyDates = date => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString('en-GB', options)
    }

    const bankHolidays = bankHolidayYears[year].map(date => new Date(`${date}, ${year} 12:00:00`))

    const fullTimeWorkingDays = [1, 2, 3, 4, 5]
    const myWorkingDays = [2, 3, 4, 5]
    const myDayOff = 1
    const myWorkingDaysPerWeek = myWorkingDays.length / fullTimeWorkingDays.length

    const totalBankHolidaysInYear = bankHolidays.length
    const bankHolidaysOnMyWorkingDays = bankHolidays.filter(date => date.getUTCDay() !== myDayOff)
    const myBankHolidayAllowance = totalBankHolidaysInYear * myWorkingDaysPerWeek
    const myBankHolidayAllowanceRoundedUp = roundedUp(myBankHolidayAllowance)

    const fullTimeLeaveAllowance = 25
    const myPartTimeLeaveAllowance = fullTimeLeaveAllowance * myWorkingDaysPerWeek
    const myBirthdayAllowance = 1
    const myTotalAllowance =
        myPartTimeLeaveAllowance + myBirthdayAllowance + myBankHolidayAllowanceRoundedUp
    const needToBookOffWithBankHolidayAllowance = bankHolidaysOnMyWorkingDays.map(date =>
        prettyDates(date)
    )
    const timetasticAllowance = myTotalAllowance - myBirthdayAllowance // don't include the birthday allowance here, that's a separate allowance on timetastic
    const bankHolidaysForYear = bankHolidays.map(date => prettyDates(date))

    return {
        bankHolidaysForYear,
        myPartTimeLeaveAllowance,
        myBirthdayAllowance,
        myBankHolidayAllowanceRoundedUp,
        year,
        myTotalAllowance, // this includes the birthday 1 day allowance
        needToBookOffWithBankHolidayAllowance, // these are the "Bank holiday (part time staff only)" days that I need to manually book off
        timetasticAllowance // this is the total that timetastic should display (and what Vicky tells me)
    }
}

console.log(calculateHolidays('2024'))

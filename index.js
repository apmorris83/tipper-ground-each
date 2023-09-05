const { data } = require('./data.json')

/**
 * Get a person's bank holidays for a particular year.
 * @param {string} person Person to check.
 * @param {string} year Year to check.
 * @returns an array of date strings.
 */
const getBankHolidays = (person, year) => {
    const bankHolidays = data[person].bankHolidays[year]
    return bankHolidays.map(date => new Date(`${date} 12:00:00`))
}

/**
 * Get the bank holidays that fall on a person's working day, for a particular year.
 * @param {string} person Person to check.
 * @param {string} year Year to check.
 * @returns an array of date strings.
 */
const getBankHolidaysOnWorkingDay = (person, year) => {
    const { nonWorkingDay } = data[person].config
    const bankHolidays = getBankHolidays(person, year)
    return bankHolidays.filter(date => date.getUTCDay() !== nonWorkingDay)
}

/**
 * Get a person's bank holiday allowance for a particular year.
 * @param {string} person Person to check.
 * @param {string} year Year to check.
 * @returns a number in hours of total bank holiday allowance.
 */
const getBankHolidayAllowance = (person, year) => {
    const { hoursPerWorkingDay, hoursWorkedPerWeek, hoursInFullTimeWeek } = data[person].config
    const bankHolidays = getBankHolidays(person, year)
    const bankHolidaysOnWorkingDay = getBankHolidaysOnWorkingDay(person, year)
    const bankHolidaysOnWorkingDayInHours = bankHolidaysOnWorkingDay.length * hoursPerWorkingDay
    const bankHolidayAllowance =
        bankHolidays.length * hoursPerWorkingDay * (hoursWorkedPerWeek / hoursInFullTimeWeek)

    console.log({
        person,
        year,
        bankHolidays,
        bankHolidaysOnWorkingDay,
        bankHolidaysOnWorkingDayInHours,
        bankHolidayAllowance
    })

    return bankHolidayAllowance - bankHolidaysOnWorkingDayInHours
}

/**
 * Get a person's total holiday allowance for a particular year.
 * @param {string} person Person to check.
 * @param {string} year Year to check.
 * @returns a number in hours of total holiday allowance.
 */
const getHolidayAllowance = (person, year) => {
    const { leaveAllowance } = data[person].config
    const bankHolidayAllowance = getBankHolidayAllowance(person, year)

    console.log({ leaveAllowance, bankHolidayAllowance })

    return leaveAllowance + bankHolidayAllowance
}

module.exports = {
    getBankHolidays,
    getBankHolidaysOnWorkingDay,
    getBankHolidayAllowance,
    getHolidayAllowance
}

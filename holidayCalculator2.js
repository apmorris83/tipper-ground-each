const data = [
    {
        name: 'Mog',
        numberOfHoursWorkedPerWeek: 32,
        numberOfHoursInFullTimeWeek: 40,
        hoursPerWorkingDay: 8,
        leaveAllowance: 160,
        bankHolidaysPerYear: {
            '23/24': 11, // start from 6 April 2023, until 5 April 2024
            '24/25': 6 // start from 6 April 2024, until 5 April 2025
        }
    },
    {
        name: 'Fitzy',
        numberOfHoursWorkedPerWeek: 30,
        numberOfHoursInFullTimeWeek: 37.5,
        hoursPerWorkingDay: 7.5,
        leaveAllowance: 198,
        bankHolidaysPerYear: {
            '23/24': 10, // start from 1 April 2023, until 31 March 2024
            '24/25': 7 // start from 1 April 2024, until 31 March 2025
        }
    }
]

const partWayThrough2023Data = {
    name: 'Mog',
    numberOfHoursWorkedPerWeek: 32,
    numberOfHoursInFullTimeWeek: 40,
    hoursPerWorkingDay: 8,
    leaveAllowance: roundedUp((160 / 12) * 6.5),
    bankHolidaysPerYear: {
        '23/24': 5
    }
}

function roundedUp(total) {
    return Math.ceil(total / 0.5) * 0.5
}

function calculateHolidayAllowance() {
    const res = data.map(person => {
        return {
            name: person.name,
            data: Object.keys(person.bankHolidaysPerYear).map(year => {
                const isMogStartingPartWay = year === '23/24' && person.name === 'Mog'

                const numberOfBankHolidays = isMogStartingPartWay
                    ? partWayThrough2023Data.bankHolidaysPerYear[year]
                    : person.bankHolidaysPerYear[year]

                const {
                    numberOfHoursWorkedPerWeek,
                    numberOfHoursInFullTimeWeek,
                    hoursPerWorkingDay,
                    leaveAllowance
                } = person

                const adjustedLeaveAllowance = isMogStartingPartWay
                    ? partWayThrough2023Data.leaveAllowance
                    : leaveAllowance

                const bankHolidayAllowance = roundedUp(
                    (numberOfHoursWorkedPerWeek / numberOfHoursInFullTimeWeek) *
                        (numberOfBankHolidays * hoursPerWorkingDay)
                )

                console.log(bankHolidayAllowance)

                const days = (bankHolidayAllowance + adjustedLeaveAllowance) / hoursPerWorkingDay
                const hours = bankHolidayAllowance + adjustedLeaveAllowance

                return {
                    year,
                    days,
                    hours: roundedUp(hours)
                }
            })
        }
    })

    res.forEach(entry => {
        console.log(entry.name)
        console.table(entry.data)
    })
}

calculateHolidayAllowance()

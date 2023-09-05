const {
    getBankHolidays,
    getBankHolidaysOnWorkingDay,
    getBankHolidayAllowance,
    getHolidayAllowance
} = require('..')

test('should return correct number of bank holidays for mog', () => {
    expect(getBankHolidays('mog', '23/24')).toHaveLength(11)
    expect(getBankHolidays('mog', '24/25')).toHaveLength(6)
})

test('should return correct number of bank holidays for fitzy', () => {
    expect(getBankHolidays('fitzy', '23/24')).toHaveLength(10)
    expect(getBankHolidays('fitzy', '24/25')).toHaveLength(7)
})

test('should return correct number of bank holidays that fall on the working days for mog', () => {
    expect(getBankHolidaysOnWorkingDay('mog', '23/24')).toHaveLength(3)
    expect(getBankHolidaysOnWorkingDay('mog', '24/25')).toHaveLength(3)
})

test('should return correct number of bank holidays that fall on the working days for fitzy', () => {
    expect(getBankHolidaysOnWorkingDay('fitzy', '23/24')).toHaveLength(10)
    expect(getBankHolidaysOnWorkingDay('fitzy', '24/25')).toHaveLength(5)
})

test('should return correct bank holiday allowance for mog', () => {
    expect(getBankHolidayAllowance('mogIBMProRata', '23/24')).toBe(16)
    expect(getBankHolidayAllowance('mogML', '24')).toBe(25.5)
})

test('should return correct total holiday allowance for mog', () => {
    expect(getHolidayAllowance('mogIBMProRata', '23/24')).toBe(104)
    expect(getHolidayAllowance('mogML', '24')).toBe(175.5)
    expect(getHolidayAllowance('mog', '24/25')).toBe(174.4)
})

test('should return correct total holiday allowance for fitzy', () => {
    expect(getHolidayAllowance('fitzy', '23/24')).toBe(183) // 258 with bank holidays that fall on working days
    expect(getHolidayAllowance('fitzy', '24/25')).toBe(202.5) // 240 with bank holidays that fall on working days
})

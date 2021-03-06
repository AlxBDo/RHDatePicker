const date = new Date()

/**
 * Convert a digit to a number
 * @param {number} number 
 * @returns {string}
 */
export const transformToNumber = (number) => number.toLocaleString(
    undefined, { minimumIntegerDigits: 2, useGrouping: false })

/**
 * Store current date - contains day, month and year attributes
 */
export const currentDate = {
    day: transformToNumber(date.getDate()), 
    month: transformToNumber(date.getMonth() + 1) , 
    year: date.getFullYear()
}

/**
 * Store current time - contains hour and minute attributes
 */
export const currentTime = {
    hour: transformToNumber(date.getHours()), 
    minute: transformToNumber(date.getMinutes()) 
}

/**
 * Input pattern array
 */
export const datePattern = [
    "[0-9]{4}-[0-9]{2}-[0-9]{2}", 
    "[0-9]{2}-[0-9]{2}-[0-9]{4}", 
    "[0-9]{1}-[0-9]{1}-[0-9]{4}", 
    "[0-9]{1}.[0-9]{1}.[0-9]{4}"
]

/**
 * Input placeholder array
 */
export const datePlaceholder = ["YYYY-MM-DD", "JJ-MM-AAAA", "J-M-AAAA", "J.M.AAAA"]

/**
 * provides the start and end years of the select
 * @param {string} minOrMax - max = last year accepted 
 * @returns {interger} year
*/
export const getLimitYear = (minOrMax) => minOrMax === "max" 
                          ? currentDate.year + 30 : currentDate.year - 70

/**
 * Provide month informations. Contains name (month names array) and getLength (function) attributes
 */
export const months = {

    name: [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August",
        "September",
        "October",
        "November",
        "December"
    ], 

    /**
     * Provides month length
     * @param {number} month 
     * @param {number} year 
     * @returns {number}
     */
    getLength: (month, year) => {
        switch(month){
            case 1 : return parseInt(year) % 4 === 0 ? 28 : 27
            case 3 : case 5 : case 7 : case 8 : case 10 : return 30
            default : return 31
        }
    }
}

export const timePattern = "[0-9]{2}:[0-9]{2}" 

export const timePlaceholder = "HH:MM"

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
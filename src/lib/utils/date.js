const date = new Date()

export const transformToNumber = (number) => number.toLocaleString(
    undefined, { minimumIntegerDigits: 2, useGrouping: false })

export const currentDate = {
    day: transformToNumber(date.getDate()), 
    month: transformToNumber(date.getMonth() + 1) , 
    year: date.getFullYear()
}

/**
 * provides the start and end years of the select
 * @param {string} minOrMax - max = last year accepted 
 * @returns {interger} year
*/
export const getLimitYear = (minOrMax) => minOrMax === "max" 
                          ? currentDate.year + 30 : currentDate.year - 70

/**
 * contains month information
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
    getLength: (month, year) => {
        switch(month){
            case 1 : return parseInt(year) % 4 === 0 ? 28 : 27
            case 3 : case 5 : case 7 : case 8 : case 10 : return 30
            default : return 31
        }
    }
}

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
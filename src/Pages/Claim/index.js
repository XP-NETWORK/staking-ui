
import moment from "moment"


const durations = {
    7776000: 3,
    15552000: 6,
    23328000: 9,
    31104000: 12
}

export const convertToMonth = (seconds) => {
    
    if(seconds === '7776000')return {percent: 45, month: 3}
    else if(seconds === '15552000') return {percent : 75, month: 6}
    else if(seconds === '23328000') return {percent: 100, month: 9}
    else if(seconds === '31104000') return {percent: 125, month: 1}
    else return {percent: 0, month: 0}
}
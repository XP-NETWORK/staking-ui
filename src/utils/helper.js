import moment from 'moment';
import { store } from '../redux/store';
import { updateStartDate } from "../redux/stakeSlice"

export const getPercent = (durationsArr, duration ) => {
    let percent
    durationsArr.forEach(item => {
        // debugger
        if(item.d === duration){
            percent = item.p
        }
    })
    return percent
}


export const getProgress = () => {
    const daysDuration = 60
    const daysPassed = 22
    return daysPassed/daysDuration*100
} 

export const getPercents = (seconds) => {
    if(seconds === '7776000')return {percent: 45, month: 3}
    else if(seconds === '15552000') return {percent : 75, month: 6}
    else if(seconds === '23328000') return {percent: 100, month: 9}
    else if(seconds === '31104000') return {percent: 125, month: 1}
    else return {percent: 0, month: 0}
}



export const getStartDate = (str) => {
    const seconds = parseInt(str)
    console.log(seconds, str, 'hello')
    const startDate = moment.unix(seconds).format("YYYY-MM-DD HH:MM")
    store.dispatch(updateStartDate(startDate))
    return startDate
}

export const getEndDate = (seconds, start) => {
    // debugger
    let endDate
    const startDate = getStartDate(start)
    console.log(startDate)
    if(start){
        // console.log(startDate)
    if(start === '7776000')return {percent: 45, month: 3}
    else if(start === '15552000'){
        endDate = moment(startDate).add(3, 'month').format("YYYY-MM-DD HH:MM")
    }
    else if(start === '23328000'){
        endDate = moment(startDate).add(6, 'month').format("YYYY-MM-DD HH:MM")
    }
    else if(start === '31104000'){
        endDate = moment(startDate).add(9, 'month').format("YYYY-MM-DD HH:MM")
    }
    else {
        endDate = moment(startDate).add(12, 'month').format("YYYY-MM-DD HH:MM")
    }
    }
    return endDate
// return endDate
}
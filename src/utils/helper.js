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

export const nf = Intl.NumberFormat();

export const getProgress = (seconds, start) => {
    const dayNow = Math.floor(Date.now()/1000)
    const daysDuration = seconds
    const daysPassed = dayNow - start
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
    const startDate = moment.unix(seconds).format("YYYY-MM-DD HH:MM")
    store.dispatch(updateStartDate(startDate))
    return startDate
}

export const getEndDate = (seconds, start) => {
    if(seconds === '7776000'){
        return moment(start).add(3, 'month').format('YYYY-MM-DD hh:mm')
    }
    else if(seconds === '15552000'){
        return moment(start).add(6, 'month').format("YYYY-MM-DD HH:MM")
    }
    else if(seconds === '23328000'){
        return moment(start).add(9, 'month').format("YYYY-MM-DD HH:MM")
    }
    else if(seconds === '31536000'){
        return moment(start).add(1, 'year').format("YYYY-MM-DD HH:MM")
    }
 }
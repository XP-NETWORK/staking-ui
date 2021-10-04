import moment from 'moment';


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

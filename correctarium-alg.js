// let date = new Date()
// console.log(date.getTime());

let countDeadLine = (time, start = new Date()) => {
    console.log(start);
    start.setDate(start.getDate() + Math.floor(time / 24))
    console.log('date', start);
    console.log(time % 24, start.getUTCHours());

    console.log(start.getUTCHours() + time % 24);
    start.setHours(start.getUTCHours() + time % 24)
    console.log('hours', start);
    startHours = start.getUTCHours()
    console.log(startHours);
    startDate = start.getUTCDate()
    startDay = start.getUTCDay()

    if (startHours > 18) {
        start.setUTCDate(startDate + 1)
        start.setUTCHours(10 + startHours - 19)
        console.log('18 ', start);
    }
    if (startHours < 10) {
        start.setUTCHours(10 + 4 + startHours)
        console.log('10 ', start);

    }
    if (startDay === 6) {
        start.setUTCDate(startDate + 2)
        console.log('6 ', start);

    }
    if (startDay === 0) {
        start.setUTCDate(startDate + 1)
        console.log('0 ', start);

    }
    console.log('finish', start);
}

countDeadLine(69)

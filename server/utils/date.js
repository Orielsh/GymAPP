function maxDateForAge(x) {
    let date = new Date();
    date.setFullYear(date.getFullYear() - x);
    return date;
}

module.exports = {maxDateForAge}
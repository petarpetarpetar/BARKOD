access_key = '96c7a03cce11e464756d645302fbb324';

function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];

    return day + '-' + month;
}

formatDate('2010-01-18'); // "18-01-10"

function getUSD() {
    return $.ajax({
        url: 'https://api.currencylayer.com/live?access_key=' + access_key,
        dataType: 'jsonp',
    });
}

function getEUR() {
    return $.ajax({
        url: 'https://api.currencylayer.com/live?access_key=' + access_key + '&source=EUR',
        dataType: 'jsonp',
    });
}

function getJPY() {
    return $.ajax({
        url: 'https://api.currencylayer.com/live?access_key=' + access_key + '&source=JPY',
        dataType: 'jsonp',
    });
}

function padaRasteUSD() {
    let date = new Date();

    const datumKonvertovan = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getDate() - 1);

    console.log(datumKonvertovan);

    return $.ajax({
        url: 'https://api.currencylayer.com/historical?access_key=' + access_key + '&date=' + datumKonvertovan + '&source=USD',
        dataType: 'jsonp',
    });
}

function padaRasteEUR() {
    let date = new Date();

    const datumKonvertovan = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getDate() - 1);

    console.log(datumKonvertovan);

    return $.ajax({
        url: 'https://api.currencylayer.com/historical?access_key=' + access_key + '&date=' + datumKonvertovan + '&source=EUR',
        dataType: 'jsonp',
    });
}

function padaRasteJPY() {
    let date = new Date();

    const datumKonvertovan = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getDate() - 1);

    console.log(datumKonvertovan);

    return $.ajax({
        url: 'https://api.currencylayer.com/historical?access_key=' + access_key + '&date=' + datumKonvertovan + '&source=JPY',
        dataType: 'jsonp',
    });
}

function getRange(startDate, endDate, startCurr, endCurr, callback) {
    // const datumStartKonvertovan = startDate.getYear() + '-' + startDate.getMonth() + '-' + startDate.getDay();
    // const datumEndKonvertovan = endDate.getYear() + '-' + endDate.getMonth() + '-' + endDate.getDay();

    const datumStartKonvertovan = startDate
    const datumEndKonvertovan = endDate

    let listaZaReturn = {
        'labels': [],
        'values': []
    }

    //'https://api.currencylayer.com/timeframe?start_date=2021-11-21&end_date=2021-11-26&access_key=96c7a03cce11e464756d645302fbb324&source=EUR

    $.ajax({
        url: 'https://api.currencylayer.com/timeframe?start_date=' + datumStartKonvertovan + '&end_date=' + datumEndKonvertovan + '&access_key=' + access_key + '&source=' + startCurr,
        dataType: 'jsonp',
        success: function (data) {
            currString = startCurr + endCurr
            console.log(currString)

            Object.keys(data.quotes).forEach(key => {
                listaZaReturn['labels'].push(formatDate(key));
                listaZaReturn['values'].push(data.quotes[key][currString])
            });

            console.log(listaZaReturn);

        }
    });
    return listaZaReturn;
}

function convert(fromCurr, toCurr, amount) {

    return $.ajax({
        url: 'https://api.currencylayer.com/convert?from=' + fromCurr + '&to=' + toCurr + '&amount=' + amount + '&access_key=' + access_key,
        dataType: 'jsonp',
    });
}
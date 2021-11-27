function convertClick(event) {
    event.preventDefault()

    const amount = document.getElementById('amount').value
    const from = document.getElementById('from').value
    const to = document.getElementById('to').value

    convert(from, to, amount).done(data => {
        document.getElementById('konverzijaIz').text = amount + ' ' + from + ' ='
        document.getElementById('konverzijaU').text = data.result.toFixed(3) + ' ' + to
    })
    $('.valuta').text(`${from}/${to}`);
    loadChart(from, to);



}

function swap() {
    const from = document.getElementById('from').value
    const to = document.getElementById('to').value

    document.getElementById('from').value = to
    document.getElementById('to').value = from
}

function getKursevi() {

    getEUR().done(data => {
        document.getElementById('kursEur').innerHTML = "1 EUR = " + data.quotes.EURRSD.toFixed(3) + " RSD";
    });
    getUSD().done(data => {
        document.getElementById('kursUsd').innerHTML = "1 USD = " + data.quotes.USDRSD.toFixed(3) + " RSD";
    });

    getJPY().done(data => {
        document.getElementById('kursJpy').innerHTML = "1 JPY = " + data.quotes.JPYRSD.toFixed(3) + " RSD";
    });
}
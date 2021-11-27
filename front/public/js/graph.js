access_key = '96c7a03cce11e464756d645302fbb324';

$(function () {

});

function loadChart(from, to) {

    lineChartDateSelection(
        document.getElementById("lineChartDateSelection").getContext("2d")
        , '2021-10-21', '2021-11-27', from, to);

    changeChart(
        document.getElementById("lineChartDateSelection2").getContext("2d")
        , '2021-10-21', '2021-11-27', from, to);

    lineChartDateSelection(document.getElementById("lineChartDateSelection3").getContext("2d")
        , '2021-10-21', '2021-11-27', from, com);

}
MONTHS = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
}

function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = MONTHS[datePart[1]],
        day = datePart[2];

    return day + '-' + month;
}

function lineChartDateSelection(ctx, startDate, endDate, startCurr = "USD", endCurr = "EUR", rate_data = null) {

    const datumStartKonvertovan = startDate
    const datumEndKonvertovan = endDate


    var rate_data = {
        'labels': [],
        'values': []
    }

    $.ajax({
        url: 'https://api.currencylayer.com/timeframe?start_date=' + datumStartKonvertovan + '&end_date=' + datumEndKonvertovan + '&access_key=' + access_key + '&source=' + startCurr,
        dataType: 'jsonp',
        success: function (data) {

            currString = startCurr + endCurr

            Object.keys(data.quotes).forEach(key => {
                rate_data['labels'].push(formatDate(key));
                rate_data['values'].push(data.quotes[key][currString])
            });

            gridLinesColor = "rgb(200,200,200)";
            var myLineChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: rate_data["labels"],
                    datasets: [
                        {
                            data: rate_data["values"],
                            fill: true,
                            borderColor: "#00C9A5",
                            lineTension: 0.1
                        }
                    ]
                },
                options: {

                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `1 ${startCurr} = ${tooltipItem.yLabel} ${endCurr}`;
                            },
                            title: function (tooltipItem) {
                                //Return value for title
                                return 'On ' + tooltipItem[0].xLabel + '';
                            }
                        },
                        displayColors: false

                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "black",
                                //fontSize: 18,
                                autoSkip: false,
                                maxRotation: 25,
                                minRotation: 5
                            },
                            gridLines: {
                                color: gridLinesColor,
                                lineWidth: 1
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "black",
                                fontSize: 12,
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 30
                            },
                            gridLines: {
                                color: gridLinesColor,
                                lineWidth: 1
                            }
                        }]
                    }
                },

            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("ERRRRR")
        }
    });

}

function changeChart(ctx, startDate, endDate, startCurr = "USD", endCurr = "EUR", rate_data = null) {

    const datumStartKonvertovan = startDate
    const datumEndKonvertovan = endDate


    var rate_data = {
        'labels': [],
        'values': []
    }

    $.ajax({
        url: 'https://api.currencylayer.com/timeframe?start_date=' + datumStartKonvertovan + '&end_date=' + datumEndKonvertovan + '&access_key=' + access_key + '&source=' + startCurr,
        dataType: 'jsonp',
        success: function (data) {

            currString = startCurr + endCurr

            Object.keys(data.quotes).forEach(key => {
                rate_data['labels'].push(formatDate(key));
                rate_data['values'].push(data.quotes[key][currString])
            });

            rate_change_values = []
            rate_change_dates = []

            for (let i = 0; i < rate_data['labels'].length - 1; i++) {
                rate_change_values.push(rate_data['values'][i] - rate_data['values'][i + 1]);
                rate_change_dates.push(rate_data['labels'][i]);
            }

            colors = rate_change_values.map((value) => value < 0 ? 'red' : 'green');

            gridLinesColor = "rgb(200,200,200)";
            var myLineChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: rate_change_dates,
                    datasets: [
                        {
                            data: rate_change_values,
                            fill: true,
                            borderColor: colors,
                            backgroundColor: colors,
                            lineTension: 0.1
                        }
                    ]
                },
                options: {

                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${startCurr} ~ ${endCurr}: ${tooltipItem.yLabel.toFixed(4)} `;
                            },
                            title: function (tooltipItem) {
                                //Return value for title
                                return 'On ' + tooltipItem[0].xLabel + '';
                            }
                        },
                        displayColors: false

                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "black",
                                //fontSize: 18,
                                autoSkip: false,
                                maxRotation: 25,
                                minRotation: 5
                            },
                            gridLines: {
                                color: gridLinesColor,
                                lineWidth: 1
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "black",
                                fontSize: 12,
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 30
                            },
                            gridLines: {
                                color: gridLinesColor,
                                lineWidth: 1
                            }
                        }]
                    }
                },

            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("ERRRRR")
        }
    });

}




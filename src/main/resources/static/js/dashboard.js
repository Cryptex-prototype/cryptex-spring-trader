
const getShow = async (input) => {
    $('#coinChart').empty()
    $('#coin-description').empty()
    try {
        $.getJSON(`https://api.coingecko.com/api/v3/coins/${input}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
            .done(function (coin) {


                const findTop5 = () => {
                    let top5Tickers = coin.tickers.sort((a, b) => b.volume - a.volume).slice(0, 5);
                    return top5Tickers;
                }

                const top5Tickers = findTop5();
                // console.log('The first ticker in the top 5 is:', top5Tickers[0]);
                const findMax = () => {
                    let maxTicker = coin.tickers.reduce((acc, ticker) => {
                        let volume = ticker.volume;
                        return (volume > acc.volume) ? ticker : acc;
                    }, {volume: 0});
                    // console.log('The largest volume is:', maxTicker.volume);
                    return maxTicker;
                }

                const maxTicker = findMax();
                // console.log('The parent object of the largest volume is:', maxTicker);


                let marketCap = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.market_cap.usd);
                let maxSupply_formatted = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.max_supply);
                let totalSupply_formatted = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.total_supply)
                let circulatingSupply_formatted = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.circulating_supply);
                let fullyDilutedValuation = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.fully_diluted_valuation.usd);
                let price = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.current_price.usd);
                let followers = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.community_data.twitter_followers);
                let volume = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.total_volume.usd)
                let high = new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    maximumSignificantDigits: 5
                }).format((coin.market_data.high_24h.usd).toFixed(2))
                let low = new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    maximumSignificantDigits: 5
                }).format((coin.market_data.low_24h.usd).toFixed(2))
                let ath = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.ath.usd);
                let atl = (coin.market_data.atl.usd).toLocaleString('en-US');


                //null checks

                const progressBar = () => {
                    let difference = coin.market_data.high_24h.usd - coin.market_data.current_price.usd
                    let percent = difference / coin.market_data.high_24h.usd * 100
                    console.log(difference)
                    console.log(percent)
                    return percent * 100;
                }
                const week_priceChange = () => {
                    if(coin.market_data.price_change_percentage_7d_in_currency.usd > 0){
                        return `risen <span style="color:${colorWeek}">${(weekVol).toFixed(2)}%</span>`
                    }else if(coin.market_data.price_change_percentage_7d_in_currency.usd < 0){
                        return `dropped <span style="color:${colorWeek}">${(weekVol).toFixed(2)}%</span>`
                    }
                }
                const sentiment = () => {
                    let coinSentiment = coin.sentiment_votes_up_percentage;
                    if(coin.sentiment_votes_up_percentage === null){
                        return `Not enough of the community has voted on <span class="text-white">${coin.name}</span> today.`
                    }
                    else if(coin.sentiment_votes_up_percentage > 60){
                        return `The community is <strong style="color:green">bullish</strong> with more than <strong style="color:green;">${coinSentiment}%</strong> feeling optimistic about <span class="text-white">${coin.name}</span> in polls today.`
                    }else if(coin.sentiment_votes_up_percentage === 50) {
                        return `The community is <strong style="color:gray">mixed</strong> with <strong>${coinSentiment}%</span> feeling optimistic about <span class="text-white">${coin.name}</span> in polls today.`
                    }else if(coin.sentiment_votes_up_percentage < 49){
                        return `The community is <strong style="color:red;">bearish</strong> with less than <strong style="color:red">${coinSentiment}%</span> optimistic about <span class="text-white">${coin.name}</span> in polls today.`
                    }
                }
                const maxSupply = () => {
                    if (coin.market_data.max_supply === null) {
                        return "∞"
                    } else {
                        return maxSupply_formatted
                    }
                }
                const totalSupply = () => {
                    if (coin.market_data.total_supply === null) {
                        return "∞"
                    } else {
                        return totalSupply_formatted
                    }
                }
                const FDV = () => {
                    if(isNaN(coin.market_data.fully_diluted_valuation.usd)){
                        return "∞"
                    }else {
                        return "$" + fullyDilutedValuation;
                    }
                }
                const circulatingSupply = () => {
                    if(coin.market_data.circulating_supply === null){
                        return "No information available yet"
                    }else {
                        return circulatingSupply_formatted;
                    }
                }
                //null checks ^

                let marketCapRank = coin.market_data.market_cap_rank

                let colorHour = coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red';
                let colorDay = coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'green' : 'red';
                let colorWeek = coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'green' : 'red';

                let hourVol = coin.market_data.price_change_percentage_1h_in_currency.usd
                let dayVol = coin.market_data.price_change_percentage_24h_in_currency.usd
                let weekVol = coin.market_data.price_change_percentage_7d_in_currency.usd
                console.log(price)
                console.log(volume)
                console.log(high)
                console.log(low)
                console.log(marketCapRank)
                console.log(marketCap)

                let sparkValue = coin.market_data.sparkline_7d.price

                let chartElement = "";
                chartElement +=
                    `<div class="container bg-dark">    
<div class="row">
<div class="col-md-8">
               <div class="coin-links "><a href="../index.html">Cryptocurrencies   >  </a> <span class="fw-bold">${coin.name}</span></div>
               <br>
<button type="button" class="btn btn-outline-success" data-delay="0" data-toggle="tooltip" data-placement="top" title="${coin.name} is ranked #${marketCapRank} in market cap.">Rank #${marketCapRank}</button>

<div class="col-md-12 my-3 display-5"><img class="coin-icon" src="${coin.image.small}" alt=""><strong class="text-white fw-bold"> ${coin.name}</strong>
<span class="coin-links">${coin.symbol.toUpperCase()}</span>
</div>
<div class="row"><span class="coin-price text-white display-3 fw-bold">$${price} <span class="coin-volChange fs-4" style="position:relative;top:-20px;color: ${colorHour}">${(hourVol).toFixed(2)}%</span>
</div>

<div class="pt-2 d-inlineflex col-md-12">
<span class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-secondary border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Sign up to set price alerts on ${coin.name}!" ><i class="bi bi-bell-fill"></i></button>
    <button type="button" class="btn btn-secondary border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Add ${coin.name} to your Watchlist!"><i class="bi bi-star"></i></button>
    </span>
  <span class="bg-light col-md-6 py-1 fs-6 fw-bold px-1">☆ On ${followers} watchlists</span>
</span>
</div>
<div class="progress m-t-20">
<progress class="progress-bar bg-success"  style="position:relative;width:${progressBar()}%;height:16px;box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );" max="${coin.market_data.high_24h.usd}" value="${coin.market_data.current_price.usd}"><span style="color:white; text-shadow:1px 1px 0 black;position:absolute;z-index: 5;">${price}</span></progress>
</div>
<div class="row m-t-20">
<span class="col-md-4 d-flex justify-content-start text-white">$${low}</span>
<span class="col-md-4 d-flex text-light justify-content-center align-center">24h Range</span>
<span class="col-md-4 d-flex text-light justify-content-end">$${high}</span>
</span>
</div>
</div>
</div>
<div class="col-md-4 d-flex">
<h1 class="text-white justify-content-center align-self-center"> henlo</h1>
</div>


<div class="row">

<ul class="col-md-6 list-group list-group-flush bg-dark text-white">
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Valuation derived from multiplying the current price by the circulating supply of tokens available for trade.">?</a> Market Cap: <span style="text-shadow: 1px 1px black;" class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">$${marketCap}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Fully Diluted Valuation. Theoretical value of a currency multiplied by the current price and total supply, includes tokens that are locked in token governance wallets or otherwise withheld from circulation.">?</a> FDV: <span class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">${FDV()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Trade valuation last 24 hours across all trading platforms.">?</a> 24h Volume: <span class="coin-volume text-white" style="text-shadow: 1px 1px black;">$${volume}</span> <span style="color: ${colorDay};text-shadow:1px 1px 0 black;">${(dayVol).toFixed(2)}%</span></li>
</ul>

<ul class="col-md-6 d-flex list-group list-group-flush text-white">
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Current amount of tokens tradable on the market, excludes 'burned', staked or otherwise 'locked' tokens taken out of circulation.">?</a> Circulating Supply: <span style="text-shadow: 1px 1px black;" class="coin-volume text-white" style="text-shadow: 1px 1px black;">${circulatingSupply()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Total tokens that already exist minus any that have been 'burned' (removed from circulation). Equivalent to outstanding shares in the stock market.">?</a> Total Supply: <span style="text-shadow: 1px 1px black;" class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">${totalSupply()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Maximum tokens that could exist, some currencies are programmed to theoretically be printed indefintely, their max supply is denoted with the '∞' symbol.">?</a> Max Supply : <span style="text-shadow: 1px 1px black;" class="coin-volume text-white" style="text-shadow: 1px 1px black;">${maxSupply()}</span></li>
</ul>
</div>
<div class="row">
<div class="py-2 bg-dark text-white">
<h3 class="pb-1 text-success">What is ${coin.name}?</h3>
<p>${coin.description.en}</p>
</div>
</div>  
<div class="row">
<ul class="col-md-6 list-group list-group-flush">
<li class="list-group-item fw-bold bg-dark text-secondary"><h3 class="text-primary">${coin.name} Historical</h3></li>
<li class="list-group-item fw-bold bg-dark text-white"> Current price: <span style="color:${colorDay}">$${price}</span> </li>
<li class="list-group-item fw-bold bg-dark text-white"> Today's high: <span class="text-success">$${high}</span> Today's low: <span class="text-warning">$${low}</span></li>
<li class="list-group-item fw-bold bg-dark text-white"> All time high: <span class="text-success">$${ath}</span><span class="text-secondary"> ${new Date(coin.market_data.ath_date.usd).toLocaleDateString('en')}</span> All time low: <span class="text-warning">$${atl}</span><span class="text-secondary">  ${new Date(coin.market_data.atl_date.usd).toLocaleDateString('en')}</span></span></li>

</ul>
</div>

<div class="row">
<div class="container">
<hr class="text-white">
<div class="col-md-12">
<h2 class="pb-1 text-white">What is the market cap of ${coin.name}?</h2>
<h6 class="py-1 text-secondary"><span class="text-white">${coin.name}</span> is ranked <span class="text-white">#${marketCapRank}</span> with a market cap of <span class="text-white">$${marketCap}</span>. Market capitalization is a valuation of total supply multiplied by the current price. </h6>
</div>

<div class="col-md-12">
<h2 class="pb-1 text-white">What is the market sentiment of ${coin.name} today?</h2>
<h6 class="py-1 text-secondary">The price of <span class="text-white">${coin.name}</span> has ${week_priceChange()} in the past 7 days. ${sentiment()} </h6>
</div>

<div class="col-md-12">
<h2 class="pb-1 text-white">Where can you buy ${coin.name}?</h2>
<h6 class="py-1 text-secondary"><span class="text-white">${coin.name}</span> can be traded on <span class="text-white">${maxTicker.market.name}</span> where its 24h trade volume was <span class="text-success">$${(maxTicker.volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</span> , the <span class="text-white">highest</span> trade volume of all other exchanges.</h6>
<table class="table table-dark">
<thead>
<h4 class="text-secondary">${coin.name} can also be traded on the following exchanges.</h4>
<tr>
<th scope="col" class="text-white">name</th>
<th scope="col" class="text-white">24h volume</th>
</tr>
</thead>
<tbody>
<tr><td class="text-white">${top5Tickers[0].market.name}</td><td class="text-white">$${(top5Tickers[0].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[1].market.name}</td><td class="text-white">$${(top5Tickers[1].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[2].market.name}</td><td class="text-white">$${(top5Tickers[2].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[3].market.name}</td><td class="text-white">$${(top5Tickers[3].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[4].market.name}</td><td class="text-white">$${(top5Tickers[4].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
</tbody>
</table>
</div>
<div class="row">
<div class="py-2 col-md-12">

<!--market table goes here-->

</div>
</div>
</div>
</div> <!--bg-container dark-->

`
                $('#coin-description').append(chartElement)
            }); //done
    } //try
    catch (e) {
        console.error(e)
    }
}//getShow function
let chart,Query; //dont delete this

const clearChart = () => {
    console.log("Clearing chart");
    $('#coin-description').empty();
    $('#chartButtons').empty();
    chart.destroy();
};

const getOHLC = async (coin, days) => {
    $('#chartButtons').empty()
    try {

        const candle = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=${days}`);
        const coinData = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
        const dataPoints = candle.map((candles) => {
            return {
                x: new Date(candles[0]),
                y: [candles[1], candles[2], candles[3], candles[4]]
            };
        });

        let chartType = () => {
            if (days == 1){
                return `${coinData.name} 24 hour`
            }else if(days > 1){
                return `${coinData.name} ` + days + ` day`
            }
        }
        const options2 = {
            series: [{
                data: dataPoints
            }],
            chart: {
                type: 'candlestick',
                height: 350
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            },
            title: {
                text: chartType(),
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        };
        let chartButtons = `<button id="btn1">1d</button>
    <button id="btn14" onclick=" getOHLC(Query, '14');">14d</button>
    <button id="btn30" onclick=" getOHLC(Query, '30');">30d</button>
    <button id="btn90" onclick=" getOHLC(Query, '90');">90d</button>
    <a class="btn-sm bg-dark" id="deleteChart" href="#search" onclick="chart.destroy();$('#chartButtons').empty();"><i class="bi bi-dash-lg"></i></a>`
        if (chart) {
            chart.destroy();
        }

        chart = new ApexCharts($("#liveChart")[0], options2);
        $('#chartButtons').append(chartButtons)
        chart.render();
    } catch (e) {
        console.error(e);
    }
};

const getChart = async (url,header) => {
    $('#terminal').empty();
    $('#coinChart').empty()
    $('#selectedTable').empty()
    try {
        $.getJSON(url)
            .done(function (data) {
                let chartTable = '';
                chartTable +=

                    `<h1>${header}</h1>                
            <table class="table table-dark">
            <thead id="tableHead">
            
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">ticker</th>
                <th scope="col">price</th>
                <th scope="col">1h</th>
                <th scope="col">24h</th>
                <th scope="col">7d</th>
                <th scope="col">volume</th>
                <th scope="col">marketcap</th>
                <th scope="col">24h Hi</th>
                <th scope="col">24h Lo</th>
                <th scope="col">Last 7 days</th>
            </tr>
            </thead>
            <tbody id="coinChart"></tbody>
            </table>`

                $('#selectedTable').append(chartTable);

                var th = $('#tableHead th');
                th.click(function () {
                    console.log('sorting table');
                    let table = $(this).parents('table').eq(0);
                    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                    this.asc = !this.asc;
                    if (!this.asc) {
                        rows = rows.reverse();
                    }
                    for (var i = 0; i < rows.length; i++) {
                        table.append(rows[i]);
                    }
                });

                function comparer(index) {
                    return function (a, b) {
                        let valA = getCellValue(a, index), valB = getCellValue(b, index);
                        let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                        let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                        if ($.isNumeric(numA) && $.isNumeric(numB)) {
                            return numA - numB;
                        } else {
                            return valA.toString().localeCompare(valB);
                        }
                    };
                }

                function getCellValue(row, index) {
                    let cell = $(row).children('td').eq(index);
                    if (cell.data('numeric')) {
                        return cell.attr('data-raw');
                    } else {
                        return cell.text();
                    }
                }


                data.forEach((coin) => {


                    let colorDay = coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red';
                    let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                    let colorWeek = coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red';


                    const numberNotationCheck = (input) => {
                        return '$' + (input).toLocaleString("en-US")
                    }

                    let sparkValue = coin.sparkline_in_7d.price
                    let chartElement = "";
                    chartElement +=
                        `<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><img class="coin-icon" src="${coin.image}" alt=""><a class="coin-name fw-bold" href="#coin-description" data-bs-toggle="modal" data-bs-target="#largeModal" onclick="Query = '${coin.id}';getShow(Query);if(chart){chart.destroy()};getOHLC(Query,'1')"> ${coin.name} </a></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${numberNotationCheck(coin.current_price)}</td>
<td class="coin-volChange" style="color: ${colorDay}">${(coin.price_change_percentage_1h_in_currency).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${colorWeek}">${(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
<td class="coin-volume">${numberNotationCheck(coin.total_volume)}</td>
<td class="coin-marketcap">${numberNotationCheck(coin.market_cap)}</td>
<td class="coin-high">${numberNotationCheck(coin.high_24h)}</td>
<td class="coin-low">${numberNotationCheck(coin.low_24h)}</td>
<td id="${coin.id}-sparkline" class="sparkline">
<div class="loading"><span>L</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
  </div></td>`

                    $('#coinChart').append(chartElement)
                    if($(`#${coin.id}-sparkline`) !== null) {$(`#${coin.id}-sparkline`).sparkline(sparkValue,{myPrefixes: [],
                        tooltipFormatter: function(sp, options, fields) {
                            var format =  $.spformat();
                            var result = '';
                            $.each(fields, function(i, field) {
                                field.myprefix = options.get('myPrefixes')[i];
                                result += format.render(field, options.get('tooltipValueLookups'), options);
                            })
                            return result;
                        },type: 'line',lineWidth: 2, lineColor:`${colorWeek}`,fillColor:false, width: 200, height:50,  normalRangeMax: coin.ath})}
                    else{
                        return 'NA'
                    }


                }); //forEach
            }) //done
            .fail(function (jqxhr, textStatus, error) {
                console.log("API request failed: " + error);
                try {
                    $.getJSON("/mockdb/dashboard.json")
                        .done(function (data) {
                        console.log("JSON dashboard loading...")
                            let chartTable = '';
                            chartTable +=

                                `<h1>${header}</h1>                
            <table class="table table-dark">
            <thead id="tableHead">
            
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">ticker</th>
                <th scope="col">price</th>
                <th scope="col">1h</th>
                <th scope="col">24h</th>
                <th scope="col">7d</th>
                <th scope="col">volume</th>
                <th scope="col">marketcap</th>
                <th scope="col">24h Hi</th>
                <th scope="col">24h Lo</th>
                <th scope="col">Last 7 days</th>
            </tr>
            </thead>
            <tbody id="coinChart"></tbody>
            </table>`

                            $('#selectedTable').append(chartTable);

                            var th = $('#tableHead th');
                            th.click(function () {
                                console.log('sorting table');
                                let table = $(this).parents('table').eq(0);
                                let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
                                this.asc = !this.asc;
                                if (!this.asc) {
                                    rows = rows.reverse();
                                }
                                for (var i = 0; i < rows.length; i++) {
                                    table.append(rows[i]);
                                }
                            });

                            function comparer(index) {
                                return function (a, b) {
                                    let valA = getCellValue(a, index), valB = getCellValue(b, index);
                                    let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                                    let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                                    if ($.isNumeric(numA) && $.isNumeric(numB)) {
                                        return numA - numB;
                                    } else {
                                        return valA.toString().localeCompare(valB);
                                    }
                                };
                            }

                            function getCellValue(row, index) {
                                let cell = $(row).children('td').eq(index);
                                if (cell.data('numeric')) {
                                    return cell.attr('data-raw');
                                } else {
                                    return cell.text();
                                }
                            }


                            data.forEach((coin) => {


                                let colorDay = coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red';
                                let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                                let colorWeek = coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red';


                                const numberNotationCheck = (input) => {
                                    return '$' + (input).toLocaleString("en-US")
                                }

                                let sparkValue = coin.sparkline_in_7d.price
                                let chartElement = "";
                                chartElement +=
                                    `<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><img class="coin-icon" src="${coin.image}" alt=""><a class="coin-name fw-bold" href="#coin-description" data-bs-toggle="modal" data-bs-target="#largeModal" onclick="Query = '${coin.id}';getShow(Query);if(chart){chart.destroy()};getOHLC(Query,'1')"> ${coin.name} </a></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${numberNotationCheck(coin.current_price)}</td>
<td class="coin-volChange" style="color: ${colorDay}">${(coin.price_change_percentage_1h_in_currency).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${colorWeek}">${(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
<td class="coin-volume">${numberNotationCheck(coin.total_volume)}</td>
<td class="coin-marketcap">${numberNotationCheck(coin.market_cap)}</td>
<td class="coin-high">${numberNotationCheck(coin.high_24h)}</td>
<td class="coin-low">${numberNotationCheck(coin.low_24h)}</td>
<td id="${coin.id}-sparkline" class="sparkline">
<div class="loading"><span>L</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
  </div></td>`

                                $('#coinChart').append(chartElement)
                                $(`#${coin.id}-sparkline`).sparkline(sparkValue, {
                                    myPrefixes: [],
                                    tooltipFormatter: function (sp, options, fields) {
                                        var format = $.spformat();
                                        var result = '';
                                        $.each(fields, function (i, field) {
                                            field.myprefix = options.get('myPrefixes')[i];
                                            result += format.render(field, options.get('tooltipValueLookups'), options);
                                        })
                                        return result;
                                    },
                                    type: 'line',
                                    lineWidth: 2,
                                    lineColor: `${colorWeek}`,
                                    fillColor: false,
                                    width: 200,
                                    height: 50,
                                    normalRangeMax: coin.ath
                                })


                            }); //forEach
                    console.log("Dashboard JSON GET successful")
                        }) //done
                } catch (e) {
                    console.error(e)
                }
            })
    } catch (e) {
        console.error(e)
    }

}





const searchQuery = (input) => {
    $('#searchResults').empty();
    try {
        $.getJSON(`https://api.coingecko.com/api/v3/search?query=${input}`)
            .done(function (data) {
                let info = data.coins;
                console.log(info)
                $('#searchResults').append(`<span style="background:rgba(255,255,255,0.5);z-index: 12;position: relative;right: -96%;top: 21px;color:red;cursor:pointer;" onclick="$('#searchResults').empty()">X</span>`);
                info.forEach((coin) => {
                    let marketCap = coin.market_cap_rank;
                    if (marketCap == null) {
                        return "NA";
                    }
                    let searchContent = "";
                    searchContent +=
                        `<li><span>#${marketCap} </span><span data-coin-id="${coin.id}"></span><img src="${coin.thumb}" alt="${coin.id}">${coin.symbol} ${coin.id}</span></li>`;
                    $('#searchResults').append(searchContent);
                });
            });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
const getWatchlistChart = async (coinId) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;
    getChart(url);
};

const debouncedFunction = debounce(searchQuery, 300);

$('#search').on('input', function () {
    $('#searchResults').empty();
    debouncedFunction($(this).val());
});
// $('#searchBtn').on('input', function () {
//     $('#searchResults').empty();
//     searchQuery($('#search').val());
// });
let addedCoins = [];

$('#searchResults').on('click', 'li', function (event) {
    event.preventDefault();

    const coinText = $(this).text().trim();
    const coinHref = $(this).find("span[data-coin-id]").attr("data-coin-id");

    // Extract the coin name
    const coinName = coinText.split(' ').pop();

    // Check if the coin is already added
    if (addedCoins.some(coin => coin.id === coinHref)) {
        alert('Coin already added to the watchlist.');
        return;
    }

    // Add the coin to the addedCoins array
    addedCoins.push({ id: coinHref, name: coinName });
    console.log(addedCoins)
    // Display the added coin in the "addedCoins" list
    $('#added-coins').append(`<li data-id="${coinHref}">${coinName} <span class="delete-coin" style="color: red; cursor: pointer;">&times;</span></li>`);

    // Call the getWatchlistChart function for the newly added coin
    getWatchlistChart(coinHref);
});

// Event handler for removing coins from the addedCoins list
$('#added-coins').on('click', '.delete-coin', function () {
    const coinId = $(this).closest('li').attr('data-id');
    addedCoins = addedCoins.filter(coin => coin.id !== coinId);
    $(this).closest('li').remove();
});

$('#create-watchlist-form').on('submit', function (event) {
    console.log("Create watchlist form submitted");
    event.preventDefault();

    // Get the CSRF token
    const csrfToken = $('meta[name="_csrf"]').attr('content');
    const csrfHeader = $('meta[name="_csrf_header"]').attr('content');

    // Get the watchlist name and coin data
    const watchlistName = $('#watchlist-name').val().trim();
    const coinDataList = addedCoins.map(coin => ({id: coin.id, name: coin.name}));

    // Send the data to the server
    $.ajax({
        url: '/api/watchlists',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        headers: {
            [csrfHeader]: csrfToken
        },
        data: JSON.stringify({name: watchlistName, coinDataList: coinDataList}),
        success: function (watchlistId) {
            console.log("Watchlist created successfully:", watchlistId, "with coin data:", coinDataList);
            Swal.default.fire(
                'Congratulations',
                'You have created a new watchlist',
                'success'
            )
            let formattedArray = coinDataList.map(coin => coin.id).join('%2C');

            console.log("Formatted coin IDs:", formattedArray);

            const watchlistButtonContainer = $('<div></div>');
            watchlistButtonContainer.addClass('watchlistButtonContainer d-flex align-items-center');
            watchlistButtonContainer.attr('data-watchlist-id', watchlistId);

            // Create the delete button
            const deleteWatchlistButton = $('<button class="animate__animated animate__slideInLeft"></button>');
            deleteWatchlistButton.text('delete');
            deleteWatchlistButton.addClass('deleteWatchlistButton');
            deleteWatchlistButton.css('display', 'none'); // Initially hide the delete button
            deleteWatchlistButton.attr('onclick', `deleteWatchlist(${watchlistId})`);

            const navPills = $('#v-pills-tab');
            const newWatchlistButton = $(' <button class="animate__animated animate__fadeInUpBig"></button>');
            newWatchlistButton.text(watchlistName);
            newWatchlistButton.addClass('nav-link w-100 ');
            newWatchlistButton.attr('type', 'button');
            newWatchlistButton.attr('name', 'createWatchlist');
            newWatchlistButton.attr('data-bs-toggle', 'pill');
            newWatchlistButton.attr('role', 'tab');
            newWatchlistButton.attr('aria-controls', watchlistName + '-tabpanel');
            newWatchlistButton.attr('aria-selected', 'false');

            newWatchlistButton.attr('onclick', `getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${formattedArray}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en', '${watchlistName}')`);

            // Append the delete button and watchlist button to the container
            watchlistButtonContainer.append(deleteWatchlistButton);
            watchlistButtonContainer.append(newWatchlistButton);

            // Insert the container before the last nav-link element
            navPills.children('.nav-link:last-child').before(watchlistButtonContainer);

            // Show delete button on hover and hide it when the mouse leaves
            watchlistButtonContainer.hover(
                function() {
                    // console.log("Hovering over watchlist button container");
                    $(this).find('.deleteWatchlistButton').css('display', 'inline-block');
                },
                function() {
                    // console.log("Mouse leaving watchlist button container");
                    $(this).find('.deleteWatchlistButton').css('display', 'none');
                }
            );

            $('#create-watchlist-btn').on('click', function () {
                console.log("Create watchlist button clicked");
                // Clear the added coins array and the added-coins list in the HTML
                addedCoins = [];
                $('#added-coins').empty();

                // Clear the search input field
                $('#search').val('');
            });

            // Reset the watchlist name input and close the modal
            console.log("Resetting watchlist name input and closing modal");
            $('#watchlist-name').val('');
            $('button[aria-label="Close"]').click();
        },
        error: function () {
            Swal.default.fire(
                'Sorry',
                'Your watchlist could not be created',
                'error'
            )
        },
    });
});

function deleteWatchlist(watchlistId) {
    console.log("Deleting watchlist:", watchlistId);
    // Get the CSRF token
    const csrfToken = $('meta[name="_csrf"]').attr('content');
    const csrfHeader = $('meta[name="_csrf_header"]').attr('content');

    // Remove the watchlist from the server
    $.ajax({
        url: `/api/watchlists/${watchlistId}`,
        method: 'DELETE',
        headers: {
            [csrfHeader]: csrfToken
        },
        success: function () {
            Swal.default.fire(
                'confirmed',
                'You have successfully deleted watchlist',
                'success'
            )
            console.log('Watchlist deleted successfully');

            // Remove the watchlist from the DOM
            $(`.watchlistButtonContainer[data-watchlist-id="${watchlistId}"]`).remove();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.default.fire(
                'Sorry',
                'Your watchlist could not be deleted',
                'error'
            )
            console.error('Error: Cannot Delete Watchlist', errorThrown);
        }
    });
}

const getWatchlists = () => {
    try {
        $.getJSON("/api/coin-data")
            .done(function (data){
                console.log(data)


            })

        // let formattedArray = coinDataList.map(coin => coin.id).join('%2C');
    }catch (e) {
        console.error(e + "Failed to Fetch Watchlists")
    }
}

getWatchlists()
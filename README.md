# EquoChallenge

We are a business company interested in following the price of cryptocurrencies. We want to
create a website where you can initially see the weightedAvgPrice, volume and priceChange of
different coins.
We need a main view with all the coins we are interested in: BTCUSDT, ETHUSDT, ADAUSDT,
LTCUSDT, AXSUSDT and BNBUSDT. In this page, we would like to:
- Search the coins by name.
- Order the coins (by weightedAvgPrice, volume, and most recently visited).
- Have the coin values updated every 10 seconds.
- Have a button to manually refresh the values.
It's important to note that we would like to add more coins in the future.
When clicking a coin on the main view, we want to see a new page with more details of the
selected coin, like: highPrice, lowPrice, openPrice, askPrice and bidPrice.
That's it. We are not interested right now in a fancy look and feel. An organized layout is
enough.
Here's a resource we think it could be valuable for this task:
https://api2.binance.com/api/v3/ticker/24hr

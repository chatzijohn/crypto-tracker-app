export interface coin {
    name: string
    symbol: string
    // the image property returns a url with a png of the Coin
    // image: string 
    currentPrice: number
    high24h: number
    low24h: number
    priceChangePercentage24h: number
}
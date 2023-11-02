import { NextApiRequest, NextApiResponse } from 'next'
import { coin } from '@/lib/models/coinModel'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    // Get query parameters
    const {
        page = null,
        perPage = 50,
        vsCurrency="usd",
    } = req.query

    const baseUrl: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&page=${page}&per_page=${perPage}&x_cg_demo_api_key=${process.env.CG_API_KEY}`

    // Fetch data from an external API using the 'fetch' API
    const response = await fetch(baseUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
    }

    const data: any = await response.json()

    // Process and filter the data as needed
    const filteredData: coin = data.map((coin: any) => ({
      name: <coin["name"]>coin.name,
      symbol: <coin["symbol"]>coin.symbol,
      currentPrice: <coin["currentPrice"]>coin.current_price,
      high24h: <coin["high24h"]>coin.high_24h,
      low24h: <coin["low24h"]>coin.low_24h,
      priceChangePercentage24h: <coin["priceChangePercentage24h"]>coin.price_change_percentage_24h,
    }))

    // Respond with the filtered data
    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' })
  }
}

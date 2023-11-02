import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    // Get query parameters
    const {
        id,
        // vsCurrency = "usd",
    } = req.query

    const baseUrl: string = `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.CG_API_KEY}`

    // Fetch data from an external API using the 'fetch' API
    const response = await fetch(baseUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
    }

    const data: any = await response.json()

    // Process and filter the data as needed
    const filteredData = {
        name: <string>data.name,
        description: <string>data.description,
        currentPrice: <number>data.market_data.current_price.usd,
        high24h: <number>data.high_24h,
        low24h: <number>data.low_24h,
        priceChangePercentage24h: <number>data.price_change_percentage_24h,
        priceChangePercentage7d: <number>data.price_change_percentage_7d,
        priceChangePercentage14d: <number>data.price_change_percentage_14d,
        priceChangePercentage30d: <number>data.price_change_percentage_30d,
        priceChangePercentage90d: <number>data.price_change_percentage_90d,
        priceChangePercentage200d: <number>data.price_change_percentage_200d,
        priceChangePercentage1y: <number>data.price_change_percentage_1y,
    }

    // Respond with the filtered data
    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' })
  }
}

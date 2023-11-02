import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Parse query parameters from the URL
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.search)

    // Get the 'page', 'perPage', and 'vsCurrency' query parameters
    const page = searchParams.get('page') || null
    const perPage = searchParams.get('perPage') || '50'
    const vsCurrency = searchParams.get('vsCurrency') || 'usd'

    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&page=${page}&per_page=${perPage}&x_cg_demo_api_key=${process.env.CG_API_KEY}`

    // Fetch data from an external API using the 'fetch' API
    const response = await fetch(baseUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
    }

    const data: any = await response.json()

    // Process and filter the data as needed
    const filteredData = data.map((coin: any) => ({
      id: <string>coin.id,
      name: <string>coin.name,
      symbol: <string>coin.symbol,
      currentPrice: <number>coin.current_price,
      high24h: <number>coin.high_24h,
      low24h: <number>coin.low_24h,
      priceChangePercentage24h: <number>coin.price_change_percentage_24h,
    }))

    // Respond with the filtered data
    return new Response(JSON.stringify(filteredData), {
        status: 200,
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500,
    })
  }
}

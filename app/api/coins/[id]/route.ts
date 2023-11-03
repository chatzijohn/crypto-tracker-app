import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    try {
      // Parse query parameters from the URL
      
      const pathParts = req.nextUrl.pathname.split('/')

      const id = pathParts[pathParts.length - 1]
  
      if (!id) {
        return new Response(JSON.stringify({ error: 'Missing "id" parameter' }), {
          status: 400 // Bad Request
        })
      }
  
      const baseUrl = `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.CG_API_KEY}`
  
      // Fetch data from an external API using the 'fetch' API
      const response = await fetch(baseUrl)
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
      }
  
      const data: any = await response.json()

    // Process and filter the data as needed
    const filteredData = {
        name: <string>data.name,
        description: <string>data.description.en,
        currentPrice: <number>data.market_data.current_price.usd,
        high24h: <number>data.market_data.high_24h.usd,
        low24h: <number>data.market_data.low_24h.usd,
        priceChangePercentage24h: <number>data.market_data.price_change_percentage_24h,
        priceChangePercentage7d: <number>data.market_data.price_change_percentage_7d,
        priceChangePercentage14d: <number>data.market_data.price_change_percentage_14d,
        priceChangePercentage30d: <number>data.market_data.price_change_percentage_30d,
        priceChangePercentage90d: <number>data.market_data.price_change_percentage_90d,
        priceChangePercentage200d: <number>data.market_data.price_change_percentage_200d,
        priceChangePercentage1y: <number>data.market_data.price_change_percentage_1y,
    }
    console.log(filteredData)
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

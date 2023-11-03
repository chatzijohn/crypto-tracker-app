import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coinMarketApi = createApi({
    reducerPath: "coinMarketApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/api` }),
    endpoints: (builder) => ({
        getCoinMarketData: builder.query<Array<Any>, string>({
            query: ({ page }) => ({
                url: `coins`,
                method: 'GET',
                params: { page },
            })
        })
    })
})

export const {
    useGetCoinMarketDataQuery,
} = coinMarketApi
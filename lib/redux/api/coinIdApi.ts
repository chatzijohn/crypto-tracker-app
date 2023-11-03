import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coinIdApi = createApi({
    reducerPath: "coinIdApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/api` }),
    endpoints: (builder) => ({
        getCoinData: builder.query<Array<Any>, string>({
            query: ({ id }) => ({
                url: `/coins/${id}`,
                method: 'GET',
            })
        })
    })
})

export const {
    useGetCoinDataQuery,
} = coinIdApi
import { configureStore } from '@reduxjs/toolkit'
import { coinMarketApi } from '@/lib/redux/api/coinMarketApi'
import { coinIdApi } from '@/lib/redux/api/coinIdApi'

export const reduxStore = configureStore({
    reducer: {
      [coinMarketApi.reducerPath]: coinMarketApi.reducer,
      [coinIdApi.reducerPath]: coinIdApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .concat(coinMarketApi.middleware)
      .concat(coinIdApi.middleware),
})

export type ReduxStore = typeof reduxStore
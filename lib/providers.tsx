'use client'
import React from 'react'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { reduxStore } from '@/lib/redux/store'

export const Providers = ({ children }: {children: React.ReactNode }) => {
  return <Provider store={reduxStore}>{children}</Provider>
}

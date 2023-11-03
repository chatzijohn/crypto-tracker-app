"use client"
import React from 'react'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useGetCoinMarketDataQuery } from '@/lib/redux/api/coinMarketApi'

const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 150,
      editable: false,
    },
    {
      field: 'currentPrice',
      headerName: 'Current price',
      width: 150,
      editable: false,
    },
    {
      field: 'high24h',
      headerName: 'Highest price in 24h',
      width: 150,
      editable: false,
    },
    {
      field: 'low24h',
      headerName: 'Lowest price in 24h',
      width: 150,
      editable: false,
    },
    {
      field: 'priceChangePercentage24h',
      headerName: 'Price change percentage in the last 24h',
      width: 150,
      editable: false,
    },
]

export default function DataGridPage() {

  const page = "1"

  // Use the useGetAllTasksQuery hook to fetch task data
  const { data: coinMarketData, error, isLoading } = useGetCoinMarketDataQuery(page)

  if (isLoading) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state
    return <div>Error: {error.message}</div>;
  }

  console.log(coinMarketData)

  return(
      <>
          <Box
              sx = {{
                height: "50vh",
                flexGrow: 1,
              }}
          >
              <DataGrid
                  rows={coinMarketData}
                  columns={columns}
                  initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    pageSizeOptions={[100]}
                    disableRowSelectionOnClick
              />
          </Box>
      </>
  )
}
import React, { useState } from 'react'
import { Pagination, Grid, PaginationItem } from '@mui/material'
import DeletableCard from '../DeletableCard'
import { dummyItems } from './utis'

interface Item {
  id: number
  name: string
  date: string
  description: string
  tags: any[]
  // ... other properties
}

const itemsPerPage = 8
const itemsPerRow = 4

// ... dummyItems data ...

const CardsPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedItems = dummyItems.slice(startIndex, endIndex)

  // Create rows of items
  const rows: Item[][] = []
  for (let i = 0; i < displayedItems.length; i += itemsPerRow) {
    rows.push(displayedItems.slice(i, i + itemsPerRow))
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {rows.map((row, rowIndex) => (
        <Grid container spacing={3} key={rowIndex}>
          {row.map((item) => (
            <Grid item xs={3} key={item.id}>
              <DeletableCard
                title={item.name}
                date={item.date}
                description={item.description}
                tags={item.tags}
              />
            </Grid>
          ))}
        </Grid>
      ))}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination
          count={Math.ceil(dummyItems.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => <PaginationItem component="div" {...item} />}
        />
      </div>
    </div>
  )
}

export default CardsPagination

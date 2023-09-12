import React, { useState } from 'react'
import { Pagination, Grid, PaginationItem } from '@mui/material'
import DeletableCard from '../DeletableCard'
import { TripCard } from '../../Utils/Types'

const itemsPerPage = 8
const itemsPerRow = 4

interface Props {
  trips: TripCard[]
  getTrips: () => void
}

const CardsPagination = ({ trips, getTrips }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedItems = trips.slice(startIndex, endIndex)

  const rows: TripCard[][] = []
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
                title={item.title}
                createdAt={item.createdAt}
                description={item.description}
                tags={item.configurations}
                dates={item.dates}
                id={item.id}
                refreshData={getTrips}
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
          count={Math.ceil(trips.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => <PaginationItem component="div" {...item} />}
        />
      </div>
    </div>
  )
}

export default CardsPagination

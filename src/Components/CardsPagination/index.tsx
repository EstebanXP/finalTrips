import React, { useState, useEffect } from 'react'
import { Pagination, Grid, PaginationItem } from '@mui/material'
import DeletableCard from '../DeletableCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/config'
import { TripCard } from '../../Utils/Types'

const itemsPerPage = 8
const itemsPerRow = 4

const CardsPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [trips, setTrips] = useState<TripCard[]>([])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  const getData = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, 'usuarios', 'ray3', 'configurations')
      )
      const data: TripCard[] = []

      snapshot.forEach((snap) => {
        const tripData = snap.data() as TripCard
        tripData.id = snap.id
        data.push(tripData)
      })

      setTrips(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedItems = trips.slice(startIndex, endIndex)

  // Create rows of items
  const rows: TripCard[][] = []
  for (let i = 0; i < displayedItems.length; i += itemsPerRow) {
    rows.push(displayedItems.slice(i, i + itemsPerRow))
  }

  useEffect(() => {
    getData()
  }, [])

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
                refreshData={getData}
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

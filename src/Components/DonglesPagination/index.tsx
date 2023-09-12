import React, { useState} from 'react'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { GlobalState } from '../../Redux/Store'
import { useSelector } from 'react-redux'
import ItemCard from '../ItemCard'

const DonglesPagination = () => {
  const itemsPerPage: number = 4 // Number of items per page
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { dongles } = useSelector((state: GlobalState) => state.dongle)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30vh',
        }}
      >
        <Grid container spacing={4}>
          {dongles.map((item, index) => (
            <Grid item xs={40} key={index}>
              <ItemCard dongle={item}></ItemCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination
          count={Math.ceil(dongles.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </Box>
  )
}

export default DonglesPagination

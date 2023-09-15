import React, { useEffect, useState } from 'react'
import {
  Pagination,
  Grid,
  PaginationItem,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  //FormControl,
  //FormControlLabel,
  //Checkbox,
  //FormGroup,
} from '@mui/material'
import DeletableCard from '../DeletableCard'
import { ChipItem, TripCard } from '../../Utils/Types'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { ButtonsContainer } from './styled'
//import { options } from '../CustomEditModal/utils'

const itemsPerPage = 8
const itemsPerRow = 4

interface Props {
  trips: TripCard[]
  getTrips: () => void
}

const CardsPagination = ({ trips, getTrips }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('desc')
  // eslint-disable-next-line
  const [selectedItems, setSelectedItems] = useState<Array<ChipItem>>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedItems = trips.slice(startIndex, endIndex)

  const rows: TripCard[][] = []
  for (let i = 0; i < displayedItems.length; i += itemsPerRow) {
    rows.push(displayedItems.slice(i, i + itemsPerRow))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }
  const toggleSortAscOrder = () => {
    setSortOrder('asc')
  }

  const toggleSortDescOrder = () => {
    setSortOrder('desc')
  }

  /*const handleChange = (option: ChipItem) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some((item) => item.id === option.id)) {
        return prevSelectedItems.filter((item) => item.id !== option.id)
      } else {
        return [...prevSelectedItems, option]
      }
    })
  }*/

  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonsContainer>
        <TextField
          label="Search"
          variant="standard"
          onChange={handleSearch}
        ></TextField>{' '}
        <IconButton onClick={handleClick}>
          <FilterAltIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={toggleSortDescOrder}>
            From newest to oldest
          </MenuItem>
          <MenuItem onClick={toggleSortAscOrder}>
            from oldest to newest
          </MenuItem>
          {/*<FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                style={{padding: "5px"}}
                control={
                  <Checkbox
                    checked={selectedItems.some(
                      (item) => item.id === option.id
                    )}
                    onChange={() => handleChange(option)}
                  />
                }
                label={option.title}
              />
            ))}
              </FormGroup>*/}
        </Menu>
      </ButtonsContainer>

      {rows.map((row, rowIndex) => (
        <Grid container spacing={3} key={rowIndex}>
          {row
            .sort((a, b) => {
              const result = a.createdAt.toMillis() - b.createdAt.toMillis()
              return sortOrder === 'asc' ? result : -result
            })
            .filter((item) => {
              console.log(item, 'PPPP')
              let filteredConfs = selectedItems.length === 0? item : item.configurations.some((trip) =>
                selectedItems.some((item) => item.dataType === trip.dataType)
              )
              console.log(filteredConfs)
              return item.title.toUpperCase().includes(searchTerm.toUpperCase()) && filteredConfs
            })
            .map((item) => (
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

import { useEffect, useState } from 'react'
import axiosConfig from '../../api/axios'
import { DatePicker } from 'antd'
import { actions as tripsActions } from '../../Redux/TripsReducer'
import { Typography, Button } from '@mui/material'
import { rangePresets } from '../Queries/utils'
import dayjs, { Dayjs } from 'dayjs'
import { Trip } from './types'
import { GlobalState } from '../../Redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { Container, HeaderContainer } from './styled'
import CardsPagination from '../../Components/CardsPagination'
import CustomAddModal from '../../Components/CustomAddModal'
const { RangePicker } = DatePicker

const Queries = () => {
  const [data, setData] = useState<Trip[]>([])
  const { user } = useSelector((state: GlobalState) => state.user)
  const [openModal, setopenModal] = useState<boolean>(false)
  //const [data, setData] = useState<ApiResponse>()
  const dispatch  = useDispatch()
  const {setTrips} = tripsActions
  const [date, setDate] = useState<string[]>([])
  const getData = async () => {
    try {
      const { data } = await axiosConfig.get(`/logbook/trips/`)
      setData(data)
      dispatch(setTrips(data))
    } catch (error: any) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    }
  }

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      const dayjsDates: Dayjs[] = dateStrings.map((dateString) =>
        dayjs(dateString)
      )

      setDate(dayjsDates.map((d) => d.toISOString()))
    } else {
      console.log('Clear')
    }
  }

  const filteredData = data.filter((item) => {
    const itemStartTime = new Date(item.start_time_utc).getTime()
    const startDate = new Date(date[0]).getTime()
    const endDate = new Date(date[1]).getTime()
    return itemStartTime >= startDate && itemStartTime <= endDate
  })

  const handleOpenModal = () => {
    setopenModal(true)
  }

  const handleCloseModal = () => {
    setopenModal(false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user, date, filteredData])

  
  useEffect(() => {
    console.log(data, "DATA")
  }, [data])

  return (
    <Container>
      <HeaderContainer>
        <Typography variant="h2">Last Queries</Typography>
        <Button variant='contained' color='primary' onClick={handleOpenModal}>
          <Typography variant="body2">Add New Query</Typography>
        </Button>
      </HeaderContainer>

      <CustomAddModal
        open={openModal}
        handleCloseModal={handleCloseModal}
      ></CustomAddModal>
      <CardsPagination></CardsPagination>
    </Container>
  )
}

export default Queries

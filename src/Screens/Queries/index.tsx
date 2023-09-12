import { useEffect, useState } from 'react'
import axiosConfig from '../../api/axios'
import { actions as tripsActions } from '../../Redux/TripsReducer'
import { Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Container, HeaderContainer } from './styled'
import CardsPagination from '../../Components/CardsPagination'
import CustomAddModal from '../../Components/CustomAddModal'
import { TripCard } from '../../Utils/Types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/config'

const Queries = () => {
  const [openModal, setopenModal] = useState<boolean>(false)
  const [tripsCards, setTripsCards] = useState<TripCard[]>([])
  const dispatch = useDispatch()
  const { setTrips } = tripsActions
  const getData = async () => {
    try {
      const { data } = await axiosConfig.get(`/logbook/trips/`)
      dispatch(setTrips(data))
    } catch (error: any) {
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    }
  }

  const fetchTripsCards = async () => {
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

      setTripsCards(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleOpenModal = () => {
    setopenModal(true)
  }

  const handleCloseModal = () => {
    setopenModal(false)
  }

  useEffect(() => {
    getData()
    fetchTripsCards()
  }, [])

  return (
    <Container>
      <HeaderContainer>
        <Typography variant="h2">Last Queries</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          <Typography variant="body2">Add New Query</Typography>
        </Button>
      </HeaderContainer>

      <CustomAddModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        getTrips={fetchTripsCards}
      ></CustomAddModal>
      <CardsPagination trips={tripsCards} getTrips={fetchTripsCards}></CardsPagination>
    </Container>
  )
}

export default Queries

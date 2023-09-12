import { useEffect } from 'react'
import { actions as dongleActions } from '../../Redux/DongleReducer'
import { useDispatch, useSelector } from 'react-redux'
import axiosConfig from '../../api/axios'
import { useState } from 'react'
import { ApiResponse } from '../../Utils/Types'
import CustomCard from '../../Components/CustomCard'
import { Typography } from '@mui/material'
import { GlobalState } from '../../Redux/Store'
import { Container, HeaderContainer, LeftContainer, RightContainer } from './styled'
import DonglesPagination from '../../Components/DonglesPagination'

const Home = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState<ApiResponse>()
  const { setDongles } = dongleActions
  const { user } = useSelector((state: GlobalState) => state.user)
  const { dongles } = useSelector((state: GlobalState) => state.dongle)

  const getData = async () => {
    try {
      const { data } = await axiosConfig.get(`/dongle/devices/`)
      setData(data)

      const dongles = data.results
      dispatch(setDongles(dongles))
      //console.log(data, 'SSSSS')
    } catch (error: any) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx

      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(data, 'AAAAAASSSSHHH')
  }, [data])

  return (
    <Container>
      <LeftContainer>
        <HeaderContainer>
          <Typography variant="h2">{`Welcome back ${user?.first_name}`}</Typography>
        </HeaderContainer>
        <CustomCard title="Dongles Related to this account">
          <Typography variant="body1">{`There is ${dongles.length} dongles related to this account`}</Typography>
        </CustomCard>
      </LeftContainer>
      <RightContainer>
        <DonglesPagination></DonglesPagination>
      </RightContainer>
    </Container>
  )
}

export default Home

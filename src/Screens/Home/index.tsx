import { useEffect } from 'react'
import { actions as userActions } from '../../Redux/UserReducer'
import { actions as dongleActions } from '../../Redux/DongleReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosConfig from '../../api/axios'
import { useState } from 'react'
import { ApiResponse } from '../../Utils/Types'
import CustomCard from '../../Components/CustomCard'
import { Box } from '@mui/material'
import { GlobalState } from '../../Redux/Store'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState<ApiResponse>()
  const { logout } = userActions
  const { setDongles } = dongleActions
  const { dongles } = useSelector((state: GlobalState) => state.dongle)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const getData = async () => {
    try {
      const { data } = await axiosConfig.get(`/dongle/devices/`)
      //setData(data)
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
    console.log(dongles, 'AAAAAASSSSHHH')
  }, [dongles])

  return (
    <div>
      <button
        onClick={() => {
          handleLogout()
        }}
      >
        Logout
      </button>
      <Box></Box>
      <CustomCard title="Dongles Related to this account"></CustomCard>
    </div>
  )
}

export default Home

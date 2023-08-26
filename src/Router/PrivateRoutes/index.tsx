import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { GlobalState } from '../../Redux/Store'
import CustomTopBar from '../../Components/CustomTopBar'
import SideBar from '../../Components/SideBar'
import { Container } from './styled'

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: GlobalState) => state.user)

  return isAuthenticated ? (
    <Container>
      <div style={{ width: '100%' }}>
        {' '}
        <CustomTopBar></CustomTopBar>
      </div>
      <SideBar></SideBar>
      <div >
        <Outlet></Outlet>
      </div>
    </Container>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute

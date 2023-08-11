import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { GlobalState } from '../../Redux/Store'
import CustomTopBar from '../../Components/CustomTopBar'
import SideBar from '../../Components/SideBar'

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: GlobalState) => state.user)

  return isAuthenticated ? (
    <div>
      <div style={{ width: '100%' }}>
        {' '}
        <CustomTopBar></CustomTopBar>
      </div>
      <SideBar></SideBar>
      <Outlet></Outlet>
    </div>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute

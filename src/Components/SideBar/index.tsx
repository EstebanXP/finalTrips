import { Container } from './styled'
import { Drawer, List, MenuItem, Typography, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../Redux/Store'
import { actions as userActions } from '../../Redux/UserReducer'
import { actions } from '../../Redux/TopBarReducer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'

const SideBar = () => {
  const { isNavbarOpen } = useSelector((state: GlobalState) => state.topbar)
  const { user } = useSelector((state: GlobalState) => state.user)
  const { closeNavbar, setRoute } = actions
  const { logout } = userActions
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const routes = ['Home', 'Queries']

  const toggleDrawer = () => {
    dispatch(closeNavbar())
  }

  const setRouteOnTop = (route: string) => {
    dispatch(setRoute(route))
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  useEffect(() => {
    console.log(user, 'ASFFAS')
  }, [user])

  return (
    <Container>
      <Drawer
        style={{ display: 'flex', flexDirection: 'column' }}
        anchor="left"
        open={isNavbarOpen}
        onClose={toggleDrawer}
      >
        <List>
          {routes.map((route, index) => {
            return (
              <Link
                key={index}
                to={`/${route}`}
                style={{ textDecoration: 'none' }}
              >
                {' '}
                <MenuItem
                  onClick={() => setRouteOnTop(route)}
                >{`${route}`}</MenuItem>
              </Link>
            )
          })}
        </List>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', // Center items vertically
            padding: '10px', // Add padding as needed
          }}
        >
          <Typography variant="body1">{`Hello, ${user?.first_name}`}</Typography>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </Drawer>
    </Container>
  )
}

export default SideBar
//<ListItemButton>{route}</ListItemButton>

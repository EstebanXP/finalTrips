import { Container } from './styled'
import {
  Drawer,
  List,
  MenuItem,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../Redux/Store'
import { actions } from '../../Redux/TopBarReducer'
import { Link } from 'react-router-dom'

const SideBar = () => {
  const { isNavbarOpen } = useSelector((state: GlobalState) => state.topbar)
  const { closeNavbar, setRoute } = actions
  const dispatch = useDispatch()
  const routes = ['Home', 'Queries']

  const toggleDrawer = () => {
    dispatch(closeNavbar())
  }

  const setRouteOnTop = (route: string) => {
    dispatch(setRoute(route))
  }

  return (
    <Container>
      <button onClick={toggleDrawer}>qwe</button>
      <Drawer anchor="left" open={isNavbarOpen} onClose={toggleDrawer}>
        <Typography variant="body1">Menu</Typography>
        <List>
          {routes.map((route, index) => {
            return (
              <Link key={index} to={`/${route}`} style={{ textDecoration: 'none' }}>
                {' '}
                <MenuItem
                  onClick={() => setRouteOnTop(route)}
                >{`${route}`}</MenuItem>
              </Link>
            )
          })}
        </List>
      </Drawer>
    </Container>
  )
}

export default SideBar
//<ListItemButton>{route}</ListItemButton>

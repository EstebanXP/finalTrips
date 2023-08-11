import { Container } from './styled'
import { Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../Redux/Store'
import { actions } from '../../Redux/TopBarReducer'

const SideBar = () => {
  const { isNavbarOpen } = useSelector((state: GlobalState) => state.topbar)
  const { closeNavbar } = actions
  const dispatch = useDispatch()

  const toggleDrawer = () => {
    dispatch(closeNavbar())
  }
  return (
    <Container>
      <button onClick={toggleDrawer}>qwe</button>
      <Drawer anchor="left" open={isNavbarOpen} onClose={toggleDrawer}>
        <p>qweqweqew</p>
      </Drawer>
    </Container>
  )
}

export default SideBar

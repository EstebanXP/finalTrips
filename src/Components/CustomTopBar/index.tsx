import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { actions } from '../../Redux/TopBarReducer'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../Redux/Store'

const CustomTopBar = () => {
  const { openNavbar, closeNavbar } = actions
  const dispatch = useDispatch()
  const { isNavbarOpen, route } = useSelector(
    (state: GlobalState) => state.topbar
  )

  const handleClick = () => {
    if (isNavbarOpen) {
      dispatch(closeNavbar())
    }
    if (!isNavbarOpen) {
      dispatch(openNavbar())
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {route || 'Home'}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default CustomTopBar

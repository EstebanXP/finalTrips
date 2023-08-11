import React from 'react'
import { actions } from '../../Redux/UserReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const { logout } = actions
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <p>1</p>
      <button
        onClick={() => {
          handleLogout()
        }}
      >
        Logout
      </button>
      <p>wqeqweqwwqe</p>
    </div>
  )
}

export default Home

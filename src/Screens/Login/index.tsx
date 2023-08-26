import { useState } from 'react'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { UserCredentails } from '../../Utils/Types'
import { actions } from '../../Redux/UserReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { StyledLoginContainer } from '../../Styled'
import {
  StyledForm,
  StyledFormContainer,
  StyledSignUpContainer,
  StyledTitleContainer,
} from './styled'
import axiosConfig from '../../api/axios'

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [userCredentials, setUserCredentials] = useState<UserCredentails>({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const { setUserData, logout } = actions
  const dispatch = useDispatch()

  const handlePasswordButton = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async () => {
    try {
      const response = await axiosConfig.post(`/auth/login/`, {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      console.log(response, 'assdssasda')
      dispatch(
        setUserData({
          token: response.data.token,
          user: response.data.user,
          isAuthenticated: true,
        })
      )
      navigate('/Home')
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error status:', error.response.status)
        console.error('Error data:', error.response.data)
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message)
      }
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleLogin()
  }

  return (
    <StyledLoginContainer>
      <StyledTitleContainer>
        <Typography variant="h1">Trips Data From AutoPi.io</Typography>
      </StyledTitleContainer>
      <StyledFormContainer>
        <StyledForm onSubmit={handleFormSubmit}>
          <Typography variant="h2" style={{ top: 0, marginLeft: 0 }}>
            Please Login
          </Typography>

          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            size="small"
            name="password"
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handlePasswordButton}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Button type="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </StyledForm>

        <Typography variant="body1">
          Dont you have an account? Sign Up
        </Typography>
      </StyledFormContainer>
      <button onClick={handleLogout}>qweqweqw</button>
    </StyledLoginContainer>
  )
}

export default Login

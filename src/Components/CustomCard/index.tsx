import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import { Typography } from '@mui/material';

interface Props{
  title: string
  children?: React.ReactNode
}

const CustomCard = ({title, children}:Props) => {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography variant="h3">{title}</Typography>
      </CardContent>
    </Card>
  )
}

export default CustomCard

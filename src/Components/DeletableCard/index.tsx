import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {
  Typography,
  IconButton,
  CardActionArea,
  CardActions,
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import { Chip } from '@mui/material'

interface Props {
  title: string
  date: string
  description: string
  children?: React.ReactNode
  tags: any[]
}

const DeletableCard = ({ title, date, description, tags, children }: Props) => {
  return (
    <Card sx={{ maxWidth: 400, marginBottom: '4rem' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'body1' }}
        subheaderTypographyProps={{ variant: 'body2' }}
        sx={{ padding: '8px 16px 0px 16px' }}
        title={title}
        subheader={date}
        action={
          <IconButton>
            <CloseIcon></CloseIcon>
          </IconButton>
        }
      ></CardHeader>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>

        <CardActions
          sx={{
            gap: "10px"
          }}
        >
          {tags.slice(0, 2).map((tag) => {
            return <Chip key={tag.id} label={tag.name}></Chip>
          })}
          {/*remainingItemCount > 0 && <span> +{remainingItemCount} </span>*/}
          {tags.length - 2 > 0 && (
            <Typography variant="body2">+{tags.length - 2}</Typography>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default DeletableCard

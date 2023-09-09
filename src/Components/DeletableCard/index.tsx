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
import { Timestamp } from 'firebase/firestore'
import { Chip } from '@mui/material'
import CustomEditModal from '../CustomEditModal'
import { useState } from 'react'
import { ChipItem } from '../../Utils/Types'

interface Props {
  title: string
  createdAt: Timestamp
  dates: string[]
  description: string
  children?: React.ReactNode
  tags: ChipItem[]
}

const DeletableCard = ({
  title,
  createdAt,
  dates,
  description,
  tags,
  children,
}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  //const [date, setDate] = useState<string[]>(dates)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleClosenModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <Card sx={{ maxWidth: 400, marginBottom: '4rem' }}>
        <CardHeader
          titleTypographyProps={{ variant: 'body1' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          sx={{ padding: '8px 16px 0px 16px' }}
          title={title}
          subheader={createdAt.toDate().toLocaleDateString()}
          action={
            <IconButton>
              <CloseIcon></CloseIcon>
            </IconButton>
          }
        ></CardHeader>
        
        <CardActionArea onClick={handleOpenModal}>
          <CardContent>
            <Typography variant="body2">{description}</Typography>
          </CardContent>

          <CardActions
            sx={{
              gap: '10px',
            }}
          >
            {tags.slice(0, 2).map((tag) => {
              return <Chip key={tag.id} label={tag.title}></Chip>
            })}
            {/*remainingItemCount > 0 && <span> +{remainingItemCount} </span>*/}
            {tags.length - 2 > 0 && (
              <Typography variant="body2">+{tags.length - 2}</Typography>
            )}
          </CardActions>
        </CardActionArea>
        <CustomEditModal
          title={title}
          open={openModal}
          dates={dates}
          tags={tags}
          description={description}
          handleCloseModal={handleClosenModal}
        ></CustomEditModal>
      </Card>
    </div>
  )
}

export default DeletableCard

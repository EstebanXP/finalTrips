import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import 'dayjs/locale/en'
import dayjs from 'dayjs'
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
import { useState, useEffect } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { ChipItem } from '../../Utils/Types'
import { db } from '../../config/config'
import CancelProcessModal from '../CancelProcessModal'
import CustomChip from '../CustomChip'

interface Props {
  title: string
  createdAt: Timestamp
  dates: string[]
  description: string
  children?: React.ReactNode
  tags: ChipItem[]
  id: string
  refreshData: () => void
}

const DeletableCard = ({
  title,
  createdAt,
  dates,
  description,
  tags,
  id,
  refreshData,
  children,
}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const deleteCard = () => {
    doc(db, 'usuarios', 'ray3', 'configurations', id)
    deleteDoc(doc(db, 'usuarios', 'ray3', 'configurations', id)).then(
      (resp) => {
        console.log(resp)
        setOpenDeleteModal(false)
        refreshData()
      }
    )
  }
  //const [date, setDate] = useState<string[]>(dates)

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const formatDate = (inputDate: string): string => {
    return dayjs(inputDate).locale('en').format('DD MMM YYYY hh:mm A')
  }

  const formatDateFromTimestamp = (
    timestamp: Timestamp | undefined
  ): string => {
    if (!timestamp) {
      return '' // Handle the case where the timestamp is undefined
    }

    const date = dayjs(timestamp.toDate()).locale('en')
    return date.format('D MMM YYYY')
  }

  return (
    <div>
      <Card sx={{ maxWidth: 400, marginBottom: '4rem' }}>
        <CardHeader
          titleTypographyProps={{ variant: 'body1' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          sx={{ padding: '8px 16px 0px 16px' }}
          title={title}
          subheader={formatDateFromTimestamp(createdAt)}
          action={
            <IconButton onClick={handleOpenDeleteModal}>
              <CloseIcon></CloseIcon>
            </IconButton>
          }
        ></CardHeader>

        <CardActionArea onClick={handleOpenModal}>
          <CardContent>
            <Typography color="black" variant="body2">
              <strong>{`${formatDate(dates[0])} - ${formatDate(
                dates[1]
              )} `}</strong>
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>

          <CardActions
            sx={{
              gap: '10px',
            }}
          >
            {tags.slice(0, 2).map((tag) => {
              return <CustomChip value={tag.title} obd={tag.dataType} /> //<Chip key={tag.id} label={tag.title}></Chip>
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
          handleCloseModal={handleCloseModal}
          id={id}
          refreshData={refreshData}
        ></CustomEditModal>
      </Card>
      <CancelProcessModal
        open={openDeleteModal}
        handleCancelProcess={deleteCard}
        handleNoCancelProcess={handleCloseDeleteModal}
      ></CancelProcessModal>
    </div>
  )
}

export default DeletableCard

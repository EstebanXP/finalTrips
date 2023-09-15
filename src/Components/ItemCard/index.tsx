import React, { useEffect } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { dongleState } from '../../Redux/DongleReducer'
import dayjs from 'dayjs'

interface Props {
  dongle: dongleState
}
const ItemCard = ({ dongle }: Props) => {
  const {
    id,
    callName,
    last_communication,
    is_updated,
    vehicle,
    is_update_enqueued,
    warnings
  } = dongle

  function formatDateString(originalDate: string): string {
    const parsedDate = dayjs(originalDate)

    const formattedDate = parsedDate.format('M/D/YYYY')

    return formattedDate
  }

  useEffect(() => {
    console.log(dongle)
  }, [dongle])

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{callName}</Typography>
        <Typography variant="body2">{`ID: ${id}`}</Typography>
        <Typography variant="body2">{`Last comunication: ${formatDateString(
          last_communication
        )}`}</Typography>
        <Typography variant="body2">{`Is updated? ${is_updated}`}</Typography>
        <Typography variant="body2">{`Is related to a vehicle? ${
          vehicle ? true : false
        }`}</Typography>
        <Typography variant="body2">{`Is waiting for an update? ${is_update_enqueued}`}</Typography>
        <Typography variant="body2">{`Pending synchronizations: ${warnings.length}`}</Typography>
      </CardContent>
    </Card>
  )
}

export default ItemCard

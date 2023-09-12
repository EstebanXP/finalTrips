import React from 'react'
import { Button, Dialog, Typography } from '@mui/material'

interface Props {
  open: boolean
  handleCancelProcess: () => void
  handleNoCancelProcess: () => void
}
const CancelProcessModal = ({
  open,
  handleCancelProcess,
  handleNoCancelProcess,
}: Props) => {
  const handleClose = (
    event: React.MouseEvent<HTMLDivElement>,
    reason: string | undefined
  ) => {
    if (reason && reason === 'backdropClick') return
    handleCancelProcess()
  }
  return (
    <Dialog maxWidth="lg" open={open} onClose={handleClose}>
      <Typography variant="h6">Are you sure?</Typography>
      <Typography variant="body1">This action cannot be reversed</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNoCancelProcess}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancelProcess}
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export default CancelProcessModal

import React from 'react'
import { Button, Dialog, TextField, Typography } from '@mui/material'

interface Props {
  open: boolean
  handleCancelProcess: () => void
  handleNoCancelProcess: () => void
}
const CancelProcessModal = ({ open, handleCancelProcess }: Props) => {
  return (
    <Dialog maxWidth="lg" open={open} onClose={handleCancelProcess}>
      <Typography variant="h6">Are you sure?</Typography>
      <Typography variant="body1">This action cannot be reversed</Typography>
      <div style={{ display: "flex" , justifyContent: "space-between"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancelProcess}
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

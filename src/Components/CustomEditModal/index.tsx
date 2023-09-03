import { Button, Dialog, TextField, Typography } from '@mui/material'
import { DatePicker } from 'antd'
import Autocomplete from '@mui/material/Autocomplete'
import { ButtonsContainer, Container } from './styled'
import dayjs, { Dayjs } from 'dayjs'
import { rangePresets } from './utils'
import { useState } from 'react'
const { RangePicker } = DatePicker

interface Props {
  open: boolean
  handleCloseModal: () => void
  title: string
}

const options = [
  { id: 1, title: 'RPi' },
  { id: 2, title: 'Coolant temperature' },
  { id: 3, title: 'Speed' },
  { id: 4, title: 'RPM' },
]

const CustomEditModal = ({ open, handleCloseModal, title }: Props) => {
  const [date, setDate] = useState<string[]>([])

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      const dayjsDates: Dayjs[] = dateStrings.map((dateString) =>
        dayjs(dateString)
      )

      setDate(dayjsDates.map((d) => d.toISOString()))
    } else {
      console.log('Clear')
    }
  }

  const disabledDate = (current: dayjs.Dayjs | null) => {
    // If the date is after today, disable it
    return current ? current.isAfter(dayjs().endOf('day')) : false
  }

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleCloseModal} open={open}>
        <Container>
          <Typography variant="h2">Edit Configuration</Typography>
          <RangePicker
            getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
            presets={rangePresets}
            onChange={onRangeChange}
            disabledDate={disabledDate}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Title"
            variant="standard"
            defaultValue={title}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Description"
            variant="standard"
          />
          <Autocomplete
            multiple
            fullWidth
            id="tags-standard"
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Add configurations"
                placeholder="Add new one"
              />
            )}
          />
          <ButtonsContainer>
            <Button fullWidth variant="contained" color="secondary">
              {' '}
              Cancel
            </Button>
            <Button fullWidth variant="contained" color="primary">
              {' '}
              Edit
            </Button>
          </ButtonsContainer>
        </Container>
      </Dialog>
    </div>
  )
}

export default CustomEditModal

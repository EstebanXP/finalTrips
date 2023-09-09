import React, { useEffect } from 'react'
import { Button, Dialog, TextField, Typography } from '@mui/material'
import { DatePicker } from 'antd'
import Autocomplete from '@mui/material/Autocomplete'
import { ButtonsContainer, Container } from './styled'
import dayjs, { Dayjs } from 'dayjs'
import { options, rangePresets } from './utils'
import { useState } from 'react'
import { ChipItem } from '../../Utils/Types'
const { RangePicker } = DatePicker

interface Props {
  open: boolean
  description: string
  handleCloseModal: () => void
  dates: string[]
  title: string
  tags: ChipItem[]
}

const CustomEditModal = ({
  open,
  handleCloseModal,
  title,
  dates,
  description,
  tags,
}: Props) => {
  const [date, setDate] = useState<string[]>([])
  const [dataTypesArray, setDataTypesArray] = useState<Array<ChipItem>>([])

  const [startDate, endDate] = dates.map((dateString) => dayjs(dateString))

  // Check if you have both start and end dates

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

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ChipItem[]
  ) => {
    setDataTypesArray(newValue)
    // You can perform additional actions with the selected options here
  }

  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current.isAfter(dayjs().endOf('day')) : false
  }

  const getOptionSelected = (option: ChipItem, value: ChipItem) =>
    option.id === value.id

  useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleCloseModal} open={open}>
        <Container>
          <Typography variant="h2">Edit Configuration</Typography>
          <RangePicker
            getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
            presets={rangePresets}
            onChange={onRangeChange}
            defaultValue={[startDate, endDate]}
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
            defaultValue={description}
          />
          <Autocomplete
            multiple
            fullWidth
            id="tags-standard"
            defaultValue={tags}
            isOptionEqualToValue={(option: ChipItem, value:ChipItem) => option.id === value.id}
            options={options}
            onChange={handleAutocompleteChange}
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

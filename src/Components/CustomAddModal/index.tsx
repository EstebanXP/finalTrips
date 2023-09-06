import { Button, Dialog, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { DatePicker } from 'antd'
import Autocomplete from '@mui/material/Autocomplete'
import { ButtonsContainer, Container } from './styled'
import dayjs, { Dayjs } from 'dayjs'
import {
  columns,
  fetchDataByParams,
  rangePresets,
  rows,
  dataTypes,
} from './utils'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import CancelProcessModal from '../CancelProcessModal'
import { GlobalState } from '../../Redux/Store'
import { useSelector } from 'react-redux'
const { RangePicker } = DatePicker

interface DataItem {
  max_ts: number
  ts: string
  value: number
  dataType?: string
  id: number
}

interface DataTypeResult {
  dataType: string
  data: DataItem[]
}

interface Props {
  open: boolean
  handleCloseModal: () => void
}

const options = [
  { id: 1, title: 'RPi' },
  { id: 2, title: 'Coolant temperature' },
  { id: 3, title: 'Speed' },
  { id: 4, title: 'RPM' },
]

const CustomAddModal = ({ open, handleCloseModal }: Props) => {
  const [openCancelProcessModal, setOpenCancelProcessModal] =
    useState<boolean>(false)
  const [nextStep, setNextStep] = useState<boolean>(false)
  const [date, setDate] = useState<string[]>([])
  const { trips } = useSelector((state: GlobalState) => state.trips)
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [finalData, setfinalData] = useState<Array<DataItem>>([])

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

  async function fetchDataByParamsArray(
    dataQueries: Array<{ start_time_utc: string; end_time_utc: string }>,
    dataType: string // Pass dataType as a prop
  ) {
    const data = await Promise.all(
      dataQueries.map(({ start_time_utc, end_time_utc }) =>
        fetchDataByParams(
          'd551fc2e-7a6c-4ebf-954b-29d3e6ae5bc4',
          dataType,
          start_time_utc,
          end_time_utc
        )
      )
    )
    return data
  }

  const downloadJSONFile = () => {
    const jsonString = JSON.stringify(finalData, null, 2) // The second argument (null) specifies the replacer function, and the third argument (2) specifies the indentation for the JSON file.
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json' // Specify the desired file name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  const handleOpenCancelProcessModal = () => {
    setOpenCancelProcessModal(true)
  }

  const handleCloseCancelProcessModal = () => {
    setOpenCancelProcessModal(false)
  }

  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current.isAfter(dayjs().endOf('day')) : false
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value) // Update the Title state
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value) // Update the Description state
  }

  const handleNextStep = () => {
    setNextStep(true)
    fetchData()
  }

  const filteredData = trips?.filter((item) => {
    const itemStartTime = new Date(item.start_time_utc).getTime()
    const startDate = new Date(date[0]).getTime()
    const endDate = new Date(date[1]).getTime()
    return itemStartTime >= startDate && itemStartTime <= endDate
  })

  async function fetchData() {
    try {
      setLoading(true)
      const promises = dataTypes.map(async (type) => {
        const data = await fetchDataByParamsArray(filteredData || [], type)
        if (data.length > 0) {
          data.forEach((item) => {
            item.forEach((subItem: DataItem) => {
              subItem.dataType = type
            })
          })
          return data
        }
        return null
      })

      const results = (await Promise.all(promises)).filter(
        (result) => result !== null
      )
      setLoading(false)
      const filteredResponse = results.map((item) =>
        item?.filter((entry) => entry.length > 0)
      )

      const flatData = filteredResponse.flat(Infinity)
      console.log(flatData)
      setfinalData(flatData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleCloseModal} open={open}>
        {!nextStep ? (
          <Container>
            <Typography variant="h2">Create a new configuration</Typography>
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
              onChange={handleTitleChange}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Description"
              variant="standard"
              onChange={handleDescriptionChange}
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
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleOpenCancelProcessModal}
              >
                {' '}
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleNextStep}
              >
                {' '}
                Done
              </Button>
            </ButtonsContainer>
          </Container>
        ) : (
          <Container>
            {loading ? (
              <div>loading</div>
            ) : (
              <div>
                <Typography variant="h2">All data</Typography>
                <DataGrid
                  disableRowSelectionOnClick={true}
                  rows={finalData}
                  columns={columns}
                  getRowId={(row: any) => Math.random()}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection={false}
                />
                <ButtonsContainer>
                  <p>w</p>
                  <p>w</p>
                </ButtonsContainer>
                <ButtonsContainer>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenCancelProcessModal}
                  >
                    {' '}
                    Cancel
                  </Button>
                  <Button fullWidth variant="contained" color="primary" onClick={downloadJSONFile}>
                    {' '}
                    Export and Save
                  </Button>
                </ButtonsContainer>
              </div>
            )}
          </Container>
        )}
        {/* <CancelProcessModal
          open={openCancelProcessModal}
          handleNoCancelProcess={handleCloseCancelProcessModal}
          handleCancelProcess={handleCloseCancelProcessModal}
            ></CancelProcessModal>*/}
      </Dialog>
    </div>
  )
}

export default CustomAddModal

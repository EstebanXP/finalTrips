import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { DatePicker } from 'antd'
import Autocomplete from '@mui/material/Autocomplete'
import { ButtonsContainer, Container } from './styled'
import dayjs, { Dayjs } from 'dayjs'
import { columns, fetchDataByParams, rangePresets } from './utils'
import { useEffect, useState } from 'react'
import CancelProcessModal from '../CancelProcessModal'
import { GlobalState } from '../../Redux/Store'
import { useSelector } from 'react-redux'
import { ChipItem } from '../../Utils/Types'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../config/config'
import { options } from '../CustomEditModal/utils'
import CustomChip from '../CustomChip'
const { RangePicker } = DatePicker

export interface DataItem {
  max_ts: number
  ts: string
  value: number
  dataType?: string
  id: number
}

interface Props {
  open: boolean
  handleCloseModal: () => void
  getTrips: () => void
}

const CustomAddModal = ({ open, handleCloseModal, getTrips }: Props) => {
  const [openCancelProcessModal, setOpenCancelProcessModal] =
    useState<boolean>(false)
  const [dataTypesArray, setDataTypesArray] = useState<Array<ChipItem>>([])
  const [csvChecked, setCsvChecked] = useState(true)
  const [jsonChecked, setJsonChecked] = useState(true)
  const [nextStep, setNextStep] = useState<boolean>(false)
  const [date, setDate] = useState<string[]>([])
  const { trips } = useSelector((state: GlobalState) => state.trips)
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [finalData, setfinalData] = useState<Array<DataItem>>([])

  const addDocument = () => {
    if (csvChecked) {
      downloadCSV()
    }
    if (jsonChecked) {
      downloadJSONFile()
    }
    try {
      addDoc(collection(db, 'usuarios', 'ray3', 'configurations'), {
        title: title,
        description: description,
        dates: date,
        createdAt: new Date(),
        configurations: dataTypesArray,
      }).then((resp) => {
        console.log('Document written with ID: ', resp.id)
        setNextStep(false)
        setDate([])
        setTitle('')
        handleCloseModal()
        setDataTypesArray([])
        getTrips()
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleClickCancelProcess = () => {
    setOpenCancelProcessModal(false)
    setNextStep(false)
    setDate([])
    setTitle('')
    setDataTypesArray([])
    handleCloseModal()
  }

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

  const downloadCSV = () => {
    const csvHeader = Object.keys(finalData[0]).join(',') + '\n'
    const csvBody = finalData
      .map((item) => Object.values(item).join(','))
      .join('\n')

    const csvContent = csvHeader + csvBody
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'data.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCsvChange = () => {
    setCsvChecked((prevChecked) => !prevChecked)
  }

  const handleJsonChange = () => {
    setJsonChecked((prevChecked) => !prevChecked)
  }

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ChipItem[]
  ) => {
    setDataTypesArray(newValue)
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
      const promises = dataTypesArray.map(async ({ dataType }) => {
        const data = await fetchDataByParamsArray(filteredData || [], dataType)
        if (data.length > 0) {
          data.forEach((item) => {
            item.forEach((subItem: DataItem) => {
              subItem.dataType = dataType
            })
          })
          return data
        }
        return null
      })

      const results = await Promise.all(
        promises.map(async (promise) => {
          const result = await promise

          return result
        })
      )

      setLoading(false)

      const filteredResponse = results.map((item) =>
        item?.filter((entry) => entry.length > 0)
      )

      const flatData = filteredResponse.flat(Infinity)
      setfinalData(flatData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (
    event: React.MouseEvent<HTMLDivElement>,
    reason: string | undefined
  ) => {
    if (reason && reason === 'backdropClick') return
    handleCloseModal()
  }

  useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleClose} open={open}>
        {!nextStep ? (
          <Container customHeight="500px">
            <Typography variant="h2">Create a new configuration</Typography>
            <RangePicker
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
              presets={rangePresets}
              onChange={onRangeChange}
              disabledDate={disabledDate}
              showTime={{ format: 'HH:mm' }} // Specify the time format
              format="YYYY-MM-DD HH:mm"
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
              onChange={handleAutocompleteChange}
              value={dataTypesArray}
              renderTags={(tagValue, getTagProps) => {
                console.log(tagValue)
                return tagValue.map((option, index) => (
                  <CustomChip
                    {...getTagProps({ index })}
                    value={option.title}
                    obd={option.dataType}
                  />
                ))
              }}
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
            <Container customHeight="500px">
              <Typography variant="h2">All data</Typography>
              <DataGrid
                disableRowSelectionOnClick={true}
                rows={finalData}
                loading={loading}
                columns={columns}
                getRowId={(row: any) => Math.random()}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 50, 100]}
                checkboxSelection={false}
              />
              <ButtonsContainer>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={csvChecked}
                        onChange={handleCsvChange}
                      />
                    }
                    label="CSV"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jsonChecked}
                        onChange={handleJsonChange}
                      />
                    }
                    label="JSON"
                  />
                </FormGroup>
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
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addDocument}
                >
                  {' '}
                  Export and Save
                </Button>
              </ButtonsContainer>
            </Container>
          </Container>
        )}
        <CancelProcessModal
          open={openCancelProcessModal}
          handleNoCancelProcess={handleCloseCancelProcessModal}
          handleCancelProcess={handleClickCancelProcess}
        ></CancelProcessModal>
      </Dialog>
    </div>
  )
}

export default CustomAddModal

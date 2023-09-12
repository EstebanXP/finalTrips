import React from 'react'
import { doc, setDoc } from 'firebase/firestore'
import {
  Button,
  Dialog,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material'
import { DatePicker } from 'antd'
import Autocomplete from '@mui/material/Autocomplete'
import { ButtonsContainer, Container } from './styled'
import dayjs, { Dayjs } from 'dayjs'
import { options, rangePresets } from './utils'
import { useState } from 'react'
import { ChipItem } from '../../Utils/Types'
import { db } from '../../config/config'
import { DataGrid } from '@mui/x-data-grid'
import { columns, fetchDataByParams } from '../CustomAddModal/utils'
import CancelProcessModal from '../CancelProcessModal'
import { DataItem } from '../CustomAddModal'
import { GlobalState } from '../../Redux/Store'
import { useSelector } from 'react-redux'
import CustomChip from '../CustomChip'
const { RangePicker } = DatePicker

interface Props {
  open: boolean
  description: string
  handleCloseModal: () => void
  dates: string[]
  title: string
  tags: ChipItem[]
  id: string
  refreshData: () => void
}

const CustomEditModal = ({
  open,
  handleCloseModal,
  title,
  dates,
  description,
  id,
  tags,
  refreshData,
}: Props) => {
  const [startDate1, endDate1] = dates
  const [date, setDate] = useState<string[]>([startDate1, endDate1])
  const [openCancelProcessModal, setOpenCancelProcessModal] =
    useState<boolean>(false)
  const [csvChecked, setCsvChecked] = useState(true)
  const [jsonChecked, setJsonChecked] = useState(true)
  const [nextStep, setNextStep] = useState<boolean>(false)
  const { trips } = useSelector((state: GlobalState) => state.trips)
  const [loading, setLoading] = useState<boolean>(false)
  const [dataTypesArray, setDataTypesArray] = useState<Array<ChipItem>>(tags)
  const [editedTitle, setEditedTitle] = useState(title)
  const [finalData, setfinalData] = useState<Array<DataItem>>([])
  const [editedDescription, setEditedDescription] = useState(description)

  const [startDate, endDate] = dates.map((dateString) => dayjs(dateString))

  const editDocument = () => {
    if (csvChecked) {
      downloadCSV()
    }
    if (jsonChecked) {
      downloadJSONFile()
    }
    try {
      setDoc(
        doc(db, 'usuarios', 'ray3', 'configurations', id),
        {
          title: editedTitle,
          description: editedDescription,
          dates: date,
          configurations: dataTypesArray,
        },
        { merge: true }
      )
        .then((resp) => {
          setNextStep(false)
          //setDate([])
          //setEditedTitle('')
          //setEditedDescription('')
          //handleCloseModal()
          //setDataTypesArray([])
          handleCloseModal()
          refreshData()
        })
        .catch((err) => console.log(err))
    } catch (e) {
      console.error('Error adding document: ', e)
    }
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

  const handleClickCancelProcess = () => {
    setOpenCancelProcessModal(false)
    setNextStep(false)
    setDate([])
    setEditedTitle('')
    setDataTypesArray([])
    handleCloseModal()
    setEditedDescription('')
  }

  const handleOpenCancelProcessModal = () => {
    setOpenCancelProcessModal(true)
  }

  const handleCloseCancelProcessModal = () => {
    setOpenCancelProcessModal(false)
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

  const handleNextStep = () => {
    setNextStep(true)
    fetchData()
  }

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: ChipItem[]
  ) => {
    setDataTypesArray(newValue)
    // You can perform additional actions with the selected options here
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

  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current.isAfter(dayjs().endOf('day')) : false
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Step 2
    setEditedTitle(event.target.value)
  }

  const handleCsvChange = () => {
    setCsvChecked((prevChecked) => !prevChecked)
  }

  const handleJsonChange = () => {
    setJsonChecked((prevChecked) => !prevChecked)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Step 2
    setEditedDescription(event.target.value)
  }

  const handleClose = (
    event: React.MouseEvent<HTMLDivElement>,
    reason: string | undefined
  ) => {
    if (reason && reason === 'backdropClick') return
    handleCloseModal()
  }

  return (
    <div>
      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        disableEscapeKeyDown={true}
        open={open}
      >
        {!nextStep ? (
          <Container>
            <Typography variant="h2">Edit Configuration</Typography>
            <RangePicker
              getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
              presets={rangePresets}
              onChange={onRangeChange}
              defaultValue={[startDate, endDate]}
              disabledDate={disabledDate}
              showTime={{ format: 'HH:mm' }} // Specify the time format
              format="YYYY-MM-DD HH:mm" 
            />

            <TextField
              fullWidth
              id="standard-basic"
              label="Title"
              variant="standard"
              value={editedTitle}
              onChange={handleTitleChange}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Description"
              variant="standard"
              value={editedDescription}
              onChange={handleDescriptionChange}
            />
            <Autocomplete
              multiple
              fullWidth
              id="tags-standard"
              defaultValue={tags}
              isOptionEqualToValue={(option: ChipItem, value: ChipItem) =>
                option.id === value.id
              }
              options={options}
              value={dataTypesArray}
              onChange={handleAutocompleteChange}
              getOptionLabel={(option) => option.title}
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                  <CustomChip {...getTagProps({ index })} value={option.title} obd={option.dataType} />
                ));
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
                onClick={handleCloseModal}
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
                Edit
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
                  onClick={editDocument}
                >
                  {' '}
                  Export and Save
                </Button>
              </ButtonsContainer>
            </Container>
            <CancelProcessModal
              open={openCancelProcessModal}
              handleNoCancelProcess={handleCloseCancelProcessModal}
              handleCancelProcess={handleClickCancelProcess}
            ></CancelProcessModal>
          </Container>
        )}
      </Dialog>
    </div>
  )
}

export default CustomEditModal

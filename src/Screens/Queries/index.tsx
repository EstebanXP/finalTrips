import { useEffect, useState } from 'react'
import axiosConfig from '../../api/axios'
import { DatePicker } from 'antd'
import { rangePresets } from '../Queries/utils'
import dayjs, { Dayjs } from 'dayjs'
import { Trip } from './types'
import { GlobalState } from '../../Redux/Store'
import { useSelector } from 'react-redux'
const { RangePicker } = DatePicker

const Queries = () => {
  const [data, setData] = useState<Trip[]>([])
  const { user } = useSelector((state: GlobalState) => state.user)
  //const [data, setData] = useState<ApiResponse>()
  const [date, setDate] = useState<string[]>([])
  const getData = async () => {
    try {
      const { data } = await axiosConfig.get(`/logbook/trips/`)
      setData(data)
    } catch (error: any) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    }
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

  const filteredData = data.filter((item) => {
    const itemStartTime = new Date(item.start_time_utc).getTime()
    const startDate = new Date(date[0]).getTime()
    const endDate = new Date(date[1]).getTime()
    return itemStartTime >= startDate && itemStartTime <= endDate
  })

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    //console.log(date)
    //console.log(filteredData)
  }, [date, filteredData])
  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div>
      Queries
      <RangePicker presets={rangePresets} onChange={onRangeChange} />
    </div>
  )
}

export default Queries

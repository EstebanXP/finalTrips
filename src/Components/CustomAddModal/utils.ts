import dayjs from 'dayjs'
import type { TimeRangePickerProps } from 'antd'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { useQuery } from 'react-query'
import axiosConfig from '../../api/axios'

export const rangePresets: TimeRangePickerProps['presets'] = [
  {
    label: 'Today',
    value: [dayjs().startOf('day'), dayjs().endOf('day')],
  },
  {
    label: 'Current Week',
    value: [dayjs().startOf('week'), dayjs().endOf('week')],
  },
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },

  {
    label: 'Last Month',
    value: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  },
  { label: 'Last 3 Months', value: [dayjs().add(-90, 'd'), dayjs()] },
  {
    label: 'Current Year',
    value: [dayjs().startOf('year'), dayjs().endOf('day')],
  },
]

export const columns: GridColDef[] = [
  {
    field: 'dataType',
    headerName: 'Data Type',
    flex: 1,
    editable: false,
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 1,
    editable: false,
  },
  {
    field: 'ts',
    headerName: 'Time Stamp',
    type: 'number',
    flex: 1,
    editable: false,
  },
]

export const rows = [
  { id: 1, dataType: 'RPi', value: 42.3, ts: 1630689540 },
  { id: 2, dataType: 'RPM', value: 3500, ts: 1630689600 },
  { id: 3, dataType: 'Speed', value: 65, ts: 1630689660 },
  { id: 4, dataType: 'Coolant Temperature', value: 85.5, ts: 1630689720 },
  { id: 5, dataType: 'RPi', value: 42.6, ts: 1630689780 },
  { id: 6, dataType: 'RPM', value: 3550, ts: 1630689840 },
  { id: 7, dataType: 'Speed', value: 67, ts: 1630689900 },
  { id: 8, dataType: 'Coolant Temperature', value: 86.2, ts: 1630689960 },
  { id: 9, dataType: 'RPi', value: 42.9, ts: 1630690020 },
  { id: 10, dataType: 'RPM', value: 3600, ts: 1630690080 },
  { id: 11, dataType: 'Speed', value: 68, ts: 1630690140 },
  { id: 12, dataType: 'Coolant Temperature', value: 86.8, ts: 1630690200 },
  { id: 13, dataType: 'RPi', value: 43.2, ts: 1630690260 },
  { id: 14, dataType: 'RPM', value: 3650, ts: 1630690320 },
  { id: 15, dataType: 'Speed', value: 70, ts: 1630690380 },
  { id: 16, dataType: 'Coolant Temperature', value: 87.5, ts: 1630690440 },
  { id: 17, dataType: 'RPi', value: 43.5, ts: 1630690500 },
  { id: 18, dataType: 'RPM', value: 3700, ts: 1630690560 },
  { id: 19, dataType: 'Speed', value: 71, ts: 1630690620 },
  { id: 20, dataType: 'Coolant Temperature', value: 88.2, ts: 1630690680 },
  { id: 21, dataType: 'RPi', value: 43.8, ts: 1630690740 },
  { id: 22, dataType: 'RPM', value: 3750, ts: 1630690800 },
  { id: 23, dataType: 'Speed', value: 72, ts: 1630690860 },
  { id: 24, dataType: 'Coolant Temperature', value: 88.8, ts: 1630690920 },
  { id: 25, dataType: 'RPi', value: 44.1, ts: 1630690980 },
  { id: 26, dataType: 'RPM', value: 3800, ts: 1630691040 },
  { id: 27, dataType: 'Speed', value: 73, ts: 1630691100 },
  { id: 28, dataType: 'Coolant Temperature', value: 89.5, ts: 1630691160 },
  { id: 29, dataType: 'RPi', value: 44.4, ts: 1630691220 },
  { id: 30, dataType: 'RPM', value: 3850, ts: 1630691280 },
  // Agrega más filas de datos según sea necesario
]

export const dataTypes = [
  'obd.fuel_level.value',
  //'track.pos.loc', //CHEAR DATA TYPE, geo_point
  'rpi.temp.cpu.value',
  'obd.bat.voltage',
  'obd.ambiant_air_temp.value', //CHECAR DATATYPE long
  'obd.coolant_temp.value', //CHECAR DATATYPE long
  'obd.speed.value',
  'obd.rpm.value',
  'acc.xyz.x',
  'acc.xyz.y',
  'acc.xyz.z',
]

/*function fetchDataByParams(from_utc: string, to_utc: string) {
  // Replace this with your actual data fetching logic
  return fetch(`your-api-url?from_utc=${from_utc}&to_utc=${to_utc}`).then((response) => response.json());
}*/

export const fetchDataByParams = async (
  device_id: string,
  dataType: string,
  from_utc: string,
  to_utc: string
) => {
  const baseUrl = 'https://api.autopi.io/logbook/storage/read/'

  // Field types mapping
  const fieldTypes: { [key: string]: string } = {
    'track.pos.loc': 'geo_point',
    'obd.ambiant_air_temp.value': 'long',
    'obd.coolant_temp.value': 'long',
    'rpi.temp.cpu.value': 'float',
    'obd.bat.voltage': 'float',
    'obd.speed.value': 'float',
    'obd.rpm.value': 'float',
    'acc.xyz.x': 'float',
    'acc.xyz.y': 'float',
    'acc.xyz.z': 'float',
  }

  // Determine field_type based on dataType
  const field_type = fieldTypes[dataType] || 'float' // Default to 'float' if not found

  const aggregation = 'avg' // Suponemos que es siempre 'avg'
  const interval = '3627ms' // Suponemos que es siempre '3627ms'

  const url = `${baseUrl}?device_id=${device_id}&field=${dataType}&field_type=${field_type}&aggregation=${aggregation}&from_utc=${from_utc}&to_utc=${to_utc}&interval=${interval}`

  try {
    const response = await axiosConfig.get(url)

    if (response.status !== 200) {
      throw new Error('Failed to fetch data')
    }

    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

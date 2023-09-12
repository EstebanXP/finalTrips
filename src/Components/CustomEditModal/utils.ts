import dayjs from 'dayjs'
import type { TimeRangePickerProps } from 'antd'

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


export const options = [
  { id: 1, title: 'Coolant temperature', dataType: 'obd.coolant_temp.value' },
  { id: 2, title: 'Ambient Air', dataType: 'obd.ambiant_air_temp.value' },
  { id: 3, title: 'Fuel Level', dataType: 'obd.fuel_level.value' },
  { id: 4, title: 'Battery Voltage', dataType: 'obd.bat.voltage' },
  { id: 5, title: 'Speed', dataType: 'obd.speed.value' },
  { id: 6, title: 'RPM', dataType: 'obd.rpm.value' },
  { id: 7, title: 'X-axis geolocation', dataType: 'acc.xyz.x' },
  { id: 8, title: 'Y-axis geolocation', dataType: 'acc.xyz.y' },
  { id: 9, title: 'Z-axis geolocation', dataType: 'acc.xyz.z' },
]

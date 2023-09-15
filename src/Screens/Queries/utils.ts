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

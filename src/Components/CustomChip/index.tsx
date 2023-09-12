import React from 'react'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import SpeedIcon from '@mui/icons-material/Speed'
import FmdGoodSharpIcon from '@mui/icons-material/FmdGoodSharp'
import AirIcon from '@mui/icons-material/Air'
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded'
import { FaTachometerAlt } from 'react-icons/fa'
import { BsFillFuelPumpFill } from 'react-icons/bs'
import { StyledChip } from './styled'

interface ChipWithIconProps {
  value: string
  obd: string
}

function getIcon(value: string, obd: string): React.ReactElement | null {
  switch (value) {
    case 'Coolant temperature':
      return obd === 'obd.coolant_temp.value' ? <DeviceThermostatIcon /> : null
    case 'Fuel Level':
      return obd === 'obd.fuel_level.value' ? <BsFillFuelPumpFill /> : null
    case 'Speed':
      return obd === 'obd.speed.value' ? <SpeedIcon /> : null
    case 'X-axis geolocation':
      return obd === 'acc.xyz.x' ? <FmdGoodSharpIcon /> : null
    case 'Y-axis geolocation':
      return obd === 'acc.xyz.y' ? <FmdGoodSharpIcon /> : null
    case 'Z-axis geolocation':
      return obd === 'acc.xyz.z' ? <FmdGoodSharpIcon /> : null
    case 'Ambient Air':
      return obd === 'obd.ambiant_air_temp.value' ? <AirIcon /> : null
    case 'Battery Voltage':
      return obd === 'obd.bat.voltage' ? <FlashOnRoundedIcon /> : null
    case 'RPM':
      return obd === 'obd.rpm.value' ? <FaTachometerAlt /> : null
    default:
      return null
  }
}

const CustomChip = ({ value, obd }: ChipWithIconProps) => {
  const icon = getIcon(value, obd)

  // Obtiene el color del mapeo
  const colorMap: { [key: string]: string } = {
    'Coolant temperature': '#B0E1E7',
    'Ambient Air': '#FFFFFF',
    'Fuel Level': '#B69D7D',
    'Speed': '#EFA1A1',
    'RPM': '#F0A33C',
    'Battery Voltage': '#EFF3BD',
    'X-axis geolocation': '#BDF3CC',
    'Y-axis geolocation': '#BDF3CC',
    'Z-axis geolocation': '#BDF3CC',
  }

  const color = colorMap[value] || 'default'

  return (
    <StyledChip
      chipColor={color}
      label={value}
      icon={icon || undefined}
    ></StyledChip>
  )
}

export default CustomChip

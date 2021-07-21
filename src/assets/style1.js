import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={80} height={80} rx={10} fill="#F4DCD6" />
      <Path
        d="M0 10C0 4.477 4.477 0 10 0h25.111L56.89 80H10C4.477 80 0 75.523 0 70V10z"
        fill="#84B4C8"
      />
    </Svg>
  )
}

export default SvgComponent

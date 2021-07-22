import * as React from "react"
import Svg, { Rect, Path, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={320} height={180} rx={10} fill="#F4DCD6" />
      <Path
        d="M0 10C0 4.477 4.477 0 10 0h136.5L246 180H10c-5.523 0-10-4.477-10-10V10z"
        fill="#84B4C8"
      />
    </Svg>
  )
}

export default SvgComponent

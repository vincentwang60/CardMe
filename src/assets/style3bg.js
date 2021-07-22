import * as React from "react"
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  Rect,
} from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <RadialGradient
          id="prefix__b"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(44.49984 -266.00044 472.88935 79.11078 176 248)"
        >
          <Stop stopColor="#F18505" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </RadialGradient>
        <LinearGradient
          id="prefix__a"
          x1={139}
          y1={232}
          x2={153}
          y2={-37}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DD257D" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect width={320} height={180} rx={10} fill="#5B14A3" />
      <Rect width={320} height={180} rx={10} fill="url(#prefix__a)" />
      <Rect
        width={320}
        height={180}
        rx={10}
        fill="url(#prefix__b)"
        fillOpacity={0.8}
      />
    </Svg>
  )
}

export default SvgComponent

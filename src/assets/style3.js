import * as React from "react"
import Svg, {
  Mask,
  Rect,
  G,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
} from "react-native-svg"

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
      <Mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={80}
        height={80}
      >
        <Rect width={80} height={80} rx={10} fill="#F4DCD6" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Rect
          x={-176.889}
          y={-61.334}
          width={284.444}
          height={160}
          rx={10}
          fill="#5B14A3"
        />
        <Rect
          x={-176.889}
          y={-61.334}
          width={284.444}
          height={160}
          rx={10}
          fill="url(#prefix__paint0_linear)"
        />
        <Rect
          x={-176.889}
          y={-61.334}
          width={284.444}
          height={160}
          rx={10}
          fill="url(#prefix__paint1_radial)"
          fillOpacity={0.8}
        />
      </G>
      <Defs>
        <RadialGradient
          id="prefix__paint1_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-80.503 83.748 91.63) scale(239.73 426.187)"
        >
          <Stop stopColor="#F18505" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </RadialGradient>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={-53.333}
          y1={144.889}
          x2={-40.889}
          y2={-94.222}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DD257D" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent

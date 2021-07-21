import * as React from "react"
import Svg, {
  Mask,
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
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
          x={-186}
          y={-69}
          width={265.778}
          height={149.333}
          rx={10}
          fill="#366AB5"
        />
        <Rect
          x={-186}
          y={-69}
          width={265.778}
          height={149.333}
          rx={10}
          fill="url(#prefix__paint0_linear)"
        />
        <Mask
          id="prefix__b"
          maskUnits="userSpaceOnUse"
          x={-186}
          y={-69}
          width={320}
          height={180}
        >
          <Rect
            x={-186}
            y={-69}
            width={320}
            height={180}
            rx={10}
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#prefix__b)">
          <Path
            d="M43.142 70.551c26.71 5.958 52.097.754 79.467 6.35 77.38 15.818 0 79.099 0 79.099L-186 153.884V7.589S-169.695 5.946-158.997 6c41.554.217 32.827 23.212 73.295 26.455 29.864 2.393 47.69-7.947 77.152-5.026 51.01 5.057 7.183 33.193 51.692 43.121z"
            fill="#BE7CB4"
          />
          <Path
            d="M43.142 70.551c26.71 5.958 52.097.754 79.467 6.35 77.38 15.818 0 79.099 0 79.099L-186 153.884V7.589S-169.695 5.946-158.997 6c41.554.217 32.827 23.212 73.295 26.455 29.864 2.393 47.69-7.947 77.152-5.026 51.01 5.057 7.183 33.193 51.692 43.121z"
            fill="url(#prefix__paint1_linear)"
            fillOpacity={0.5}
          />
          <Path
            d="M60.59 65.862c11.876 27.118 33.587 35.963 59.665 35.078 7.823-.265 19.745-4.008 19.745-4.008l-2.575-188.92L.495-97s-3.24 40.146 6.867 61.136C19.621-10.41 50.103-20.783 60.59 5.729c8.433 21.32-9.158 39.224 0 60.133z"
            fill="#366AB5"
          />
          <Path
            d="M60.59 65.862c11.876 27.118 33.587 35.963 59.665 35.078 7.823-.265 19.745-4.008 19.745-4.008l-2.575-188.92L.495-97s-3.24 40.146 6.867 61.136C19.621-10.41 50.103-20.783 60.59 5.729c8.433 21.32-9.158 39.224 0 60.133z"
            fill="url(#prefix__paint2_linear)"
            fillOpacity={0.5}
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={30.775}
          y1={135.089}
          x2={-106.028}
          y2={-124.711}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BE7CB4" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={129.997}
          y1={165.788}
          x2={47.928}
          y2={-21.504}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDC957" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={154.594}
          y1={1.719}
          x2={-9.818}
          y2={-0.487}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BE7CB4" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent

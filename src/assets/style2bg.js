import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Rect,
  G,
  Path,
  Circle,
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
        <LinearGradient
          id="prefix__a"
          x1={261}
          y1={246}
          x2={96}
          y2={-67}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BE7CB4" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__c"
          x1={315.997}
          y1={249.788}
          x2={233.928}
          y2={62.496}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDC957" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__d"
          x1={376.594}
          y1={70.719}
          x2={212.182}
          y2={68.513}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BE7CB4" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Mask
        id="prefix__b"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={320}
        height={180}
      >
        <Rect width={320} height={180} rx={10} fill="#C4C4C4" />
      </Mask>
      <Rect width={320} height={180} rx={10} fill="#366AB5" />
      <Rect width={320} height={180} rx={10} fill="url(#prefix__a)" />
      <G mask="url(#prefix__b)">
        <Path
          d="M229.142 154.551c26.711 5.958 52.097.754 79.467 6.349 77.38 15.819 0 79.1 0 79.1L0 237.884V91.589S16.305 89.946 27.003 90c41.554.217 32.827 23.212 73.295 26.455 29.864 2.393 47.69-7.947 77.152-5.026 51.009 5.057 7.183 33.193 51.692 43.121z"
          fill="#BE7CB4"
        />
        <Path
          d="M229.142 154.551c26.711 5.958 52.097.754 79.467 6.349 77.38 15.819 0 79.1 0 79.1L0 237.884V91.589S16.305 89.946 27.003 90c41.554.217 32.827 23.212 73.295 26.455 29.864 2.393 47.69-7.947 77.152-5.026 51.009 5.057 7.183 33.193 51.692 43.121z"
          fill="url(#prefix__c)"
          fillOpacity={0.5}
        />
        <Path
          d="M282.589 134.862c11.877 27.118 33.588 35.963 59.666 35.078 7.823-.265 19.745-4.008 19.745-4.008l-2.575-188.92L222.494-28s-3.24 40.146 6.868 61.136c12.258 25.454 42.741 15.081 53.227 41.593 8.433 21.32-9.158 39.225 0 60.133z"
          fill="#366AB5"
        />
        <Path
          d="M282.589 134.862c11.877 27.118 33.588 35.963 59.666 35.078 7.823-.265 19.745-4.008 19.745-4.008l-2.575-188.92L222.494-28s-3.24 40.146 6.868 61.136c12.258 25.454 42.741 15.081 53.227 41.593 8.433 21.32-9.158 39.225 0 60.133z"
          fill="url(#prefix__d)"
          fillOpacity={0.5}
        />
        <Mask
          id="prefix__e"
          maskUnits="userSpaceOnUse"
          x={210}
          y={55}
          width={70}
          height={70}
        >
          <Circle
            cx={245}
            cy={90}
            r={34}
            fill="#fff"
            stroke="#fff"
            strokeWidth={2}
          />
        </Mask>
        <G mask="url(#prefix__e)">
          <Circle cx={245.209} cy={90.449} r={35.274} fill="#fff" />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent

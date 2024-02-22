import * as React from "react"
import Svg, { Rect, G } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: animate */

function Loading(props: any) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
                margin: "auto",
                background: "#fff"
            }}
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            display="block"
            shapeRendering="auto"
            {...props}
        >
            <G transform="rotate(0 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(30 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(60 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(90 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(120 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(150 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(180 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(210 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(240 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(270 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(300 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
            <G transform="rotate(330 50 50)">
                <Rect
                    x={47}
                    y={24}
                    rx={2.4}
                    ry={2.4}
                    width={6}
                    height={12}
                    fill="#008ce3"
                ></Rect>
            </G>
        </Svg>
    )
}

export default Loading

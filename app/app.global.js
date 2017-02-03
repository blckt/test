import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "position": "relative",
        "color": "white",
        "height": 100 * vh,
        "backgroundColor": "#232C39",
        "backgroundImage": "linear-gradient(45deg, rgba(0, 216, 255, .5) 10%, rgba(0, 1, 127, .7))",
        "fontFamily": "Arial, Helvetica, Helvetica Neue, serif",
        "overflowY": "hidden"
    }
});
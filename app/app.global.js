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
        "fontFamily": "Arial, Helvetica, Helvetica Neue, serif",
        "overflowY": "hidden"
    }
});

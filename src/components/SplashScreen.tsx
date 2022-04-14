import React from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BGColor = "#4D4A95";

export default function SplashScreen() {

    
    const edges = useSafeAreaInsets();

    return (
        <View style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: BGColor,
        }}>
            <Animated.View>
                <Image

            </Animated.View>


        </View>
    );
}


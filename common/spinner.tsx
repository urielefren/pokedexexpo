import React from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface IProps {
    shouldShow: boolean;
}

class Spinner extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);

        this.state = {
            shouldShow: false,
        };
    }

    render() {
        const shouldShow = this.props.shouldShow;
        let spinner;
        if (shouldShow)
            spinner = <ActivityIndicator size="large" color="#00ff00" />
        return (
            <View style={[styles.container, styles.horizontal]}>
                {spinner}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Spinner;
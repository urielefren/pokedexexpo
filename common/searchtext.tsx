import React from 'react';
import { StyleSheet, View } from 'react-native';


class SearchText extends React.Component {

    async componentDidMount() {
        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    }

    onKeyUpHandler(event: any) {
        this.props.onSearchChange(event.target.value);
    }

    render() {
        const searchCSS = {
            inputsearch: {
                width: '100%',
                borderRadius: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 5,
                PaddingBottom: 5,
            },
        };

        return (
            <View style={styles.view}>
                <input style={searchCSS.inputsearch} placeholder="Search" onKeyUp={this.onKeyUpHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 16,
    },
});

export default SearchText;
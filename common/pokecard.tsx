import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
    pokeimage?: string;
    pokename?: string;
}

class PokeCard extends React.Component<IProps, {}> {

    render() {
        const pokeCardCSS = {
            pokeimage: {
                width: '50px',
                height: '50px',
            },
            pokecard: {
                border: '1px solid #cccc',
                borderRadius: 16,
                backgroundColor: '#fff',
                textAlign: 'center',
                padding: 16,
                width: '60px',
                height: '60px',
                marginBottom: 4,
            },
        };

        return (
            <View style={styles.view}>
                <div style={pokeCardCSS.pokecard}>
                    <img style={pokeCardCSS.pokeimage} src={this.props.pokeimage}></img>
                    <br></br>
                    <label>{this.props.pokename}</label>
                </div>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100px',
        height: '100px',
    },
});

export default PokeCard;
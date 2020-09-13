import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import PokeCard from './pokecard';

interface IProps {
    pokeInfo?: any;
}

interface IState {
    pokeInfo?: any;
}

class PokeDetails extends React.Component<IProps, IState> {

    componentDidMount() {
        this.setState({pokeInfo: this.props.pokeInfo});
    }

    buildPokemonAbilities() {
        if (!this.state || !this.state.pokeInfo) {
            return;
        }

        const abilities = this.state.pokeInfo.abilities.map((element: any) => {
            return { ability: element.name};
        });

        return <div>
        {abilities.forEach((element: { ability: string }) => {
            <p>Ability: {element.ability}</p>
        })}
        </div>;
    }

    render() {
        let template;
        if (this.props.pokeInfo) {
            template = <PokeCard pokeimage={this.props.pokeInfo.sprites.front_default}
                pokename={this.props.pokeInfo.name}></PokeCard>;
        }

        return (
            <View style={styles.view}>
                {template}
                {this.buildPokemonAbilities()}
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
        marginTop: 16,
    },
});

export default PokeDetails;
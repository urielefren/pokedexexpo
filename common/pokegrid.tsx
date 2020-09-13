import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import axios from 'axios';
import PokeCard from './pokecard';
import Spinner from './spinner';
import Search from './searchtext';
import PokeDetails from './pokedetails';


interface IPokemon {
    name: string;
    url: string;
    image?: string;
    info?: any | null;
}

interface IState {
    pokemonList: IPokemon[];
    filterList: IPokemon[];
    currentCall: string;
    nextCall: string;
    previousCall: string;
    shouldShow: boolean;
    currentPokemonSelected: any;
}

class PokeGrid extends React.Component<{}, IState> {
    DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0';

    constructor(props: any) {
        super(props);

        this.state = {
            pokemonList: [],
            filterList: [],
            nextCall: '',
            previousCall: '',
            currentCall: '',
            shouldShow: false,
            currentPokemonSelected: null,
        };
    }
    async componentDidMount() {
        this.initComponent(this.DEFAULT_URL);

        this.previousHandler = this.previousHandler.bind(this);
        this.nextHandler = this.nextHandler.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onCardSelected = this.onCardSelected.bind(this);
    }

    async initComponent(url: string) {
        this.setState({ shouldShow: true});
        try {
            const data = await axios.get(url);
            const currentCall = url;
            const nextCall = data.data.next;
            const previousCall = data.data.previous;
            this.setState({ currentCall, nextCall, previousCall});
            const pokemonList = data.data.results;
            const allPromises: any[] = [];
            pokemonList.forEach((pokemon: IPokemon) => {
                allPromises.push(this.getPokemonImage(pokemon.url).then((data) => {
                    pokemon.image = data.sprites.front_default;
                    pokemon.info = data;
                }));
            });
            Promise.all(allPromises).then(() => {
                this.setState({ pokemonList, filterList: pokemonList });
            });
        } finally {
            this.setState({ shouldShow: false });
        }
    }

    async getPokemonImage(url: string) {
        const data2 = await axios.get(url);
        return data2 ? data2.data : null;
    }

    nextHandler() {
        this.initComponent(this.state.nextCall);
    }

    previousHandler() {
        this.initComponent(this.state.previousCall);
    }

    buttonBinding(isPrev: boolean) {
        const condition = isPrev ? this.state.previousCall : this.state.nextCall;
        return condition ? {
            backgroundColor: '#003A70',
            border: 'none',
            color: 'white',
            padding: 16,
            textAlign: 'center',
            textDecoration: 'none',
            displayInline: 'block',
            fontSize: 16,
            marginBottom: 16,
        } : 
        {
            backgroundColor: '#CCCC',
            border: 'none',
            color: 'white',
            padding: 16,
            textAlign: 'center',
            textDecoration: 'none',
            displayInline: 'block',
            fontSize: 16,
            marginBottom: 16,
        };
    }

    onSearchChange(val: string) {
        let filterList = this.state.pokemonList.filter((pokemon) => {
            return pokemon.name.indexOf(val) >= 0;
        });
        if (!val) {
            filterList = this.state.pokemonList;
        }
        this.setState({filterList});
    }

    onCardSelected(currentPokemonSelected: any) {
        console.log(currentPokemonSelected);
        this.setState({ currentPokemonSelected});
    }

    render() {
        const pokeGridCSS = {
            areaVisible: {
                display: 'block',
            },
            areaHidden: {
                display: 'none',
            },
        };

        return (
            <div>
                <div style={this.state.currentPokemonSelected ? pokeGridCSS.areaHidden : pokeGridCSS.areaVisible}>
                    <Spinner shouldShow={this.state.shouldShow} />
                    <Search onSearchChange={this.onSearchChange} />
                    <FlatList
                        style={styles.GridView}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.filterList}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => 
                            <PokeCard pokeimage={item.image}
                                    pokename={item.name}
                                    pokeInfo={item.info}
                                    onCardSelected={this.onCardSelected}></PokeCard>}
                        numColumns={3}
                    />
                    <View style={styles.optionContainer}>
                        <button style={this.buttonBinding(true)} disabled={this.state.previousCall ? false: true} onClick={this.previousHandler}>previous</button>
                        <button style={this.buttonBinding(false)} disabled={this.state.nextCall ? false : true} onClick={this.nextHandler}>Next</button>
                    </View>
                </div>
                <div style={this.state.currentPokemonSelected ? pokeGridCSS.areaVisible : pokeGridCSS.areaHidden}>
                    <PokeDetails pokeInfo={this.state.currentPokemonSelected} />
                </div>
            </div>
        );
    }
}


const styles = StyleSheet.create({

    GridView: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 30,
        paddingTop: 30,
        backgroundColor: '#f1f1f1',
    },

    optionContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },

});

export default PokeGrid;
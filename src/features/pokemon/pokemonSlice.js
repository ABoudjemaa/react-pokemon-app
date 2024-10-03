import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemonByType = createAsyncThunk(
    'pokemon/fetchByType',
    async ({ type, limit, offset }) => {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const allPokemon = response.data.pokemon.slice(offset, offset + limit);
      
      // Fetch detailed data for each Pokemon, including image URL (sprite)
      const pokemonList = await Promise.all(
        allPokemon.map((p) =>
          axios.get(p.pokemon.url).then((res) => ({
            name: res.data.name,
            sprite: res.data.sprites.front_default, // Fetching the default front sprite
            id: res.data.id
          }))
        )
      );
      return { type, pokemonList };
    }
  );
  


const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemonByType: {},
        status: 'idle',
        error: null,
        pagination: {
            limit: 20, // Nombre de Pokémon par page
            currentPage: 1, // Page actuelle
        },
    },
    reducers: {
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonByType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemonByType.fulfilled, (state, action) => {
                const { type, pokemonList } = action.payload;
                state.status = 'succeeded';
                state.pokemonByType[type] = pokemonList;
            })
            .addCase(fetchPokemonByType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
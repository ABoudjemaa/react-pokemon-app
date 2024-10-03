import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonByType, setPage } from '../features/pokemon/pokemonSlice';
import PokemonList from '../components/PokemonList';
import { useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PokemonCategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const pokemonByType = useSelector((state) => state.pokemon.pokemonByType[category]);
  const status = useSelector((state) => state.pokemon.status);
  const error = useSelector((state) => state.pokemon.error);
  const currentPage = useSelector((state) => state.pokemon.pagination.currentPage);
  const limit = useSelector((state) => state.pokemon.pagination.limit);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    dispatch(fetchPokemonByType({ type: category, limit, offset }));
  }, [category, currentPage, dispatch, limit]);

  const handleNextPage = () => {
    dispatch(setPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <div>
      <h2 className='text-center font-bold m-5'>Catégorie : {category}</h2>
      {status === 'loading' && <p>Chargement des Pokémon...</p>}
      {status === 'succeeded' && <PokemonList pokemon={pokemonByType} />}
      {status === 'failed' && <p>Erreur : {error}</p>}
      
      <div className='w-full flex justify-center gap-10 my-10'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`${currentPage === 1 ? " text-gray-500":""} flex gap-2 justify-center items-center`}>
        <MdKeyboardArrowLeft />
          Précédent
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} className='flex gap-2 justify-center items-center'>
          Suivant 
          <MdKeyboardArrowRight />

        </button>
      </div>
    </div>
  );
};

export default PokemonCategoryPage;

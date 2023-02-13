import Layout from '@/components/Layout'
import Image from 'next/image'
import { useFetch } from '@/utils/Hooks/useFetch'
import { Dispatch, useEffect, useState } from 'react'
import Link from 'next/link'
import { PokemonsData } from '@/utils/types'

const NUMBER_LIMIT_OF_POKEMONS = 12

const Home = () => {
  const [limitOfPokemons, setLimitOfPokemons] = useState<number>(NUMBER_LIMIT_OF_POKEMONS);
  const { data: pokemonsFetchData, loading, error, setData }: { data: PokemonsData;
    loading: boolean | null;
    error: string | null;
    setData: Dispatch<any>;
  } = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitOfPokemons}&offset=0.`)

  // NOTE: this useEffect implements pagination and support persist for list of pokemons
  useEffect(() => {
    {
      const pokemonsSessionStorage = sessionStorage.getItem('pokemons');
      const limitOfPokemonsStorage = sessionStorage.getItem('limitOfPokemons');
      const pokemonsSessionData: PokemonsData | null = pokemonsSessionStorage ? JSON.parse(pokemonsSessionStorage) : null
      const limitOfPokemonsData: number | null = limitOfPokemonsStorage ? JSON.parse(limitOfPokemonsStorage) : null

      if (!pokemonsSessionData && pokemonsFetchData || pokemonsFetchData && pokemonsSessionData && pokemonsFetchData.results.length > pokemonsSessionData.results.length) {
        sessionStorage.setItem('pokemons', JSON.stringify(pokemonsFetchData));
        sessionStorage.setItem('limitOfPokemons', JSON.stringify(limitOfPokemons));
      }

      if (pokemonsFetchData && pokemonsSessionData && limitOfPokemonsData && pokemonsSessionData.results.length > pokemonsFetchData.results.length ) {
        setData(pokemonsSessionData)
        setLimitOfPokemons(limitOfPokemonsData)
      }
    }
  }, [pokemonsFetchData, limitOfPokemons, setLimitOfPokemons, setData]);


  const getMorePokemonsSubmit = () => {
    setLimitOfPokemons(limitOfPokemons+12)
  }
  return (
    <>
      <Layout>
      {loading ? (
        <div className="bg-white">
            <div>loading...</div>
        </div>
      ) : (
        <div>
          <div className='grid grid-cols-1  space-x-8 space-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white pt-8 pr-8'>
          {pokemonsFetchData && pokemonsFetchData.results.map((pokemon: any, index: number ) => {
            const Id = ('000' + (index + 1)).slice(-3);
            return (
              <Link className='flex-col first:ml-8 first:mt-8' href={`/pokemon?id=${index + 1}`} key={index + 1}>
                  <div className='card flex justify-center items-center'>
                    <Image  width={500} height={500} className='w-full' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${Id}.png`} alt={pokemon.name} />
                  </div>
                  <p className='text-number-color'>#{Id}</p>
                  <h5 className='text-2xl'>{pokemon.name}</h5>
              </Link>
            )
          })}
          </div>
            <div className='w-full flex justify-center items-center pt-8 pb-8 bg-white'>
              <button className='m-4 py-2 px-5 rounded text-white bg-blue-pokemon' onClick={getMorePokemonsSubmit}>Explore More Pokémon</button>
            </div>
          </div> ) }
      </Layout>
    </>
  )
}

export default Home;
import Layout from '@/components/Layout'
import { useFetch } from '@/utils/Hooks/useFetch'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Pokemon = ({ pokemonImage, id }: { pokemonImage: string; id: number; } ) => {
  const { data: pokemonData, loading, error, setData } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return (
    <>
     <Layout>
     {loading ? (
        <div className="bg-white">
            <div>loading...</div>
        </div>
      ) : (
        <>
          {pokemonData && (
            <div className='flex flex-col min-h-screen justify-center items-center bg-white'>
              <div className='w-full flex justify-center items-center mt-8'>
                <h1 className='mt-8 text-5xl'>{pokemonData.name}</h1>
              </div>
              <div className='grid grid-cols-1 space-x-8 space-y-8 lg:grid-cols-2 mr-8 ml-8'>
                <div className='ml-8 mt-8'>
                  <div className='w-full card flex justify-center items-center'>
                    <img src={pokemonImage} alt="pokemon" />
                  </div>
                </div>
                <div className='mt-8 mr-8'>
                  <div className='grid grid-cols-2 rounded-md bg-blue-pokemon'>
                    <div className='space-y-4 mt-8 mb-8 ml-8'>
                      <h6 className='text-white'>Height</h6>
                      <p>{pokemonData.height}</p>
                      <h6 className='text-white'>Weight</h6>
                      <p>{pokemonData.weight}</p>
                      <h6 className='text-white'>Gender</h6>
                      <p>N/A</p>
                    </div>
                    <div className='space-y-4 mt-8 mb-8 mr-8'>
                      <h6 className='text-white'>Category</h6>
                      <p>N/A</p>
                      <h6 className='text-white'>Abilities</h6>
                      <p>N/A</p>
                    </div>
                  </div>
                  <div>
                    <h4 className='mt-8 mb-4'>Type</h4>
                    <div className='flex space-x-2'>
                      {pokemonData.types.map((type: any, index: number ) => 
                        (<span className='flex justify-center items-center rounded-md w-1/4 h-8 bg-green-400' key={index}>
                          <p className='text-white'>{type.type.name}</p>
                        </span>))
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex justify-center items-center pt-8 pb-8 bg-white'>
            <Link className='m-4 py-2 px-5 rounded text-white bg-blue-pokemon' href={`/`}>
              <h1>Explore More Pokémon</h1>
            </Link>
              </div>
            </div>
          )}
        </>
      )}
     </Layout>
    </>
  )
}

export default Pokemon;

export const getServerSideProps = ({ query }: any) => {
  const id = query.id;
  const paddedId = ('00' + id).slice(-3);
  const pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return { props: { pokemonImage, id } };
}

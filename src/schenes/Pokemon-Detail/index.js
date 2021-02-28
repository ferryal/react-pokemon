/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { jsx } from '@emotion/react';
import {
  Layout, Card, Navbar, Modal, Button, Badge, Loading,
} from '../../components';
import { GET_DETAIL_POKEMON } from '../../GraphQL/Queries';

const PokemonDetail = () => {
  const [isPokemonCaught, setIsPokemonCaught] = useState(false);
  const { name } = useParams();
  const card = [];

  const { loading, error, data: pokemonDetail } = useQuery(GET_DETAIL_POKEMON, {
    variables: { name },
    onError: (e) => {
      throw e;
    },
  });

  const getProbabilityCatch = () => {
    const randomCatch = Math.floor(Math.random() * 100) + 1;
    if (randomCatch >= 50) {
      setIsPokemonCaught(true);
    } else {
      setIsPokemonCaught(false);
    }
  };

  return (
    <>
      <Navbar title={`Pokémon Detail - ${name}`} />
      <Layout>
        {loading && (
          <div css={{ marginTop: '1rem' }}>
            <Loading />
          </div>
        )}
        {!(error || loading) && (
          <>
            <div css={{ width: '100vw', textAlign: 'center' }}>
              <img css={{ height: '200px', width: '200px' }} src={pokemonDetail.pokemon.sprites.front_default} alt="pokemon" />
            </div>
            <Card
              isDetail
              css={{
                width: '60vw',
                backgroundColor: '#cecece',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '30px',
                background: '#ffffff',
                boxShadow: '8px 8px 16px #c4c4c4, -8px -8px 16px #ffffff',
              }}
            >
              <div css={{ fontWeight: '600' }}>{ name.toUpperCase() }</div>
              <div css={{ display: 'flex', flexFlow: 'wrap' }}>
                <p>Types</p>
                {pokemonDetail.pokemon.types
                  ? pokemonDetail.pokemon.types.map((data, key) => (
                    <Badge
                      key={key}
                      text={data.type.name}
                      backgroundColor="#00ffa2"
                      color="#004466"
                    />
                  )) : ''}
              </div>
              <div css={{ display: 'flex', flexFlow: 'wrap' }}>
                <p>Moves</p>
                {pokemonDetail.pokemon.moves
                  ? pokemonDetail.pokemon.moves.map((data, key) => (
                    <Badge
                      key={key}
                      text={data.move.name}
                      color="#00ffa2"
                      backgroundColor="#004466"
                    />
                  )) : ''}
              </div>
            </Card>
          </>
        )}
      </Layout>

      {/* Modal for catching pokemon */}
      {isPokemonCaught === true && (

        <Modal
          pokemon={name}
          isPokemonCaught={isPokemonCaught}
          pokemonDetail={pokemonDetail}
          setIsPokemonCaught={setIsPokemonCaught}
        />
      )}

      {/* Button catch pokemon and trigger the modal */}
      {isPokemonCaught === false && (
        <div css={{
          position: 'fixed',
          bottom: '50px',
          left: '0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 3,
        }}
        >
          <Button css={{ borderRadius: '5px' }} onClick={getProbabilityCatch} text="Catch Pokémon" imgUrl="imgUrl" />
        </div>
      )}
    </>
  );
};

export default PokemonDetail;

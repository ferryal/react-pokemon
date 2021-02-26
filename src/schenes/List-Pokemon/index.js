/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { jsx } from '@emotion/react';
import localforage from 'localforage';
import { GET_LIST_POKEMON } from '../../GraphQL/Queries';
import {
  Navbar, Layout, Card, Loading, Button,
} from '../../components';

const ListPokemon = () => {
  const [items, setItems] = useState([]);
  const [ownedTotal, setOwnedTotal] = useState([]);
  const [state, setState] = useState({
    offset: 0,
    limit: 20,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await localforage.getItem('');
      setOwnedTotal(result);
    };
    fetchData();
  }, []);

  const { loading, error, refetch } = useQuery(GET_LIST_POKEMON, {
    variables: { ...state },
    onCompleted: (res) => {
      const { results } = res.pokemons;
      setItems(results);
    },
    onError: (e) => {
      throw e;
    },
  });

  const handleNextResult = () => {
    setState({
      ...state,
      limit: state.limit + 30,
    });
    refetch();
  };

  const renderListPokemon = () => (
    <>
      {error && `Error! ${error.message}`}
      {!error && (
        <>
          <Layout>
            {items.map((pokemon, key) => (
              <Card
                rounded="rounded"
                elevated="eleveated"
                css={{
                  width: '170px',
                  height: '170px',
                }}
                key={key}
                id={key + 1}
                name={pokemon.name}
                urlImg={pokemon.image}
                ownedTotal={ownedTotal}
                isDetail={false}
              />
            ))}
          </Layout>
        </>
      )}
    </>
  );

  return (
    <>
      <Navbar title="React Pokédex" />
      <div css={{ marginTop: '1rem' }}>
        <div css={{
          display: 'flex',
          justifyContent: 'center',
          flexFlow: 'wrap',
          marginLeft: '3rem',
          marginRight: '3rem',
        }}
        />
        <div css={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100vw',
          maxWidth: '100vw',
        }}
        >
          {renderListPokemon()}
        </div>
        {loading && <Loading />}
        {!loading && (
          <div css={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              onClick={handleNextResult}
              css={{ borderRadius: '5px' }}
              text="Show more Pokémon"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ListPokemon;

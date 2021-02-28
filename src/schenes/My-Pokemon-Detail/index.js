/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useParams, useHistory } from 'react-router-dom';
import { jsx } from '@emotion/react';
import {
  Layout, Navbar, Button, Card, Badge, Loading,
} from '../../components';

const MyPokemonDetail = () => {
  const [detail, setDetail] = useState({ data: [] });
  const history = useHistory();
  const { name } = useParams();
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      const result = await localforage.getItem(name);
      setDetail(result);
    };
    fetchDetail();
  }, [name]);

  useEffect(() => {
    const fetchIds = async () => {
      const res = await localforage.getItem('');
      setRegisteredIds(res);
    };
    fetchIds();
  }, []);

  const updateRegisteredIds = () => {
    const tempIds = [...registeredIds];
    const index = tempIds.indexOf(detail.data.pokemon.id);
    if (index > -1) {
      tempIds.splice(index, 1);
    }
    localforage.setItem('', tempIds);
  };

  const releasePokemon = () => {
    localforage.removeItem(name);
    updateRegisteredIds();
    history.push('/myPokemonList');
  };

  return (
    <>
      <Navbar title={`Pokémon Detail - ${name}`} />
      <Layout>
        {(detail.data.pokemon === undefined) && (
          <div css={{ marginTop: '1rem' }}>
            <Loading />
          </div>
        )}
        {!(detail.data.pokemon === undefined) && (
          <>
            <div css={{ width: '100vw', textAlign: 'center' }}>
              <img css={{ height: '200px', width: '200px' }} src={detail.data.pokemon.sprites.front_default} alt="pokemon" />
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
                {detail.data.pokemon.types
                  ? detail.data.pokemon.types.map((data, index) => (
                    <Badge
                      key={index}
                      text={data.type.name}
                      backgroundColor="#00ffa2"
                      color="#004466"
                    />
                  )) : ''}
              </div>
              <div css={{ display: 'flex', flexFlow: 'wrap' }}>
                <p>Moves</p>
                {detail.data.pokemon.moves
                  ? detail.data.pokemon.moves.map((data, index) => (
                    <Badge
                      key={index}
                      text={data.move.name}
                      color="#00ffa2"
                      backgroundColor="#004466"
                    />
                  )) : ''}
              </div>
              <div
                css={{
                  position: 'fixed',
                  bottom: '100px',
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
                <Button
                  onClick={releasePokemon}
                  text="Release Pokémon"
                  css={{
                    borderRadius: '5px', backgroundColor: '#ff0400', color: '#fff', border: 'none',
                  }}
                />
              </div>
            </Card>
          </>
        )}
      </Layout>
    </>
  );
};

export default MyPokemonDetail;

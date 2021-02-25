/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { jsx } from '@emotion/react';

const Card = (props) => {
  const {
    rounded, elevated, style, className, id, name, urlImg, ownedTotal = [], myPokemon = false,
  } = props;
  let count = 0;
  if (!myPokemon) {
    if (ownedTotal.includes(id)) {
      ownedTotal.forEach((ids) => {
        if (id === ids) { count += 1; }
      });
    }
  }

  return (
    <div
      className={className}
      css={{
        borderRadius: rounded ? '10px' : '0',
        boxShadow: elevated ? '0px 7px 40px 0px #E0E0E0' : 'none',
        position: 'relative',
        margin: '10px',
        width: '170px',
        height: '170px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '-2px 6px 13px -4px rgba(0,0,0,0.52)',
          opacity: 0.6,
        },
        ...style,
      }}
    >
      <Link to={myPokemon ? `/my-pokemon/${name}` : `/pokemon/${name}`} css={{ color: '#292829', textDecoration: 'none' }}>
        <div>
          <img css={{ marginTop: '1rem' }} src={urlImg} alt={`${name} Pokemon Profile`} />
          <p css={{
            textAlign: 'center',
            textTransform: 'capitalize',
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
          }}
          >
            {name}
          </p>
          {!myPokemon && (
            <div css={{
              textAlign: 'center',
              fontSize: '0.8rem',
              textTransform: 'capitalize',
              paddingTop: '0.3rem',
              marginBottom: '0.8rem',
            }}
            >
              owned total:
              {' '}
              {count}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;

/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react';

const Container = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  background: #1f4037;
  background: -webkit-linear-gradient(to right, #1f4037, #99f2c8);
  background: linear-gradient(to right, #1f4037, #99f2c8);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
`;

const WrapperItem = styled.div`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  font-variant: small-caps;
  margin: 0px 30px;
`;

const Navbar = (props) => {
  const { title } = props;
  return (
    <>
      <Container>
        <WrapperItem css={{
          marginLeft: '5vw',
          fontSize: '2rem',
        }}
        >
          {props.title}
        </WrapperItem>
        <div css={{ flexGrow: 1 }} />
        <WrapperItem css={{
          '@media screen and (max-width: 600px)': {
            display: 'none',
          },
        }}
        >
          <Link to="/" css={{ textDecoration: 'none' }}>
            Pokédex
          </Link>
        </WrapperItem>
        <WrapperItem css={{
          '@media screen and (max-width: 600px)': {
            display: 'none',
          },
        }}
        >
          <Link to="/my-pokemon" css={{ textDecoration: 'none' }}>
            My Pokémon
          </Link>
        </WrapperItem>
      </Container>
    </>
  );
};

export default Navbar;

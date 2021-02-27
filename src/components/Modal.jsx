/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import localforage from 'localforage';
import { useHistory } from 'react-router-dom';
import { jsx } from '@emotion/react';
import { Button } from '../components';

const Modal = (props) => {
  const {
    pokemon, isPokemonCaught, pokemonDetail, setIsPokemonCaught
  } = props;
  const [nameList, setNameList] = useState([]);
  const [nickname, setNickname] = useState("");
  const [registeredIds, setRegisteredIds] = useState([]);
  const history = useHistory();
  let title = isPokemonCaught ? "GOTCHA" : "OH NO...";
  let message = isPokemonCaught ? "was caught!" : "has escaped";

  useEffect( () => {
    const fetchData = async () => {
      const result = await localforage.keys()
      setNameList(result)
    }
    fetchData()
  }, [])

  useEffect( () => {
    const fetchIds = async () => {
      const res = await localforage.getItem('')
      setRegisteredIds(res)
    }
    fetchIds()
  }, [])
  
  
  const handleNicknameInput = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  const handleRegisterPokemonId = () => {
    if (nameList.includes('')) {
      const newIds = [...registeredIds, pokemonDetail.pokemon.id]
      localforage.setItem('', newIds)
    } else {
      localforage.setItem('', [pokemonDetail.pokemon.id])
    }
  }

  const setMyPokemon = () => {
    const setItemPokemon = {
      nickname: nickname,
      data: pokemonDetail
    }
    localforage.setItem(nickname, setItemPokemon);
    handleRegisterPokemonId()
    history.push('/my-pokemon')
  }

  const validateNickname = () => {
    if (nameList.includes(nickname)) {
      document.getElementById("nicknameErrMessage").innerHTML = "Name already registered. Please choose another name"
    }
    else {
      setMyPokemon()
    }
  }

  return (
    <div css={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      color: 'black',
    }}>
      <div css={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '100',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }} 
        onClick={() => setIsPokemonCaught(false)}
      />
      <div css={{
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '30%',
        width: '40%',
        backgroundColor: 'white',
        overflowY: 'auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
        zIndex: '101',
        padding: '40px',
        textAlign: 'center',
        borderRadius: '10px',
      }}>
        <p css={{
          textAlign: 'center',
          fontSize: '2rem',
          margin: '0'}}>{title}</p>
        <p css={{
          textAlign: 'center',
          fontSize: '2rem',
          margin: '0'}}>
          {pokemon} {message}
        </p>
        {!isPokemonCaught && (
          <p css={{
              textAlign: 'center',
              fontSize: '2rem',
              marginTop: '200px',
            }}>
            try again?
          </p>
        )}
        {isPokemonCaught && (
          <>
            <img src={pokemonDetail.pokemon.sprites.front_default} alt="Pokemon Sprites" />
            <p css={{
              fontSize: '1.3rem',
              margin: '20px',
              textAlign: 'center'
            }}>let's give nickname to your new friend!</p>
            <input type="text" value={nickname} onChange={handleNicknameInput} placeholder="Give me a name" />
            <p id="nicknameErrMessage" css={{
              fontSize: '0.8rem',
              margin: '20px',
              color: '#db6969',
              textAlign: 'center'
            }}></p>
            {(nickname.length > 0) && (<Button onClick={validateNickname} text="Confirm catch" />)}
            </>
        )}
      </div>
    </div>
  );
};

export default Modal;

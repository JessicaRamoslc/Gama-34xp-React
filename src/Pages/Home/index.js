import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as S from './styled.js';


function App(props) {
  const history = useHistory();
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);
  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('./repositories');
      // localStorage.clear();
    }).catch(err => {
      setErro(true);
    });
    
  }
  return (
    <S.ContainerHome>
    <S.Content>
    
    <S.Input className="usuarioInput" value = { usuario } placeholder="Usuário" onChange={ e => setUsuario(e.target.value)}/>
    <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
    
    </S.Content>
    { erro ? <S.ErroMsg>Ocorreu um erro.</S.ErroMsg> : '' }
    </S.ContainerHome>
  );
}

export default App;
//[usuario, setUsuario()]
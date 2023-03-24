import React, {useEffect, useState, } from 'react'
import { FiChevronRight } from 'react-icons/fi';


//API
import {api} from '../../services/api';

//CSS - Styled Components
import {Title, Form, Repos, Error} from './styles'
import logo from '../../assets/logo.svg'


//Interfaces
interface GithubRepo {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const DashBoard: React.FunctionComponent = () => {

  const [repos, setRepos] = useState<GithubRepo[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories')
    if(storageRepos){
      return JSON.parse(storageRepos);
    }
    else{
      return [];
    }
  }); // Armazena lista da api do github
  const [newRepo, setNewRepo] = useState(''); // Armazena o nome de busca e manda para o fetch()
  const [inputError, setInputError] = useState(''); // Armazena msgs de erros

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
    
  }, [repos])


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setNewRepo(event.target.value);
  }
  
  const handleAddRepo = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if(!newRepo){
      setInputError('Informe o username/repositório para pesquisa');
      return;
    }
    
    const response = await api.get<GithubRepo>(`repos/${newRepo}`);
    // console.log(response);  
    const repository = response.data;
    // console.log(repository);
    
    for (let index = 0; index < repos.length; index++) {
      const element = repos[index];
      if(newRepo === element.full_name){
        setInputError('Repositório já pesquisado. Informe outro.')
        return;
      }
    }
    setRepos([...repos, repository]);
    setNewRepo('')
    setInputError('');
  }

  return (
    <>
      <img src={logo} alt='GitCollection' />
      <Title>Catálogo de repositórios do Github</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input 
          placeholder='Username/Repository_name' 
          onChange={handleInput}
        />
        <button type='submit'> Buscar </button>
      </Form>

      {inputError !== '' && <Error>{inputError}</Error>}

      <Repos>
        {repos.map((e) => (
          <a
            href={`/repositories/${e.full_name}`}
            key={e.full_name}
          >
            <img src={e.owner.avatar_url} alt={e.owner.login} />
            <div>
              <strong>{e.full_name}</strong>
              <p>{e.description}</p>
            </div>
            <FiChevronRight size={20} />
          </ a>
        ))}
      </Repos>
    </>
  )
}
export default DashBoard;
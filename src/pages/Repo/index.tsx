import React, {useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import logo from '../../assets/logo.svg'

//CSS
import {Header, RepoInfo, Issues } from './styles'
import { api } from '../../services/api';


//Interfaces
interface RepositoryParams {
  repoOwner: string;
  repoName: string;
}
interface GithubRepo {
  full_name: string;
  description: string;
  html_url: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}
interface GithubIssues {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}



export const Repo: React.FC = () => {
  
  const [repos, setRepos] = useState<GithubRepo | null>(null);
  const [issues, setIssues] = useState<GithubIssues[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();
  const fullName: string = params.repoOwner + '/' + params.repoName;
  

  useEffect(() => {
    api // Requisião a api para obter o repositório
      .get(`repos/${fullName}`)
      .then(response => setRepos(response.data))

    api //Requisição a api para obter as issues
      .get(`repos/${fullName}/issues`)
      .then(response => setIssues(response.data))

  }, [fullName])
  

  
  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />  
        <a href="/">
          <FiChevronLeft />
          Voltar
        </a>

      </Header>    

      {repos && (
        <RepoInfo>
          <header>
            <img src={repos.owner.avatar_url} alt={repos.owner.login} />
            <div>
              <a href={repos.html_url} target='_blank' rel="noreferrer">
                <strong>{repos.full_name}</strong>
              </a>
              <p>{repos.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repos.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repos.forks_count}</strong>
              <span>forks</span>
            </li>
            <li>
              <strong>{repos.open_issues_count}</strong>
              <span>issues</span>
            </li>
          </ul>
        </RepoInfo>
      )}
      
      
        <Issues>
          {issues.map(issue => (
            <a 
              href={issue.html_url} 
              target='_blank'
              rel="noreferrer" 
              key={issue.id} 
            >
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
        </Issues>      
    </>
  )
   
  
};

export default Repo;
import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repoOwner: string;
  repoName: string;
}

export const Repo: React.FC = () => {
  
  const { params } = useRouteMatch<RepositoryParams>();
  
  return <h1>Repo: {params.repoOwner}</h1>;
};

export default Repo;
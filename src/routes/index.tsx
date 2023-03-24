import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Repo from '../pages/Repo';

type Props = {}

const RoutesApp: React.FunctionComponent = (props: Props) => {
  return (
    
    <BrowserRouter>
        <Switch>
          <Route component={DashBoard} exact path="/" />
          <Route component={Repo} exact path="/repositories/:repoOwner/:repoName" />
        </Switch>
    </BrowserRouter>
  )
}; 

export default RoutesApp
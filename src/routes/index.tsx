import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import DashBoard from '../pages/DashBoard';
// import Repo from '../pages/Repo';


const DashBoard = React.lazy(() => import('../pages/DashBoard'));
const Repo = React.lazy(() => import('../pages/Repo'));

const RoutesApp: React.FunctionComponent = () => {
  return (
    <React.Suspense fallback={'Loading...'}>
      <BrowserRouter>
        <Switch>
          <Route component={DashBoard} exact path="/" />
          <Route component={Repo} exact path="/repositories/:repoOwner/:repoName" />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
    
  )
}; 

export default RoutesApp
import React from 'react';
import 'styles/App.scss';
import ItemListComponent from 'components/ItemList/ItemListComponent';
import HeaderComponent from 'components/Header/HeaderComponent';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <>
            <HeaderComponent />
            <ItemListComponent />
          </>
        </Route>
      </Switch>
    </>
  );
}

export default App;
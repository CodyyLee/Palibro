import React from 'react';
import "./App.css";
import {Route} from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Home from "./components/homepage/Home";
import Results from "./components/results/Results";
import PlayerProfile from "./components/profile/PlayerProfile";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Route path="/" exact render={props => {
        return <Home {...props}/>
      }}/>
      <Route path="/search_results" component={Results} />
      <Route path="/profile" component={PlayerProfile} />
    </div>
  );
}

export default App;

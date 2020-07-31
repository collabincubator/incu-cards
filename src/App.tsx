import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

const App = (props: any) => {
  return (
    <div className="App">
        <Header />
        <Main />
    </div>
  );
}

export default App;

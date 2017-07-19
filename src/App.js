import React from 'react';
import './App.css';

import BP from './components/BP/BP.js';
import Header from './components/Header/Header.js';
import DropletList from './components/DropletList/DropletList.js';

class App extends BP {
  render() {
    return (
      <section>
        <Header />

        <DropletList />
      </section>
    );
  }
}

export default App;

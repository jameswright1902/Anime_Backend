import React from 'react';
import { GlobalContextProvider } from './context/global';
import ChildComponent from './context/global';

function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <h1>My App</h1>
        <ChildComponent />
      </div>
    </GlobalContextProvider>
  );
}

export default App;

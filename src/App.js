import React from 'react';
import './App.css';

import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import Main from './layout/main'
import { UserProvider } from './context/userContext'

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Main />
        </UserProvider>
      </Router>
    </>
  );
}

export default App;

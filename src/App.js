import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupList from './GroupList';
import BookAjout from './BookAjout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/books' exact={true} element={<GroupList/>}/>
        <Route path='/books/new/' element={<BookAjout/>}/>
        {/* <Route path='/books/{id}'element={</>} /> */}
      </Routes>
    </Router>
  )
}

export default App;
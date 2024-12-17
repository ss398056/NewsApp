import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router";

export default class App extends Component {
  render() {
    const pageSize = 9;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    //console.log(apiKey);
    return (
      <>
      <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route  path="/" element={<News key='general' apiKey={apiKey} pageSize={pageSize} category='general' country='us' />} />
          <Route path="/business" element={<News pageSize={pageSize} apiKey={apiKey} key='business' category='business' country='us' />} />
          <Route path="/entertainment" element={<News pageSize={pageSize} key='entertainment' apiKey={apiKey} category='entertainment' country='us' />} />
          <Route path="/health" element={<News pageSize={pageSize} key='health' category='health' country='us' apiKey={apiKey} />} />
          <Route path="/science" element={<News pageSize={pageSize} apiKey={apiKey} key='science' category='science' country='us' />} />
          <Route path="/sports" element={<News pageSize={pageSize} apiKey={apiKey} key='sports' category='sports' country='us' />} />
          <Route path="/technology" element={<News pageSize={pageSize} apiKey={apiKey} key='technology' category='technology' country='us' />} />
        </Routes>
      </BrowserRouter>
      </>
    )
  }
}

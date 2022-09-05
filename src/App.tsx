import React from 'react';
import { Routes, Route } from "react-router-dom"
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import Header from './components/Header';
import Home from "./components/Home"
import ImageDetails from "./components/ImageDetails"
import useGetApodImageData from './hooks/useGetApodImageData';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Orbitron', sans-serif;
  }

  body {
    display:flex;
    justify-content: center;
    margin: 0em 3em;
    margin-bottom: 4em;
    background-color: black;
    color: white;
    overflow: overlay;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 8px;
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`

const AppDiv = styled.div`
  width: min(calc(100vw - 6em), 150vmin);
`

function App() {
  const apodData = useGetApodImageData();

  return (
    <AppDiv>
      <GlobalStyle />
      <Routes>
        <Route element={<Header />}>
          <Route index element={<Home apodData={apodData} />} />
          <Route path="image/:imageTitleParam" element={<ImageDetails apodData={apodData} />} />
        </Route>
      </Routes>
    </AppDiv>
  );
}

export default App;

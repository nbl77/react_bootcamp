import React from 'react';
import {Nav,HeadSlide} from './template/header';
import {Content} from './template/content';
import "./assets/style.css";
import imgHead from "./assets/img/head-bg.jpg";
import imgAvatar from "./assets/img/photoku.jpg";
function App() {
  return (
    <>
      <Nav />
      <HeadSlide imgHead={imgHead} imgAvatar={imgAvatar} />
      <Content />
    </>
  );
}

export default App;

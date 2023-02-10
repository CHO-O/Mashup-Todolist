import React from 'react';
import { createGlobalStyle } from 'styled-components'; //글로벌 스타일 컴포넌트를 만드는 함수
//페이지의 배경 색상을 설정하기 위해선 body 태그에 css를 적용하면 되는데
//index.css에서 해도 되지만 styled-components를 이용하고 싶기에 사용하는 것
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef
  }
`; 

function App(){
  return(
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>  
    </>
  );
}

export default App;
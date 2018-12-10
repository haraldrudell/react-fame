/*
© 2018-present Harald Rudell <harald.rudell@gmail.com> (http://www.haraldrudell.com)
This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree.
*/
import React, { useState } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import './fonts.css'
import './fonts/bladeRunner.css'
import Play from './Play'

const GlobalStyle = createGlobalStyle`
body, html {
  height: 100%
}
#root {
  min-height: 100%;
  background: radial-gradient(100% 100% at left 15% top 15%, #f2e5cd, #f9c7c7);
}`
const pinkTones = keyframes`
  from {
    color: hsl(0, 80%, 50%); // red
  }
  33% {
    color: black;
  }
  66% {
    color: hsl(280, 80%, 50%);
  }
  to {
    color: hsl(360, 80%, 50%);
  }
`
const TheText = styled.div`
display: flex;
flex-direction: column;
align-items: center;
div:nth-child(1) {
  font: bolder 50pt 'Blade Runner';
  color: red;
  margin-bottom: 10vh;
  text-shadow: 0px 1px 4px #23430C;
  text-align: center;
  cursor: pointer;
}
div:nth-child(2) {
  font: bolder 50pt Arial;
}
div:nth-child(3), div:nth-child(5) {
  font: bolder 50pt 'Baloo Tamma';/*Arial, Helvetica, sans-serif*/
  animation: ${pinkTones} 8s linear infinite;
}
div:nth-child(4) {
  font: bolder 32pt Arial;
}
div:nth-child(6) a {
  text-decoration: none;
  font-weight: bold;
  color: black;
}
div {
  margin-bottom: 24px;
}
`
const Margin = styled.div`
padding-top: 10vh
`
export default () => {
  const [play, setPlay] = useState(false)
  const togglePlay = () => setPlay(!play)

  return <Margin>
    <GlobalStyle />
    <TheText>
      <div onClick={togglePlay}>
        react<br/>
        fame
      </div>
      <div>Hire</div>
      <div>Harald Rudell</div>
      <div>Node Go React Java</div>
      <div>harald.rudell@gmail.com</div>
      <div>[ click REACT FAME for Irene Cara 1980 ]<br />
      This project was created in <a href="https://youtu.be/KVaOVjiH2SQ">this video</a><br />
      This is a demonstration of <a href="https://github.com/haraldrudell/lib-create-react-app">lib-create-react-app</a>
      </div>
    </TheText>
    {play && <Play />}
  </Margin>
}

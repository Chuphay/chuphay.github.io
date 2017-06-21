import React from 'react';
import {render} from 'react-dom';
console.log("Hello World!");
class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

render(<App/>, document.getElementById('app'));
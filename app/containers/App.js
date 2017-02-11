// @flow
import React, { Component } from 'react';
import { Header } from '../components/Header';

console.log(Header);
export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

// @flow
import React, { Component, PropTypes } from 'react';
import { Header } from '../components/Header'
import Footer from '../components/Footer.jsx';
import styles from './App.css'


import { RouteTransition } from 'react-router-transition';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <div className={styles.container}>
        <Header title="CATCH THEM ALL!" />
        <RouteTransition className={styles['content-container']}
           pathname={location.pathname}
           atEnter={{ opacity: 0 }}
           atLeave={{ opacity: 0 }}
           atActive={{ opacity: 1 }}
           runOnMount={true}
        >
          {React.cloneElement(this.props.children, {
            key: location.pathname
          })}
        </RouteTransition>
        <Footer/>
      </div>
    );
  }
}

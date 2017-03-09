import React, { Component } from 'react';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/screen.js'
import {TransitionMotion, spring, presets} from 'react-motion';

import ScrollArea from '../ScrollArea';

import ScreenCard from './ScreenView';
import styles from './styles.css'

import {GridList} from 'material-ui';

function mapStateToProps(state) {
  return {
    screens: state.screen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


class AllScreens extends Component {
  state={
    screens:[]
  }
  componentWillMount(){
    this.props.getAllScreens();
  }
  componentWillReceiveProps(){
    const {allScreens} = this.props.screens;
    this.setState({screens:allScreens})
  }
  willLeave(){
    return {
       width: spring(0),
      opacity: spring(0),
    }
  }
  willEnter() {
    return {
      width: 0,
      opacity: 1,
    };
  }
  getStyles=()=>{
    const screens = this.props.screens.allScreens;
    return screens.map((scr,i)=>Object.assign({},scr, {style:{
        width:spring(60,presets.gentle),
        opacity:spring(1,presets.angle)
      }}))
  }
  render() {
    console.log(this.props)
    const {allScreens} = this.props.screens;
   const list= allScreens.map((value,i)=>{
     return <ScreenCard {...value} key={i} selectScreen={this.props.setCurrentScreen}  />
   });
    return (
      <div>
        <ScrollArea
        customStyles={styles['cards-container']}
         className={styles['cards-container']}>

                   {list}

        </ScrollArea>
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AllScreens)

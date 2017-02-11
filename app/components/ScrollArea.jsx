import React,{Component} from 'react'




export default class ScrollArea extends Component {
  render(){
    const {styles,maxWidth,maxHeight} = this.props;
    let defaultStyles = {
      overflowY:'auto'
    }
    if(maxHeight){
        defaultStyles = Object.assign({},defaultStyles,{maxHeight});
    }
    return (<div style={defaultStyles} className={this.props.className+' scroll'}>{this.props.children}</div>)

  }
}

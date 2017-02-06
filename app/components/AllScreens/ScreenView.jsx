import React, { Component,PropTypes } from 'react';

import  {Card,CardMedia,CardTitle,CardHeader,Avatar,FlatButton,GridTile} from 'material-ui'



import styles from './styles.css';

export default class ScreenView extends Component {
 static propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    thumbnail: PropTypes.any.isRequired
  }
handleSelect=()=>{
  this.props.selectScreen({id:this.props.id});
}
  render() {
    const  cardTitle =  <CardTitle title={this.props.name}/>
    const actions = (<div>  <FlatButton primary={true} label="Select screen" onTouchTap={this.handleSelect} /></div>)
    const avatar =  <Avatar style={{borderRadius:"0px"}} title={this.props.name} size={120} src={this.props.thumbnail.toDataURL()}/>
    return (
   <Card containerStyle={{height:'auto'}} styles={{height:'auto'}} className={styles['screen-card']}>
          <CardHeader
          title={this.props.name}
          subtitle={actions}
          avatar={avatar}
        />
      </Card>
    );
  }
}


/**
 *
 *
 */

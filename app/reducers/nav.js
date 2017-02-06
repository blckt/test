import * as router from 'react-router-redux';

console.log(router);


const initialPath= location.pathname;


export default function (state=initialPath,action){
  switch (action.type) {
    case router.LOCATION_CHANGE:
      return action.payload.pathname;

    default:
      return state;
  }
}

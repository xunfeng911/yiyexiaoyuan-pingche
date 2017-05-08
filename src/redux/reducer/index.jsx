import {YYXY_SET_BACK} from '../action/index';
import {USER_STATUS} from '../action/index';

export const getUserInfo = (state = {isLogin: true, token: 'token', usrName: 'yyxy'}, action={}) => {
  switch (action.type){
    case USER_STATUS:
      let {
        isLogin,
        token,
        usrName
      } = action.data;
      return {isLogin, token, usrName};
    default:
      return state;
  }
}
export const testGetTitle = (state = {back: true, title: 'yyxy', user: true}, action={}) => {
  switch (action.type){
    case YYXY_SET_BACK:
      let {
        back,
        title,
        user
      } = action.data;
      return {back, title, user};
    default:
      return state;
  }
}

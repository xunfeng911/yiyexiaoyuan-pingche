export const YYXY_SET_BACK = 'YYXY_SET_BACK';
export const USER_STATUS = 'YYXY_USER_STATUS';

export const setBack = (data) => {
  return {
    type: YYXY_SET_BACK,
    data
  }
}

export const setUserInfo = (data) => {
  return {
    type: USER_STATUS,
    data
  }
}
import { SET_POS_STATE } from '../App/constants';

export function SetPosState(payload) {
  console.log(payload)
  return {
    type: SET_POS_STATE,
    payload,
  };
}

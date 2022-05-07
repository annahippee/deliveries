import axios from 'axios';

const SET_DELIVERIES = 'SET_DELIVERIES';

export const setDeliveries = (deliveries) => {
  return {
    type: SET_DELIVERIES,
    deliveries,
  };
};

export const fetchDeliveries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/deliveries');
      console.log(data);
      let deliveries = data['features'];
      dispatch(setDeliveries(data));
    } catch (error) {
      console.error('error in fetchDeliveries thunk', error);
    }
  };
};

const initialState = [];

export default function deliveriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DELIVERIES:
      return action.deliveries;
    default:
      return state;
  }
}

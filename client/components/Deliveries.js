import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDeliveries } from '../store/deliveries.js';
import axios from 'axios';

export const Deliveries = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get('/api/deliveries');
        console.log(data);
        setDeliveries(data);
      } catch (error) {
        console.error('error in fetchData', error);
      }
    }
    fetchData();
    setIsLoading(false);
  }, []);
  console.log('props', props);
  if (isLoading) return <img src={'https://i.stack.imgur.com/ATB3o.gif'} />;
  return (
    <div>
      <h1>Deliveries</h1>
      <div>
          {deliveries.map((delivery) => {
              return <div key={delivery.properties.id} className="box">
                  <h3>{delivery.properties.name}</h3>
                  <p>{delivery.properties.notes}</p>
                  <button className="button">Edit</button>
                  <button className="button">Complete</button>
              </div>
          })}
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    deliveries: state.deliveries,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchDeliveries: () => dispatch(fetchDeliveries()),
  };
};

export default connect(mapState, mapDispatch)(Deliveries);

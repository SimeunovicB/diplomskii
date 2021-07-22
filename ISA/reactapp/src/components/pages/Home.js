import React from "react";

const Home = (props) => {


  return (
    <div>
      <h1>MA IDE GAS HOME</h1>
      <h3> {props.name ? 'Hi ' + props.name : 'You are not logged in!'} </h3>
    </div>
  );
};

export default Home;

import React from 'react';

const Home = ({ children }) => (
  <div>
    {children}
  </div>
);

Home.propTypes = {
  children: React.PropTypes.object,
};

export default Home;

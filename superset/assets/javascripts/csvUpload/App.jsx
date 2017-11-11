import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tabs, Tab, Panel } from 'react-bootstrap';

const propTypes = {
  user: PropTypes.object.isRequired,
};

export default function App(props) {
  return (
    <div className="container app">
      <Row>
        <p>HELLO WORLD</p>
      </Row>
    </div>
  );
}
App.propTypes = propTypes;

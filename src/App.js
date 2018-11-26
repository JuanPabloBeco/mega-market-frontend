import React, {Component} from 'react';
import {Grid, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import Filter from './Filterv2';
import AjaxTest from './Ajax';
import Chart from './Chart';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Grid>
                        <Row className="show-grid">
                            <Col sm={9} md={9} lg={9}>
                                <div className="App-chart">
                                    <Chart filters_to_apply={{
                                    date__lt: '2018-11-5',
                                    date__gt: '2018-11-1',
                                }}/>
                                </div>

                            </Col>
                            <Col sm={3} md={3} lg={3}>
                                <Filter/>
                            </Col>
                        </Row>
                    </Grid>
                </header>
            </div>
        );
    }
}

export default App;

// src/App.js
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import { Container, Typography, Button } from '@mui/material';
import { Element } from 'react-scroll';
import Statistics from './components/Statistics';
import TransactionTable from './components/TransactionTable';
import BarChartComponent from './components/BarChartComponent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
      
      <div>
        <CssBaseline />
        <Header />
        <Element name="Home">
          <div className="section home">
            <Container>
              <Typography variant="h2" align="center" gutterBottom>
                Navigate the Future: Seamless Management Excellence
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                Revolutionize product management. Boost productivity effortlessly.
                Take control and elevate your workflow with us.
              </Typography>
            
            </Container>
          </div>
        </Element>

        <Element name="TransactionTable">
          <div className="section transaction-table">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                Transaction Table
              </Typography>
                <TransactionTable/>
            </Container>
          </div>
        </Element>

        <Element name="Statistics">
          <div className="section statistics">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                Statistics
              </Typography>
                <Statistics/>
            </Container>
          </div>
        </Element>

        <Element name="Chart">
          <div className="section chart">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                Chart
              </Typography>
                <BarChartComponent/>
            </Container>
          </div>
        </Element>

        <Element name="AboutUs">
          <div className="section about-us">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
              </Typography>
                <Footer/>
            </Container>
          </div>
        </Element>

        
      </div>
  );
}

export default App;

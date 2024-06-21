// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { scroller } from 'react-scroll';

const sections = ['Home', 'Transaction Table', 'Statistics', 'Chart', 'About Us'];

const Header = () => {
  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <AppBar position="static" style={{backgroundColor: '#31363F'}} >
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ cursor: 'pointer' }} onClick={() => scrollToSection('Home')}>
          TM
        </Typography>
        <div className='menu'>
          {sections.map((section) => (
            <Button
              key={section}
              color="inherit"
              onClick={() => scrollToSection(section.replace(' ', ''))}
              style={{ marginLeft: '20px' }}
            >
              {section}
            </Button>
          ))}
        </div>
        <Button variant="contained" color="primary" style={{ marginLeft: '20px' }}>
          
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

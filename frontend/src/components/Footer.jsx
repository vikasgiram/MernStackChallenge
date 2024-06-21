// src/components/Footer.jsx
import React from 'react';
import { Container, Typography, Box, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#31363F', color: '#EEEEEE', textAlign:"left"}}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              We are a leading company in providing excellent services and solutions. Our mission is to deliver quality and reliability to our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Quick Links</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><a href="/" style={{ color: '#EEEEEE', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/transactions" style={{ color: '#EEEEEE', textDecoration: 'none' }}>Transactions</a></li>
              <li><a href="/statistics" style={{ color: '#EEEEEE', textDecoration: 'none' }}>Statistics</a></li>
              <li><a href="/about" style={{ color: '#EEEEEE', textDecoration: 'none' }}>About Us</a></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#EEEEEE' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#EEEEEE' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://www.instagram.com/vicky_giram/" target="_blank" sx={{ color: '#EEEEEE' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.linkedin.com/in/vikas-giram" target="_blank" sx={{ color: '#EEEEEE' }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Vikas Giram. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 6,
        pb: 3,
        mt: 8,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Sweet Delights Bakery
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Crafting moments of joy through our delicious pastries and cakes.
              Every bite tells a story of passion, quality, and tradition.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary"><Facebook /></IconButton>
              <IconButton color="primary"><Instagram /></IconButton>
              <IconButton color="primary"><Twitter /></IconButton>
              <IconButton color="primary"><Pinterest /></IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" color="inherit" underline="hover">About Us</Link>
              <Link href="/products" color="inherit" underline="hover">Our Products</Link>
              <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
              <Link href="/faq" color="inherit" underline="hover">FAQ</Link>
              <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
            </Box>
          </Grid>

          {/* Contact Info & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <LocationOn color="primary" />
                <Typography variant="body2">
                  123 Bakery Street, Sweet City, SC 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Phone color="primary" />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Email color="primary" />
                <Typography variant="body2">info@sweetdelights.com</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Subscribe to our Newsletter
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Your email"
                  variant="outlined"
                />
                <Button variant="contained" color="primary">
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
        >
          © {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" textAlign="center" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="h5" textAlign="center" color="text.secondary" sx={{ mb: 8 }}>
          Baking happiness since 1995
        </Typography>
      </motion.div>

      {/* Story Section */}
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f"
              alt="Bakery interior"
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h4" gutterBottom>
              A Family Tradition
            </Typography>
            <Typography paragraph>
              Sweet Delights began as a small family bakery in 1995. What started as a passion
              for creating delicious pastries has grown into a beloved establishment known for
              its quality and creativity.
            </Typography>
            <Typography paragraph>
              Our recipes have been passed down through generations, each adding their own
              special touch while maintaining the authentic taste that our customers have
              come to love.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Values Section */}
      <Box sx={{ mt: 12 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Our Values
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              title: 'Quality',
              description: 'We use only the finest ingredients to ensure every bite is perfect.'
            },
            {
              title: 'Tradition',
              description: 'Preserving traditional recipes while embracing modern techniques.'
            },
            {
              title: 'Innovation',
              description: 'Constantly creating new and exciting flavors for our customers.'
            }
          ].map((value, index) => (
            <Grid item xs={12} md={4} key={value.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h5" gutterBottom color="primary">
                    {value.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 
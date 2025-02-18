import { Box, Typography, Button, Container, Grid, Paper, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { featuredProducts } from '../data/demoData';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, Timer, EmojiEmotions, Cake } from '@mui/icons-material';
import Banner from '../components/Banner';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '90vh',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StatsBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
}));

const testimonials = [
  {
    name: "Sarah Johnson",
    comment: "The best bakery in town! Their croissants are simply amazing.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    name: "Mike Thompson",
    comment: "Outstanding quality and service. The birthday cake was perfect!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "Emily Davis",
    comment: "Fresh, delicious, and always consistent. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
];

const features = [
  {
    icon: <LocalShipping fontSize="large" color="primary" />,
    title: "Free Delivery",
    description: "Free delivery on all orders over $50"
  },
  {
    icon: <Timer fontSize="large" color="primary" />,
    title: "Fresh Daily",
    description: "Baked fresh every morning"
  },
  {
    icon: <EmojiEmotions fontSize="large" color="primary" />,
    title: "Customer Satisfaction",
    description: "100% satisfaction guaranteed"
  },
  {
    icon: <Cake fontSize="large" color="primary" />,
    title: "Custom Orders",
    description: "Personalized cakes for special occasions"
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/products');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box component="main" sx={{ overflow: 'hidden' }}>
      <Banner onCtaClick={handleCtaClick} />

      {/* Features Section */}
      <Container sx={{ py: 12 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h3" textAlign="center" gutterBottom>
            Why Choose Us
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <StatsBox elevation={3}>
                    {feature.icon}
                    <Typography variant="h6">{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </StatsBox>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Featured Products Section */}
      <Box sx={{ bgcolor: 'background.default', py: 12 }}>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography variant="h3" textAlign="center" gutterBottom>
              Our Featured Products
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {featuredProducts.slice(0, 3).map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 12 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h3" textAlign="center" gutterBottom>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Rating value={testimonial.rating} readOnly />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      textAlign="center"
                    >
                      "{testimonial.comment}"
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" gutterBottom>
              Ready to Order?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Experience the taste of happiness today!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/products')}
            >
              View Our Menu
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const BannerContainer = styled(Box)(({ theme }) => ({
  height: '90vh',
  position: 'relative',
  overflow: 'hidden',
  background: theme.palette.primary.dark,
}));

const SlideContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const SlideImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
});

const SlideOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
  zIndex: 1,
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  color: 'white',
  background: 'rgba(0,0,0,0.3)',
  '&:hover': {
    background: 'rgba(0,0,0,0.5)',
  },
}));

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    title: 'Artisan Breads & Pastries',
    description: 'Handcrafted with love and tradition',
    cta: 'Order Now'
  },
  {
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812',
    title: 'Special Occasion Cakes',
    description: 'Make your celebrations unforgettable',
    cta: 'Custom Order'
  },
  {
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
    title: 'Fresh Daily Delights',
    description: 'Start your day with our fresh bakery',
    cta: 'View Menu'
  }
];

const Banner = ({ onCtaClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <BannerContainer>
      <NavigationButton onClick={prevSlide} sx={{ left: 20 }}>
        <ArrowBack />
      </NavigationButton>
      <NavigationButton onClick={nextSlide} sx={{ right: 20 }}>
        <ArrowForward />
      </NavigationButton>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.4 },
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <SlideImage src={slides[currentSlide].image} alt={slides[currentSlide].title} />
          <SlideOverlay />
          <SlideContent>
            <Container maxWidth="lg">
              <Box sx={{ position: 'relative', zIndex: 2, color: 'white', textAlign: 'center' }}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography variant="h1" sx={{ 
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    fontWeight: 700,
                  }}>
                    {slides[currentSlide].title}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography variant="h4" sx={{ 
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}>
                    {slides[currentSlide].description}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onCtaClick}
                    sx={{
                      fontSize: '1.2rem',
                      py: 1.5,
                      px: 4,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    }}
                  >
                    {slides[currentSlide].cta}
                  </Button>
                </motion.div>
              </Box>
            </Container>
          </SlideContent>
        </motion.div>
      </AnimatePresence>
    </BannerContainer>
  );
};

export default Banner; 
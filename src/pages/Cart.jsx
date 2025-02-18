import { Container, Typography, Grid, Paper, Button, IconButton, Box } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  // Demo cart items - in a real app, this would come from a cart context/state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Chocolate Heaven Cake',
      price: 29.99,
      quantity: 1,
      image: '/images/chocolate-cake.jpg'
    },
    {
      id: 2,
      name: 'Classic Croissant',
      price: 3.99,
      quantity: 2,
      image: '/images/croissant.jpg'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom textAlign="center">
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" textAlign="center">
            Your cart is empty
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </Box>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 2,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="primary">${item.price}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton onClick={() => updateQuantity(item.id, -1)}>
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(item.id, 1)}>
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => removeItem(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </Paper>
              </motion.div>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Shipping:</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart; 
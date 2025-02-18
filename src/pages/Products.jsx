import { useState } from 'react';
import { Container, Grid, Typography, Box, TextField, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { featuredProducts } from '../data/demoData';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProducts = featuredProducts.filter(product => {
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom textAlign="center">
        Our Products
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="cakes">Cakes</MenuItem>
          <MenuItem value="pastries">Pastries</MenuItem>
          <MenuItem value="cookies">Cookies</MenuItem>
          <MenuItem value="breads">Breads</MenuItem>
        </TextField>
        
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products; 
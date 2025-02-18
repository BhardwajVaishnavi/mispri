import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  Chip,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Warning,
  Inventory2,
  Timeline,
  LocalShipping,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Product Categories
const categories = [
  'Cakes',
  'Pastries',
  'Breads',
  'Cookies',
  'Muffins',
  'Donuts',
  'Custom Orders',
];

// Units of Measurement
const units = [
  'Pieces',
  'Kg',
  'g',
  'Dozen',
  'Box',
];

const initialInventory = [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: 'Cakes',
    quantity: 15,
    unit: 'Pieces',
    minStock: 5,
    costPrice: 20,
    sellingPrice: 35,
    expiryDate: '2024-03-20',
    supplier: 'Main Bakery Supplies',
    ingredients: [
      { name: 'Flour', quantity: '500g' },
      { name: 'Sugar', quantity: '300g' },
      { name: 'Cocoa Powder', quantity: '100g' },
    ],
  },
  // Add more initial inventory items...
];

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} style={{ padding: '20px 0' }}>
    {value === index && children}
  </div>
);

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    minStock: '',
    costPrice: '',
    sellingPrice: '',
    expiryDate: '',
    supplier: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData(item);
      setIngredients(item.ingredients || [{ name: '', quantity: '' }]);
    } else {
      setEditItem(null);
      setFormData({
        name: '',
        category: '',
        quantity: '',
        unit: '',
        minStock: '',
        costPrice: '',
        sellingPrice: '',
        expiryDate: '',
        supplier: '',
      });
      setIngredients([{ name: '', quantity: '' }]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditItem(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      ingredients,
      id: editItem ? editItem.id : Date.now(),
    };

    if (editItem) {
      setInventory(inventory.map(item => 
        item.id === editItem.id ? newItem : item
      ));
    } else {
      setInventory([...inventory, newItem]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const getLowStockItems = () => {
    return inventory.filter(item => Number(item.quantity) <= Number(item.minStock));
  };

  const getExpiringItems = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
    return inventory.filter(item => new Date(item.expiryDate) <= thirtyDaysFromNow);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<Inventory2 />} label="Current Stock" />
          <Tab icon={<Warning />} label="Alerts" />
          <Tab icon={<Timeline />} label="Analytics" />
          <Tab icon={<LocalShipping />} label="Orders" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Inventory Management</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Cost Price</TableCell>
                <TableCell>Selling Price</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {item.quantity}
                      {Number(item.quantity) <= Number(item.minStock) && (
                        <Chip
                          size="small"
                          color="error"
                          label="Low Stock"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>${item.costPrice}</TableCell>
                  <TableCell>${item.sellingPrice}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(item)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom>Low Stock Alerts</Typography>
        {getLowStockItems().map((item) => (
          <Alert severity="warning" sx={{ mb: 2 }} key={`low-${item.id}`}>
            {item.name} is running low on stock. Current quantity: {item.quantity} {item.unit}
          </Alert>
        ))}

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Expiring Soon</Typography>
        {getExpiringItems().map((item) => (
          <Alert severity="info" sx={{ mb: 2 }} key={`exp-${item.id}`}>
            {item.name} will expire on {item.expiryDate}
          </Alert>
        ))}
      </TabPanel>

      {/* Add Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editItem ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Stock Level"
                  name="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cost Price"
                  name="costPrice"
                  type="number"
                  value={formData.costPrice}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Selling Price"
                  name="sellingPrice"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Ingredients Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Ingredients
                </Typography>
                {ingredients.map((ingredient, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      label="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      sx={{ flex: 2 }}
                    />
                    <TextField
                      label="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      color="error"
                      onClick={() => removeIngredient(index)}
                      disabled={ingredients.length === 1}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button onClick={addIngredient}>
                  Add Ingredient
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editItem ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Inventory; 
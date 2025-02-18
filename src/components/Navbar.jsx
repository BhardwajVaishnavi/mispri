import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  AdminPanelSettings,
  Logout,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: '1rem',
  padding: '8px 16px',
  '&:hover': {
    background: 'rgba(44, 62, 80, 0.05)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '1.8rem',
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Products', path: '/products' },
    { text: 'Contact Us', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <LogoText
              variant="h6"
              component="div"
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer' }}
            >
              Sweet Delights
            </LogoText>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <NavButton
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </NavButton>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Cart */}
            <Tooltip title="Shopping Cart">
              <IconButton
                color="primary"
                onClick={() => navigate('/cart')}
                sx={{ 
                  background: 'rgba(44, 62, 80, 0.05)',
                  '&:hover': { background: 'rgba(44, 62, 80, 0.1)' }
                }}
              >
                <Badge badgeContent={3} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title="Account">
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ 
                  background: 'rgba(44, 62, 80, 0.05)',
                  '&:hover': { background: 'rgba(44, 62, 80, 0.1)' }
                }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <Person />
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              py: 1,
            },
          },
        }}
      >
        {!isAuthenticated ? (
          [
            <MenuItem key="login" onClick={() => { handleMenuClose(); navigate('/login'); }}>
              <Person sx={{ mr: 2 }} /> Login
            </MenuItem>,
            <MenuItem key="signup" onClick={() => { handleMenuClose(); navigate('/signup'); }}>
              <Person sx={{ mr: 2 }} /> Sign Up
            </MenuItem>
          ]
        ) : (
          [
            isAdmin && (
              <MenuItem key="admin" onClick={() => { handleMenuClose(); navigate('/admin/dashboard'); }}>
                <AdminPanelSettings sx={{ mr: 2 }} /> Admin Dashboard
              </MenuItem>
            ),
            <Divider key="divider" />,
            <MenuItem key="logout" onClick={handleLogout}>
              <Logout sx={{ mr: 2 }} /> Logout
            </MenuItem>
          ]
        )}
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={Boolean(mobileAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              handleMenuClose();
              navigate(item.path);
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </StyledAppBar>
  );
};

export default Navbar; 
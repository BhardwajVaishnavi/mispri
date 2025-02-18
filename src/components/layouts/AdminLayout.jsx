import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useTheme,
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  Assessment,
  People,
  Menu as MenuIcon,
  ChevronLeft,
  Settings,
  Logout,
  Person,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRight: 'none',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '8px 16px',
  borderRadius: '12px',
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <Dashboard />, 
    path: '/admin/dashboard',
    description: 'Overview of your bakery'
  },
  { 
    text: 'Inventory', 
    icon: <Inventory />, 
    path: '/admin/inventory',
    description: 'Manage products and stock'
  },
  { 
    text: 'Reports', 
    icon: <Assessment />, 
    path: '/admin/reports',
    description: 'View sales and analytics'
  },
  { 
    text: 'Users', 
    icon: <People />, 
    path: '/admin/users',
    description: 'Manage user accounts'
  },
];

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'primary.main' }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Admin Panel'}
          </Typography>
        </Toolbar>
      </AppBar>

      <StyledDrawer
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, pl: 2 }}>
            Sweet Delights
          </Typography>
        </DrawerHeader>
        <Divider />
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                secondary={item.description}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              />
            </StyledListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <List sx={{ px: 2 }}>
          <StyledListItem button onClick={() => navigate('/admin/settings')}>
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText 
              primary="Settings"
              secondary="System preferences"
              primaryTypographyProps={{
                fontSize: '1rem',
                fontWeight: 600,
              }}
              secondaryTypographyProps={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            />
          </StyledListItem>
        </List>
      </StyledDrawer>

      <Main open={open}>
        <DrawerHeader />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 3,
              bgcolor: 'white',
            }}
          >
            {children}
          </Paper>
        </Box>
      </Main>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              py: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
          <Person sx={{ mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
          <Settings sx={{ mr: 2 }} /> Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleMenuClose(); navigate('/logout'); }}>
          <Logout sx={{ mr: 2 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminLayout; 
import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import { Block, CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { users } from '../../data/demoData';

const Users = () => {
  const [userList, setUserList] = useState(users.map(user => ({
    ...user,
    status: 'active'
  })));

  const toggleUserStatus = (userId) => {
    setUserList(userList.map(user => 
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      <Paper sx={{ p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Orders</TableCell>
              <TableCell align="right">Total Spent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'table-row' }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">{user.orders}</TableCell>
                <TableCell align="right">${user.totalSpent}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color={user.status === 'active' ? 'error' : 'success'}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'active' ? <Block /> : <CheckCircle />}
                  </IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Users; 
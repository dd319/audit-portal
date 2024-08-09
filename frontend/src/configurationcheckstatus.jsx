import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CustomButton from './CustomButton'; // Adjust the import path if needed
// import './styles.css';

function Configurationcheckstatus() {
  const [data, setData] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  // Load todos from local storage on component mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleChange(e) {
    setData(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.trim()) {
      if (editIndex !== null) {
        // Update existing to-do
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? data : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Add new to-do
        setTodos([...todos, data]);
      }
      setData('');
      setOpen(false); // Close the modal
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setData(todos[index]);
    setOpen(true); // Open the modal for editing
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setData('');
  };

  return (
    <>
      <Container sx={{ marginTop: '50px' }}>
        <h1>Actions For Check Status</h1>
        <CustomButton onClick={handleOpen} style={{ marginBottom: '20px' }}>
          ADD CHECK STATUS
        </CustomButton>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo, index) => (
                <TableRow key={index}>
                  <TableCell>{todo}</TableCell>
                  <TableCell>
                    <CustomButton
                      onClick={() => handleEdit(index)}
                      style={{ marginRight: '10px', marginBottom: '5px' }} // Inline style for spacing
                    >
                      EDIT
                    </CustomButton>
                    <CustomButton
                      onClick={() => handleDelete(index)}
                      style={{ marginBottom: '5px' }} // Inline style for spacing
                    >
                      DELETE
                    </CustomButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md" // Change this to adjust width
        fullWidth
        sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: '600px' } }} // Adjust width here
      >
        <DialogTitle>{editIndex !== null ? 'Edit Check Status' : 'Add Check Status'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Check Status"
              variant="outlined"
              value={data}
              onChange={handleChange}
              fullWidth
              autoFocus
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editIndex !== null ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Configurationcheckstatus;

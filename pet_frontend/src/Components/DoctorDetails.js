import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({ name: '', email: '', contactNumber: '', qualifications: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/doctors'); // Use your backend API URL
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const createDoctor = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/doctors', doctor);
      fetchDoctors();
      clearForm();
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  const updateDoctor = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/doctors/${editingId}`, doctor);
      fetchDoctors();
      clearForm();
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };
  
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateDoctor();
    } else {
      createDoctor();
    }
  };

  const handleEdit = (doctor) => {
    setDoctor(doctor);
    setIsEditing(true);
    setEditingId(doctor.id);
  };

  const clearForm = () => {
    setDoctor({ name: '', email: '', contactNumber: '', qualifications: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'black',marginTop:'-20px' }}>Doctor Management</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={doctor.name}
          onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
          fullWidth
          margin="normal"
          sx={{ '& fieldset': { borderRadius: '15px' } }}
        />
        <TextField
          label="Email"
          value={doctor.email}
          onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
          fullWidth
          margin="normal"
          sx={{ '& fieldset': { borderRadius: '15px' } }}
        />
        <TextField
          label="Contact Number"
          value={doctor.contactNumber}
          onChange={(e) => setDoctor({ ...doctor, contactNumber: e.target.value })}
          fullWidth
          margin="normal"
          sx={{ '& fieldset': { borderRadius: '15px' } }}
        />
        <TextField
          label="Qualifications"
          value={doctor.qualifications}
          onChange={(e) => setDoctor({ ...doctor, qualifications: e.target.value })}
          fullWidth
          margin="normal"
          sx={{ '& fieldset': { borderRadius: '15px' } }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '20px', backgroundColor: isEditing ? '#5D2510' : '#1c1e21'  , borderRadius: '10px',padding: '10px'}}
        >
          {isEditing ? 'Update Doctor' : 'Create Doctor'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={clearForm}
          style={{ marginLeft: '20px', marginTop: '20px',backgroundColor:'#1c1e21' ,  borderRadius: '10px',paddingLeft: '30px', paddingTop:'10px', paddingBottom:'10px', paddingRight:'30px'}}
        >
          Clear
        </Button>
      </form>

      <Paper style={{ marginTop: '40px', padding: '20px',backgroundColor:'#ede8d0',borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Qualifications</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.email}</TableCell>
                <TableCell>{doc.contactNumber}</TableCell>
                <TableCell>{doc.qualifications}</TableCell>
                <TableCell>
                <IconButton onClick={() => handleEdit(doc)}>
                  <EditIcon style={{ color: '#5d2510' }} />
                </IconButton>

                <IconButton onClick={() => deleteDoctor(doc.id)}>
                  <DeleteIcon style={{ color: '#692f22' }} />
                </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};



export default DoctorDetails;
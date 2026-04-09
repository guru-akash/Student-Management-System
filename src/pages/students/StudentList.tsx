/**
 * StudentList Page - The primary interface for managing student records.
 * Features:
 * - Displays a comprehensive table of all students.
 * - Dynamic filtering by Standard (Class) and Section.
 * - Integrated CRUD actions:
 *    - Add: Opens an empty StudentForm in a modal.
 *    - Edit: Opens the StudentForm in a modal pre-filled with student data.
 *    - Delete: Dispatches a delete action to the Redux store.
 */
import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal, IconButton, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteStudent } from '../../store/slices/studentsSlice';
import { Student } from '../../store/slices/studentsSlice'; 
import StudentForm from '../../components/StudentForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentList: React.FC = () => {
  const dispatch = useAppDispatch();
  // Fetch the full list of students from the Redux store.
  const students = useAppSelector((state) => state.students.students);
  
  // Local state for UI control (Modal open/close and currently selected student for editing).
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openModal, setOpenModal] = useState(false);
  
  // Filter states
  const [selectedStandard, setSelectedStandard] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');

  const standards = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const sections = ['All', 'A', 'B', 'C'];

  // --- Filtering Logic ---
  // Filters the full student list based on selected standard and section.
  const filteredStudents = students.filter(student => {
    return (selectedStandard === 'All' || student.standard === selectedStandard) &&
           (selectedSection === 'All' || student.section === selectedSection);
  });

  const handleStandardChange = (event: SelectChangeEvent) => {
    setSelectedStandard(event.target.value as string);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSelectedSection(event.target.value as string);
  };

  // --- Modal Control Functions ---

  const handleAdd = () => {
    setSelectedStudent(null); // Clear selection for "Add" mode
    setOpenModal(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student); // Set student to be edited
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    // Basic confirmation can be added here if needed.
    dispatch(deleteStudent(id));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {/* Page Header with Filter Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Students List
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Standard / Class</InputLabel>
            <Select
              value={selectedStandard}
              onChange={handleStandardChange}
              label="Standard / Class"
              sx={{ borderRadius: 2 }}
            >
              {standards.map((std) => (
                <MenuItem key={std} value={std}>{std}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Section</InputLabel>
            <Select
              value={selectedSection}
              onChange={handleSectionChange}
              label="Section"
              sx={{ borderRadius: 2 }}
            >
              {sections.map((sec) => (
                <MenuItem key={sec} value={sec}>{sec}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* "Add Student" Trigger */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{
          mb: 4,
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e3a8a, #172554)',
            boxShadow: '0 6px 15px rgba(30, 58, 138, 0.4)',
          },
        }}
      >
        Add Student
      </Button>

      {/* Student Data Table */}
      <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Register</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>DOB</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Phone No</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Standard</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Section</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Hobbies</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Extra Curricular</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map((student: Student) => (
            <TableRow key={student.id} hover>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.register}</TableCell>
              <TableCell>{student.dob}</TableCell>
              <TableCell>{student.phoneNo}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.standard}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell sx={{ wordBreak: 'break-word' }}>{student.address}</TableCell>
              <TableCell>{student.hobbies.join(', ')}</TableCell>
              <TableCell>{student.extraCurricular.join(', ')}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(student)}
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: '#fff',
                      boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1e3a8a, #172554)',
                        boxShadow: '0 6px 15px rgba(30, 58, 138, 0.4)',
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(student.id)}
                    sx={{
                      background: 'linear-gradient(135deg, #d32f2f, #f44336)',
                      color: '#fff',
                      boxShadow: '0 4px 10px rgba(211, 47, 47, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #b71c1c, #e53935)',
                        boxShadow: '0 6px 15px rgba(211, 47, 47, 0.4)',
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Adding/Editing Students */}
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          p: 4, 
          width: 600,
          borderRadius: 4,
          boxShadow: 24,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <StudentForm student={selectedStudent || undefined} onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentList;
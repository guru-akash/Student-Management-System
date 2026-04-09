/**
 * StudentForm - A versatile form component for creating or editing student profiles.
 * Features:
 * - Supports both "Add" and "Edit" modes based on the presence of the `student` prop.
 * - Handles complex inputs including multi-select chips for hobbies and extra-curriculars.
 * - Dispatches Redux actions to update the global student state.
 */
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Chip, SelectChangeEvent } from '@mui/material';
import { useAppDispatch } from '../hooks'; 
import { addStudent, updateStudent } from '../store/slices/studentsSlice';
import { v4 as uuidv4 } from 'uuid';
import { Student } from '../store/slices/studentsSlice';

interface StudentFormProps {
  /** Optional student object. If provided, the form operates in "Edit" mode. */
  student?: Student;
  /** Callback to close the form dialog or container. */
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onClose }) => {
  const dispatch = useAppDispatch();
  
  // Initialize state with existing student data or default values for a new student.
  const [formData, setFormData] = useState<Student>({
    id: student?.id || uuidv4(),
    name: student?.name || '',
    register: student?.register || '',
    dob: student?.dob || '',
    phoneNo: student?.phoneNo || '',
    email: student?.email || '',
    standard: student?.standard || '',
    section: student?.section || '',
    address: student?.address || '',
    hobbies: student?.hobbies || [],
    extraCurricular: student?.extraCurricular || [],
    attendance: student?.attendance || 'present',
  });

  // Keep form data in sync if the student prop changes externally.
  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  // General change handler for text inputs.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Specialized handler for multi-select Material UI components.
  const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: typeof value === 'string' ? value.split(',') : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      dispatch(updateStudent(formData)); // Edit existing
    } else {
      dispatch(addStudent(formData));    // Add new
    }
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Basic Info Fields */}
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
      <TextField label="Register No" name="register" value={formData.register} onChange={handleChange} fullWidth required />
      <TextField label="DOB" name="dob" value={formData.dob} onChange={handleChange} fullWidth required type="date" />
      <TextField label="Phone No" name="phoneNo" value={formData.phoneNo} onChange={handleChange} fullWidth required />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required type="email" />
      
      {/* Standard and Section Selects */}
      <FormControl fullWidth required>
        <InputLabel id="standard-label">Standard</InputLabel>
        <Select
          labelId="standard-label"
          name="standard"
          value={formData.standard}
          onChange={(e) => setFormData((prev) => ({ ...prev, standard: e.target.value as string }))}
          label="Standard"
        >
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((std) => (
            <MenuItem key={std} value={std}>{std}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth required>
        <InputLabel id="section-label">Section</InputLabel>
        <Select
          labelId="section-label"
          name="section"
          value={formData.section}
          onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value as string }))}
          label="Section"
        >
          {['A', 'B', 'C'].map((sec) => (
            <MenuItem key={sec} value={sec}>{sec}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth required />
      
      {/* Multi-Select Chips for Hobbies */}
      <FormControl fullWidth>
        <InputLabel>Hobbies</InputLabel>
        <Select
          multiple
          name="hobbies"
          value={formData.hobbies}
          onChange={handleSelectChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {['Reading', 'Sports', 'Music', 'Art'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Multi-Select Chips for Extra Curricular Activities */}
      <FormControl fullWidth>
        <InputLabel>Extra Curricular</InputLabel>
        <Select
          multiple
          name="extraCurricular"
          value={formData.extraCurricular}
          onChange={handleSelectChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {['Drama', 'Debate', 'Dance', 'Coding'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {student ? 'Update' : 'Add'} Student
      </Button>
    </Box>
  );
};

export default StudentForm;
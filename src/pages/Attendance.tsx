import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Radio, FormControlLabel, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateAttendance } from '../store/slices/studentsSlice';
import { useNavigate } from 'react-router-dom';

const Attendance: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.students);
  const [selectedStandard, setSelectedStandard] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');

  const standards = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const sections = ['All', 'A', 'B', 'C'];

  const filteredStudents = students.filter(student => {
    return (selectedStandard === 'All' || student.standard === selectedStandard) &&
           (selectedSection === 'All' || student.section === selectedSection);
  });

  // Initialize attendance state from Redux or set defaults
  const [attendance, setAttendance] = useState<{ [key: string]: string }>(() => {
    const initialAttendance: { [key: string]: string } = {};
    students.forEach((student) => {
      initialAttendance[student.id] = student.attendance || 'present';
    });
    return initialAttendance;
  });

  useEffect(() => {
    // Sync local state with Redux on mount and updates
    const updatedAttendance: { [key: string]: string } = {};
    students.forEach((student) => {
      updatedAttendance[student.id] = student.attendance || 'present';
    });
    setAttendance(updatedAttendance);
  }, [students]);

  // Calculate initial totals based on filtered list
  const totalStudents = filteredStudents.length;
  const [confirmedPresent, setConfirmedPresent] = useState(0);
  const [confirmedAbsent, setConfirmedAbsent] = useState(0);

  const handleStandardChange = (event: SelectChangeEvent) => {
    setSelectedStandard(event.target.value as string);
  };

  const handleSectionChange = (event: SelectChangeEvent) => {
    setSelectedSection(event.target.value as string);
  };

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleConfirm = () => {
    // Dispatch all attendance changes to Redux
    Object.entries(attendance).forEach(([studentId, status]) => {
      dispatch(updateAttendance({ id: studentId, attendance: status }));
    });
    // Update confirmed totals based on final attendance state
    const newPresent = Object.values(attendance).filter(status => status === 'present').length;
    const newAbsent = totalStudents - newPresent;
    setConfirmedPresent(newPresent);
    setConfirmedAbsent(newAbsent);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Attendance
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

      {/* Totals Section */}
      <Box sx={{ mb: 4, p: 2, background: 'linear-gradient(135deg, #1e3a8a, #172554)', color: '#fff', borderRadius: 2, boxShadow: '0 4px 10px rgba(30, 58, 138, 0.3)' }}>
        <Typography variant="h6">Total Students: {totalStudents}</Typography>
        <Typography variant="h6">Present: {confirmedPresent}</Typography>
        <Typography variant="h6">Absent: {confirmedAbsent}</Typography>
      </Box>

      {/* Student List Table */}
      <Table sx={{ width: '100%', border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1e3a8a', color: '#fff' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Standard</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Section</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Register Number</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.standard}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.register}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <FormControlLabel
                    control={<Radio checked={attendance[student.id] === 'present'} onChange={() => handleAttendanceChange(student.id, 'present')} />}
                    label="Present"
                  />
                  <FormControlLabel
                    control={<Radio checked={attendance[student.id] === 'absent'} onChange={() => handleAttendanceChange(student.id, 'absent')} />}
                    label="Absent"
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirm Button */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3a8a, #172554)',
              boxShadow: '0 6px 15px rgba(30, 58, 138, 0.4)',
            },
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default Attendance;
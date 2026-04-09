import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Print as PrintIcon,
  Save as SaveIcon,
  EmojiEvents as TrophyIcon,
  BarChart as StatsIcon,
  People as PeopleIcon,
  CheckCircle as PassIcon,
  Cancel as FailIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateMarks } from '../store/slices/studentsSlice';

const subjects = ['tamil', 'english', 'math', 'science', 'socialScience'] as const;
type Subject = typeof subjects[number];

const calculateGrade = (marks: Record<Subject, number>) => {
  const total = Object.values(marks).reduce((sum, m) => sum + m, 0);
  const percentage = total / (subjects.length * 100);
  if (percentage >= 0.9) return 'A+';
  if (percentage >= 0.75) return 'A';
  if (percentage >= 0.6) return 'B';
  if (percentage >= 0.45) return 'C';
  return 'F';
};

const calculateResult = (marks: Record<Subject, number>) => {
  return Object.values(marks).some((m) => m < 45) ? 'Fail' : 'Pass';
};

const Marksheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.students);

  const [selectedStandard, setSelectedStandard] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [marks, setMarks] = useState<Record<Subject, number>>({
    tamil: 0,
    english: 0,
    math: 0,
    science: 0,
    socialScience: 0,
  });

  const standards = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const sections = ['All', 'A', 'B', 'C'];

  const filteredStudents = students.filter(student => {
    return (selectedStandard === 'All' || student.standard === selectedStandard) &&
           (selectedSection === 'All' || student.section === selectedSection);
  });

  useEffect(() => {
    if (selectedStudentId) {
      const student = students.find((s) => s.id === selectedStudentId);
      if (student && student.marks) {
        setMarks(student.marks);
      } else {
        setMarks({ tamil: 0, english: 0, math: 0, science: 0, socialScience: 0 });
      }
    }
  }, [selectedStudentId, students]);

  const handleMarkChange = (subject: Subject, value: string) => {
    const mark = parseInt(value);
    if (!isNaN(mark) && mark >= 0 && mark <= 100) {
      setMarks((prev) => ({ ...prev, [subject]: mark }));
    } else if (value === '') {
      setMarks((prev) => ({ ...prev, [subject]: 0 }));
    }
  };

  const handleSave = () => {
    if (selectedStudentId) {
      dispatch(updateMarks({ id: selectedStudentId, marks }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const dashboardStats = {
    total: filteredStudents.length,
    passed: filteredStudents.filter(s => s.marks && calculateResult(s.marks as any) === 'Pass').length,
    failed: filteredStudents.filter(s => s.marks && (calculateResult(s.marks as any) === 'Fail')).length,
    average: filteredStudents.length > 0 
      ? (filteredStudents.reduce((acc, s) => acc + (s.marks ? Object.values(s.marks).reduce((sum: number, m: any) => sum + m, 0) : 0), 0) / (filteredStudents.length * 5)).toFixed(1)
      : 0
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
      {/* Header and Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Marksheet Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Standard</InputLabel>
            <Select value={selectedStandard} onChange={(e) => setSelectedStandard(e.target.value as string)} label="Standard" sx={{ borderRadius: 2 }}>
              {standards.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Section</InputLabel>
            <Select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value as string)} label="Section" sx={{ borderRadius: 2 }}>
              {sections.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ borderRadius: 2 }}>Print Report</Button>
        </Box>
      </Box>

      {/* Stats Dashboard */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Students', value: dashboardStats.total, icon: <PeopleIcon />, color: '#3b82f6' },
          { label: 'Passed', value: dashboardStats.passed, icon: <PassIcon />, color: '#10b981' },
          { label: 'Failed', value: dashboardStats.failed, icon: <FailIcon />, color: '#ef4444' },
          { label: 'Class Average', value: `${dashboardStats.average}%`, icon: <StatsIcon />, color: '#f59e0b' },
        ].map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: `${stat.color}15`, color: stat.color }}>{stat.icon}</Box>
              <Box>
                <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Left Side: Marks Entry */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Enter Marks</Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Student</InputLabel>
                <Select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value as string)}
                  label="Select Student"
                >
                  {filteredStudents.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.name} ({s.register})</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedStudentId && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {subjects.map((sub) => (
                    <Box key={sub} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>{sub}</Typography>
                      <TextField
                        type="number"
                        size="small"
                        value={marks[sub]}
                        onChange={(e) => handleMarkChange(sub, e.target.value)}
                        sx={{ width: 100 }}
                        inputProps={{ min: 0, max: 100 }}
                      />
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Total: {Object.values(marks).reduce((s, m) => s + m, 0)}</Typography>
                    <Chip 
                      label={calculateResult(marks)} 
                      color={calculateResult(marks) === 'Pass' ? 'success' : 'error'} 
                      variant="filled" 
                    />
                  </Box>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<SaveIcon />} 
                    onClick={handleSave}
                    sx={{ backgroundColor: 'secondary.main', py: 1.2, '&:hover': { backgroundColor: 'secondary.dark' } }}
                  >
                    Save Marksheet
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Performance Table */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 0, borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={700}>Performance Report</Typography>
              <Chip label={`${filteredStudents.length} Students`} sx={{ color: '#fff', borderColor: '#fff' }} variant="outlined" size="small" />
            </Box>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Avg %</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Grade</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Result</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => {
                  const studentMarks = student.marks || { tamil: 0, english: 0, math: 0, science: 0, socialScience: 0 };
                  const total = Object.values(studentMarks).reduce((sum, m) => sum + m, 0);
                  const result = calculateResult(studentMarks as any);
                  const grade = calculateGrade(studentMarks as any);
                  const hasMarks = !!student.marks;

                  return (
                    <TableRow 
                      key={student.id} 
                      hover 
                      sx={{ cursor: 'pointer', backgroundColor: selectedStudentId === student.id ? 'action.selected' : 'inherit' }} 
                      onClick={() => setSelectedStudentId(student.id)}
                    >
                      <TableCell>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>{student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">{student.register}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1" fontWeight={700}>{hasMarks ? (total / 5).toFixed(1) : '-'}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={hasMarks ? grade : '-'} size="small" sx={{ fontWeight: 700, px: 1, backgroundColor: hasMarks ? (grade === 'F' ? '#fee2e2' : '#dcfce7') : '#f1f5f9' }} />
                      </TableCell>
                      <TableCell align="center">
                        {hasMarks ? (
                          <Typography variant="body2" color={result === 'Pass' ? 'success.main' : 'error.main'} fontWeight={700}>
                            {result}
                          </Typography>
                        ) : '-'}
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={hasMarks ? 'Complete' : 'Pending'} 
                          size="small" 
                          icon={hasMarks ? <PassIcon /> : undefined}
                          color={hasMarks ? 'success' : 'warning'} 
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography color="textSecondary">No students found matching the selected criteria.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Marksheet;

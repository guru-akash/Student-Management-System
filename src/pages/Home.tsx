/**
 * Home Page (Teacher Dashboard).
 * The central landing page for authenticated teachers.
 * Features:
 * - Real-time statistics derived from the Redux student state.
 * - Performance analytics (Average GPA calculation).
 * - Quick access cards to major system modules.
 * - Dynamic welcome header with current date.
 */
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Paper,
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AttendanceIcon,
  EmojiEvents as TrophyIcon,
  Timeline as GrowthIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarMonth as CalendarIcon,
  Notifications as NotifyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Pull student data from Redux to calculate live stats.
  const students = useAppSelector((state) => state.students.students);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- Data Calculations ---
  
  const totalStudents = students.length;
  const lastUpdate = students.length > 0 ? "Just now" : "No data";
  
  // Calculate average performance across all students who have marks recorded.
  const studentsWithMarks = students.filter(s => s.marks);
  const avgPerformance = studentsWithMarks.length > 0
    ? (studentsWithMarks.reduce((acc, s) => {
        const marks = s.marks as any;
        // Sum individual subject marks and divide by 5 (languages + science + math + social).
        const sum = Object.values(marks).reduce((mAcc: number, m: any) => mAcc + m, 0) as number;
        return acc + (sum / 5);
      }, 0) / studentsWithMarks.length).toFixed(1)
    : "0.0";

  // Data structure for the navigation cards.
  const quickActions = [
    {
      title: 'Student Directory',
      desc: 'Manager student profiles and records',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#3b82f6',
      path: '/students',
    },
    {
      title: 'Daily Attendance',
      desc: 'Mark and track student presence',
      icon: <AttendanceIcon sx={{ fontSize: 40 }} />,
      color: '#1e3a8a',
      path: '/attendance',
    },
    {
      title: 'Academic Reports',
      desc: 'Input marks and view performance',
      icon: <TrophyIcon sx={{ fontSize: 40 }} />,
      color: '#2563eb',
      path: '/marksheet',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Welcome Header & System Status */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e3a8a', mb: 1 }}>
            Teacher Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon fontSize="small" /> {currentDate}
          </Typography>
        </Box>
        <Paper 
          sx={{ 
            p: '8px 16px', 
            borderRadius: 3, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            backgroundColor: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <NotifyIcon sx={{ color: '#f59e0b' }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>System Status: Operational</Typography>
        </Paper>
      </Box>

      {/* Numerical Stats Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { label: 'Total Enrolled', value: totalStudents, sub: 'Active students', icon: <PeopleIcon />, color: '#3b82f6' },
          { label: 'Class Performance', value: `${avgPerformance}%`, sub: 'Average GPA', icon: <GrowthIcon />, color: '#10b981' },
          { label: 'Attendance Target', value: '95%', sub: 'Monthly Goal', icon: <AttendanceIcon />, color: '#6366f1' },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.02)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  backgroundColor: `${stat.color}10`, 
                  color: stat.color,
                  mr: 2.5,
                  display: 'flex'
                }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{stat.label}</Typography>
                  <Typography variant="caption" sx={{ color: stat.color, fontWeight: 700 }}>{stat.sub}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 3 }}>
        Quick Access
      </Typography>

      {/* Navigational Quick Access Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {quickActions.map((action, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Card 
              sx={{ 
                borderRadius: 4, 
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
              }}
            >
              <CardActionArea onClick={() => navigate(action.path)} sx={{ p: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ color: action.color, mb: 2 }}>{action.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{action.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{action.desc}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: action.color, fontWeight: 700 }}>
                    Access Now <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Personalized Welcome Banner */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 5, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', color: '#fff' }}>
            <Grid container alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Welcome back, Professor!</Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Your student data was last synced **{lastUpdate}**. Stay updated with the latest performance metrics and daily attendance records to ensure an excellent learning environment.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'right' }}>
                <TrophyIcon sx={{ fontSize: 80, opacity: 0.3 }} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
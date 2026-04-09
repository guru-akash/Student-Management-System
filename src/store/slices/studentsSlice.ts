/**
 * Students Slice - Handles the database of student records within the application.
 * All data is stored in memory as part of the global Redux state.
 * Supports standard CRUD operations: Create, Read, Update, and Delete.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Detailed structure of a Student record.
 */
export interface Student {
  id: string;
  name: string;
  register: string;
  dob: string;
  phoneNo: string;
  email: string;
  standard: string;
  section: string;
  address: string;
  hobbies: string[];
  extraCurricular: string[];
  attendance?: string; // Optional record for tracking daily attendance
  marks?: {            // Optional record for academic performance
    tamil: number;
    english: number;
    math: number;
    science: number;
    socialScience: number;
  };
}

interface StudentsState {
  students: Student[];
}

const initialState: StudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Adds a new student record to the state.
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    // Updates an existing student's data by matching their ID.
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) state.students[index] = action.payload;
    },
    // Removes a student record based on their unique ID.
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    // Updates the attendance status for a specific student.
    updateAttendance: (state, action: PayloadAction<{ id: string; attendance: string }>) => {
      const student = state.students.find(student => student.id === action.payload.id);
      if (student) student.attendance = action.payload.attendance;
    },
    // Updates the academic marks for a specific student.
    updateMarks: (state, action: PayloadAction<{ id: string; marks: Student['marks'] }>) => {
      const student = state.students.find(student => student.id === action.payload.id);
      if (student) student.marks = action.payload.marks;
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, updateAttendance, updateMarks } = studentsSlice.actions;
export default studentsSlice.reducer;
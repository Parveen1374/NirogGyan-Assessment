# NirogGyan - Doctor Appointment Booking System

## Overview

NirogGyan is a full-stack web application for booking doctor appointments. It features a modern React frontend and a Node.js/Express backend, allowing users to browse doctors, view details, and book appointments in real-time.

---

## Tools/Libraries Used

### Frontend

- **React**: UI library for building interactive user interfaces.
- **TypeScript**: Type safety for both client and server code.
- **Vite**: Fast development server and build tool.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Formik**: Form state management and validation.
- **Yup**: Schema-based form validation.
- **React Router DOM**: Client-side routing.
- **Lucide React**: Icon library for modern SVG icons.

### Backend

- **Node.js**: JavaScript runtime for server-side logic.
- **Express**: Web framework for building RESTful APIs.
- **CORS**: Middleware to enable cross-origin requests.
- **TypeScript**: Type safety for backend code.

---

## Improvements with More Time

- **Persistent Storage**: Integrate a database (e.g., MongoDB, PostgreSQL) to persist doctors and appointments instead of using in-memory arrays.
- **Authentication & Authorization**: Add user login, registration, and role-based access (admin, doctor, patient).
- **Doctor Management**: Admin panel for adding, editing, or removing doctors and managing schedules.
- **Appointment Cancellation/Rescheduling**: Allow users to cancel or reschedule appointments.
- **Loading States & Skeletons**: Improve perceived performance with skeleton loaders.

---

## Challenges Faced and Solutions

### 1. **Synchronizing Appointment Slots**

- **Challenge:** Ensuring that appointment slots are updated in real-time and not double-booked.
- **Solution:** On booking, the backend removes the selected time slot from the doctor's schedule before confirming the appointment. This prevents race conditions in a single-instance setup.

### 2. **Form Validation**

- **Challenge:** Providing robust and user-friendly form validation for booking appointments.
- **Solution:** Used Formik and Yup to handle form state and validation, ensuring immediate feedback and preventing invalid submissions.

### 3. **Frontend-Backend Integration**

- **Challenge:** Handling CORS and ensuring smooth communication between the React frontend and Express backend.
- **Solution:** Configured the Express server with the `cors` middleware to allow requests from the frontend during development.

### 4. **Type Consistency**

- **Challenge:** Keeping data types consistent between frontend and backend.
- **Solution:** Defined shared TypeScript interfaces for doctors and appointments, reducing bugs and improving maintainability.

---

## Getting Started

1. **Install dependencies** in both `client` and `serverr` folders.
2. **Run the backend:**
   ```sh
   cd serverr
   npm run dev
   ```
3. **Run the frontend:**
   ```sh
   cd client
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

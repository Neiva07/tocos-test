import React from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import { Navbar } from './Navbar';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Transactions } from './Transactions';
import 'react-toastify/dist/ReactToastify.css';
import { Users } from './Users';
import { Box } from '@mui/material';

const App = () => {

  return <>
    <Navbar />
    <Box style={{
      margin: '100px 400px'
    }}>
      <Outlet />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        icon
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
        theme='colored'
      />
    </Box>
  </>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'users',
        element: <Users />,
      }
    ]
  }
])
export default router;

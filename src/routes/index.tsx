import { createBrowserRouter, Navigate } from 'react-router-dom';

import DefaultLayout from '@/layouts/default';
import AdminLayout from '@/layouts/adminLayout';

import LandingPage from '@/pages/landing/LandingPage';
import { PricingPage } from '@/pages/landing/PricingPage';
import { Checkout } from '@/pages/landing/Checkout';
import { Success } from '@/pages/landing/Success';
import { ConfirmationPage } from '@/pages/landing/ConfirmationPage';
import { GenerationPage } from '@/pages/landing/GenerationPage';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { NotFound } from '@/pages/NotFound';

import { PrivateRoute } from '@/guards/PrivateRoute';
import { AuthRoute } from '@/guards/AuthRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/pricing-page',
        element: <PricingPage />,
    },
    {
        path: '/checkout',
        element: <Checkout />,
    },
    {
        path: '/success',
        element: <Success />,
    },
    {
        path: '/confirm',
        element: <ConfirmationPage />,
    },
    {
        path: '/generation',
        element: <GenerationPage />,
    },
    {
        path: '/admin',
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Navigate to="/admin/login" replace /> },
            {
                path: 'login',
                element: (
                    <AuthRoute>
                        <AdminLogin />
                    </AuthRoute>
                ),
            },
        ],
    },
    {
        path: '/admin/dashboard',
        element: <AdminLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '',
                element: (
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
                ),
            },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export default router;

import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import MeterWiseCoverage from '../pages/report/MeterWiseCoverage';
import NAV from '../components/nav/sampleNav'

// ----------------------------------------------------------------------


export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'report',
          children: [
            { element: <Navigate to="/dashboard/report/meterWiseCoverage" replace />, index: true },
            { path: 'meterWiseCoverage', element: <MeterWiseCoverage /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            // { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: 'nav', element: <NAV /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const VerifyCode = lazy(() => import('../pages/auth/VerifyCode'));

// DASHBOARD

// GENERAL
const GeneralApp = lazy(() => import('../pages/dashboard/GeneralApp'));
const GeneralEcommerce = lazy(() => import('../pages/dashboard/GeneralEcommerce'));
const GeneralAnalytics = lazy(() => import('../pages/dashboard/GeneralAnalytics'));
const GeneralBanking = lazy(() => import('../pages/dashboard/GeneralBanking'));
const GeneralBooking = lazy(() => import('../pages/dashboard/GeneralBooking'));

// ECOMMERCE
const EcommerceShop = lazy(() => import('../pages/dashboard/EcommerceShop'));
const EcommerceProductDetails = lazy(() => import('../pages/dashboard/EcommerceProductDetails'));
const EcommerceProductList = lazy(() => import('../pages/dashboard/EcommerceProductList'));
const EcommerceProductCreate = lazy(() => import('../pages/dashboard/EcommerceProductCreate'));
const EcommerceCheckout = lazy(() => import('../pages/dashboard/EcommerceCheckout'));

// INVOICE
const InvoiceList = lazy(() => import('../pages/dashboard/InvoiceList'));
const InvoiceDetails = lazy(() => import('../pages/dashboard/InvoiceDetails'));
const InvoiceCreate = lazy(() => import('../pages/dashboard/InvoiceCreate'));
const InvoiceEdit = lazy(() => import('../pages/dashboard/InvoiceEdit'));

// BLOG
const BlogPosts = lazy(() => import('../pages/dashboard/BlogPosts'));
const BlogPost = lazy(() => import('../pages/dashboard/BlogPost'));
const BlogNewPost = lazy(() => import('../pages/dashboard/BlogNewPost'));

// USER
const UserProfile = lazy(() => import('../pages/dashboard/UserProfile'));
const UserCards = lazy(() => import('../pages/dashboard/UserCards'));
const UserList = lazy(() => import('../pages/dashboard/UserList'));
const UserAccount = lazy(() => import('../pages/dashboard/UserAccount'));
const UserCreate = lazy(() => import('../pages/dashboard/UserCreate'));

// APP
const Chat = lazy(() => import('../pages/dashboard/Chat'));
const Mail = lazy(() => import('../pages/dashboard/Mail'));
const Calendar = lazy(() => import('../pages/dashboard/Calendar'));
const Kanban = lazy(() => import('../pages/dashboard/Kanban'));

// MAIN
const HomePage = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Faqs = lazy(() => import('../pages/Faqs'));
const ComingSoon = lazy(() => import('../pages/ComingSoon'));
const Maintenance = lazy(() => import('../pages/Maintenance'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Payment = lazy(() => import('../pages/Payment'));
const Page500 = lazy(() => import('../pages/Page500'));
const NotFound = lazy(() => import('../pages/Page404'));

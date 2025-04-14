import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorPage from './pages/Error/ErrorPage';
import LandingPage from './pages/Landing/LandingPage';
import { urls } from '@common/utils/http/routeUrls';
import LoginPage from './pages/Login/LoginPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AccountPage from '@pages/Account/AccountPage';
import SupportUsPage from '@pages/SupportUs/SupportUsPage';
import AllUsersPage from '@pages/Users/AllUsersPage';

const IndexRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={urls.LANDING.route} element={<LandingPage />} />
        <Route path={urls.REGISTRATION.route} element={<RegistrationPage />} />
        <Route path={urls.LOGIN.route} element={<LoginPage />} />
        <Route path={urls.DASHBOARD.route} element={<DashboardPage />} />
        <Route path={urls.ACCOUNT.route} element={<AccountPage />} />
        <Route path={urls.SUPPORT_US.route} element={<SupportUsPage />} />
        <Route path={urls.ALL_USERS.route} element={<AllUsersPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default IndexRoutes;

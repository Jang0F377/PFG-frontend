import { Container } from '@common/components/Container';
import pfgLogo from '@assets/PFG-702-background.png';
import { Link } from 'react-router-dom';
import { urls } from '@common/utils/http/routeUrls';

export const DashboardPageFooter = () => {
  return (
    <footer className="bg-neon-blue-600 w-full">
      <Container className="">
        <Link to={urls.DASHBOARD.route} className="rounded-xl">
          <img
            src={pfgLogo}
            alt="ERR"
            className="mx-auto h-22 w-auto rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col items-center py-1 sm:flex-row-reverse sm:justify-between">
          <p className="text-sm text-blue-50">
            Copyright &copy; {new Date().getFullYear()} PreFireGaming. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

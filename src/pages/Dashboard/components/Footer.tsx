import { Container } from '@common/components/Container';
import pfgLogo from '@assets/PFG-702-background.png';
import { Link } from 'react-router-dom';
import { urls } from '@common/utils/http/routeUrls';

export const DashboardPageFooter = () => {
  return (
    <footer className="bg-neon-blue-600 w-full">
      <Container>
        <Link to={urls.DASHBOARD.route} className="rounded-xl">
          <img src={pfgLogo} alt="ERR" className="mx-auto h-22 w-auto" />
        </Link>
        <div className="pb-1 text-end">
          <p className="text-sm text-blue-50">
            Copyright &copy; {new Date().getFullYear()} PreFireGaming. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

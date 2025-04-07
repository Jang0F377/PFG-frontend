import { Container } from '@common/components/Container';
import { FooterNavLinks } from './NavLinks';
import pfgLogo from '@assets/PFG-702-background.png';

export const Footer = () => {
  return (
    <footer className="bg-neon-blue-700">
      <Container className="">
        <div className="rounded-xl py-16">
          <img
            src={pfgLogo}
            alt="ERR"
            className="mx-auto h-20 w-auto rounded-full object-cover p-2"
          />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex flex-col justify-center text-center sm:flex-row sm:gap-x-7">
              <FooterNavLinks />
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-100/10 py-10 sm:flex-row-reverse sm:justify-between">
          <p className="mt-6 text-sm text-blue-50 sm:mt-0">
            !&copy; {new Date().getFullYear()} PreFireGaming. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

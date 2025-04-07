import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import pfgLogo from '@assets/PFG-702-background.png';
import { HeaderNavLinks, MobileNavLink } from './NavLinks';
import Button from '@common/components/Button';
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel,
  TransitionChild,
  PopoverBackdrop,
} from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';
import { useIsMobile } from '@common/hooks/useIsMobile';
import { urls } from '@common/utils/http/routeUrls';

export function Header() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileHeader navigate={navigate} />
      ) : (
        <DesktopHeader navigate={navigate} />
      )}
    </>
  );
}

interface HeaderProps {
  navigate: NavigateFunction;
}

const DesktopHeader = ({ navigate }: HeaderProps) => (
  <header className="py-4 lg:mx-4">
    <nav className="relative z-50 mx-4 flex">
      <div className="">
        <Link to={urls.LANDING.get()} aria-label="Home">
          <img src={pfgLogo} alt="ERR" className="w-32 py-1" />
        </Link>
      </div>
      <div className="flex w-full items-center justify-evenly">
        <HeaderNavLinks />
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Button
            variant="primary"
            onClick={() => navigate(urls.REGISTRATION.route)}
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  </header>
);

const MobileHeader = ({ navigate }: HeaderProps) => (
  <nav className="relative z-50 flex">
    <Popover>
      <PopoverButton
        className="hover:ring-neon-blue-700 relative z-10 flex h-8 w-8 items-center justify-center rounded-lg hover:ring-1"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <Transition>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 bg-slate-300/75" />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            as="div"
            className="bg-neon-blue-100 text-neon-blue-900 ring-neon-blue-900/5 absolute inset-x-0 top-full mx-1 mt-4 flex origin-top flex-col rounded-2xl p-2 text-lg tracking-tight shadow-xl ring-1"
          >
            <MobileNavLink href="#demo">Demo</MobileNavLink>
            <MobileNavLink href="#support">Support</MobileNavLink>
            <MobileNavLink href="#contact">Contact</MobileNavLink>
            <div className="m-1 flex flex-row justify-center py-1">
              <div className="-mr-1 flex lg:hidden">
                <button
                  onClick={() => navigate(urls.REGISTRATION.route)}
                  type="button"
                  className="bg-neon-blue-700 hover:bg-neon-blue-900 hover:text-neon-blue-50 inline-block rounded-md border border-transparent px-2 py-1 text-base font-medium text-white hover:border-white"
                >
                  Register
                </button>
              </div>
            </div>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  </nav>
);

function MobileNavIcon({ open }: any) {
  return (
    <svg
      aria-hidden="true"
      className="stroke-neon-blue-700 h-3.5 w-3.5 overflow-visible"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  );
}

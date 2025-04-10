import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { urls } from '@common/utils/http/routeUrls';
import CustomAvatar from '@common/components/Avatar';
import pfgLogo from '@assets/PFG-702-background.png';
import { clearTokens } from '@common/utils/auth/tokens';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const navigation = [
    ['Dashboard', '/dashboard'],
    ['Friends', '/dashboard#friends'],
    ['Users', '/users'],
    ['Support PFG', '/support'],
    ['Account', '/account'],
  ];

  const handleSignOut = async () => {
    clearTokens();
    navigate(urls.LANDING.route);
  };

  return (
    <>
      <Disclosure as="nav" className="w-full">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl">
              <div>
                <div className="flex h-16 items-center justify-between px-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={urls.DASHBOARD.route} aria-label="Home">
                        <img
                          src={pfgLogo}
                          alt="ERR"
                          className="w-[7.5rem] py-1 lg:w-32"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="hidden items-center md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div className="items-center">
                          <MenuButton className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm hover:cursor-pointer">
                            <span className="sr-only">Open user menu</span>
                            <CustomAvatar email={'MG'} size="md" />
                          </MenuButton>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none">
                            {navigation.map(([label, href], index) => (
                              <MenuItem key={index}>
                                {({ focus }) => (
                                  <Link
                                    to={href}
                                    className={clsx(
                                      focus ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    {label}
                                  </Link>
                                )}
                              </MenuItem>
                            ))}
                            <MenuItem>
                              {({ focus }) => (
                                <a
                                  onClick={handleSignOut}
                                  className={clsx(
                                    focus ? 'bg-gray-100' : '',
                                    'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="text-neon-blue-800 ring-neon-blue-800 hover:bg-neon-blue-900 inline-flex items-center justify-center rounded-md p-2 ring-1 hover:text-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 py-3 sm:px-3">
                {navigation.map(([label, href]) => (
                  <Link
                    key={label}
                    to={href}
                    className="text-neon-blue-900 hover:bg-neon-blue-800 hover:ring-neon-blue-50 block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:text-white hover:ring-1"
                  >
                    <div aria-current={label ? 'page' : undefined}>{label}</div>
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <CustomAvatar email={'MG'} size="md" />
                  </div>
                  <div className="ml-3 space-y-1">
                    <div className="text-neon-blue-tone-300 text-xs leading-none font-medium">
                      {/* {email ? email.split('@')[0] : ''} */}
                    </div>
                    <div className="text-neon-blue-tone-100 text-sm leading-none font-medium">
                      {/* {email ? email : ''} */}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as="a"
                    href={'#'}
                    className="text-neon-blue-900 hover:bg-neon-blue-800 hover:ring-neon-blue-50 block rounded-md px-3 py-2 text-base font-medium hover:text-white hover:ring-1"
                  >
                    Settings
                  </DisclosureButton>
                  <DisclosureButton
                    onClick={handleSignOut}
                    as="a"
                    className="text-neon-blue-900 hover:bg-neon-blue-800 hover:ring-neon-blue-50 block cursor-pointer rounded-md px-3 py-2 text-base font-medium hover:text-white hover:ring-1"
                  >
                    Sign out
                  </DisclosureButton>
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default DashboardHeader;

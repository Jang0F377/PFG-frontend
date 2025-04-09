import { useState } from 'react';
import { PopoverButton, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

export function HeaderNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {[
        ['Demo', '#demo'],
        ['Support', '#support'],
        ['Contact', '#contact'],
      ].map(([label, href], index) => (
        <a
          key={label}
          href={href}
          className="text-neon-blue-700 hover:text-neon-blue-50 relative -mx-3 -my-2 rounded-lg px-3 py-2 text-xl transition-colors delay-150 hover:delay-[0ms]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <Transition
              show={hoveredIndex === index}
              enter="transition duration-150"
              leave="transition duration-150 delay-200"
            >
              <div className="bg-neon-blue-800 absolute inset-0 rounded-lg transition duration-150 ease-in data-[closed]:opacity-0" />
            </Transition>
            <span className="relative z-10">{label}</span>
          </div>
        </a>
      ))}
    </>
  );
}

export function MobileNavLink({ href, children }: any) {
  return (
    <PopoverButton
      as={Link}
      to={href}
      className="hover:bg-neon-blue-300 hover:text-neon-blue-50 hover:ring-neon-blue-800 block w-full rounded-lg p-2 hover:ring-1"
    >
      {children}
    </PopoverButton>
  );
}

export function FooterNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {[
        ['Demo', '#demo'],
        ['Support', '#support'],
        ['Contact', '#contact'],
      ].map(([label, href], index) => (
        <a
          key={label}
          href={href}
          className="text-neon-blue-50 hover:text-neon-blue-700 relative rounded-lg px-1 py-1 text-xl transition-colors delay-150 hover:delay-[0ms] sm:-mx-3 sm:-my-2 sm:px-3 sm:py-2"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <Transition
              show={hoveredIndex === index}
              enter="transition duration-150"
              leave="transition duration-150 delay-200"
            >
              <div className="bg-neon-blue-50 absolute inset-0 rounded-lg transition duration-150 ease-in data-[closed]:opacity-0" />
            </Transition>
            <span className="relative z-10">{label}</span>
          </div>
        </a>
      ))}
    </>
  );
}

export function HeaderDashboardNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {[
        ['Dashboard', '/dashboard'],
        ['Friends', '/dashboard#friends'],
        ['Users', '/users'],
        ['Support PFG', '/support'],
        ['Account', '/account'],
      ].map(([label, href], index) => (
        <a
          key={label}
          href={href}
          className="text-neon-blue-700 hover:text-neon-blue-50 relative -mx-3 -my-2 rounded-lg px-3 py-2 text-base font-medium transition-colors delay-150 hover:delay-[0ms]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <Transition
              show={hoveredIndex === index}
              enter="transition duration-150"
              leave="transition duration-150 delay-200"
            >
              <div className="bg-neon-blue-800 absolute inset-0 rounded-lg transition duration-150 ease-in data-[closed]:opacity-0" />
            </Transition>
            <span className="relative z-10">{label}</span>
          </div>
        </a>
      ))}
    </>
  );
}

export function FooterDashboardNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {[
        ['Dashboard', '/dashboard'],
        ['Friends', '/dashboard#friends'],
        ['Users', '/users'],
        ['Support PFG', '/support'],
        ['Account', '/account'],
      ].map(([label, href], index) => (
        <a
          key={label}
          href={href}
          className="text-neon-blue-50 hover:text-neon-blue-700 relative rounded-lg px-1 py-1 text-xl transition-colors delay-150 hover:delay-[0ms] sm:-mx-3 sm:-my-2 sm:px-3 sm:py-2"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <Transition
              show={hoveredIndex === index}
              enter="transition duration-150"
              leave="transition duration-150 delay-200"
            >
              <div className="bg-neon-blue-50 absolute inset-0 rounded-lg transition duration-150 ease-in data-[closed]:opacity-0" />
            </Transition>
            <span className="relative z-10">{label}</span>
          </div>
        </a>
      ))}
    </>
  );
}

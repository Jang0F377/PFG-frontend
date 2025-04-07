import { TypeAnimation } from 'react-type-animation';
import pfgLogo from '@assets/PFG-702-background.png';

function Contact() {
  return (
    <div id={'contact'} className="relative overflow-hidden">
      <div className="lg:absolute lg:inset-0">
        <div className="lg:absolute lg:right-0 lg:bottom-2/3 lg:w-1/3">
          <img
            className="mx-auto w-[85vw] px-1.5 lg:absolute lg:w-full lg:scale-150 lg:rotate-90 2xl:scale-110 2xl:rotate-45 2xl:px-0"
            src={pfgLogo}
            alt="ERR"
          />
        </div>
      </div>
      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-32">
        <div className="lg:pr-8">
          <div className="mx-auto max-w-md sm:max-w-lg lg:mx-0">
            <h2 className="text-neon-blue-900/90 text-3xl font-bold tracking-tight md:text-4xl">
              Got a{' '}
              <TypeAnimation
                sequence={[' question', 1100, ' problem', 1100]}
                repeat={Infinity}
              />
            </h2>
            <p className="text-neon-blue-400 mt-4 sm:mt-3 lg:text-lg">
              We’d love to hear from you! Send us a message using the form
              opposite, or email us. We’d love to hear from you! Send us a
              message using the form opposite, or email us.
            </p>
            <form
              action="src/components/Contact#"
              className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <label
                  htmlFor="first-name"
                  className="text-neon-blue-900 block text-sm font-medium"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="text-neon-blue-900 block text-sm font-medium"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="text-neon-blue-900 block text-sm font-medium"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="phone"
                    className="text-neon-blue-900 block text-sm font-medium"
                  >
                    Phone
                  </label>
                  <span
                    id="phone-description"
                    className="text-neon-blue-300 text-sm"
                  >
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    aria-describedby="phone-description"
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="how-can-we-help"
                    className="text-neon-blue-900 block text-sm font-medium"
                  >
                    How can we help you?
                  </label>
                  <span
                    id="how-can-we-help-description"
                    className="text-neon-blue-300 text-sm"
                  >
                    Max. 500 characters
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    id="how-can-we-help"
                    name="how-can-we-help"
                    aria-describedby="how-can-we-help-description"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="how-did-you-hear-about-us"
                  className="text-neon-blue-900 block text-sm font-medium"
                >
                  How did you hear about us?
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="how-did-you-hear-about-us"
                    id="how-did-you-hear-about-us"
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="text-right sm:col-span-2">
                <button className="bg-neon-blue-600 text-neon-blue-50 hover:bg-neon-blue-700 focus:ring-neon-blue-500 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

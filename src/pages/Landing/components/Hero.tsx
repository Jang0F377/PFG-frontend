import pfgLogo from '@assets/PFG-702-background.png';

const Hero = () => {
  return (
    <div className="mt-[-4.5rem] -mb-32 overflow-hidden pt-[4.5rem] pb-32 lg:mt-[-4.75rem] lg:pt-[4.75rem]">
      <div className="bg-neon-blue-700 flex flex-col justify-between py-16 sm:px-2 md:flex-row lg:relative lg:justify-center lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-6xl lg:grid-cols-2 xl:gap-x-16">
          <div className="relative z-10 text-center md:text-left">
            <div className="relative">
              <p className="font-display inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-5xl tracking-tight text-transparent">
                Never miss a game again.
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                Coordinate with your friends for the perfect game time and
                always be ready to dominate!
              </p>
            </div>
          </div>

          <div className="relative lg:static">
            <div className="relative rounded-2xl backdrop-blur">
              {/*<div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />*/}
              {/*<div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />*/}
              <div className="">
                <p className="text-neon-blue-50 text-center text-sm">
                  Brought to you by:
                </p>
                <img src={pfgLogo} alt={'ERR'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

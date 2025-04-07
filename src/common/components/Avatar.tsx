import clsx from 'clsx';

interface AvatarProps {
  email?: string;
  size: string;
}

const CustomAvatar = ({ email, size }: AvatarProps) => {
  const initials = email?.substring(0, 3);
  return (
    <div className="bg-neon-blue-600 mx-auto my-auto rounded-full md:p-0.5">
      <p
        className={clsx(
          'z-20 flex items-center justify-center font-semibold text-white md:text-lg',
          size === 'xs'
            ? 'h-6 w-6'
            : size === 'sm'
              ? 'h-8 w-8'
              : size === 'md'
                ? 'h-10 w-10'
                : size === 'lg'
                  ? 'h-12 w-12'
                  : size === 'xl'
                    ? 'h-14 w-14'
                    : 'h-6 w-6',
        )}
      >
        {initials}
      </p>
    </div>
  );
};

export default CustomAvatar;

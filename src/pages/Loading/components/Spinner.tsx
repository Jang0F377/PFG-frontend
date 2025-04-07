interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Spinner = ({ size = 'md' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-sg-pink-primary ${sizeClasses[size]} animate-spin rounded-full border-4 border-t-transparent`}
      />
    </div>
  );
};

export default Spinner;

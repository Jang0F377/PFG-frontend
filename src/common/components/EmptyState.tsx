import React, { ReactNode } from 'react';

interface EmptyStateProps {
  /**
   * The main message/title to display in the empty state
   */
  message: string;

  /**
   * The icon or image to display
   * Can be a HeroIcon or any React component
   */
  icon: ReactNode;

  /**
   * Optional secondary message to display below the main message
   */
  extraMessage?: string | string[];

  /**
   * Optional tertiary message with smaller text
   */
  additionalInfo?: string;

  /**
   * Optional click handler for the entire component
   */
  onClick?: () => void;

  /**
   * Optional custom class name for additional styling
   */
  className?: string;
}

/**
 * A reusable empty state component to display when there's no content
 * Can be used for various empty states throughout the application
 */
export function EmptyState({
  message,
  icon,
  extraMessage,
  additionalInfo,
  onClick,
  className = '',
}: EmptyStateProps) {
  // Convert string array to paragraphs if extraMessage is an array
  const renderExtraMessages = () => {
    if (!extraMessage) return null;

    if (Array.isArray(extraMessage)) {
      return extraMessage.map((text, index) => (
        <p
          key={index}
          className="text-neon-blue-tone-200 mt-1 px-0.5 text-sm lg:px-1"
        >
          {text}
        </p>
      ));
    }

    return (
      <p className="text-neon-blue-tone-200 mt-1 px-0.5 text-sm lg:px-1">
        {extraMessage}
      </p>
    );
  };

  return (
    <div
      className={`border-neon-blue-800/70 bg-neon-blue-50 m-2 rounded-xl border p-1 transition duration-200 ease-in-out hover:scale-105 md:p-2 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      <h2 className="text-neon-blue-800 px-0.5 text-lg font-medium lg:px-1">
        {message}
      </h2>

      {renderExtraMessages()}

      {additionalInfo && (
        <p className="text-neon-blue-tone-200 mt-1 px-0.5 text-xs lg:px-1 lg:pt-1">
          {additionalInfo}
        </p>
      )}

      {/* Render icon after heading */}
      {
        <div className="mx-auto mt-6 flex justify-center">
          <div className="mx-auto justify-center text-center">
            {icon}
            {/* Some icons might have a title below them */}
            {onClick && (
              <h2 className="text-neon-blue-800 mt-2 text-lg font-medium">
                {message}
              </h2>
            )}
          </div>
        </div>
      }
    </div>
  );
}

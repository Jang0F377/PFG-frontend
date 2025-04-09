import { EmptyState } from '@common/components/EmptyState';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Friends: React.FC = () => {
  return (
    <div id="friends">
      <main className="bg-neon-blue-50 space-y-3">
        <section className="mx-auto max-w-7xl">
          <div className="bg-neon-blue-200 mx-auto items-center justify-center rounded-lg px-5 py-6 text-center sm:px-6">
            <h1 className="-mt-2 text-left text-xl font-medium">Friends</h1>
            <div className="border-neon-blue-800/50 mx-auto flex flex-row flex-wrap items-center justify-center space-y-1.5 space-x-2 rounded-lg border-4 px-2 py-3 md:space-y-1 md:py-4 lg:space-x-4">
              <EmptyState
                message="Add your first friend!"
                extraMessage={[
                  'Send a friend an email and invite them to sign up and be your friend',
                  'Then they can start confirming or declining Seshes.',
                ]}
                icon={
                  <>
                    <svg
                      className="text-neon-blue-700 mx-auto h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </>
                }
                onClick={() => {}}
              />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl">
          <div className="bg-neon-blue-200 mx-auto items-center justify-center rounded-lg px-5 py-6 text-center sm:px-6">
            <h1 className="-mt-2 text-left text-xl font-medium">
              Pending friend requests
            </h1>
            <div className="border-neon-blue-800/50 mx-auto flex flex-row flex-wrap items-center justify-center space-y-1.5 space-x-2 rounded-lg border-4 px-2 py-3 md:space-y-1 md:py-4 lg:space-x-4">
              <EmptyState
                message="No friend requests yet."
                extraMessage={'Friend invites you receive will appear here.'}
                icon={
                  <EnvelopeOpenIcon className="text-neon-blue-700 mx-auto h-12 w-12" />
                }
                onClick={() => {}}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Friends;

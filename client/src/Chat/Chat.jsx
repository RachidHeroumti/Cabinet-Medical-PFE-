import React from 'react';
import Conversation from './Conversation';
import Messages from './Messages';

export default function Chat() {
  return (
    <div className="bg-sky-50 min-h-screen pt-24 px-4">
      <div className="flex rounded-lg overflow-hidden shadow-lg bg-white">
        <aside className="w-80 hidden md:block bg-sky-100 border-r border-sky-200">
          <div className="h-full overflow-y-auto">
            <div className="text-xl font-bold text-sky-800 p-4">Chats</div>
            <div className="flex px-4 pb-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-3 py-2 rounded-l-md bg-white border border-sky-200 text-sky-900 focus:outline-none"
              />
              <div className="bg-white border border-l-0 border-sky-200 rounded-r-md flex items-center px-3 text-sky-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-sky-600 font-semibold px-4 mb-2">Récents</div>
            <Conversation />
          </div>
        </aside>
        <main className="flex-grow bg-white">
          <Messages />
        </main>
      </div>
    </div>
  );
}

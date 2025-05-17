import React from 'react';

const Messages = () => {
  return (
    <div className="flex-grow h-full flex flex-col">
      {/* Header */}
      <div className="w-full h-15 p-1 bg-sky-600 shadow-md rounded-xl rounded-bl-none rounded-br-none">
        <div className="flex p-2 items-center">
          <div className="p-2 md:hidden rounded-full mr-1 hover:bg-sky-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <div className="border rounded-full border-white p-1/2">
            <img className="w-14 h-14 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
          </div>
          <div className="flex-grow p-2">
            <div className="text-md text-white font-semibold">Ahmed Jamal</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full flex-grow bg-sky-50 my-2 p-2 overflow-y-auto">
        {/* Incoming message */}
        <div className="flex justify-start">
          <div className="flex items-end w-auto bg-sky-500 m-1 rounded-xl rounded-br-none max-w-[75%]">
            <div className="p-2">
              <div className="text-white">Hi.</div>
            </div>
          </div>
        </div>

        {/* Outgoing message */}
        <div className="flex justify-end">
          <div className="flex items-end w-auto bg-sky-700 m-1 rounded-xl rounded-br-none max-w-[75%]">
            <div className="p-2">
              <div className="text-white">Hello? How can I help you?</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="h-15 px-5 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100">
        <div className="flex items-center">
          <div className="flex flex-grow p-2">
            <input
              className="text-gray-700 text-sm p-3 focus:outline-none bg-white border border-sky-200 flex-grow rounded-l-md"
              type="text"
              placeholder="Type your message ..."
            />
            <div className="bg-white border border-l-0 border-sky-200 text-sky-500 flex justify-center items-center pr-3 rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

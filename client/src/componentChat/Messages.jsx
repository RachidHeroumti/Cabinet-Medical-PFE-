import React from 'react'

const Messages = () => {
    return (
        <div className="flex-grow  flex flex-col bg-gray-300 m-10 rounded-md p-2 w-[500px]">

            <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">


            <div className="flex justify-start">
                    <div className="flex items-end w-auto bg-sky-700 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
                        <div className="p-2">
                            <div className="text-gray-50">
                                Hi,
                            </div>
                        </div>
                    </div>
                </div>
            
            <div className="flex justify-end">
                    <div className="flex items-end w-auto bg-sky-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
                        <div className="p-2">
                            <div className="text-gray-50">
                                hello ? How Can i help you ?
                            </div>
                        </div>
                    </div>
                </div>
              





                
            </div>



            <div className=" rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center">

                    <div className="search-chat flex flex-grow p-2">
                        <input className="input text-gray-700 dark:text-gray-200 text-sm p-2 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md" type="text" placeholder="Type your message ..."/>
                        <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages

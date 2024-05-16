   {/** 
     <div className="">
        <div className="  flex justify-center items-center">
            <img src="https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="picAdmin"
             className="rounded h-[60px] w-[60px]"/>
            <div className="p-2">
                <h2 className="text-xl font-bold text-gray-950">Administration</h2>
                <h1 className=" font-semibold">{user.fullName}</h1>
            </div>
        </div>

        <div className="flex justify-between space-x-10 p-4">
            <div className="p-2 space-y-2 space-x-2 rounded bg-gray-200"> 
                <h1 className="text-2xl font-bold">Add Departments</h1>
                <input type="text" placeholder="Department Name" className="outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                <div className="space-x-2">
                    {[1, 2, 3, 4].map((index) => (
                        <input key={index} type="text" placeholder={`specialiste ${index}`} className="outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                    ))}
                </div>
                <button className="m-2 bg-sky-400 rounded-xl text-xl p-1 w-full hover:bg-sky-600">Add</button>
            </div> 

            <div className="p-2 space-y-2 space-x-2 rounded bg-gray-200"> 
                <h1 className="text-2xl font-bold">Add Test Information</h1>
                <input type="text" placeholder="Test .." className="outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                <input type="text" placeholder="userId .." className="outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/><br></br>
                <textarea className="p-2 w-full outline-none bg-bg-gray-100 hover:bg-gray-100" placeholder="test result ..."></textarea>
                <button className="m-2 bg-sky-400 rounded-xl text-xl p-1 w-full hover:bg-sky-600">Add</button>
            </div>   
        </div>
    </div>
                  **/
}
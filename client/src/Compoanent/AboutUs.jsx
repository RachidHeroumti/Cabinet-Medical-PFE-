import React from 'react'

export default function About() {
  return (
    <div className=' p-4 flex bg-sky-200 my-3 ' id='about'>
        <div className=' grid sm:grid-cols-2 gap-5'>
            <div className='text-xl flex flex-col space-y-4'>
                <h1 className=' text-2xl font-bold text-center'>MasaHHati</h1>
                <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae, 
                    iste magni temporibus reiciendis dicta placeat fuga provident minima dolor quo, 
                    aperiam deserunt facilis, nihil quis laborum dolorem voluptas omnis?</p>
                 <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Et sapiente aspernatur blanditiis rerum ipsa atque quia. Eius aspernatur,
                  deserunt fugit voluptate dolorum nemo dicta perspiciatis esse quod, reiciendis accusantium cumque.</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime unde mollitia error excepturi odit impedit minima eligendi
                    
                  </p>
                  <p className='sm:p-5 text-center text-gray-500'>And more ...</p>
            </div>
            <div>
                <img src='https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600' alt='mashatiIcon'
                  className='w-[400] h-[450] rounded'/>
            </div>

        </div>
    </div>
  )
}

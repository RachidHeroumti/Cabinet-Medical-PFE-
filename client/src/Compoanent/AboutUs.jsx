import React from 'react';

export default function About() {
  return (
    <section id="about" className="bg-sky-50 py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-sky-900">Doctori</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae, iste magni temporibus reiciendis dicta placeat fuga provident minima dolor quo, aperiam deserunt facilis, nihil quis laborum dolorem voluptas omnis?
          </p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sapiente aspernatur blanditiis rerum ipsa atque quia. Eius aspernatur, deserunt fugit voluptate dolorum nemo dicta perspiciatis esse quod, reiciendis accusantium cumque.
          </p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime unde mollitia error excepturi odit impedit minima eligendi.
          </p>
          <p className="text-gray-500 font-medium">And more ...</p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Doctori illustration"
            className="w-[300px] md:w-[400px] h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

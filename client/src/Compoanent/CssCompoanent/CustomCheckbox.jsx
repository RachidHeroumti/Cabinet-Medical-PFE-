import React from 'react';

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="remember-me" className="ml-2 text-gray-700 cursor-pointer select-none">
        Remember Me
      </label>
    </div>
  );
};

export default CustomCheckbox;

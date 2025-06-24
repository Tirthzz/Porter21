import React from "react";

const CustomizeProducts = () => {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Select a Pack</h4>
      <ul className="flex items-center gap-3 ">
        <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          3 Pack
        </li>
        <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          6 Pack
        </li>
        <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          9 Pack
        </li>
        <li className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          12 Pack
        </li>
      </ul>
    </div>
  );
};

export default CustomizeProducts;

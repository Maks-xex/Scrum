import React from "react";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => (
  <nav className="flex justify-end w-full fixed top-0 p-2 bg-blue-500 rounded-b shadow-md z-10">
    <h1 className="font-extrabold text-blue-600 drop-shadow-md shadow-blue-600/50 uppercase">
      <a href="/">
        <img src="" width="100px" />
      </a>
    </h1>
    <ul className="flex flex-row text-white">
      <li className="pr-2 capitalize">
        <Link to="/">Home</Link>
      </li>
      <li className="pr-2 capitalize">
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);

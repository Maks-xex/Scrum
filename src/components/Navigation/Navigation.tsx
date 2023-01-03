import React from "react";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => (
  <nav className="bflex justify-between w-full relative top-0 mb-2 p-2 bg-slate-600">
    <h1 className="font-extrabold text-blue-600 drop-shadow-md shadow-blue-600/50 uppercase">
      <a href="/">
        <img src="" width="100px" />
      </a>
    </h1>
    <ul className="flex flex-row">
      <li className="pr-2 capitalize">
        <Link to="/">Home</Link>
      </li>
      <li className="pr-2 capitalize">
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);

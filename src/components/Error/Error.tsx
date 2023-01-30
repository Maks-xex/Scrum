import React from "react";

import classes from "./error.module.scss";

interface ErrorProps {
  error?: Error | null;
  children: JSX.Element;
}

export const Error: React.FC<ErrorProps> = ({ error, children }) => (
  <div className="mx-auto w-[600px] mt-[100px]">
    <div className={`${classes.errorPage}`}>
      <div className={classes.content}>
        {error && (
          <h2 className={classes.header} data-text={error?.message}>
            {error?.message}
          </h2>
        )}
        {children}
      </div>
    </div>
  </div>
);

import React from "react";

const Button = props => {
  const { name, className, func = () => { return } } = props;
  return (
    <div>
      <button onClick={func} className={className}>
        {name}
      </button>
    </div>
  );
};

export default Button;

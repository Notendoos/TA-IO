import { FunctionComponent, useEffect, useState } from 'react';
import clsx from 'clsx';

const Toggle: FunctionComponent<{onClick:Function, isActive?:boolean}> = ({onClick, isActive}) => {

  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    setToggleState(isActive ?? false);
  }, [isActive]);
  const handleClick = () => {
    onClick(!isActive)
  }

  return (
    <div className="flex flex-row-reverse">
      <button
        type="button"
        className={clsx(
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          toggleState ? "bg-green-600" : "bg-gray-200"
        )}
        role="switch"
        onClick={handleClick}
        aria-checked={toggleState}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "absolute pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
            toggleState ? "translate-x-0" : "translate-x-5"
          )}
        ></span>
      </button>
      <b>Favorite: </b>
    </div>
  );
};

export default Toggle;

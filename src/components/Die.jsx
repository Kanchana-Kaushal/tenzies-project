function Die(props) {
  return (
    <>
      <button
        className={`size-15 cursor-pointer rounded-md text-lg font-extrabold drop-shadow-lg transition-transform duration-75 ease-in active:scale-95 ${props.isHeld ? "bg-green-300" : "bg-white"}`}
        onClick={props.handleClick}
        aria-label={`Die with value ${props.value}, it is ${props.isHeld ? "held" : "not held"}`}
        aria-pressed={props.isHeld}
      >
        {props.value}
      </button>
    </>
  );
}

export default Die;

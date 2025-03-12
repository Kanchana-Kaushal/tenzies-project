import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = React.useState(generateAllNewDice);
  const buttonRef = React.useRef(null);

  const gameWon =
    diceArray.every((die) => die.isHeld) &&
    diceArray.every((die) => die.value === diceArray[0].value);

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  const dieElements = diceArray.map((elem) => (
    <Die
      key={elem.id}
      value={elem.value}
      isHeld={elem.isHeld}
      handleClick={() => {
        hold(elem.id);
      }}
    />
  ));

  function generateAllNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      newDiceArray.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDiceArray;
  }

  function setDice() {
    setDiceArray((prev) =>
      prev.map((elem) =>
        elem.isHeld
          ? elem
          : { ...elem, value: Math.floor(Math.random() * 6) + 1 },
      ),
    );
  }

  function hold(id) {
    setDiceArray((prev) =>
      prev.map((elem) => ({
        ...elem,
        isHeld: elem.id === id ? !elem.isHeld : elem.isHeld,
      })),
    );
  }

  function newGame() {
    setDiceArray(generateAllNewDice());
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="flex w-8/10 max-w-3xl items-center justify-center rounded-lg bg-gray-100 p-8 md:min-h-100">
          {gameWon ? (
            <Confetti width={screen.width - 30} height={screen.height - 30} />
          ) : undefined}
          <div aria-live="polite" className="sr-only">
            {gameWon && (
              <p>Congratulations!, You won. press "New Game" to start again.</p>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-wider">Tenzies</h1>
            <p className="text-xs font-bold text-gray-600">
              Roll untill all dice are same. Click each die to freeze it at{" "}
              <br /> its current value between rolls.
            </p>
            <div className="mx-auto mt-8 grid w-fit grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
              {dieElements}
            </div>

            <button
              className="mt-8 cursor-pointer rounded-md bg-blue-700 px-8 py-2 font-bold text-gray-50 shadow-lg transition-all duration-75 ease-in hover:bg-blue-600 active:scale-95"
              onClick={gameWon ? newGame : setDice}
              ref={buttonRef}
            >
              {gameWon ? "New Game" : "Roll"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

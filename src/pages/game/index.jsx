import React, { useState } from "react";
import "./GuessNumberGame.css";
const GuessNumberGame = () => {
  const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const handleGuess = (event) => {
    event.preventDefault();
    const guessNumber = parseInt(guess);
    if (guessNumber === answer) {
      setMessage("恭喜你，猜对了！");
      setAnswer(Math.floor(Math.random() * 100) + 1);
      setGuess("");
    } else if (guessNumber < answer) {
      setMessage("猜小了，请再试一次。");
      setGuess("");
    } else if (guessNumber > answer) {
      setMessage("猜大了，请再试一次。");
      setGuess("");
    }
  };
  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };
  return (
    <div className="guess-number-game">
      <h1>猜数字游戏</h1>
      <form onSubmit={handleGuess}>
        <label>
          请输入一个数字：
          <input type="number" value={guess} onChange={handleInputChange} />
        </label>
        <button type="submit">猜一下</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};
export default GuessNumberGame;

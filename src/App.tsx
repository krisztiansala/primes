import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { getPrimesFromInterval } from './service/primes';

function App() {
  const [memorizedPrimes, setMemorizedPrimes] = useState<number[]>([]);
  const [memorizedResult, setMemorizedResult] = useState<number[]>([]);
  const [newResult, setNewResult] = useState<number[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    // load memory from local storage
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  }

  const calculatePrime = (): void => {
    let nr = parseInt(input);
    if (isNaN(nr)) {
      return;
    }
    if (nr > 999999) {
      if (!confirm('This number is a bit too big and your browser might freeze. Are you sure you want to continue?')) return;
    }
    if (memorizedPrimes.length == 0) {
      const primes = getPrimesFromInterval(nr);
      setNewResult(primes);
      setMemorizedPrimes(primes);
    } else {
      let result = [];
      let i = 0;
      for (; i < memorizedPrimes.length; i++) {
        if (memorizedPrimes[i] <= nr) {
          result.push(memorizedPrimes[i]);
        } else {
          break;
        }
      }
      setMemorizedResult(result);
      if (i == memorizedPrimes.length) {
        const lastMemorized = result[i - 1] !== 2 ? result[i - 1] : 1;
        result = getPrimesFromInterval(nr, lastMemorized + 2);
        setNewResult(result);
        setMemorizedPrimes(memorizedPrimes.concat(result));
      } else {
        setNewResult([]);
      }
    }
  }
  return (
    <div className="App">
      <h1>Primes</h1>

      <p className="info">
        Add a number to get the prime numbers up to it. This app will memorize the previous operations.
        Memorized results will be colored green and have a star suffix.
      </p>
      <div className="card">
        <div>
          <input
            type="text"
            placeholder="Enter a number"
            value={input}
            onChange={handleInputChange}
          ></input>
        </div>
        <button onClick={calculatePrime}>
          Calculate
        </button>
        <button onClick={() => { setNewResult([]); setMemorizedResult([]); }}>
          Clear
        </button>
        <p className="memorized-primes">
          {memorizedResult.join('*, ')}{(memorizedResult.length > 0) ? '*' : ''}
        </p>
        <p className="new-primes">
          {newResult.join(', ')}
        </p>
      </div>
    </div>
  );
}

export default App;

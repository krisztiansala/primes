import * as fs from 'fs';

function isPrime(n) {
    if (n == 2) return true;
    if (n < 2 || n % 2 == 0) return false;
    const squareOfN = Math.sqrt(n);

    for (let j = 3; j <= squareOfN; j += 2) {
        if (n % j == 0) return false;
    }
    return true;
}

function getPrimesFromInterval(end, beginning = 0) {
    if (beginning > end || end < 2) return [];
    let primes = [];

    if (beginning <= 2) primes.push(2);
    if (beginning % 2 === 0) beginning++;

    for (let i = beginning; i <= end; i += 2) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

function loadMemorizedPrimes() {
    try {
        const fileContent = fs.readFileSync(
            './primes.json',
            {
                encoding: 'utf-8',
            },
        );
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
}

function setMemorizedPrimes(primes) {
    fs.writeFile('primes.json', JSON.stringify(primes), (err) => {
        if (err) {
            throw err;
        }
    });
}

function printPrimes(primes, memorized = false) {
    let res = '';
    for (let prime of primes) {
        if (memorized) {
            res += `${prime}*, `;
        } else {
            res += `${prime}, `;
        }
    }
    if (primes.length > 0) {
        console.log(memorized ? `Memorized: ${res}` : `New: ${res}`);
    }
}

function main() {
    const params = process.argv.slice(2);
    const nr = parseInt(params[0]);
    
    if (isNaN(nr)) {
        console.log("Please provide a valid number");
    }
    
    let memorizedPrimes = loadMemorizedPrimes();

    if (memorizedPrimes.length == 0) {
        const primes = getPrimesFromInterval(nr);
        setMemorizedPrimes(primes);
        printPrimes(primes);
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
        printPrimes(result, true);
        if (i == memorizedPrimes.length) {
            const lastMemorized = result[i - 1] !== 2 ? result[i - 1] : 1;
            result = getPrimesFromInterval(nr, lastMemorized + 2);
            printPrimes(result);
            setMemorizedPrimes(memorizedPrimes.concat(result));
        }
    }
}
main();
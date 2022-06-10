function isPrime(n: number) {
    if (n == 2) return true;
    if (n < 2 || n % 2 == 0) return false;
    const squareOfN = Math.sqrt(n);

    for (let j = 3; j <= squareOfN; j += 2) {
        if (n % j == 0) return false;
    }
    return true;
}

export function getPrimesFromInterval(end: number, beginning = 0) {
    if (beginning > end || end < 2) return [];
    if (end == 2) return [2];
    if (beginning == 0) beginning = 3;
    let primes = [];
    for (let i = beginning; i <= end; i += 2) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}
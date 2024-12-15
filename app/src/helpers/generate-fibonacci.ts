export const generateFibonacci = (max: number): number[] => {
  let fib = [100, 200]; // 初期値として 1 と 2
  while (true) {
    const next = fib[fib.length - 1] + fib[fib.length - 2];
    if (next > max) break;
    fib.push(next);
  }
  return fib;
};

const fs = require('fs');

const isPrimeFn = (n) => {
  for (var i=2;i<n;i++)
    if (n%i==0)
      return false;
  return true;
}

const writeWordListFn = (wordsLength, fileName) => {
  let max='';
  for (var i=0;i<wordsLength;i++)
    max+='9';
  for (var i=1;i<max;i++)
    if(isPrimeFn(i))
      fs.appendFileSync(fileName, (''+i).padStart(wordsLength, '0') + '\n');
};

writeWordListFn(4, 'dictionary_primes_4_digits.txt');
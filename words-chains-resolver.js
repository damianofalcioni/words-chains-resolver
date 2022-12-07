//START CONFIGURATION SECTION
const dictionary = 'dictionary_ita_unaccented.txt';
const excludeList = [];
const singleResult = false;
//END CONFIGURATION SECTION

const args = process.argv.slice(2);
const fromWord = args[0].toLowerCase();
const toWord = args[1].toLowerCase();
const numOfDifferentLetters = args[2]?parseInt(args[2]):1;
if (fromWord.length != toWord.length) throw 'The provided words must have the same lenght';
if (numOfDifferentLetters > fromWord.length) throw 'The maximum number of different letters is ' + fromWord.length;
const resultList = [];
const wordObjList = [];
const tree = {
  obj: {
    word: fromWord
  },
  parent: null,
  nextList: []
};

const initWordListFn = () => {
  return new Promise((resolve, reject) => {
    const wordsLength = fromWord.length;
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(dictionary)
    });
    lineReader.on('line', word => {
      if (word.length === wordsLength && !excludeList.includes(word))
        wordObjList.push({
          word
        });
    });
    lineReader.on('close', () => {
      resolve();
    });
  });
};

const distanceFn = (word1, word2) => {
  let count = 0;
  for (let i=0;i<word1.length;i++)
    if (word1[i] !== word2[i])
      count++;
  return count;
};

const isWordInAncestorsFn = (treeNode, word) => {
  let node = treeNode;
  do {
    if (node.obj.word === word)
      return true;
    node = node.parent;
  } while(node != null);
  return false;
};

const saveResultFn = treeNode => {
  let node = treeNode;
  let chain = '';
  do {
    chain += node.obj.word + ' ';
    node = node.parent;
  } while (node != null);
  resultList.push(chain);
};

const buildTreeFlatFn = () => {
  let toProcessList = [tree];
  let nextProcessList = [];
  let deep = 1;
  do {
    console.info('Working on deep ' + deep + '. Analizing ' + toProcessList.length + ' words...');
    for (let x=0;x<toProcessList.length;x++) {
      const node = toProcessList[x];
      for (let i=0;i<wordObjList.length;i++) {
        const nextWordObj = wordObjList[i];
        if (distanceFn(node.obj.word, nextWordObj.word) === numOfDifferentLetters && !isWordInAncestorsFn(node, nextWordObj.word)) {
          const nextTree = {
            obj: nextWordObj,
            parent: node,
            nextList: []
          };
          node.nextList.push(nextTree);

          if (nextWordObj.word === toWord) {
            saveResultFn(nextTree);
            if (singleResult)
              return;
          } else
            nextProcessList.push(nextTree);
        }
      }
    }
    toProcessList = nextProcessList;
    nextProcessList = [];
    deep++;
  } while(toProcessList.length != 0 && resultList.length == 0);
};

initWordListFn().then(()=>{
  console.info('Loaded words: ' + wordObjList.length);
  console.info('Generating results...');
  buildTreeFlatFn();
  console.info('Results:');
  resultList.forEach(chain => console.log(chain));
}).catch(e=>console.error(e));

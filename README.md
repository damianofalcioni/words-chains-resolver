# Words Chains Resolver Game
Construct the shortest sequences that connect two different words changing each time one or more letters.
By default the script use an italian dictionary and return all the shortest sequences of words.

## Usage
```
node words-chains-resolver _first_word_ _second_word_ [_number_of_different_letters_]
```

example :
```
node words-chains-resolver rana uomo 1
```

## Demo
```
npm run demo
```
The demo script will run ``node words-chains-resolver rana uomo 1``.

Output:
```
Loaded words: 3146
Generating results...
Results:
uomo nomo noma nama nana rana 
uomo nomo nono nano nana rana
uomo nomo noma nona nana rana
uomo nomo nono nona nana rana
uomo pomo poma pama pana rana
uomo domo damo dama rama rana
uomo domo doma dama rama rana
uomo nomo noma nama rama rana
uomo pomo poma pama rama rana
uomo domo damo ramo rama rana
uomo tomo tono tano tana rana
uomo tomo toma tona tana rana
uomo tomo tono tona tana rana
```

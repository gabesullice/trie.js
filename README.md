# trie.js
A small, fast [trie](https://en.wikipedia.org/wiki/Trie) implementation in vanilla JS.

## Usage
#### `initialize`
````javascript
var myTrie = new Trie();
````
Before you can work with a trie, you'll need to create a new instance of the Trie type.

#### `build([array])`
````javascript
var words = ["foo", "bar", "baz"];

myTrie.build(words);
````
Initializing a trie is easy, you simply pass it an array of words which you would like inserted into the trie. You can inspect the trie after it's built with `console.log(myTrie);`.

#### `insert("string")`
````javascript
myTrie.insert("new");
````
Usually, it's easier just to build a tree from a premade array of words, but if you want to insert new word, you simply need to pass a string to the `insert` method of your trie.

#### `prune(maxIndex)`
````javascript
myTrie.prune(6); // Removes any words which are longer than 7 characters
````
Pruning the trie will remove any words from the trie whose last letter is at a higher index than `maxIndex`. If you are trying to get a word of 6 letters, than the max index is 5.

#### `filter("C", [1,...,n])`
````javascript
myTrie.filter("b", [0]);
````
Filtering removes any words from the trie that do not have the given character at *all* of the indeces passed in the second argument (as an array). In our above example, our trie would only have "bar", and "baz" after filtering since "b" must be at the 0th index and "foo" begins with the letter "f".

#### `characterCount()`
````javascript
var myTrie = new Trie().build(["foo", "bar", "baz"]);
var counts = myTrie.characterCount(); // returns {"a": 2, "b": 2, "f": 1, "o": 1, "r": 1, "z": 1}

myTrie.filter("a", [1]);
var newCount = myTrie.characterCount(); // returns {"a": 2, "b": 2, "r": 1, "z": 1}
````
`characterCount` returns a sum of every occurence of every character that exists in the trie.

#### `leafCount()`
````javascript
var myTrie = new Trie().build(["foo", "bar", "baz"]);
var counts = myTrie.characterCount(); // returns 3

myTrie.filter("o", [1,2]);
var newCount = myTrie.characterCount(); // returns 1
````
`leafCount` returns the total count of every possible complete word in the trie.

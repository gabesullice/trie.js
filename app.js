//!(function () {
  trie = new Trie();
  //var wordArray = "encyclopedia".split('');
  attempted = [];

  trie.build(words);

  characterCount = function (characterCount) {
    var max;

    for (var exclude in attempted) {
      delete characterCount[attempted[exclude]];
    }

    for (var character in characterCount) {
      if (characterCount.hasOwnProperty(character)) {
        if (max === undefined) {
          max = character;
        } else if (characterCount[character] > characterCount[max]) {
          max = character;
        }
      }
    }

    attempted.push(max);
    return max;
  }

  //trie.prune(wordArray.length - 1);

  //for (var attempts = 0; trie.leafCount() > 1; attempts++) {
  //  var guess = characterCountMax(trie.characterCount());
  //  var indices = [];
  //  for (var index in wordArray) {
  //    if (guess === wordArray[index]) indices.push(parseInt(index));
  //  }
  //  console.log("Guessing: " + guess + " with indices " + JSON.stringify(indices));
  //  trie.filter(guess, indices).prune(wordArray.length - 1);
  //}

  //console.log("Found word in " + attempts + " guesses!");
//})();

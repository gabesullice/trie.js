var Trie = (function () {
  var Trie = function (root, depth) {
    this.root = (root === undefined) ? null : root;
    this.depth = (depth === undefined) ? -1 : depth;
    this.children = {};

    return this;
  };

  Trie.prototype = {
    build: function (strings) {
      strings.forEach(function (string) {
        this.insert(string);
      }, this);

      return this;
    },

    markAsLeaf: function () {
      this.isLeaf = true;

      return this;
    },

    insert: function (string) {
      var root, remain, subTrie;
      root = string.substring(0,1);

      if (string.length > 1) {
        remain = string.substring(1);
        if (this.children.hasOwnProperty(root)) {
          this.children[root].insert(remain);
        } else {
          subTrie = new Trie(root, this.depth + 1);
          this.children[root] = subTrie.insert(remain);
        }
      } else {
        if (this.children.hasOwnProperty(root)) {
          this.children[root].markAsLeaf();
        } else {
          subTrie = new Trie(root, this.depth + 1);
          this.children[root] = subTrie.markAsLeaf();
        }
      }

      return this;
    },

    filter: function (character, index) {
      var remainingChildren = {};

      if (index - 1 == this.depth) {
        if (this.children.hasOwnProperty(character)) {
          remainingChildren[character] = this.children[character];
        }
      } else {
        for (var key in this.children) {
          if (this.children[key] instanceof Trie) {
            this.children[key].filter(character, index);
            if (Object.keys(this.children[key].children).length > 0) {
              remainingChildren[key] = this.children[key];
            }
          }
        }
      }

      this.children = remainingChildren;

      return this;
    },

    prune: function (maxDepth) {
      var childCount, remainingChildren;
      remainingChildren = {};


      if (maxDepth - 2 == this.depth) {
        for (var key in this.children) {
          this.children[key].prune(maxDepth);

          childCount = Object.keys(this.children[key].children).length;
          if (childCount > 0 || this.children[key].isLeaf) {
            remainingChildren[key] = this.children[key];
          }
        }
      }
      else if (maxDepth - 1 == this.depth) {
        for (var key in this.children) {
          if (this.children[key] instanceof Trie && this.children[key].isLeaf) {
            remainingChildren[key] = this.children[key];
            remainingChildren[key].children = {};
          }
        }
      }
      else if (maxDepth - 1 > this.depth) {
        for (var key in this.children) {
          if (this.children[key] instanceof Trie) {
            this.children[key].prune(maxDepth);

            childCount = Object.keys(this.children[key]).length;
            if (childCount > 0 || this.children[key].isLeaf) {
              remainingChildren[key] = this.children[key];
            }
          }
        }
      }

      this.children = remainingChildren;

      return this;
    }
  };

  return Trie;
})();

trie = new Trie();
trie.build(words);

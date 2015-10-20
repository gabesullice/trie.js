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

    each: function (callback) {
      for (var key in this.children) {
        var child = this.children[key];
        if (child instanceof Trie) callback(child, key, this.children);
      }
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
      var keep, remaining;
      remaining = {};

      if (index === undefined && this.root == character) {
        return null;
      } else if (index !== undefined && this.depth == index) {
        if (this.root == character) {
          return this;
        } else {
          return null;
        }
      } else {
        this.each(function (child, key, children) {
          if (!(children[key] = child.filter(character, index))) delete children[key];
        });

        return (Object.keys(this.children).length || this.isLeaf) ? this : null;
      }
    },

    prune: function (maxDepth) {
      var keep, remaining;
      remaining = {};

      if (this.depth == maxDepth && this.isLeaf) {
        this.children = {};
        return this;
      } else if (this.depth < maxDepth) {
        this.each(function (child, key, children) {
          if (!(children[key] = child.prune(maxDepth))) delete children[key];
        });

        return (Object.keys(this.children).length || this.isLeaf) ? this : null;
      }

      return null;
    },

    characterCount: function (count) {
      var count = (count != undefined) ? count : {};

      this.each(function (child, key, children) {
        count[key] = (count[key] !== undefined) ? count[key] + 1 : 1;
        child.characterCount(count);
      });

      return count;
    }
  };

  return Trie;
})();

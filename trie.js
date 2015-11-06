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

    filter: function (character, indices) {
      indices = (indices === undefined) ? [] : indices;

      if ((indices.indexOf(this.depth) === -1) === (this.root == character)) return null;

      this.each(function (child, key, children) {
        if (!(children[key] = child.filter(character, indices))) delete children[key];
      });

      return (Object.keys(this.children).length || this.isLeaf) ? this : null;
    },

    prune: function (depth) {
      if (this.isLeaf && this.depth < depth) this.isLeaf = false;
      if (this.isLeaf && this.depth == depth) return this.clip();
      if (this.depth > depth) return null;

      this.each(function (child, key, children) {
        if (!(children[key] = child.prune(depth))) delete children[key];
      });

      return (Object.keys(this.children).length) ? this : null;
    },

    clip: function () {
      this.children = {};
      return this;
    },

    leafCount: function () {
      var count = 0;
      this.each(function (child, key, children) {
        count += child.leafCount();
      });
      return (this.isLeaf) ? count + 1 : count;
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

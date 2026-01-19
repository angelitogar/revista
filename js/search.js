function search(query) {
    const prefix = normalize(query);
    const ids = trie.autocomplete(prefix, 5);

    return ids.map(id => objectMap.get(id));
}

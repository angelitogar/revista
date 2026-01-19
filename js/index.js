const trie = new Trie();
const objectMap = new Map();

// normalize text
const normalize = text =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

for (let obj of data) {
    objectMap.set(obj.id, obj);

    const tokens = normalize(obj.name).split(" ");

    for (let token of tokens) {
        trie.insert(token, obj.id);
    }
}
    
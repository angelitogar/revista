class TrieNode {
    constructor() {
        // Cambiado de Array(26) a Objeto para soportar espacios, tildes y ñ
        this.children = {}; 
        this.isleaf = false;
        this.ids = new Set(); 
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, id) {
        let curr = this.root;
        for (let c of word) {
            // Si el carácter no existe en los hijos, se crea
            if (!curr.children[c]) {
                curr.children[c] = new TrieNode();
            }
            curr = curr.children[c];
        }
        curr.isleaf = true;
        curr.ids.add(id);
    }

    autocomplete(prefix, limit = 5) {
        let curr = this.root;

        // 1. Navegar hasta el final del prefijo
        for (let c of prefix) {
            if (!curr.children[c]) return [];
            curr = curr.children[c];
        }

        // Usamos un Set para los resultados finales para evitar IDs duplicados
        // (por si un jugador aparece en varias ramas bajo el mismo prefijo)
        let results = new Set();

        // 2. DFS para recolectar IDs de todas las ramas siguientes
        const dfs = (node) => {
            if (results.size >= limit) return;

            if (node.isleaf) {
                for (let id of node.ids) {
                    results.add(id);
                    if (results.size >= limit) return;
                }
            }

            // Iterar sobre los hijos existentes (más eficiente que recorrer 26 espacios)
            for (let char in node.children) {
                dfs(node.children[char]);
            }
        };


        dfs(curr);
        return Array.from(results);
    }
}
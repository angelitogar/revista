import re
from platform import node
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World", "status": "FastAPI is running on Fedora!"}

class MyData(BaseModel):
    poem: str
    words: list[str]
    order: str

# 2. Create the "POST" endpoint
@app.post("/send-initial-data")
async def receive_data(item: MyData):
    return {"message": f"Success! I got the data for {item.words[1]}"}

class Game:
    def __init__(self):
        self.points = 0
        self.graph = {}

    def add_node(self, node):
        if node not in self.graph:
            self.graph[node] = []

    def add_edge(self, a, b):
        self.graph[a].append(b)


def doSymetry(words: list[str], order: str) -> list[str, str]:
    mygame = Game()
    if order != None:



    return words + words[::-1]


def countConnections(words: list[str]) -> list:
    connections = []
    letters = "".join(words)
    
    for letter in set(letters):
        contador = 0
        for word in words:
            if word.startswith(letter):
                contador += 1
        connections.append((contador, letter))
    
    connections.sort(key=lambda x: x[0]) 

    return connections

def doConnections(words: list[str], order_str: str = None) -> 'Game':
    myGame = Game()
    words_to_process = words[:]
    
    if order_str:
        instrucciones = re.findall(r'(\d+)([a-zA-Z])', order_str)
        
        for num_str, letra in instrucciones:
            idx = int(num_str) - 1 
            letra = letra.lower()    
            
            if idx < len(words):
                palabra = words[idx]
                if letra in palabra:
                    if letra not in myGame.graph:
                        myGame.add_node(letra)
                    
                    connectWord(letra, palabra, myGame)
                    if palabra in words_to_process:
                        words_to_process.remove(palabra)

    order = countConnections(words_to_process)
    order.sort(reverse=True)

    for contador, letra in order:
        if letra not in myGame.graph:
            myGame.add_node(letra)
            
            for word in words_to_process[:]: 
                if letra in word:
                    connectWord(letra, word, myGame)
                    words_to_process.remove(word)
                    
    return myGame

def connectWord(letter, word, game) -> None:
    n = len(word)
    positions = [i for i, l in enumerate(word) if l == letter]    
    if not positions: return

    skip_index = min(positions, key=lambda i: min(i, n - 1 - i))

    for i, l in enumerate(word):
        if i != skip_index and l not in game.graph:
            game.add_node(l)

    for i in range(n - 1):
        game.add_edge(word[i], word[i + 1])

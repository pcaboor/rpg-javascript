start the server 

```
python -m SimpleHTTPServer
```

or

```
python3 -m SimpleHTTPServer
```

or 

```
python3 -m http.server 8080
```


```
npm install -g serve
```

pierrecaboor@MacBook-Air-de-pierre rpg-javascript % serve               

   ┌────────────────────────────────────────┐
   │                                        │
   │   Serving!                             │
   │                                        │
   │   - Local:    http://localhost:3000    │
   │   - Network:  http://10.10.4.98:3000   │
   │                                        │
   │   Copied local address to clipboard!   │
   │                                        │
   └────────────────────────────────────────┘


```js
class Overworld {
    constructor(config) {
        this.element = config.element // <--- block principal du jeux
        this.canvas = this.element.querySelector(".game-canvas") // <--- dans quelle div on va afficher les graphismes du jeux
        this.ctx = this.canvas.getContext("2d") // <--- Type du jeux 2d 3d, comment sont les éléments graphics, ici on utilise des images
    }

    init() {
        console.log("init", this)
    }
}
```


```js
 init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        };
        image.src = "/images/maps/DemoLower.png"; // <--- Fond principal du jeu
    }
```


```js
  init() {
        // const image = new Image();
        // image.onload = () => {
        //     this.ctx.drawImage(image, 0, 0)
        // };
        // image.src = "/images/maps/DemoLower.png";

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(hero, 0, 0)
        };
        hero.src = "/images/characters/people/hero.png";
    }
```
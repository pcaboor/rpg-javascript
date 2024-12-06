class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    starGameLoop() {
        const step = () => {

            // --- Clear Canvas ---
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // <--- Clear Blur effect

            // --- Draw Lower Image ---

            this.map.drawLowerImage(this.ctx);

            // --- Draw Object ---

            Object.values(this.map.gameObjects).forEach(object => {
                object.x += 0.5;
                object.sprite.draw(this.ctx);
            })

            // --- Draw Upper Image ---

            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {

        this.map = new OverworldMap(window.OverworldMap.DemoRoom); // <--- Commencer par cette map "Demo Room"

        // --- Start Game Loop ----

        this.starGameLoop();


    }
}
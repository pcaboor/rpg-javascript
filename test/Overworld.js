class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // --- Clear Canvas ---
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // <--- Clear Blur effect

            // --- Player Camera ---

            const cameraPlayer = this.map.gameObjects.hero;

            // --- Update all objects ---

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map
                })
                // object.sprite.draw(this.ctx, cameraPlayer);
            })

            // --- Draw Lower Image ---

            this.map.drawLowerImage(this.ctx, cameraPlayer);

            // --- Draw Object ---

            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y; // <--- Sort par position y croissante
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPlayer);
            })

            // --- Draw Upper Image ---

            this.map.drawUpperImage(this.ctx, cameraPlayer);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {

        this.map = new OverworldMap(window.OverworldMap.DemoRoom); // <--- Commencer par cette map "Demo Room"
        this.map.mountObjects();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        // --- Start Game Loop ----

        this.startGameLoop();

        this.map.startCutscene([
            { type: "move", direction: "up", who: "hero", time: 500 },
            { type: "move", direction: "right", who: "hero", time: 500 },
            { type: "move", direction: "down", who: "hero", time: 500 },
            { type: "move", direction: "left", who: "hero", time: 500 },
        ]);
    }
}
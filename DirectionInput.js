class DirectionInput {
    constructor() {
        this.helpDirections = [];

        // --- Directions ---
        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right"
        }
    }

    get direction() { // <--- Accéder à la direction actuelle du personnage, facilement.
        return this.helpDirections[0];
    }
    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.helpDirections.indexOf(dir) === -1) {
                this.helpDirections.unshift(dir);
            }
        });
        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.helpDirections.indexOf(dir);
            if (index > -1) {
                this.helpDirections.splice(index, 1);
            }
        })

    }
}
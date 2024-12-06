// Sprite : All elements like player / PNJ / Props 

class Sprite {
    constructor(config) {

        // --- Setup up image ---

        /* Charger le joueur */

        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true; // <--- Image du player ready pour le world
        }

        // --- Shadow preset ---

        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isLoadedShadow = true;
        }

        this.useShadow = true;

        // ---------------------

        // Animation configuration
        this.animations = config.animations || {
            idleDown: [
                [0, 0]
            ],

        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        this.gameObject = config.gameObject;
    }
    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        // this.isLoadedShadow && ctx.drawImage(this.shadow, x, y); <------- Show shadow on screen

        this.isLoaded && ctx.drawImage(this.image,
            0, 0,
            32, 32,
            x, y,
            32, 32
        )
    }
}
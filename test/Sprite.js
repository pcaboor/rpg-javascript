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

        this.width = config.width || 1; // Par défaut 1 cellule
        this.height = config.height || 1; // Par défaut 1 cellule

        // --- Animation configuration ---

        this.animations = config.animations || {
            "idle-down": [[0, 0]],
            "idle-right": [[0, 1]],
            "idle-up": [[0, 2]],
            "idle-left": [[0, 3]],
            "walk-down": [[1, 0], [0, 0], [2, 0], [0, 0]],
            "walk-right": [[1, 1], [0, 1], [2, 1], [0, 1]],
            "walk-up": [[1, 2], [0, 2], [2, 2], [0, 2]],
            "walk-left": [[1, 3], [0, 3], [2, 3], [0, 3]]
        }
        this.currentAnimation = "idle-right"; // config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8; // <--- Nombre de frames entre les mouvements
        this.animationFrameProgress = config.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }


    }
    draw(ctx, cameraPerson) {
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);


        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(
            this.image,
            frameX * 32, frameY * 32,
            32 * this.width, 32 * this.height, // Taille adaptée
            x, y,
            32 * this.width, 32 * this.height // Taille affichée
        );


        this.updateAnimationProgress();
    }

}
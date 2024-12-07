class Person extends GameObject {
    constructor(config) {
        super(config); // <--- hériter de GameObject | Récupérer les props de GameObject comme x, y et sprite
        this.movingProgressRemaining = 0; // <--- Un mouvement sur la map déplacement progressif au lieu de de faire d'un point A à un point B
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.directionUpdate = {
            "down": ["y", 1], // "down" augmente y de 1 pixel.
            "up": ["y", -1], // "up" diminue y de 1 pixel.
            "left": ["x", -1], // "left" diminue y de 1 pixel.
            "right": ["x", 1] // "right" augmente y de 1 pixel.
        }
    }

    /* Créer un object : 
     Cela rend le code plus modulaire et facile à maintenir.
     Si de nouvelles directions ou mécaniques de mouvement sont ajoutées, il suffit de modifier ou d'étendre cet objet.
     */

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            //More cases for starting to walk will come here
            //
            //

            //Case: We're keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        //Set character direction to whatever behavior has
        this.direction = behavior.direction;

        if (behavior.type === "walk") {

            //Stop here if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }

            //Ready to walk!
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
        }
    }


    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }
}


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
        this.updatePosition();
        this.updateSprite(state);
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }


    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state) {

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-" + this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
        }
    }
}


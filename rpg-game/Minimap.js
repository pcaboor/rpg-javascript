class MiniMap {
    constructor(config) {
        // Créer un conteneur pour la minimap
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.bottom = '20px';
        this.container.style.right = '20px';
        this.container.style.width = '400px';
        this.container.style.height = '850px';

        this.container.style.overflow = 'hidden';
        this.container.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

        // Canvas principal
        this.canvas = document.createElement('canvas');
        this.canvas.width = 400;  // Plus grand que le conteneur pour permettre le déplacement
        this.canvas.height = 400;
        this.canvas.style.position = 'absolute';


        // Masque circulaire
        this.mask = document.createElement('div');
        this.mask.style.position = 'absolute';
        this.mask.style.width = '200px';
        this.mask.style.height = '200px';


        this.mask.style.pointerEvents = 'none';

        // Contexte de dessin
        this.ctx = this.canvas.getContext('2d');

        // Paramètres de configuration
        this.map = null;
        this.scale = config.scale || 0.2;
        this.radius = 100;  // Rayon de la minimap
    }

    mount(parentElement) {
        this.container.appendChild(this.canvas);
        this.container.appendChild(this.mask);
        parentElement.appendChild(this.container);
    }

    // Méthode pour centrer la minimap sur le héros
    centerOnHero(hero) {
        const heroX = hero.x * this.scale;
        const heroY = hero.y * this.scale;

        // Calculer le décalage pour centrer le héros
        const offsetX = this.radius - heroX;
        const offsetY = this.radius - heroY;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessiner le fond de la map avec le décalage
        if (this.map.lowerImage) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.drawImage(
                this.map.lowerImage,
                offsetX,
                offsetY,
                this.map.lowerImage.width * this.scale,
                this.map.lowerImage.height * this.scale
            );
            this.ctx.globalAlpha = 1;
        }

        // Dessiner les objets du jeu
        this.drawGameObjects(offsetX, offsetY);
    }

    // Dessiner les objets du jeu sur la minimap
    drawGameObjects(offsetX, offsetY) {
        const objects = this.map.gameObjects;

        Object.values(objects).forEach(object => {
            const x = object.x * this.scale + offsetX;
            const y = object.y * this.scale + offsetY;

            // Couleur différente pour le héros
            this.ctx.fillStyle = object.isPlayerControlled ? 'red' : 'blue';

            // Dessiner un point pour chaque objet
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    // Mettre à jour la minimap
    update(newMap, hero) {
        if (newMap && newMap !== this.map) {
            this.map = newMap;
        }

        if (hero) {
            this.centerOnHero(hero);
        }
    }
}
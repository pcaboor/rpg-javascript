class MiniMap {
    constructor(config) {
        // Élément canvas pour la minimap
        this.canvas = document.createElement('canvas');
        this.canvas.width = config.width || 200;
        this.canvas.height = config.height || 200;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '14px';
        this.canvas.style.right = '14px';
        this.canvas.style.zIndex = '100';
        this.canvas.style.border = '2px solid black';

        this.canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        // Contexte de dessin
        this.ctx = this.canvas.getContext('2d');

        // Référence à la carte du monde
        this.map = config.map;

        // Facteur de réduction pour la minimap
        this.scale = config.scale || 0.2;
    }

    // Méthode pour ajouter la minimap au DOM
    mount(parentElement) {
        parentElement.appendChild(this.canvas);
    }

    // Dessiner la minimap
    draw() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Vérifier si une map existe
        if (!this.map) return;

        // Dessiner le fond de la map
        if (this.map.lowerImage) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.drawImage(
                this.map.lowerImage,
                0, 0,
                this.map.lowerImage.width * this.scale,
                this.map.lowerImage.height * this.scale
            );
            this.ctx.globalAlpha = 1;
        }

        // Dessiner les objets du jeu
        this.drawGameObjects();
    }

    // Dessiner les objets du jeu sur la minimap
    drawGameObjects() {
        const objects = this.map.gameObjects;

        Object.values(objects).forEach(object => {
            const x = object.x * this.scale;
            const y = object.y * this.scale;

            // Couleur différente pour le héros
            this.ctx.fillStyle = object.isPlayerControlled ? 'red' : 'blue';

            // Dessiner un point pour chaque objet
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    // Mettre à jour la minimap
    update() {
        this.draw();
    }
}
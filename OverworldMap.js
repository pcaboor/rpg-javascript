class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }
}

// --- List of maps in world ---

window.OverworldMap = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            // npc1: new Person({
            //     x: utils.withGrid(7),
            //     y: utils.withGrid(9),
            //     src: "/images/enemies/Skeleton.png"
            // })
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            player: new GameObject({
                x: 3,
                y: 1

            }),
            npcA: new GameObject({
                x: 9,
                y: 2,
                src: "/images/characters/people/hero.png"
            }),
            npcB: new GameObject({
                x: 9,
                y: 2,
                src: "/images/enemies/Slime.png"
            })
        }
    },

}
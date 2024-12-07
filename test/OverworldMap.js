class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        this.isCutscenePlaying = true;

    }

    drawLowerImage(ctx, cameraPlayer) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPlayer.x,
            utils.withGrid(6) - cameraPlayer.y
        )
    }

    drawUpperImage(ctx, cameraPlayer) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10, 5) - cameraPlayer.x,
            utils.withGrid(6) - cameraPlayer.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;
            //TODO: determine if this object should actually mount
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
    }
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}


// --- List of maps in world ---

window.OverworldMap = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/enemies/Skeleton.png"
            }),
            npc2: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "/images/characters/people/npc3.png ",
                behaviorLoop: [
                    { type: "walk", direction: "left" },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "down" },
                ]
            })
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true, // <---- [] = clé dynamique
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(0, 7)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 9)]: true,

        }
    },
    Dungeon: {
        lowerSrc: "images/maps/Dungeon_Tileset 2 (1).png",
        upperSrc: "",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/enemies/Skeleton.png"
            })
        }
    },

}
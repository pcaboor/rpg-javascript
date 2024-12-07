class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || 'down';
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/player/Player.png"
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }
    mount(map) {
        console.log("mounting!")
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // Si on a un behavior, arréter apres un certain delai

        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {

        // --- Stop the game if a cutscene is playing or there's no more behavior to process ---

        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
        }

        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({ map, event: eventConfig }); // <--- event dans le monde
        await eventHandler.init(); // <--- Tout ce qui est en dessous de ce code ne s'executera que si ce code est fini

        // --- Settings the next event to fire ---

        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        // repeat event 

        this.doBehaviorEvent(map);
    }
}
class Hud {
    constructor() {
        this.scoreboard = [];
    }

    update() {
        this.scoreboard.forEach(s => {
            s.update(window.playerState.monster[s.id]);
        })
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Hud");

        const { playerState } = window;
        playerState.lineup.forEach(key => {
            const monster = playerState.monster[key];
            const scoreboard = new Combatant({
                id: key,
                ...Pizzas[monster.monsterId],
                ...monster,
            }, null)
            scoreboard.createElement();
            this.scoreboard.push(scoreboard);
            this.element.appendChild(scoreboard.hudElement);
        })
        this.update();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        document.addEventListener("PlayerStateUpdated", () => {
            this.update();
        })
    }
}
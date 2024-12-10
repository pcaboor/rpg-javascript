class Combatant {
    constructor(config, battle) {
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        })
        this.hp = typeof (this.hp) === 'undefined' ? this.maxHp : this.hp;
        this.battle = battle;
    }

    get hpPercent() {
        const percent = this.hp / this.maxHp * 100;
        return percent > 0 ? percent : 0;
    }

    get xpPercent() {
        return this.xp / this.maxXp * 100;
    }

    get isActive() {
        return this.battle?.activeCombatants[this.team] === this.id;
    }

    get givesXp() {
        return this.level * 20;
    }

    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);
        this.hudElement.innerHTML = (`
          <p class="Combatant_name">${this.name}</p>
          <p class="Combatant_level"></p>
          <div class="Combatant_character_crop">
            <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
          </div>
          <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
          <svg viewBox="0 0 26 3" class="Combatant_life-container">
            <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
            <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
          </svg>
          <svg viewBox="0 0 26 2" class="Combatant_xp-container">
            <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
            <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
          </svg>
          <p class="Combatant_status"></p>
        `);

        this.pizzaElement = document.createElement("img");
        this.pizzaElement.classList.add("Pizza");
        this.pizzaElement.setAttribute("src", this.src);
        this.pizzaElement.setAttribute("alt", this.name);
        this.pizzaElement.setAttribute("data-team", this.team);

        this.hpFills = this.hudElement.querySelectorAll('.Combatant_life-container > rect');
        this.xpFills = this.hudElement.querySelectorAll('.Combatant_xp-container > rect');

    }

    update(changes = {}) {
        Object.keys(changes).forEach(key => {
            this[key] = changes[key]
        });

        // Update active
        this.hudElement.setAttribute("data-active", this.isActive);
        this.pizzaElement.setAttribute("data-active", this.isActive);


        // Update life and xp
        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`)
        this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`)

        // Update level
        this.hudElement.querySelector(".Combatant_level").innerText = "lv" + this.level;

        // Update status
        const statuElement = this.hudElement.querySelector(".Combatant_status");
        if (this.status) {
            statuElement.innerText = this.status.type;
            statuElement.style.display = "block";

        } else {
            statuElement.innerText = "";
            statuElement.style.display = "none";
        }
    }

    getReplacedEvents(originalEvents) {
        if (this.status?.type === "clumsy" && utils.randomFromArray([true, false, false])) {
            return [
                { type: "textMessage", text: `${this.name} flop over !` },
                // { type: "stateChange", recover: 20, onCaster: true } // <--- heal de 20 hp
            ]
        }
        return originalEvents;

    }

    getPostsEvents() {

        // SI le status et saucy alors heal de 5 hp
        if (this.status?.type === "saucy") {
            return [
                { type: "textMessage", text: "Feelin saucy!" },
                { type: "stateChange", recover: 20, onCaster: true, expiresIn: 1 } // <--- heal de 20 hp
            ]
        }
        return [];
    }

    decrementStatus() {
        if (this.status?.expiresIn > 0) {
            this.status.expiresIn -= 1;
            if (this.status.expiresIn === 0) {
                this.update({
                    status: null
                })
                return {
                    type: "textMessage",
                    text: "Your sauce has worn off!"
                }
            }

        }
        return null;
    }

    init(container) {
        this.createElement();
        container.appendChild(this.hudElement)
        container.appendChild(this.pizzaElement)
        this.update();
    }
}
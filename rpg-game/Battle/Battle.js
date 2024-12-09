class Battle {
    constructor({ enemy, onComplete }) {

        this.enemy = enemy;
        this.onComplete = onComplete;

        this.combatants = {
            // "player1": new Combatant({
            //     ...Pizzas.s001,
            //     team: "player",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 50,
            //     maxXp: 100,
            //     level: 1,
            //     status: null,
            //     isPlayerControlled: true,
            // }, this),
            // "player2": new Combatant({
            //     ...Pizzas.s002,
            //     team: "player",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 0,
            //     maxXp: 100,
            //     level: 1,
            //     status: null,
            //     isPlayerControlled: true,
            // }, this),
            // "enemy1": new Combatant({
            //     ...Pizzas.v001,
            //     team: "enemy",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 0,
            //     maxXp: 100,
            //     level: 1,
            // }, this),
            // "enemy2": new Combatant({
            //     ...Pizzas.f001,
            //     team: "enemy",
            //     hp: 25,
            //     maxHp: 50,
            //     xp: 30,
            //     maxXp: 100,
            //     level: 1,
            // }, this),
            // "enemy3": new Combatant({
            //     ...Pizzas.f001,
            //     team: "enemy",
            //     hp: 25,
            //     maxHp: 50,
            //     xp: 30,
            //     maxXp: 100,
            //     level: 1,
            // }, this)
        }

        this.activeCombatants = {
            player: null,
            enemy: null,
        }

        // Team player
        window.playerState.lineup.forEach(id => {
            this.addCombatants(id, "player", window.playerState.monster[id]);
        })

        // Enemy player 

        Object.keys(this.enemy.monsters).forEach(key => {
            this.addCombatants("e_" + key, "enemy", this.enemy.monsters[key]);
        })

        // Inventory items
        this.items = []

        window.playerState.items.forEach(item => {
            this.items.push({
                ...item,
                team: "player"
            })
        })
        this.usedInstanceIds = {

        }
    }

    addCombatants(id, team, config) {
        this.combatants[id] = new Combatant({
            ...Pizzas[config.monsterId],
            ...config,
            team: team,
            isPlayerControlled: team === "player"
        }, this)

        this.activeCombatants[team] = this.activeCombatants[team] || id
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
      <div class="Battle_hero">
        <img src="${'/images/characters/people/wizzard_m_run_anim_f1.png'}" alt="Hero" />
      </div>
      <div class="Battle_enemy">
        <img src=${this.enemy.src} alt="${this.enemy.name}" />
      </div>
      `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        this.playerTeam = new Team("player", "hero")
        this.enemyTeam = new Team("enemy", "Bully")

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)

            if (combatant.team === "player") {
                this.playerTeam.combatants.push(combatant);
            } else if (combatant.team === "enemy") {
                this.enemyTeam.combatants.push(combatant);
            }
        })

        this.playerTeam.init(this.element);
        this.enemyTeam.init(this.element);

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve);
                })
            },
            onWinner: winner => {

                if (winner === "player") {
                    const playerState = window.playerState;
                    Object.keys(playerState.monster).forEach(id => {
                        const playerStateMonster = playerState.monster[id];
                        const combatant = this.combatants[id];
                        if (combatant) {
                            playerStateMonster.hp = combatant.hp;
                            playerStateMonster.xp = combatant.xp;
                            playerStateMonster.level = combatant.level;
                            playerStateMonster.maxXp = combatant.maxXp;
                        }
                    })

                    playerState.items = playerState.items.filter(item => {
                        return !this.usedInstanceIds[item.instanceId]
                    })

                    // Update HUD
                    utils.emitEvent("PlayerStateUpdated");
                }

                this.element.remove();
                this.onComplete();
            }
        })
        this.turnCycle.init();

    }

}
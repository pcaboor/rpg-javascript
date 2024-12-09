class AIDecision {
    constructor(caster, enemy, items) {
        // Lanceur
        this.caster = caster;

        // Player
        this.enemy = enemy;

        // Items 
        this.items = items || [];

        // Track heal usage to prevent spam
        this.healUsageCount = 0;
        this.MAX_HEAL_USES = 2; // Limit heal attempts per battle
    }

    priorities() {
        return [
            {
                condition: () =>
                    this.caster.hp > 0 &&
                    this.caster.hp < this.caster.maxHp * 0.2 &&
                    this.healUsageCount < this.MAX_HEAL_USES,
                action: () => this.findHealAction()
            },
        ];
    }

    findHealAction() {
        // Prioritize items first
        const healItems = this.items.filter(item =>
            item.team === this.caster.team &&
            (item.actionId === "item_recoverHp")
        );

        if (healItems.length > 0) {
            const randomItem = healItems[Math.floor(Math.random() * healItems.length)];
            this.healUsageCount++;
            return Actions[randomItem.actionId];
        }

        // If no items, try spell-based healing
        const healActions = this.caster.actions.filter(key =>
            Actions[key]?.targetType === "friendly" &&
            (Actions[key].name.includes("recover") || Actions[key].name.includes("Potion"))
        );

        console.log(healActions)

        if (healActions.length > 0) {
            this.healUsageCount++;
            return Actions[healActions[Math.floor(Math.random() * healActions.length)]];
        }

        console.warn(`No healing actions found for ${this.caster.name}`);
        return null;
    }


    decideAction() {
        for (let priority of this.priorities()) {
            if (priority.condition()) {
                const action = priority.action();

                if (action) {
                    console.log(`AI chose ${action.name} for ${this.caster.name}`);
                    return action;
                }
            }
        }

        // Absolute fallback
        return Actions[this.caster.actions[0]];
    }
}
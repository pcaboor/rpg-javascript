class SubmissionMenu {
    constructor({ caster, enemy, onComplete, items, replacements }) {
        this.caster = caster;
        this.enemy = enemy;
        this.replacements = replacements;
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach(item => {
            if (item.team === caster.team) {
                let existing = quantityMap[item.actionId];
                if (existing) {
                    existing.quantity += 1;
                } else {
                    quantityMap[item.actionId] = {
                        actionId: item.actionId,
                        quantity: 1,
                        instanceId: item.instanceId,
                    }
                }
            }
        })
        this.items = Object.values(quantityMap);
    }

    getPages() {

        const backOption = {
            label: "Back",
            description: "Go back to the previous menu",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root);
            },
        }

        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().attacks);
                    },
                    // right: () => {
                    //     return "Something"
                    // }
                }, {
                    label: "Items",
                    description: "Choose an item",
                    // disabled: true,
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().items);
                    }
                }, {
                    label: "Swap",
                    description: "Change to another combatant",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().replacements);
                    }
                },
            ],
            attacks: [
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action)
                        }
                    }
                }),
                backOption
            ],
            items: [
                ...this.items.map(item => {
                    const action = Actions[item.actionId];
                    return {
                        label: action.name,
                        description: action.description,
                        right: () => {
                            return "x" + item.quantity
                        },
                        handler: () => {
                            this.menuSubmit(action, item.instanceId)
                        }
                    }
                }),
                backOption
            ], replacements: [
                ...this.replacements.map(replacement => {
                    return {
                        label: replacement.name,
                        description: replacement.description,
                        handler: () => {
                            this.menuSubmitReplacement(replacement)
                        }
                    }
                }),
                backOption
            ]
        }
    }

    menuSubmitReplacement(replacement) {
        this.keyboardMenu?.end();
        this.onComplete({
            replacement
        })

    }

    menuSubmit(action, instanceId = null) {

        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy,
            instanceId
        })
    }

    // --- Que va faire l'ia ---
    decide() {
        // const aiDecision = new AIDecision(this.caster, this.enemy);

        // console.log(aiDecision)

        // const chosenAction = aiDecision.decideAction();

        // console.log(chosenAction)

        // if (chosenAction) {
        //     this.menuSubmit(chosenAction);
        // } else {
        //     // Fallback to the first action if something goes wrong
        //   
        // }
        this.menuSubmit(Actions[this.caster.actions[0]]);

    }
    showMenu(container) {
        this.keyboardMenu = new keyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root)
    }


    init(container) {

        if (this.caster.isPlayerControlled) {
            this.showMenu(container);
        } else {
            this.decide()
        }

    }
}
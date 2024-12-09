window.Actions = {

    // -- Attack effects ---

    damage1: {
        name: "Whomp!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 10 }
        ]
    },

    creamy: {
        name: "La creme de Gab",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "glob" },
            { type: "stateChange", damage: 30 }
        ]
    },

    finishHim: {
        name: "Finish him!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "glob" },
            { type: "stateChange", damage: 100 },
            { type: "textMessage", text: "Dans la chatte a ta mere" },
        ]
    },

    // -- Heal effects ---
    saucyStatus: {
        name: "Tomato Squeeze!",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            // { type: "animation", animation: "spin" },
            { type: "stateChange", status: { type: "saucy" }, expiresIn: 1 } // <-- number round effect
        ]
    },
    clumsyStatus: {
        name: "Olive Oil!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "glob", color: "#dafd2a" },
            { type: "stateChange", status: { type: "clumsy" }, expiresIn: 3 },
            { type: "textMessage", text: "{TARGET} take damage!" },
        ]
    },

    // --- Items --- 

    item_recoverStatus: {
        name: "Heating Lamp",
        description: "Feeling fresh and warm",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "stateChange", status: null },
            { type: "textMessage", text: "Healing up!" },
        ]
    },

    item_recoverHp: {
        name: "Little Potion",
        description: "Feeling fresh and warm",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "stateChange", recover: 10 },
            { type: "textMessage", text: "{CASTER} recovers HP!" },
        ]
    }
}
window.PizzaTypes = {
    normal: "normal",
    spicy: "spicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill",
}

window.Pizzas = {
    "s001": {
        name: "Monster",
        type: PizzaTypes.spicy,
        src: "/images/characters/pizzas/s001.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1", "finishHim", "creamy"]
    },
    "s002": {
        name: "Monster 2",
        type: PizzaTypes.spicy,
        description: "Petite tana",
        src: "/images/characters/pizzas/v001.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1", "finishHim", "creamy"]
    },
    "s003": {
        name: "Monster 3",
        type: PizzaTypes.spicy,
        description: "Petite tana",
        src: "/images/characters/pizzas/f003.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1", "finishHim", "creamy"]
    },
    "s004": {
        name: "Monster 4",
        type: PizzaTypes.spicy,
        description: "Petite tana",
        src: "/images/characters/pizzas/c001.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1", "finishHim", "creamy"]
    },
    "v001": {
        name: "Call me Kale",
        type: PizzaTypes.veggie,
        src: "/images/characters/pizzas/v001.png",
        icon: "/images/icons/veggie.png",
        actions: ["damage1", "saucyStatus", "clumsyStatus", "item_recoverHp"]
    },
    "f001": {
        name: "Portobello Express",
        type: PizzaTypes.fungi,
        src: "/images/characters/pizzas/f001.png",
        icon: "/images/icons/fungi.png",
        actions: ["damage1"]
    },

}


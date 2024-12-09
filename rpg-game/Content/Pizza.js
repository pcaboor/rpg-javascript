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
        src: "/images/creatures/monster/monster.gif",
        icon: "/images/icons/spicy.png",
        actions: ["clumsyStatus", "damage1"]
    },
    "v001": {
        name: "Call me Kale",
        type: PizzaTypes.veggie,
        src: "/images/creatures/monster/monster2.gif",
        icon: "/images/icons/veggie.png",
        actions: ["damage1"]
    },
    "f001": {
        name: "Portobello Express",
        type: PizzaTypes.fungi,
        src: "/images/characters/pizzas/f001.png",
        icon: "/images/icons/fungi.png",
        actions: ["damage1"]
    },

}


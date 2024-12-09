window.BattleAnimations = {
    async spin(event, onComplete) {
        const element = event.caster.pizzaElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        element.classList.add(animationClassName);

        //Remove class when animation is fully complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, { once: true });

        //Continue battle cycle right around when the pizzas collide
        await utils.wait(100);
        onComplete();
    },

    // Le DOM est une représentation en mémoire d'une page web.
    // Example: 
    //     html
    // ├── head
    // │   └── title
    // └── body
    //     ├── h1
    //     └── p


    async glob(event, onComplete) {
        const { caster } = event;
        let div = document.createElement("div");
        div.classList.add("glob-orb");
        div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

        div.innerHTML = (`
            <svg viewbox="0 0 32 32" width"32" height="32">
                <img src="/images/spells/flask_big_red.png" />
            </svg>
        `);

        div.addEventListener("animationend", () => {
            div.remove();
        });

        document.querySelector(".Battle").appendChild(div);

        await utils.wait(820);
        onComplete();
    }
}
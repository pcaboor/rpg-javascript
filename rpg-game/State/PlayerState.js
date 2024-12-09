class PlayerState {
    constructor() {
        this.monster = {
            "p1": {
                monsterId: "s001",
                hp: 50,
                level: 1,
                maxHp: 50,
                xp: 10,
                maxXp: 100,
                status: null,

            },
            "p2": {
                monsterId: "s002",
                hp: 50,
                level: 1,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                status: null,

            },
            "p3": {
                monsterId: "s003",
                hp: 50,
                level: 1,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                status: null,

            },
            "p4": {
                monsterId: "s004",
                hp: 50,
                level: 1,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                status: null,

            }
        }
        this.lineup = ["p1", "p2", "p3", "p4"];
        this.items = [
            { actionId: "item_recoverHp", instanceId: "item1" },
            { actionId: "item_recoverHp", instanceId: "item2" },
            { actionId: "item_recoverHp", instanceId: "item3" },
        ];
    }
}

window.playerState = new PlayerState();
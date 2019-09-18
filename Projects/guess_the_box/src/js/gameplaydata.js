
export default {
    GameTime : 60,
    HitPoint : 3,
    VoucherHitPoint : 10,

    Phases:[
        {
            MaxEnemy : 1,
            MaxTotalHit : 10,
            MaxTime : 10, 
            ShowChance : 100, //percentage 100%
            MinCheckTime : 1, //second
            MaxCheckTime : 1, //second
        },
        {
            MaxEnemy : 2,
            MaxTotalHit : 10,
            MaxTime : 10,
            ShowChance : 80,
            MinCheckTime : 0.5, 
            MaxCheckTime : 0.8,
        },
        {
            MaxEnemy : 3,
            MaxTotalHit : 20,
            MaxTime : 15,
            ShowChance : 80,
            MinCheckTime : 0.5,
            MaxCheckTime : 0.8,
        },
        {
            MaxEnemy : 4,
            MaxTotalHit : 25,
            MaxTime : 15,
            ShowChance : 50,
            MinCheckTime : 0.2,
            MaxCheckTime : 0.6,
        },
        {
            MaxEnemy : 4,
            MaxTotalHit : 30,
            MaxTime : 20,
            ShowChance : 65,
            MinCheckTime : 0.2,
            MaxCheckTime : 0.6,
        },
        {
            MaxEnemy : 4,
            MaxTotalHit : 40,
            MaxTime : 20,
            ShowChance : 80,
            MinCheckTime : 0.2,
            MaxCheckTime : 0.6,
        },
    ],

};

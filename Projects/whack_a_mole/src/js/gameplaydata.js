
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
            MaxTotalHit : 20,
            MaxTime : 25,
            ShowChance : 80,
            MinCheckTime : 0.5, 
            MaxCheckTime : 1,
        },
        {
            MaxEnemy : 3,
            MaxTotalHit : 40,
            MaxTime : 40,
            ShowChance : 50,
            MinCheckTime : 0.2,
            MaxCheckTime : 0.6,
        },
    ],

};

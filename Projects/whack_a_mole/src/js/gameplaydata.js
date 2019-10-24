
export default {
    GameTime : 60,
    ScorePoint :1,
    VoucherWinPoint : 1,
    MaxTargetPooled : 4,

    Phases:[
        {
            MaxTarget : 1,
            MaxTotalHit : 10,
            MaxTime : 10, 
            ShowChance : 100, //percentage 100%
            MinShowTime : 1, //second
            MaxShowTime : 1, //second
        },
        {
            MaxTarget : 2,
            MaxTotalHit : 10,
            MaxTime : 20,
            ShowChance : 50,
            MinShowTime : 0.5, 
            MaxShowTime : 1,
        },
        {
            MaxTarget : 3,
            MaxTotalHit : 20,
            MaxTime : 35,
            ShowChance : 55,
            MinShowTime : 0.5,
            MaxShowTime : 1,
        },
        {
            MaxTarget : 4,
            MaxTotalHit : 25,
            MaxTime : 50,
            ShowChance : 50,
            MinShowTime : 0.5,
            MaxShowTime : 1,
        },
        {
            MaxTarget : 4,
            MaxTotalHit : 30,
            MaxTime : 70,
            ShowChance : 65,
            MinShowTime : 0.2,
            MaxShowTime : 0.8,
        },
        {
            MaxTarget : 4,
            MaxTotalHit : 40,
            MaxTime : 90,
            ShowChance : 65,
            MinShowTime : 0.2,
            MaxShowTime : 0.8,
        },
    ],

};

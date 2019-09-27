
export default {
    GameTime : 90,
    TargetPoint : 20,

    waitDurationPerMove : 1500,

    FastMoveDuration : 400,
    SlowMoveDuration : 800,

    Phases : [
        {
            ScorePoint : 1,
            ChainMoveTarget : 2,
            MaxRotation : 2,
            SpeedAlpha : 0, // alpha value between SlowMoveDuration and FastMoveDuration 0-1 / percentage
        },
        {
            ScorePoint : 2,
            ChainMoveTarget : 4,
            MaxRotation : 3,
            SpeedAlpha : 0.2,
        },
        {
            ScorePoint : 3,
            ChainMoveTarget : 6,
            MaxRotation : 4,
            SpeedAlpha : 0.6, 
        },
        {
            ScorePoint : 4,
            ChainMoveTarget : 8,
            MaxRotation : 5,
            SpeedAlpha : 0.8, 
        },
    ]
};

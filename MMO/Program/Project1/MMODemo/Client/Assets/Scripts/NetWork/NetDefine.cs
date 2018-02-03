enum S2CProtocol
{
    S2C_Ping = 0,
    S2C_Waiting,                        // 排队中 ->1
    S2C_Login,                          //登录协议 ->2
    S2C_ReLogin,                        // 断线重连 ->3
    S2C_DayChanged,                     // 通知跨天 ->4
    S2C_Create,                         // 创建协议返回（第一次登录游戏，创建主角色 ->5
}
enum C2SProtocol
{
    C2S_Ping = 0,
    C2S_Waiting,                        // 排队中 ->1
    C2S_Login,                          // 登录协议 ->2
    C2S_ReLogin,                        // 断线重连 ->3
    C2S_DayChanged,                     // 通知跨天 -> 4
    C2S_Create,                         // 创建协议返回（第一次登录游戏，创建主角色 ->5
}

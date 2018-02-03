public enum eAssetType
{
    AT_gameobject,
    AT_map,
    AT_table,
    AT_audio,
}
public enum eGameInitStep
{
    Init_None = 0,
    Init_Language,
    Init_Update,
    Init_Cfg,
    Init_Movie,
    Init_Zero,
    Init_NtModul,
    Init_Wait,
    Init_SelServer,
    Init_EnterGame,
    Init_CheckPermission,
}
public enum eAccountType
{
    AT_Unknown = 0,
    AT_Internal,                    // 内部服务器1
}
public enum eEditionType
{
    ET_LAN,
    ET_TEST,
}
public enum eServerState
{
    Server_State_Good = 1,
    Server_State_Busy = 2,
    Server_State_Hot = 3,
    Server_State_New = 4,
    Server_State_Recommend = 5,
}
public enum eServerListStep
{
    s_none = 0,
    s_get_url,
    s_over,
    s_error,
}
public enum eLoginState
{
    l_none = 0,
    l_account_login,
    l_connect_server,
    l_game_login,
    l_faild,
}
public enum eHttpLoginResult
{
    none = 0,
    error_account,
    error_net,
    ok,
}

public enum ePropType
{
    Position = 0,
    Rotation,
    Scale
}
public enum eOperationPart
{
    OP_None = 0,
    OP_Adjustment,
    OP_BrowFigure,
    OP_Shape,
}
public enum eUMAPart
{
    UMA_None = 0,
    UMA_Face,               //脸
    UMA_Eyebrow,            //眉
    UMA_Eye,                //眼
    UMA_Nose,               //鼻子
    UMA_Mouth,              //嘴
    UMA_Hair,               //头发
}
public enum eUMAPlace
{
    UMA_None = 0,
    //脸
    UMA_Shull,              //前额1
    UMA_Cheek,              //苹果肌2
    UMA_Cheek2,             //脸颊3
    UMA_Cheekbone,          //髋骨4
    UMA_ChinAngle,          //下颚角5
    UMA_lowerjaw,           //下颚6
    UMA_Chin,               //下巴7
    UMA_Ears,               //耳朵8
    //眉
    UMA_Forehead,           //眉头9
    UMA_Brow,               //眉毛10
    UMA_Tailbrow,           //眉毛尾11
    //眼
    UMA_Eye,                //眼整体12
    UMA_Canthus,            //内眼角13
    UMA_Endeye,             //外眼角14
    UMA_UpEye,              //上眼皮15
    UMA_LowEye,             //下眼皮16
    //鼻子
    UMA_Nose,               //鼻整体17
    UMA_NoseUp,             //鼻梁18
    UMA_NasalNose,          //鼻基底19
    UMA_TipNose,            //鼻头20
    UMA_NoseWing,           //鼻翼21
    //嘴
    UMA_Mouth,              //嘴整体22
    UMA_UpMouth,            //上嘴皮23
    UMA_LowMouth,           //下嘴皮24
    UMA_LipMouth,           //嘴角25
}
public enum eJob
{
    j_jss,
    j_lssy,
    j_xxrz,
    j_dfgz
}
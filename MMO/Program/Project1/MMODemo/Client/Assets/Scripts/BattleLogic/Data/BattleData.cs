using System.Collections;
using System.Collections.Generic;
using UnityEngine;

struct AnimatorParams
{
    public static int baseLayer { get { return 0; } }
    //params
    static int _paramSkill = Animator.StringToHash("skill");
    public static int ParamSkill  { get { return _paramSkill; } }

    static int _paramMoveSpeed = Animator.StringToHash("movespeed");
    public static int ParamMoveSpeed { get { return _paramMoveSpeed; } }
}
public class ActorDesc
{
    /// <summary>
    /// 模型路径
    /// </summary>
    public string modelPath;
    /// <summary>
    /// 动画控制器路径
    /// </summary>
    public string animControllerPath;
}
/// <summary>
/// 人物描述
/// </summary>
public class PlayerActorDesc : ActorDesc
{
    
}
/// <summary>
/// 怪物描述
/// </summary>
public class MonsterActorDesc : ActorDesc
{

}
/// <summary>
/// 技能描述
/// </summary>
public class SkillDesc
{

}

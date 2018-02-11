using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Debuger;
/// <summary>
/// 战斗角色
/// </summary>
public class BattleActor : Actor
{
    /// <summary>
    /// 释放技能
    /// </summary>
    /// <param name="skillId"></param>
    public virtual void CastSkill(int skillId)
    {
        PlaySkillMotion(skillId);
    }
    /// <summary>
    /// 播放技能动作
    /// </summary>
    /// <param name="skillId"></param>
    protected virtual void PlaySkillMotion(int skillId)
    {
        animator.SetInteger(AnimatorParams.ParamSkill, skillId);
    }
}

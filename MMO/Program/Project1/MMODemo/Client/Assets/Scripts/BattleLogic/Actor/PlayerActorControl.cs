using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;

public class PlayerActorControl : XMonoSingleton<PlayerActorControl>
{
    BattleActorPlayer btPlayer;

    public void Cretate()
    {
        ActorDesc desc = new ActorDesc();
        desc.modelPath = "Models/Actor/guizu_nv_skin";
        desc.animControllerPath = "AnimControllers/Actor/guizu_nv";
        btPlayer = BattleActorMgr.Instance.CreatePlayer(desc);
        btPlayer.tag = "Player";
        btPlayer.transform.localPosition = Vector3.one * 20;
    }
    public void CastSkill(int skillId)
    {
        if (btPlayer != null) btPlayer.CastSkill(skillId);
    }
}

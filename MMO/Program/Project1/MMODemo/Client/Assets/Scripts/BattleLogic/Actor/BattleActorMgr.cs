using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;

public class BattleActorMgr : Singleton<BattleActorMgr>
{
    public BattleActorPlayer CreatePlayer(ActorDesc desc)
    {
        GameObject obj = new GameObject("查佳辉", typeof(BattleActorPlayer));
        BattleActorPlayer bap = obj.GetComponent<BattleActorPlayer>();
        bap.Create(desc);
        return bap;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameUpdate : MonoBehaviour
{
    GameStart mGameInit;
    public void checkUpdate(GameStart init)
    {
        mGameInit = init;
        gameObject.SetActive(true);
        mGameInit.ChangeStep(eGameInitStep.Init_NtModul);
    }
}

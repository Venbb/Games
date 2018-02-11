using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BattleStart : MonoBehaviour
{
    // Use this for initialization
    void Start()
    {
        PlayerActorControl.Instance.Cretate();
    }

    // Update is called once per frame
    void Update()
    {

    }
}

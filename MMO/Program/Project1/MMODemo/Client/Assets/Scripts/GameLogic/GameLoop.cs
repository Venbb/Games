using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameLoop : MonoBehaviour {
    void FixedUpdate()
    {
        GameClient.Instance.FixedUpdate();
    }
}

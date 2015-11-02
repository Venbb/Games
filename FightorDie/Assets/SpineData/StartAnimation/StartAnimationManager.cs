using UnityEngine;
using System.Collections;

public class StartAnimationManager : MonoBehaviour {
    private float timer = 2.5f;
	// Use this for initialization
	void Start () {
        this.GetComponent<SkeletonAnimation>().state.End += state_End;
	}
    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if (state.GetCurrent(trackIndex) + "" == "animation") {
            Application.LoadLevel("FightOrDie");
        }
    }
	// Update is called once per frame
	void Update () {
        timer -= Time.deltaTime;
        if (timer < 0) {
            Application.LoadLevel("FightOrDie");
        }
	}
}

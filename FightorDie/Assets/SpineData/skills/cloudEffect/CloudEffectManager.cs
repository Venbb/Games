using UnityEngine;
using System.Collections;

public class CloudEffectManager : MonoBehaviour {
    private SkeletonAnimation m_animation;
    private bool changeAniamtion = false;
    private float loopEndTime = 5f;
	// Use this for initialization
	void Start () {
        m_animation = this.gameObject.GetComponent<SkeletonAnimation>();
        m_animation.state.End += state_End;
	}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if (state.GetCurrent(trackIndex) + "" == "animation") {
            changeAniamtion = true;
        }
        if (state.GetCurrent(trackIndex) + "" == "animation3") {
            Destroy(this.gameObject);
        }
    }
	
	// Update is called once per frame
	void Update () {
        loopEndTime -= Time.deltaTime;
        if (loopEndTime <= 0) {
            m_animation.state.SetAnimation(3, "animation3", false);
            loopEndTime = 5f;
        }
        if (changeAniamtion) {
            m_animation.state.SetAnimation(2, "animation2", true);
            changeAniamtion = false;
        }
	}
}

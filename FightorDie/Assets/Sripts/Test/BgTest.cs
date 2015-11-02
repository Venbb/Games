using UnityEngine;
using System.Collections;

public class BgTest : MonoBehaviour {
    private SkeletonAnimation m_a;
	// Use this for initialization
	void Start () {
        m_a = this.GetComponent<SkeletonAnimation>();
        m_a.state.End += state_End;
	}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if (state.GetCurrent(trackIndex) + "" == "stay") {
            m_a.state.SetAnimation(1, "zoom_in", false);
        }
        if (state.GetCurrent(trackIndex) + "" == "zoom_in")
        {
            m_a.state.SetAnimation(2, "zoom_out", false);
        }
        if (state.GetCurrent(trackIndex) + "" == "zoom_out")
        {
            m_a.state.SetAnimation(3, "stay", false);
        }
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}

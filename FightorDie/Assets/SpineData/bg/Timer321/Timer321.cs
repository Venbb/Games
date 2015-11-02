using UnityEngine;
using System.Collections;

public class Timer321 : MonoBehaviour {
    //private SkeletonAnimation m_animation;
    //public float animationTime = 3.2f;
	// Use this for initialization
	void Start () {
        //m_animation = this.gameObject.GetComponent<SkeletonAnimation>();
        //m_animation.state.SetAnimation(1, "animation", false);
        //m_animation.state.End += state_End;
        
	}

    //void state_End(Spine.AnimationState state, int trackIndex)
    //{
    //    Destroy(this.gameObject);
    //}
	
	// Update is called once per frame
	void Update () {
        if (GameObject.Find("Hero").GetComponent<PlayerActions>().playerState == "dead") {
            Destroy(this.gameObject);
        }
	}

    //public void enableTimer321() {
    //    m_animation.enabled = true;
    //    //m_animation.state.SetAnimation(1, "animation", false);
    //}
}

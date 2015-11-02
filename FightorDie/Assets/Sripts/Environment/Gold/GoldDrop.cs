using UnityEngine;
using System.Collections;

public class GoldDrop : MonoBehaviour {

	// Use this for initialization
	void Start () {
        this.GetComponent<SkeletonAnimation>().state.End += state_End;
	}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        Destroy(this.gameObject);
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}

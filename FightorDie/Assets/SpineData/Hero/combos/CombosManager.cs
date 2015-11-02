using UnityEngine;
using System.Collections;

public class CombosManager : MonoBehaviour {
    private SkeletonAnimation m_animation;
	// Use this for initialization
	void Start () {
        m_animation = this.gameObject.GetComponent<SkeletonAnimation>();
        m_animation.enabled = false;
	}
	
	// Update is called once per frame
	void Update () {
	    
	}

    public void setAnimation(string m_name) {
        m_animation.enabled = true;
        m_animation.state.SetAnimation(1, m_name, false);
    }
}

using UnityEngine;
using System.Collections;

public class CrowMove : MonoBehaviour {
    private Transform m_transform;
    SkeletonAnimation m_animation;
    public Transform stone;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        m_animation = this.GetComponent<SkeletonAnimation>();
        m_animation.timeScale = Random.Range(0.8f, 1.2f);
        m_animation.state.Event += state_Event;
        m_animation.state.End += state_End;
	}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        Destroy(this.gameObject);
    }

    void state_Event(Spine.AnimationState state, int trackIndex, Spine.Event e)
    {
        if (e + "" == "launch")
        {
            Vector2 m_position = m_transform.position;
            if (m_position.y <= 0) {
                m_position.y += 0.8f;
            }
            Instantiate(stone, m_position, m_transform.rotation);
        }
    }
	
	// Update is called once per frame
	void Update () {
	    
	}


}

using UnityEngine;
using System.Collections;

public class ArcherManager : MonoBehaviour {
    public Transform m_archer;
    public Transform m_arrowStand;
    private SkeletonAnimation m_animation;
    GameObject playerObj;
    PlayerActions m_playerScript;
    private Transform m_tansform;

    private bool isCheckBlock = false;
    private float checkTime = 0.05f;
    GameObject m_blockCheckArea;
    ArrowArea m_blockCheckScript;

    RaycastHit2D m_hit;

    AudioManager m_audioManager;

	// Use this for initialization
	void Start () {
        m_tansform = this.transform;
        m_animation = this.GetComponent<SkeletonAnimation>();
        playerObj = GameObject.Find("Hero");
        m_playerScript = playerObj.GetComponent<PlayerActions>();

        //m_animation.state.Event += state_Event;
        m_animation.state.End += state_End;

        m_audioManager = GameObject.Find("Audios").GetComponent<AudioManager>();
	}

    //void state_Event(Spine.AnimationState state, int trackIndex, Spine.Event e)
    //{
    //    if (e + "" == "zhongjian")
    //    {
    //        Debug.Log("zhongjian!");
    //        Instantiate(m_arrowArea, new Vector2(0, 0), Quaternion.Euler(0, 0, 0));
    //        return;
    //    }
    //    if (e + "" == "tankai" )
    //    {
    //        isCheckBlock = true;
    //        checkTime = 0.05f;
    //        //try
    //        //{
    //        //    m_hit = Physics2D.Linecast(this.transform.position, playerObj.transform.position, 1 << LayerMask.NameToLayer("Block"));
    //        //    if (m_hit)
    //        //    {
    //        //        Debug.Log("block my arrow");
    //        //        beenBlock();
    //        //    }
    //        //}
    //        //catch { 
    //        //    // exception
    //        //}
    //    }
    //}

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if (state.GetCurrent(trackIndex) + "" == "animation") {
            Instantiate(m_arrowStand, new Vector2(4.2f , 4.7f), Quaternion.Euler(0, 0, 0));
            m_audioManager.archerkill();
            Destroy(this.gameObject);
        }
    }
	
	// Update is called once per frame
	void Update () {
        //if (isCheckBlock && checkTime>0) {
        //    checkTime -= Time.deltaTime;
        //    try
        //    {
        //        m_hit = Physics2D.Linecast(this.transform.position, playerObj.transform.position, 1 << LayerMask.NameToLayer("Block"));
        //        if (m_hit)
        //        {
        //            Debug.Log("block my arrow");
        //            beenBlock();
        //        }
        //    }
        //    catch
        //    {
        //        // exception
        //    }
        //}
	}

    public void beenBlock() {
        Vector2 Position = m_tansform.position;
        Position.y -= 0.4f;
        Instantiate(m_archer, Position, m_tansform.rotation);
        Destroy(this.gameObject);  
    }

    void OnDestroy() {
        //m_animation.state.Event -= state_Event;
        m_animation.state.End -= state_End;
    }

}

using UnityEngine;
using System.Collections;

public class DemonsMove : MonoBehaviour {
    private SkeletonAnimation m_animation;
    private Transform m_transform;
    private int ANIMATION = 1;
    private int FEIXING = 2;
    private int JIFEI = 3;
    private int VICTORY = 4;
    private BoxCollider2D m_collider;
    //private int feiXingRate = 15;
    //private float feiXingTimer = 0.5f;
    //private float feiXingDistance = 5f;
    //private Vector3 feiXingPositionUnit;
    //private Vector2 forcePosition;

    //private bool isAttack = false;
    //private bool isFlying = true;

    //Color m_color;
    //private float colorA = 0f;
    //private Material m_material;
    //private float colorUnit;
    //private float enterTime = 0.2f;

    GameObject enemyCreatorObj;
    EnemyManager enemyManagerScript;
    private bool setVictory = true;

	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        m_animation = this.GetComponent<SkeletonAnimation>();
        m_collider = this.GetComponent<BoxCollider2D>();
        m_animation.state.End += state_End;
        m_animation.state.Event += state_Event;
        //feiXingPositionUnit = checkPosition() / feiXingTimer;
        enemyCreatorObj = GameObject.Find("EnemyCreator");
        enemyManagerScript = enemyCreatorObj.GetComponent<EnemyManager>();
        m_collider.enabled = false;

        //m_material = this.GetComponent<MeshRenderer>().material;
        //m_color = m_material.color;
        //m_color.a = 0;
        //m_material.color = m_color;
        //colorUnit = 1 / enterTime;
	}

    void state_Event(Spine.AnimationState state, int trackIndex, Spine.Event e)
    {
        if (e + "" == "attackable") {
            m_collider.enabled = true;
        }
    }

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        //if (state.GetCurrent(trackIndex) + "" == "animation")
        //{
        //    if (!isAttack)
        //    {
        //        isFlying = true;
        //        m_animation.state.SetAnimation(FEIXING, "feixing", true);
        //    }
        //    else
        //    {
        //        //m_animation.state.SetAnimation(4, "victory", true);
        //    }
        //    //m_animation.state.SetAnimation(FEIXING, "feixing", true);
        //    //try
        //    //{
        //    //    forcePosition = (Vector2)playerObj.transform.position;
        //    //    Vector2 force = forcePosition - (Vector2)m_transform.position;
        //    //    this.gameObject.GetComponent<Rigidbody2D>().AddForceAtPosition(force * 133, forcePosition);
        //    //}
        //    //catch  {
        //    //    Debug.Log("something wrong with add force on demon!");
        //    //}
        //}
        if (state.GetCurrent(trackIndex) + "" == "feixing")
        {
            //isAttack = true;
            m_animation.state.SetAnimation(ANIMATION, "animation", false);
        }

        if (state.GetCurrent(trackIndex) + "" == "jifei") {
            Destroy(this.gameObject);
        }
    }
	
	// Update is called once per frame
	void Update () {
        if (enemyManagerScript.isPause == setVictory) {
            setVictory = false;
            //isFlying = false;
            //isAttack = false;
            m_animation.state.SetAnimation(VICTORY, "victory", true);
        }
        //if (isFlying && feiXingTimer>0) {
        //    float m_time = Time.deltaTime;

        //    //enter
        //    if (m_color.a < 1) {
        //        m_color.a += colorUnit * m_time;
        //        if (m_color.a > 1) {
        //            m_color.a = 1;
        //        }
        //        m_material.color = m_color;
        //    }

        //    feiXingTimer -= m_time;
        //    if (feiXingTimer < 0) {
        //        m_time += feiXingTimer;
        //        isAttack = true;
        //        isFlying = false;
        //        m_animation.state.SetAnimation(ANIMATION, "animation", false);
        //    }
        //    m_transform.position -= feiXingPositionUnit*m_time;
        //}
        //if (isAttack)
        //{
        //    m_transform.position -= feiXingPositionUnit * Time.deltaTime * 0.3f;
        //}
	}

    //private Vector3 checkPosition() { 
    //    Vector3 m_distance = new Vector3(0.0f,0.0f,0.0f);
    //    if (Mathf.Abs(m_transform.position.x) > Mathf.Abs(m_transform.position.y) && m_transform.position.x >=0)
    //    { 
    //        //right
    //        m_distance.x = m_transform.position.x - 3.3f;
    //    }
    //    else if (Mathf.Abs(m_transform.position.x) > Mathf.Abs(m_transform.position.y) && m_transform.position.x < 0)
    //    {
    //        //left
    //        m_distance.x = m_transform.position.x  -(- 2.5f);
    //    }
    //    else if (Mathf.Abs(m_transform.position.x) < Mathf.Abs(m_transform.position.y) && m_transform.position.y >= 0)
    //    {
    //        //up
    //        m_distance.y = m_transform.position.y - 1.8f;
    //    }
    //    else if (Mathf.Abs(m_transform.position.x) < Mathf.Abs(m_transform.position.y) && m_transform.position.x < 0)
    //    {
    //        //down
    //        m_distance.x = m_transform.position.y -(- 3.0f);
    //    }
        
    //    return m_distance;
    //}

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag.CompareTo("SkillWeapon") == 0 || other.tag.CompareTo("weapon") == 0)
        {
            //isFlying = false;
            Destroy(m_collider);
            m_animation.state.SetAnimation(JIFEI, "jifei", false);
        }
        if (other.tag.CompareTo("Player") == 0)
        {
            //isFlying = false;
            //isAttack = false;
            m_animation.state.SetAnimation(VICTORY, "victory", true);
        }
    }

    public void beenKilled()
    {
        Debug.Log("jifei");
        m_animation.state.SetAnimation(JIFEI, "jifei", false);
    }

    public void beVictory() {
        m_animation.state.SetAnimation(VICTORY, "victory", true);
    }

    void OnDestroy() {
        m_animation.state.End -= state_End;
    }
}

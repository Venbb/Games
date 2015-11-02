using UnityEngine;
using System.Collections;

public class EnemyMove2U : MonoBehaviour {

    public float moveDistance = 1f;
    private int animationState = 0;
    private SkeletonAnimation animationTest;
    private float timer = 0;
    private float moveTime;
    private Transform m_transform;
    private int enemyState = 0;  // 0:normal; 1:normal killed; 2: skill killed 3: wait for attack
    private float deadTimer = 0;
    
    public GameObject obj;
    EnemyManager script;
    private int changeState;
    private int nowState = 10000;
    BoxCollider2D m_collider;
    private int attackTime = 2;
    private float attackStandTime = 0.8f;
    private float attackMoveTime = 0.433f;
    private Vector2 moveUnit;
    private Vector2 scaleUnit;
    private float scaleRatio;

    private bool isSetVictory = true;
    //private float colorUnit;
    //Color m_color;
    //private float colorA = 0f;

    // Use this for initialization
    void Start()
    {
        animationTest = this.GetComponent<SkeletonAnimation>();
        m_transform = this.transform;
        //animationTest.loop = !animationTest.loop;

        obj = GameObject.Find("EnemyCreator");
        script = obj.GetComponent<EnemyManager>();

        m_collider = this.GetComponent<BoxCollider2D>();

        scaleUnit = m_transform.localScale;

        moveTime = script.moveTime;

        //colorUnit = 1f / moveTime;
        //m_color = this.GetComponent<MeshRenderer>().material.color;
        //m_color.a = 0f;
        //this.GetComponent<MeshRenderer>().material.color = m_color;
        animationTest.state.Event += state_Event;
    }

    void state_Event(Spine.AnimationState state, int trackIndex, Spine.Event e)
    {
        if (e + "" == "kill")
        {
            //GameObject.Find("Audios").GetComponent<AudioManager>().normalkill();
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (script.isPause == isSetVictory)
        {
            isSetVictory = false;
            enemyState = 10;
            animationTest.state.SetAnimation(10, "victory", true);
        }
        switch (enemyState)
        {
            case 0:
                if (animationTest.AnimationName == "move_up")
        {
            timer += Time.deltaTime;
            if (timer > moveTime)
            {
                m_transform.Translate(moveUnit * (Time.deltaTime + moveTime - timer));
                scaleUnit *= (1 + scaleRatio);
                m_transform.localScale = scaleUnit;
                timer = 0;
                animationState = 0;
                if (attackTime == 0)
                {
                    animationTest.AnimationName = "trigger";
                    enemyState = 3;
                }
                else animationTest.AnimationName = "stand_up";
                //animationTest.loop = !animationTest.loop;
            }
            else {
                m_transform.Translate(moveUnit * Time.deltaTime);
                m_transform.localScale = scaleUnit *(1+scaleRatio*timer/moveTime) ;
            } 
        }
                else if (animationTest.AnimationName == "enter")
                {
                    timer += Time.deltaTime;
                    //m_color.a = colorUnit * timer;
                    if (timer > moveTime)
                    {
                        //m_color.a = 1f;
                        if (attackTime == 0)
                        {
                            animationTest.AnimationName = "trigger";
                            enemyState = 3;
                        }
                        else animationTest.AnimationName = "stand_up";
                        animationTest.loop = !animationTest.loop;
                    }
                    //this.GetComponent<MeshRenderer>().material.color = m_color;
                }
        changeState = script.moveState;
        if (nowState == 10000)
        {
            nowState = changeState;
        }
        if (nowState != changeState && attackTime>0)
        {
            nowState = changeState;
            attackTime--;
            move();
        }
                break;
            case 1:
                deadTimer += Time.deltaTime;
                if (deadTimer >= 1.033f)
                {
                    Destroy(this.gameObject);
                }
                break;
            case 2:
                deadTimer += Time.deltaTime;
                if (deadTimer >= 1.333f)
                {
                    Destroy(this.gameObject);
                }
                break;
            case 3:
                attackStandTime -= Time.deltaTime;
                if (attackStandTime <= 0) {
                    attackTime--;
                    move();
                }
                break;
            case 100:
                timer += Time.deltaTime;
                if(timer >= attackMoveTime){
                    m_transform.Translate(moveUnit * (Time.deltaTime + attackMoveTime - timer));
                    enemyState = 0;
                    animationTest.AnimationName = "trigger";
                    animationTest.loop = true;
                }
                else m_transform.Translate(moveUnit * Time.deltaTime);
                break;
            default: break;
        }
    }
    void OnGUI()
    {
        
    }

    void move()
    {
        if (attackTime < 0)
        {
            animationTest.state.SetAnimation(0, "attack", false);
            moveUnit = new Vector2(-0.5f * moveDistance / attackMoveTime, 2.25f * moveDistance / attackMoveTime);
            enemyState = 100;
        }
        else 
        //switch (animationState)
        {
            //case 0:
                animationTest.AnimationName = "move_up";
                animationTest.loop = !animationTest.loop;
                timer = 0;
                animationState = 1;
                if (attackTime == 1)
                {
                    moveUnit = new Vector2(-1f * moveDistance / moveTime, 1.75f * moveDistance / moveTime);
                    scaleRatio = 6f/88f;
                }
                else {
                    moveUnit = new Vector2(1.25f * moveDistance / moveTime, 1.75f * moveDistance / moveTime);
                    scaleRatio = 6f / 94f;
                }
            //    break;
            //case 1:
            //    animationTest.AnimationName = "stand_up";
            //    animationTest.loop = !animationTest.loop;
            //    animationState = 0;
            //    break;
            //default: break;
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {

        if (other.tag.CompareTo("SkillWeapon") == 0)
        {
            animationTest.AnimationName = "dead_skill_up";
            m_transform.Translate(new Vector3(0, 0, -1));
            enemyState = 2;
            //			Destroy(this.gameObject);
            Destroy(m_collider);
        }

        if (other.tag.CompareTo("weapon") == 0)
        {
            animationTest.AnimationName = "dead_normal_up";
            enemyState = 1;
            //Debug.Log("the enemy was killed!");
            //			Destroy(this.gameObject);
            Destroy(m_collider);
        };
        if (other.tag.CompareTo("Player") == 0)
        {
            Debug.Log("Game over!");
            //			scriptPlayer.isDead = true;
        };
    }

    void OnDestroy()
    {
        animationTest.state.Event -= state_Event;
    }
}

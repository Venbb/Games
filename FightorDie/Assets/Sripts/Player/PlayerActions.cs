using UnityEngine;
using System.Collections;

public class PlayerActions : MonoBehaviour {
    private Transform m_transform;
    public float framesPerSecond;
    private SpriteRenderer spriteRenderer;
    private int actionNumber = 0; //0:breath, 1:right , 2:left , 3:up , 4:down
    public GameObject gameOverObj;
    GameOver gameOverScript;

    public GameObject furyBarObj;
    FuryBarManager furyBarScript;

    public GameObject enemyManagerObj;
    EnemyManager enemyManagerScript;

    public GameObject mainScreenObj;
    ShakeScreen shakeScreenScript;

    public GameObject attackAudioObj;
    attackAudio attackAudioScript;

    public GameObject AudioObj;
    AudioManager m_audioManager;

    public GameObject scoreManagerObj;
    ScoreManager m_scoreManager;

    Vector2 m_screenpos = new Vector2();
    private float minPosX;
    private float maxPosX;
    private float minPosY;
    private float maxPosY;

    private Vector2 main_flyDistance;
    private Vector2 vice_flyDistance;

    private SkeletonAnimation animationTest;
    private float attackTime = 0.3f;
    private float attackTimer = 0.3f;
    public string playerState = "stand";
    private float deadTime = 0.5f;

    public Transform attackCollider;
    private Vector3 m_position;

    private int clickJudgePixels = 50;
    private bool isSkillReady = false;
    public Transform skill_animation;
    public Transform skillEffectUp;
    public Transform skillEffectDown;
    public Transform skillEndEffect;
    public Transform blockArea;

    private bool isLaunchSkill = false;

    private Hashtable m_touchTable = new Hashtable();
    private bool sendingReviveSence = false;

    private Vector2 lastSkillPosition;

    // Use this for initialization
    void Start()
    {
        animationTest = this.GetComponent<SkeletonAnimation>();

        m_transform = this.transform;

        gameOverObj = GameObject.Find("GameOver");
        gameOverScript = gameOverObj.GetComponent<GameOver>();

        furyBarObj = GameObject.Find("FuryBar");
        furyBarScript = furyBarObj.GetComponent<FuryBarManager>();

        enemyManagerObj = GameObject.Find("EnemyCreator");
        enemyManagerScript = enemyManagerObj.GetComponent<EnemyManager>();

        //mainScreenObj = GameObject.Find("MainCamera");
        shakeScreenScript = mainScreenObj.GetComponent<ShakeScreen>();

        attackAudioObj = GameObject.Find("AttackAudios");
        attackAudioScript = attackAudioObj.GetComponent<attackAudio>();

        AudioObj = GameObject.Find("Audios");
        m_audioManager = AudioObj.GetComponent<AudioManager>();

        scoreManagerObj = GameObject.Find("Kill");
        m_scoreManager = scoreManagerObj.GetComponent<ScoreManager>();

        minPosX = Screen.width / 16f * 6.5f;
        maxPosX = Screen.width / 16f * 9f;
        minPosY = Screen.height / 16f * 6.5f;
        maxPosY = Screen.height / 16f * 9f;

        animationTest.state.Event += Event;
        animationTest.state.End += state_End;

        //animationTest.state.End += (state, trackIndex) =>
        //{
        //    Debug.Log("start: " + state.GetCurrent(trackIndex));
        //};
        //animationTest.state.End += ActionChange;
    }

    void state_End(Spine.AnimationState state, int trackIndex)
    {
        if(state.GetCurrent(trackIndex) + "" == "skill_touch" && isLaunchSkill){
            actionNumber = 6;
            attackAudioScript.skillLanding();
        }

        if (state.GetCurrent(trackIndex) + "" == "block2") {
            actionNumber = 7;
        }

        if (state.GetCurrent(trackIndex) + "" == "chongsheng")
        {
            animationTest.loop = true;
            actionNumber = 0;
            playerState = "stand";
            GameObject.FindGameObjectWithTag("EnemyManager").GetComponent<EnemyManager>().isPause = false;
        }
    }

    void Event(Spine.AnimationState state, int trackIndex, Spine.Event e)
    {
        //Debug.Log(trackIndex + " " + state.GetCurrent(trackIndex) + ": event " + e + ", " + e.Int);
        if ( e + "" == "launch") {
            attack(m_position);
        }
        if (e + "" == "baozha")
        {
            Instantiate(skillEndEffect, m_transform.position, m_transform.rotation);
            GameObject[] m_enemies = GameObject.FindGameObjectsWithTag("Enemy");
            for (int i = 0; i < m_enemies.Length; i++)
            {
                Destroy(m_enemies[i]);
            }
            GameObject[] m_enemyBullets = GameObject.FindGameObjectsWithTag("EnemyBullet");
            for (int i = 0; i < m_enemyBullets.Length; i++)
            {
                Destroy(m_enemyBullets[i]);
            }
            //GameObject.FindGameObjectWithTag("EnemyManager").GetComponent<EnemyManager>().isPause = false;
        }
        if (e + "" == "reviveYeah") {
            attackAudioScript.reviveYeah();
        }
    }


    void Update()
    {
        
        if (Time.timeScale == 0)
            return;
        if (playerState == "dead")
        {
            dead();
        }
        else
        {
            switch (actionNumber) {
                case 0:
                    animationTest.AnimationName = "stand";
                    playerState = "stand";
                    animationTest.loop = true;
                    break; 
                case 1:
                    animationTest.state.SetAnimation(1,"attack_R",false);
                    playerState = "attack";
                    actionNumber = 0;
                    m_position = new Vector3(2.3f, -0.4f, 0);
                    attackAudioScript.attack_R();
                    break;
                case 2:
                    animationTest.state.SetAnimation(2, "attack_L", false);
                    playerState = "attack";
                    actionNumber = 0;
                    m_position = new Vector3(-2.1f, -0.3f, 0);
                    attackAudioScript.attack_L();
                    break;
                case 3:
                    animationTest.state.SetAnimation(3, "attack_up", false);
                    playerState = "attack";
                    actionNumber = 0;
                    m_position = new Vector3(0f, 1.5f, 0);
                    attackAudioScript.attack_U();
                    break;
                case 4:
                    animationTest.state.SetAnimation(4, "attack_down", false);
                    playerState = "attack";
                    actionNumber = 0;
                    m_position = new Vector3(0.5f, -1.8f, 0);
                    attackAudioScript.attack_D();
                    break;
                case 5:
                    skillAttack();
                    break;
                case 6:
                    animationTest.AnimationName = "skill";
                    animationTest.loop = true;
                    break;
                case 7:
                    animationTest.AnimationName = "block";
                    animationTest.loop = true;
                    playerState = "block";
                    break;
                case 8:
                    playerState = "block";
                    break;
                default: break;
            }

            switch (playerState)
            {
                case "attack":
                    Destroy(GameObject.FindGameObjectWithTag("Block"));
                    Time.timeScale = 1f;
                    if (attackTimer < 0)
                    {
                        playerState = "stand";
                        if (isLaunchSkill)
                        {
                            animationTest.AnimationName = "skill";
                        }
                        else {
                            animationTest.AnimationName = "stand";
                        }
                        animationTest.loop = true;
                        attackTimer = attackTime;
                    };
                    attackTimer -= Time.deltaTime;
                    break;
                case "block":
                    if (GameObject.FindGameObjectWithTag("Block") == null)
                    {
                        Instantiate(blockArea, m_transform.position, m_transform.rotation);
                    }
                    break;
                default:
                    Destroy(GameObject.FindGameObjectWithTag("Block"));
                    break;
            }

            
        }


    }
    void OnGUI()
    {
    }


    public void dead()
    {
        animationTest.AnimationName = "dead";
        animationTest.loop = false;
        playerState = "dead";
        if (deadTime > 0)
        {
            deadTime -= Time.deltaTime;
        }
        else
        {
            //Destroy(this.gameObject);
            enemyManagerScript.isPause = true;
            m_scoreManager.highScore();
            if (sendingReviveSence) {
                gameOverScript.gameover();
                sendingReviveSence = false;
            }
        }        
    }

    public void revive() {
        //animationTest.Reset();
        //animationTest.AnimationName = "stand";
        animationTest.state.SetAnimation(9, "chongsheng", false);
        actionNumber = 9;
        //animationTest.loop = true;
        //actionNumber = 0;
        //playerState = "stand";
    }

    public void restart()
    {
        animationTest.loop = true;
        actionNumber = 0;
        playerState = "stand";
    }

    void skillAttack() { 
        animationTest.state.SetAnimation(5, "skill_touch", false);
                    actionNumber = 0;
                    int randkey = M_Functions.RandomInt(4);
                    RaycastHit2D m_hit;
                    int i;
                    int j;
                    for (j = 3; j < 12; j += 2)
                    {
                        for (i = 0; i < 4; i++)
                        {
                            switch ((randkey + i) % 4)
                            {
                                case 0:
                                    m_hit = Physics2D.Linecast(new Vector2(0, 0), new Vector2(j, 0), 1 << LayerMask.NameToLayer("Enemy"));
                                    if (m_hit)
                                    {
                                        lastSkillPosition = m_hit.collider.gameObject.transform.position;
                                        Instantiate(skill_animation, lastSkillPosition, m_hit.collider.gameObject.transform.rotation);
                                        return;
                                    }
                                    break;
                                case 1:
                                    m_hit = Physics2D.Linecast(new Vector2(0, 0.2f), new Vector2(-j, 0.2f), 1 << LayerMask.NameToLayer("Enemy"));
                                    if (m_hit)
                                    {
                                        lastSkillPosition = m_hit.collider.gameObject.transform.position;
                                        Instantiate(skill_animation, lastSkillPosition, m_hit.collider.gameObject.transform.rotation); 
                                        return;
                                    }
                                    break;
                                case 2:
                                    m_hit = Physics2D.Linecast(new Vector2(-0.5f, 0), new Vector2(-0.5f, 0.7f * j), 1 << LayerMask.NameToLayer("Enemy"));
                                    if (m_hit)
                                    {

                                        lastSkillPosition = m_hit.collider.gameObject.transform.position;
                                        Instantiate(skill_animation, lastSkillPosition, m_hit.collider.gameObject.transform.rotation);
                                        return;
                                    }
                                    break;
                                case 3:
                                    m_hit = Physics2D.Linecast(new Vector2(0, 0), new Vector2(0, -j), 1 << LayerMask.NameToLayer("Enemy"));
                                    if (m_hit)
                                    {
                                        lastSkillPosition = m_hit.collider.gameObject.transform.position;
                                        Instantiate(skill_animation, lastSkillPosition, m_hit.collider.gameObject.transform.rotation);
                                        return;
                                    }
                                    break;
                                default: break;
                            }
                        }
                    }
                Instantiate(skill_animation, lastSkillPosition, Quaternion.Euler(0,0,0));
    }

    void attack(Vector3 position)
    {
        Instantiate(attackCollider, position, m_transform.rotation);
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if ((other.tag.CompareTo("Enemy") == 0 || (other.tag.CompareTo("EnemyBullet") == 0 && GameObject.FindGameObjectWithTag("Block")==null) || other.tag.CompareTo("EnemyWeapon") == 0) && playerState != "dead")
        {
            //			Debug.Log("Game over!");
            playerState = "dead";
            animationTest.loop = false;
            attackAudioScript.dead();
            m_audioManager.cheer();
            sendingReviveSence = true;
        }
    }


    public void setSkillState(bool isReady) {
        isSkillReady = isReady;
        if (!isSkillReady && playerState!="dead") {
            isLaunchSkill = false;
            animationTest.AnimationName = "stand";
            animationTest.loop = true;
            actionNumber = 0;
            playerState = "stand";
        }
    }

    public void resetSkillState() {
        isSkillReady = false;
    }

    public void skillStart() {
        cleanHeroSkillEffect();
        Instantiate(skillEffectUp, m_transform.position, m_transform.rotation);
    }

    public void skillEnd() {
        cleanHeroSkillEffect();
        if (playerState != "dead") {
            Instantiate(skillEndEffect, m_transform.position, m_transform.rotation); 
        }
    }

    public void BlockEnemy() {
        animationTest.state.SetAnimation(8, "block2", false);
        actionNumber = 8;
    }

    private void cleanHeroSkillEffect() {
        GameObject[] skillObjs = GameObject.FindGameObjectsWithTag("HeroSkillEffect");
        int length = skillObjs.Length;
        for (int i = 0; i < length; i++)
        {
            Destroy(skillObjs[i]);
        }
    }

    public void m_click()
    {
        if (isSkillReady)
        {
            actionNumber = 5;
            furyBarScript.launchSkill();
            isLaunchSkill = true;
        }
    }

    public void touchEvent(int m_number) {
          switch (m_number) { 
            case 0:
                Destroy(GameObject.FindGameObjectWithTag("Block"));
                actionNumber = m_number;
                break;
            case 1:
                actionNumber = m_number;
                shakeScreenScript.shakeScreen(12);
                enemyManagerScript.stopAttackGuide(4);
                break;
            case 2:
                actionNumber = m_number;
                shakeScreenScript.shakeScreen(13);
                enemyManagerScript.stopAttackGuide(3);
                break;
            case 3:
                actionNumber = m_number;
                shakeScreenScript.shakeScreen(15);
                enemyManagerScript.stopAttackGuide(2);
                break;
            case 4:
                actionNumber = m_number;
                shakeScreenScript.shakeScreen(14);
                enemyManagerScript.stopAttackGuide(1);
                break;
            case 5:
                if (isSkillReady)
                {
                    actionNumber = m_number;
                    furyBarScript.launchSkill();
                    isLaunchSkill = true;
                }
                break;
            case 7:
                actionNumber = m_number;
                attackAudioScript.block();
                enemyManagerScript.stopGuide();
                break;
            default:
                actionNumber = m_number;
                break;
            
        
        }
    }

    void OnDestroy() {
        animationTest.state.Event -= Event;
        animationTest.state.End -= state_End;
        GameObject[] m_enemyBullets = GameObject.FindGameObjectsWithTag("EnemyBullet");
        for (int i = 0; i < m_enemyBullets.Length; i++) {
            Destroy(m_enemyBullets[i]);
        }
    }
}



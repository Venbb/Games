using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class EnemyManager : MonoBehaviour {

    public float moveTime = 0.33f;
    //normal enemies
	public Transform m_enemyR;
	public Transform m_enemyL;
	public Transform m_enemyU;
	public Transform m_enemyD;
    public Transform m_enemyMoreR;
    public Transform m_enemyMoreL;
    public Transform m_enemyMoreU;
    public Transform m_enemyMoreD;

    //crows
    public Transform m_CrowTop;
    public Transform m_CrowDown;
    public Transform crowWarning;
    private GameObject m_CrowWarning;

    //demons
    public Transform m_demonLR;

    //deathArcher
    public Transform m_deathArcherRU;
    public Transform m_deathArcherRD;

	private Transform m_enemy;
	protected Transform m_transform;
	private Vector3 m_position;
	public float createRate = 0.53f;
	float m_enemyTimer = 0;
	public int moveState = 0;
    public int moveStateSkill = 0;
    private int createState = 1; //1:normal 2:skill 0:wait

    public bool isPause = true;

    //BoxCollider2D m_collider;

    private bool isSendCrows = false;
    private float crowTime = 10f;
    private float crowTimer = 10f;
    //private float crowWarningTime = 2.8f;
    private float crowWarningTime = 0.75f;

    private int waitSomeWaves = 0;
    //rate in percent
    private float deatArchersRate = 0;
    private float demonsRate = 0;

    private bool isVictory=false;

    GameObject myPlayerObj;
    NewPlayerGuide m_playerGuide;
    private int isGuideAttack;
    private int isGuideCrowBlock;
    private int isGuideArcherBlock;

    private int changeRate = 20;
    private int enemyCounter = 0;
    private int creatList = 0; // 0:normal 1:demons 2:archers 3:crows
    private int m_EnemyMod = 1;
    private float mod1_demonTime = 4f;
    private float mod1_archerTime = 2f;
    private float mod1_crowTime = 4f;
    private int lastList;
    private int lastTwoList = 100;

    public Transform m_GuideDefence;
    public Transform m_GuideAttackR;
    public Transform m_GuideAttackL;
    public Transform m_GuideAttackD;
    public Transform m_GuideAttackU;
    private bool isGuiding = false;
    private bool isCrowGuiding = false;
    private bool isArcherGuiding = false;
    private int attackGuide = 4;
    private bool isCreateGuideEnemy = true;
    private GuideText m_GuideText;
    private GameMaster m_GameMaster;
	// Use this for initialization
	void Start () {
		m_transform = this.transform;
        myPlayerObj = GameObject.Find("MyPlayer");
        m_playerGuide = myPlayerObj.GetComponent<NewPlayerGuide>();
        lastList = creatList;
        m_GuideText = GameObject.Find("GuideText").GetComponent<GuideText>();
        m_GameMaster = GameObject.Find("MainScreen").GetComponent<GameMaster>();
        //m_collider = this.GetComponent<BoxCollider2D>();
        //m_collider.enabled = false;
	}
	
	// Update is called once per frame
	void Update () {
        if (isPause) {
            return;
        }
        //if (waitSomeWaves > 0) {
        //    m_enemyTimer += waitSomeWaves * createRate;
        //    waitSomeWaves = 0;
        //}
		m_enemyTimer -= Time.deltaTime;
		if (m_enemyTimer <= 0) {
            changeState();

            if (waitSomeWaves > 0)
            {
                m_enemyTimer = createRate;
                waitSomeWaves--;
                return;
            }

            switch (m_EnemyMod) { 
                case 0:
                    // create enemies by state any ratio
                    switch (createState)
                    {
                        case 1:
                            //creatNormalEnemy();
                            // test crows enemies
                            if (isSendCrows)
                            {
                                crowWarningTime -= createRate - m_enemyTimer;
                                if (crowWarningTime <= 0)
                                {

                                    if (Random.Range(0f, 1.0f) < 0.2f)
                                    {
                                        creatNormalEnemy();
                                    }
                                    else creatCrows();
                                    crowTimer -= createRate - m_enemyTimer;
                                    if (crowTimer <= 0)
                                    {
                                        isSendCrows = false;
                                        crowTimer = crowTime;
                                        crowWarningTime = 3f;
                                    }
                                }
                            }
                            else creatNormalEnemy();
                            break;
                        case 2:
                            creatSkillEnemy();
                            break;
                        case 3:
                            //creatCrows();
                            break;
                        case 0:
                            createState = 1;
                            break;
                        default: break;
                    }
                    break;


                case 1:
                //create enemies by list
                switch(creatList){
                    case 0:
                        creatNormal();
                        enemyCounter++;
                        break;
                    case 1:
                        creatDemon();
                        mod1_demonTime -= createRate - m_enemyTimer;
                        if (mod1_demonTime < 0)
                        {
                            mod1_demonTime = 4f;
                            creatList = 0;
                            lastList = creatList;
                        }
                        break;
                    case 2:
                        creatDeathArcher();
                        mod1_archerTime -= createRate - m_enemyTimer;
                        if (mod1_archerTime < 0) {
                            mod1_archerTime = 2f;
                            creatList = 0;
                            lastList = creatList;
                            waitSomeWaves = 4+GameObject.Find("Kill").GetComponent<ScoreManager>().getScores()/60;
                            waitSomeWaves = waitSomeWaves > 12 ? 12 : waitSomeWaves;
                        }
                        break;
                    case 3:
                        if (isSendCrows)
                        {
                            crowWarningTime -= createRate - m_enemyTimer;
                            if (crowWarningTime <= 0)
                            {
                                //end of warning
                                //if (GameObject.FindGameObjectWithTag("CrowWarning") != null)
                                //{
                                //    try
                                //    {
                                //        GameObject.FindGameObjectWithTag("CrowWarning").GetComponent<warningManager>().moveOut();
                                //    }
                                //    catch
                                //    {

                                //    }
                                //}
                                creatCrows();
                                mod1_crowTime -= createRate - m_enemyTimer;
                                if (mod1_crowTime < 0) {
                                    isSendCrows = false;
                                    mod1_crowTime = 4f;
                                    crowWarningTime = 3f;
                                    creatList = returnList();
                                    waitSomeWaves = GameObject.Find("Kill").GetComponent<ScoreManager>().getScores() / 60;
                                    waitSomeWaves = waitSomeWaves>8?8:waitSomeWaves;
                                }
                            }
                        }
                        break;
                    case 4:
                        creatSkillEnemy();
                        break;
                    case 5: 
                        startToSendCrows();
                        break;
                    default: break;    
                }
                if (enemyCounter >= changeRate) {
                    enemyCounter = 0;
                    //50% start to creat event enemies
                    int randomKey = M_Functions.RandomInt(100);
                    if (randomKey < 35) {
                        creatList =  1;
                    }
                    else if (randomKey < 50) {
                        creatList = 2;
                    }
                    lastList = creatList;
                }
                // creat by list end
                break;

                default: break;
            }

            m_enemyTimer = createRate;
		}
	}

    int returnList() {
        if (lastTwoList == 100)
        {
            return lastList;
        }
        else {
            int m_list = lastTwoList;
            lastTwoList = 100;
            return m_list;
        }
    }

    void OnGUI() {
        //if (isSendCrows && crowWarningTime > 0) {
        //    GUI.skin.label.fontSize = Screen.width * 40 / 1080;
        //    GUI.skin.label.alignment = TextAnchor.MiddleCenter;
        //    GUI.Label(new Rect(0, 0, Screen.width, Screen.height), "warning，a large wave of crows coming！");
        //}
    }
	
	void changeState(){
		moveState++;
		if (moveState > 1000) {
			moveState = 0;
		}
	}

    public void setCreateState(int i) {
        createState = i;
        if (i == 2)
        {
            if (creatList == 3) {
                lastTwoList = 3;
            }
            creatList = 4;
        }
        else creatList = returnList();
    }

    public void tryToSendCrows() {
        if (creatList != 4)
        {
            startToSendCrows();
        }
        else {
            lastTwoList = 5;
        }
    }


    void startToSendCrows() {
        creatList = 3;
        isSendCrows = true;
        //if (m_CrowWarning == null) {
        //    m_CrowWarning = Instantiate(crowWarning, new Vector2(0, 5f), Quaternion.Euler(0, 0, -6)) as GameObject;
        //}
    }

    public void stopSendCrows() {
        isSendCrows = false;
    }

    public void killOutsideEnemies(bool isAble) {
        //m_collider.enabled = isAble;
        if (isAble) {
            GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
            int length = enemies.Length;
            for (int i = 0; i < length; i++)
            {
                try { enemies[i].gameObject.GetComponent<ClearEnemy>().clearEnemy(); }
                catch { }
            }
        }
    }

    public void changeCreatPercent(float Per_Archers,float Per_demons) {
        deatArchersRate = Per_Archers;
        demonsRate = Per_Archers+Per_demons;
    }

    void creatNormalEnemy()
    {
        //isGuideAttack = m_playerGuide.isGuideAttack;
        //if (isGuideAttack == 0) {
        //    m_playerGuide.updateGuide(1);
        //    isGuideAttack = 1;
        //}

        int randomNum = Random.Range(0, 100);
        //crow for debug
        if (randomNum < 0) {
            creatCrows();
            waitSomeWaves = 1;
        }
        else if (randomNum < deatArchersRate && !isSendCrows)
        {
            creatDeathArcher();
            waitSomeWaves = 1;
        }
        else if (randomNum < demonsRate && !isSendCrows)
        {
            creatDemon();
            waitSomeWaves = 1;
        }
        else {
            int randkey = randomNum % 4 + 1;
            //		Debug.Log (randkey);
            switch (randkey)
            {
                case 1: //right
                    m_position = new Vector3(6.5f, -0.8f, 0);
                    m_enemy = m_enemyR;
                    break;
                case 2: //left
                    m_position = new Vector3(-6f, -0.8f, 0);
                    m_enemy = m_enemyL;
                    break;
                case 3: //up
                    m_position = new Vector3(-0.25f, 4.4f, 0);
                    m_enemy = m_enemyU;
                    break;
                case 4: //down
                    m_position = new Vector3(0.5f, -6.5f, 0);
                    m_enemy = m_enemyD;
                    break;
                default: break;
            }
            Instantiate(m_enemy, m_position, m_transform.rotation);
        }
    }

    public void stopAttackGuide(int index) {
        if (m_playerGuide.isGuideAttack == 0 && index == attackGuide) {
            try
            {
                Destroy(GameObject.FindGameObjectWithTag("Guide"));
                m_GuideText.setText("");
                //attackGuide--;
                //isCreateGuideEnemy = true;
            }
            catch { }
        }
    }

    void creatNormal()
    {
        isGuideAttack = m_playerGuide.isGuideAttack;
        if (isGuideAttack == 0)
        {
            switch (attackGuide) { 
                case 4:
                    if (isCreateGuideEnemy) {
                        isGuiding = true;
                        Instantiate(m_enemyR, new Vector3(6.5f, -0.8f, 0), m_transform.rotation);
                        isCreateGuideEnemy = false;
                        if (m_GameMaster.keyBoardControl())
                        {
                            Instantiate(m_GuideDefence, GameObject.Find("AttackRight").transform.position + new Vector3(1.2f,-0.2f,0), Quaternion.Euler(0,0,-90));
                            m_GuideText.setText("");
                        }
                        else {
                            Instantiate(m_GuideAttackR, Vector3.zero, m_transform.rotation);
                            m_GuideText.setText("SWIPE  RIGHT");
                        }
                    }
                    if (GameObject.FindGameObjectWithTag("Enemy") == null)
                    {
                        attackGuide--;
                        isCreateGuideEnemy = true;
                    }
                    break;
                case 3:
                    if (isCreateGuideEnemy) {
                        isGuiding = true;
                        Instantiate(m_enemyL, new Vector3(-6f, -0.8f, 0), m_transform.rotation);
                        isCreateGuideEnemy = false;
                        if (m_GameMaster.keyBoardControl())
                        {
                            Instantiate(m_GuideDefence, GameObject.Find("AttackLeft").transform.position + new Vector3(-1.0f, 0.3f, 0), Quaternion.Euler(0,0,90));
                            m_GuideText.setText("");
                        }
                        else
                        {
                            Instantiate(m_GuideAttackL, Vector3.zero, m_transform.rotation);
                            m_GuideText.setText("SWIPE  LEFT");
                        }
                    }
                    if (GameObject.FindGameObjectWithTag("Enemy") == null)
                    {
                        attackGuide--;
                        isCreateGuideEnemy = true;
                    }
                    break;
                case 2:
                    if (isCreateGuideEnemy) {
                        isGuiding = true;
                        Instantiate(m_enemyU, new Vector3(-0.25f, 4.4f, 0), m_transform.rotation);
                        isCreateGuideEnemy = false;
                        if (m_GameMaster.keyBoardControl())
                        {
                            Instantiate(m_GuideDefence, GameObject.Find("AttackUp").transform.position + new Vector3(0.2f, 0.8f, 0), m_transform.rotation);
                            m_GuideText.setText("");
                        }
                        else
                        {
                            Instantiate(m_GuideAttackU, Vector3.zero, m_transform.rotation);
                            m_GuideText.setText("SWIPE  UP");
                        }
                    }
                    if (GameObject.FindGameObjectWithTag("Enemy") == null)
                    {
                        attackGuide--;
                        isCreateGuideEnemy = true;
                    }
                    break;
                case 1:
                    if (isCreateGuideEnemy) {
                        isGuiding = true;
                        Instantiate(m_enemyD, new Vector3(0.5f, -6.5f, 0), m_transform.rotation);
                        isCreateGuideEnemy = false;
                        if (m_GameMaster.keyBoardControl())
                        {
                            Instantiate(m_GuideDefence, GameObject.Find("AttackDown").transform.position + new Vector3(-0.2f, -0.7f, 0),Quaternion.Euler(0,0,180));
                            m_GuideText.setText("");
                        }
                        else
                        {
                            Instantiate(m_GuideAttackD, Vector3.zero, m_transform.rotation);
                            m_GuideText.setText("SWIPE  DOWN");
                        }
                    }
                    if (GameObject.FindGameObjectWithTag("Enemy") == null) {
                        attackGuide--;
                        isCreateGuideEnemy = true;
                        m_playerGuide.updateGuide(1);
                        isGuiding = false;
                    }
                    break;
                default: break;
            }
            return;
        }

        int randomNum = Random.Range(0, 100);
        
            int randkey = randomNum % 4 + 1;
            //		Debug.Log (randkey);
            switch (randkey)
            {
                case 1: //right
                    m_position = new Vector3(6.5f, -0.8f, 0);
                    m_enemy = m_enemyR;
                    break;
                case 2: //left
                    m_position = new Vector3(-6f, -0.8f, 0);
                    m_enemy = m_enemyL;
                    break;
                case 3: //up
                    m_position = new Vector3(-0.25f, 4.4f, 0);
                    m_enemy = m_enemyU;
                    break;
                case 4: //down
                    m_position = new Vector3(0.5f, -6.5f, 0);
                    m_enemy = m_enemyD;
                    break;
                default: break;
            }
            Instantiate(m_enemy, m_position, m_transform.rotation);
        
    }

    void creatSkillEnemy()
    {
        Vector3 m_position1 = new Vector3(10.8f, -1f, 0);

        Vector3 m_position2 = new Vector3(-10f, -1f, 0);

        Vector3 m_position3 = new Vector3(0f, 6.3f, 0);

        Vector3 m_position4 = new Vector3(0.4f, -10.5f, 0);

        Instantiate(m_enemyMoreR , m_position1, m_transform.rotation);
        Instantiate(m_enemyMoreL , m_position2, m_transform.rotation);
        Instantiate(m_enemyMoreU , m_position3, m_transform.rotation);
        Instantiate(m_enemyMoreD , m_position4, m_transform.rotation);
    }

    public void stopGuide() {
        if (isCrowGuiding && isGuideCrowBlock == 0)
        {
            Destroy(GameObject.FindGameObjectWithTag("Guide"));
            m_GuideText.setText("");
            m_playerGuide.updateGuide(4);
            isGuideCrowBlock = 1;
            isCrowGuiding = false;
            isGuiding = false;
        }
        else if (isArcherGuiding && isGuideArcherBlock == 0) {
            Destroy(GameObject.FindGameObjectWithTag("Guide"));
            m_GuideText.setText("");
            m_playerGuide.updateGuide(3);
            isGuideArcherBlock = 1;
            isArcherGuiding = false;
            isGuiding = false;
        }
    }

    void creatCrows() {
        Transform m_crow = m_CrowTop;

        isGuideCrowBlock = m_playerGuide.isGuideCrowBlock;
        if (isGuideCrowBlock == 0 && !isGuiding)
        {
            if (m_GameMaster.keyBoardControl())
            {
                Instantiate(m_GuideDefence, GameObject.Find("DefenceButton").transform.position + new Vector3(1.2f, 2.4f, 0), m_transform.rotation);
                m_GuideText.setText("");
            }
            else
            {
                Instantiate(m_GuideDefence, new Vector3(10.7f, -1.4f, 0), transform.rotation);
                m_GuideText.setText("HOLD  TO  DEFENCE");
            }
            isGuiding = true;
            isCrowGuiding = true;
            //m_playerGuide.updateGuide(4);
            //isGuideCrowBlock = 1;
        }

        waitSomeWaves = 1;
        // Crows at Top
        int randomKey = Random.Range(0, 100) % 10;
        Vector3 origPosition;
        Quaternion origRotation;

        // position offset
        float offsetX = Random.Range(-2.5f, 2.5f);
        float offsetY = Random.Range(0f, 1f);


        if (randomKey < 8)
        {
            origPosition = new Vector3(-3.5f, 3.5f, 0);
            origRotation = Quaternion.Euler(0, 0, 0);
        }
        else {
            m_crow = m_CrowDown;
            origPosition = new Vector3(2f, -3.5f, 0);
            origRotation = Quaternion.Euler(0, 0, 0);
            offsetY = Random.Range(-1.0f, 0f);
        }

        if (randomKey % 2 == 0)
        {
            origRotation.y += 180;
            origPosition.x = -origPosition.x;
        }
        origPosition.x += offsetX;
        origPosition.y += offsetY;

        //rotation offset
        //int offsetRZ = Random.Range(-10, 10);
        //origRotation.z += offsetRZ;

        if (Mathf.Abs( origPosition.x) > 3.5f) {
            if (origPosition.y > 0)
            {
                origPosition.y -= 1f;
            }
            else origPosition.y += 1f;
        }

        Instantiate(m_crow, origPosition, origRotation);
    }

    //void OnTriggerEnter2D(Collider2D other)
    //{
    //    if (other.tag.CompareTo("Enemy") == 0)
    //    {
    //        Debug.Log("clean an enemy!");
    //    }

    //}

    void creatDemon()
    {
        int randkey = Random.Range(0, 100) % 2 + 1;
        //		Debug.Log (randkey);
        Quaternion m_rotation = m_transform.rotation;
        switch (randkey)
        {
            case 1: //right
                m_position = new Vector3(2.5f, -0.8f, 0);
                m_enemy = m_demonLR;
                break;
            case 2: //left
                m_position = new Vector3(-1.8f, -0.8f, 0);
                m_rotation.y += 180;
                m_enemy = m_demonLR;
                break;
            //case 3: //up
            //    m_position = new Vector3(-0.25f, 4.4f, 0);
            //    m_enemy = m_enemyU;
            //    break;
            //case 4: //down
            //    m_position = new Vector3(0.5f, -6.5f, 0);
            //    m_enemy = m_enemyD;
            //    break;
            default: break;
        }
        Instantiate(m_enemy, m_position, m_rotation);
    }

    void creatDeathArcher() {

        isGuideArcherBlock = m_playerGuide.isGuideArcherBlock;
        if (isGuideArcherBlock == 0 && !isGuiding)
        {
            if (m_GameMaster.keyBoardControl())
            {
                Instantiate(m_GuideDefence, GameObject.Find("DefenceButton").transform.position + new Vector3(1.2f, 2.4f, 0), m_transform.rotation);
                m_GuideText.setText("");
            }
            else
            {
                Instantiate(m_GuideDefence, new Vector3(10.7f, -1.4f, 0), transform.rotation);
                m_GuideText.setText("HOLD  TO  DEFENCE");
            }
            isGuiding = true;
            isArcherGuiding = true;
        }

        int randkey = Random.Range(0, 100) % 4 + 1;
        //		Debug.Log (randkey);
        Quaternion m_rotation = m_transform.rotation;
        switch (randkey)
        {
            case 1: //right-up
                m_position = new Vector3(4.2f, 4.7f, 0);
                m_enemy = m_deathArcherRU;
                break;
            case 2: //left-up
                m_position = new Vector3(4.2f, 4.7f, 0);
                m_enemy = m_deathArcherRU;
                break;
            case 3: //right-down
                m_position = new Vector3(5f, -5.3f, 0);
                m_enemy = m_deathArcherRD;
                break;
            case 4: //left-down
                m_position = new Vector3(5f, -5.3f, 0);
                m_enemy = m_deathArcherRD;
                break;
            default: break;
        }
        Instantiate(m_enemy, m_position, m_rotation);
    }

    public void resetCreatRate() {
        createRate = 0.53f;
        enemyCounter = 0;
        creatList = 0;
        if (isGuiding = true) {
            isGuiding = false;
            isCreateGuideEnemy = true;
        }
    }
}

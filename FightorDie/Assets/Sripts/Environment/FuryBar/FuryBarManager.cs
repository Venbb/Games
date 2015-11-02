using UnityEngine;
using System.Collections;

public class FuryBarManager : MonoBehaviour {

    //public AudioSource skillAudio;
    public Transform Timer321;
    private float origPositionY = 12f;
    private int skillFury = 100;
    private int furyWight = 1;
    private float nowFury = 0;
    private bool isSkillReady = false;
    private bool isLaunchSkill = false;
    private float skillLaunchTime = 5f;
    private float skillLaunchTimer = 0f;
    private float countDownTime = 1.8f;
    private Transform m_transform;
    private bool isCountDown = false;

    public GameObject progressBarHeadObj;
    progressBarHead progressBarHeadScript;
    public GameObject progressBarMidObj;
    progressBarMid progressBarMidScript;
    public GameObject progressBarTailObj;
    progressBarTail progressBarTailScript;
    public GameObject enemyCreatorObj;
    EnemyManager enemyManagerScript;
    public GameObject playerObj;
    PlayerActions playerScript;
    public Camera m_mainCamera;
    CameraChange cameraChangeScript;
    public GameObject liz2Obj;
    Liz2Manager liz2Script;
    public GameObject liz3Obj;
    Liz2Manager liz3Script;
    public GameObject lizObj;
    LizManager lizScript;
    public GameObject heroLiz1Obj;
    Liz2Manager heroLiz1Script;
    public GameObject heroLiz2Obj;
    Liz2Manager heroLiz2Script;
    public GameObject MyPlayerObj;
    NewPlayerGuide m_playerGuideScript;
    public Transform m_Guide;

    private int isGuideSkill;
    private bool isGuiding = false;

    public Transform skillReadyEffect;
    public Transform cloudEffect;
    public Transform skillEffectDown;
    public Transform skillEffectUp;

    private AudioManager m_audioManager;

    private GuideText m_GuideText;
    private GameMaster m_GameMaster;
    // Use this for initialization
    void Start()
    {
        //float positionY = origPositionY / (1920f / 1080f) * (1.0f * Screen.height / Screen.width);
        m_transform = this.transform;
        //m_transform.position = new Vector2(0, positionY);

        progressBarHeadObj = GameObject.Find("progressbar_head");
        progressBarHeadScript = progressBarHeadObj.GetComponent<progressBarHead>();

        progressBarMidObj = GameObject.Find("progressbar_mid");
        progressBarMidScript = progressBarMidObj.GetComponent<progressBarMid>();

        progressBarTailObj = GameObject.Find("progressbar_tail");
        progressBarTailScript = progressBarTailObj.GetComponent<progressBarTail>();

        enemyCreatorObj = GameObject.Find("EnemyCreator");
        enemyManagerScript = enemyCreatorObj.GetComponent<EnemyManager>();

        playerObj = GameObject.Find("Hero");
        playerScript = playerObj.GetComponent<PlayerActions>();

        m_mainCamera = Camera.main;
        cameraChangeScript = m_mainCamera.GetComponent<CameraChange>();

        liz2Obj = GameObject.Find("liz2");
        liz2Script = liz2Obj.GetComponent<Liz2Manager>();

        liz3Obj = GameObject.Find("liz3");
        liz3Script = liz3Obj.GetComponent<Liz2Manager>();

        lizObj = GameObject.Find("liz");
        lizScript = lizObj.GetComponent<LizManager>();

        heroLiz1Obj = GameObject.Find("HeroLiz1");
        heroLiz1Script = heroLiz1Obj.GetComponent<Liz2Manager>();

        heroLiz2Obj = GameObject.Find("HeroLiz2");
        heroLiz2Script = heroLiz2Obj.GetComponent<Liz2Manager>();

        MyPlayerObj = GameObject.Find("MyPlayer");
        m_playerGuideScript = MyPlayerObj.GetComponent<NewPlayerGuide>();

        m_audioManager = GameObject.Find("Audios").GetComponent<AudioManager>();

        m_GuideText = GameObject.Find("GuideText").GetComponent<GuideText>();
        m_GameMaster = GameObject.Find("MainScreen").GetComponent<GameMaster>();
    }

    // Update is called once per frame
    void Update()
    {
        if (isLaunchSkill) {
            float timer = Time.deltaTime;
            skillLaunchTimer += timer;
            if(skillLaunchTimer>=countDownTime && !isCountDown){
                Instantiate(Timer321, new Vector3(0.3f,-3.5f,0), m_transform.rotation);
                isCountDown = true;
            }
            if (skillLaunchTimer >= skillLaunchTime) {
                timer -= skillLaunchTimer - skillLaunchTime;
                isLaunchSkill = false;
                isSkillReady = false;
                cameraChangeScript.recoverChange();
                playerScript.setSkillState(isSkillReady);
                nowFury = 0f;
                skillLaunchTimer = 0f;
                enemyManagerScript.setCreateState(0);
                if (playerScript.playerState != "dead") {
                    enemyManagerScript.killOutsideEnemies(true);
                }
                liz3Script.isLaunchLiz(false);
                lizScript.isLaunchLiz(true);
                heroLiz1Script.isLaunchLiz(false);
                progressBarHeadScript.changeSprite(0);
                progressBarMidScript.changeSprite(0);
                progressBarTailScript.changeSprite(0);
                isCountDown = false;
                playerScript.skillEnd();
            }
            float furyRate = timer / skillLaunchTime;
            progressBarMidScript.increaseScaleXRate(-furyRate);
            progressBarTailScript.increasePositionX(-furyRate);
        }
    }

    void OnGUI()
    {
    }

    public void addFury(float furyValue){
        if (!isSkillReady) {
            //int m_wight = furyWight;
            //if (m_wight < 1)
            //{
            //    m_wight = 1;
            //}
            nowFury += furyValue / furyWight;
            if (nowFury >= skillFury)
            {
                isGuideSkill = m_playerGuideScript.isGuideSkill;
                if (isGuideSkill == 0)
                {
                    if (m_GameMaster.keyBoardControl())
                    {
                        Instantiate(m_Guide, GameObject.Find("progressbar_tail").transform.position + new Vector3(1.5f, -1.6f, 0), Quaternion.Euler(0, 0, 180));
                        m_GuideText.setText("");
                    }
                    else
                    {
                        Instantiate(m_Guide, Vector3.zero, transform.rotation);
                        m_GuideText.setText("TAP  SCREEN");
                    }
                    isGuiding = true;
                }

                nowFury = skillFury;
                isSkillReady = true;
                playerScript.setSkillState(isSkillReady);
                liz2Script.isLaunchLiz(true);
                lizScript.isLaunchLiz(false);
                heroLiz2Script.isLaunchLiz(true);
                progressBarHeadScript.changeSprite(1);
                progressBarMidScript.changeSprite(1);
                progressBarTailScript.changeSprite(1);
                Instantiate(skillEffectDown, playerScript.gameObject.transform.position, playerScript.gameObject.transform.rotation);
                Instantiate(skillEffectUp, playerScript.gameObject.transform.position, playerScript.gameObject.transform.rotation);
            }
            float furyRate = furyValue / furyWight / skillFury;
            progressBarMidScript.increaseScaleXRate(furyRate);
            progressBarTailScript.increasePositionX(furyRate);
        }
    }

    public void launchSkill() {
        isLaunchSkill = true;
        if (skillLaunchTimer == 0) {
            furyWight +=1;
            cameraChangeScript.startChange();
            enemyManagerScript.setCreateState(2);
            //skillAudio.Play();
            liz3Script.isLaunchLiz(true);
            liz2Script.isLaunchLiz(false);
            heroLiz2Script.isLaunchLiz(false);
            heroLiz1Script.isLaunchLiz(true);
            progressBarTailScript.changeSprite(2);
            playerScript.skillStart();
            Instantiate(cloudEffect, playerScript.gameObject.transform.position, playerScript.gameObject.transform.rotation);
            Instantiate(skillReadyEffect, playerScript.gameObject.transform.position, playerScript.gameObject.transform.rotation);
            enemyManagerScript.killOutsideEnemies(false);
            m_audioManager.playThunder();
            m_audioManager.launchSkill();
            if (isGuiding) {
                isGuiding = false;
                isGuideSkill = 1;
                m_playerGuideScript.updateGuide(2);
                Destroy(GameObject.FindGameObjectWithTag("Guide"));
                m_GuideText.setText("");
            }
        }
        //playerScript.setSkillState(isSkillReady);
        progressBarMidScript.launchSkill();
        progressBarTailScript.launchSkill();
        //enemyManagerScript.createRate = enemyManagerScript.createRate * 0.9f;
    }

    public void resetFury() {
        nowFury = 0;
        addFury(0);
        furyWight = 1;
        skillLaunchTimer = 0f;
        isLaunchSkill = false;
        playerScript.resetSkillState();
        progressBarHeadScript.resetHead();
        progressBarMidScript.resetMid();
        isSkillReady = false;
        progressBarTailScript.resetTail();
        heroLiz1Script.isLaunchLiz(false);
        heroLiz2Script.isLaunchLiz(false);
        liz2Script.isLaunchLiz(false);
        liz3Script.isLaunchLiz(false);
        GameObject[] m_heroEffects = GameObject.FindGameObjectsWithTag("HeroSkillEffect");
        for (int i = 0; i < m_heroEffects.Length; i++)
        {
            Destroy(m_heroEffects[i]);
        }

        if (isGuiding) {
            isGuiding = false;
        }
    }
}

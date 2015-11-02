using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ScoreManager : MonoBehaviour {

    public GUISkin mySkin;
    private int Scores = 0;
    private bool isScore = false;

    public GameObject furyBarObj;
    FuryBarManager furyBarScript;
    private float furyPerScore = 100f / 40;

    public GameObject enemyCreatorObj;
    EnemyManager enemyManagerScript;

    public GameObject myPlayerObj;
    M_PlayerPrefs m_playerPrefs;

    public GameObject m_Text_C;
    public GameObject m_Text_E;

    private int speedUpScore = 10;
    private int speedUpScoreCounter = 0;
    private int enemyPercentChangeGate = 30;
    private int enemyPercentChangeCounter = 0;
    private float archerPercent = 0;
    private float demonPercent = 0;

    private float scoreRate = 6;
    private float scoreTimer = 0;

    private int scoreSize = 1;
    //private int trapSetScore = 100;
    //private float trapTime = 5f;
    //private float trapTimer = 0;
    //private bool isTrap = false;
    //public Transform trap;

    public int comboScores = 0;
    private int maxCombo = 0;
    public Transform m_goldDrop;

    private Text m_scoreText;

    Color m_color;
    Color m_color_C;
    private bool isShowScore = false;
    private bool isHideScore = false;
    private float waitTime = 2f;
    Vector2 m_pos;
    Vector2 m_size;

    private Vector3 origScale;
    private Vector3 m_Scale;
    private Transform m_transform;
    private float origCameraSize;
    private float lastCameraSize;
    private bool isSizeChange = false;
    private Camera m_camera;

    private GoldCount m_goldCountText;

	// Use this for initialization
	void Start () {
        furyBarObj = GameObject.Find("FuryBar");
        furyBarScript = furyBarObj.GetComponent<FuryBarManager>();
        myPlayerObj = GameObject.Find("MyPlayer");
        m_playerPrefs = myPlayerObj.GetComponent<M_PlayerPrefs>();

        enemyCreatorObj = GameObject.Find("EnemyCreator");
        enemyManagerScript = enemyCreatorObj.GetComponent<EnemyManager>();

        m_scoreText = this.GetComponent<Text>();
        m_color = m_scoreText.color;
        m_color.a = 0;
        m_scoreText.color = m_color;
        m_Text_E.GetComponent<Text>().color = m_color;
        m_color_C = m_Text_C.GetComponent<Image>().color;
        m_color_C.a = m_color.a;
        m_Text_C.GetComponent<Image>().color = m_color_C;

        m_pos = this.transform.position;
        m_size = new Vector2(1600, 300);

        m_transform = this.transform;
        origScale = m_transform.localScale*1.00000f;
        m_Scale = origScale;
        m_camera = Camera.main.GetComponent<Camera>();
        origCameraSize = m_camera.orthographicSize;
        lastCameraSize = origCameraSize;

        m_goldCountText = GameObject.Find("Gold").GetComponent<GoldCount>();
    }
	
	// Update is called once per frame
	void Update () {
        //if (isTrap) {
        //    trapTimer += Time.deltaTime;
        //    if (trapTimer >= trapTime) {
        //        trapTimer = 0;
        //        isTrap = false;
        //        GameObject[] traps = GameObject.FindGameObjectsWithTag("Trap");
        //        Destroy(traps[0].gameObject);
        //    }
        //}

        //size change
        if (isSizeChange && m_camera.orthographicSize != lastCameraSize) {
            m_transform.localScale = origScale*1.0000f * origCameraSize / m_camera.orthographicSize;
        }

        scoreTimer += Time.deltaTime;
        if (scoreTimer < 1 / scoreRate) {
            return;
        }
	    else if(isScore){
            scoreTimer = 0;
            isScore = false;
            m_scoreText.text = "" + Scores;
        }

        if (isShowScore && m_color.a < 1) {
            waitTime -= Time.deltaTime;
            if (waitTime < 0) {
                m_color.a += 0.05f;
                if (m_color.a >= 1)
                {
                    m_color.a = 1;
                    isShowScore = false;
                    waitTime = 2f;
                }
                m_scoreText.color = m_color;
                m_color_C.a = m_color.a;
                m_Text_C.GetComponent<Image>().color = m_color_C;
                m_Text_E.GetComponent<Text>().color = m_color;
            }
        }else if (isHideScore && m_color.a > 0)
        {
            m_color.a -= 0.05f;
            if (m_color.a <= 0)
            {
                m_color.a = 0;
                isHideScore = false;
            }
            m_scoreText.color = m_color;
            m_color_C.a = m_color.a;
            m_Text_C.GetComponent<Image>().color = m_color_C;
            m_Text_E.GetComponent<Text>().color = m_color;
        }
	}

    public void changeSize(bool TorF) {
        isSizeChange = TorF;
        if (!isSizeChange)
        {
            m_transform.localScale = origScale;
        }
    }

    void OnGUI() {
        //GUI.skin = mySkin;
        //GUI.skin.label.alignment = TextAnchor.MiddleCenter;
        //GUI.skin.label.fontSize = 60;
        //GUI.Label(new Rect(m_pos, m_size), "KILL:" + Scores, "M_ScoreLable");
    }

    public void addScore(Vector3 score_Position) {
        Scores++;
        comboScores++;
        if (comboScores > maxCombo) {
            maxCombo = comboScores;
        }
        isScore = true;
        if (Scores >= 1000) {
            scoreSize = 4;
        }
        else if (Scores >= 100) {
            scoreSize = 3;
        }
        else if (Scores >= 10) {
            scoreSize = 2;
        }
        furyBarScript.addFury(furyPerScore);

        //if (Scores%trapSetScore == 0) {
        //    isTrap = true;
        //    Instantiate(trap, new Vector2(0.2f,-5.6f), Quaternion.Euler(0,0,0));
        //}

        if (Scores % 150 == 0 && M_Functions.RandomInt(2) > 0)
        {
            enemyManagerScript.tryToSendCrows();
        }
        m_playerPrefs.updateHighScore(Scores);

        if (M_Functions.RandomInt(100) < 5)
        {
            m_playerPrefs.addGold(1);
            m_goldCountText.addGold();
            score_Position.y += 1;
            Quaternion score_Rotation = this.transform.rotation;
            if (M_Functions.RandomInt(2) < 1) {
                score_Rotation.y += 180;
            }
            Instantiate(m_goldDrop, score_Position, score_Rotation);
        }

        if (Scores == 10 || Scores == 100 || Scores == 1000 || Scores == 10000) {
            GameObject m_ScoreShowObj = GameObject.Find("Score");
            Vector2 m_pos = m_ScoreShowObj.transform.localPosition;
            m_pos.x -= 0.12f;
            m_ScoreShowObj.transform.localPosition = m_pos;
        }
    }

    public void addSpeedCounter() {
        speedUpScoreCounter++;
        if (speedUpScoreCounter >= speedUpScore)
        {
            speedUpScoreCounter = 0;
            if (enemyManagerScript.createRate > 0.25f) {
                enemyManagerScript.createRate -= 0.014f;
            }
            if (enemyManagerScript.moveTime > 0.17f) {
                enemyManagerScript.moveTime -= 0.008f;
            }
            
        }
        enemyPercentChangeCounter++;
        if (enemyPercentChangeCounter >= enemyPercentChangeGate && demonPercent < 20) {
            enemyPercentChangeCounter = 0;
            if (demonPercent == 0) 
            {
                demonPercent = 5;
            }
            else
            {
                demonPercent += 2;
                if (archerPercent == 0)
                {
                    archerPercent = 5;
                }
                else {
                    archerPercent += 2;
                }
            }
            enemyManagerScript.changeCreatPercent(archerPercent,demonPercent);
        }
    }

    public void highScore() {
        m_playerPrefs.updateNewRecord();
    }

    public int getScores() {
        return Scores;
    }

    public int getMaxCombo() {
        return maxCombo;
    }

    public void showScores()
    {
        isShowScore = true;
    }

    public void hideScores()
    {
        isHideScore = true;
    }

    public void resetScore() {
        maxCombo = 0;
        comboScores = 0;
        Scores = 0;
        scoreSize = 1;
        isScore = true;
        enemyManagerScript.changeCreatPercent(0, 0);
        enemyManagerScript.stopSendCrows();
    }

}

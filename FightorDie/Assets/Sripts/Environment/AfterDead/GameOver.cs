using UnityEngine;
using System.Collections;

public class GameOver : MonoBehaviour {
    private Transform m_transform;
    private bool isGameOver = false;
    private float delayTime = 0f;
    private float timer;
    public GUISkin mySkin;
    public GameObject myPlayerObj;
    M_PlayerPrefs m_playerPrefs;

    public GameObject myHeroObj;
    PlayerActions m_player;
    private bool lackOfGold = false;
    private float warningTime = 3f;

    public Transform m_Canvas;
    private int ReviveTimes = 0;

    // Use this for initialization
    void Start()
    {
        m_transform = this.transform;

        myPlayerObj = GameObject.Find("MyPlayer");
        m_playerPrefs = myPlayerObj.GetComponent<M_PlayerPrefs>();

        myHeroObj = GameObject.Find("Hero");
        m_player = myHeroObj.GetComponent<PlayerActions>();
    }
    // Update is called once per frame
    void Update()
    {
        //if (isGameOver) {
        //    Instantiate(ReviveSence, m_transform.position, m_transform.rotation);
        //}
    }
    void OnGUI()
    {
        if (lackOfGold && warningTime > 0) {
            warningTime -= Time.deltaTime;
            GUI.skin.label.alignment = TextAnchor.MiddleCenter;
            GUI.skin.label.fontSize = 60*Screen.width/1080;
            GUI.Label(new Rect(0, 0, Screen.width, Screen.height), "have no 100 gold");
            if (warningTime < 0) {
                lackOfGold = false;
                warningTime = 3f;
            }
        }
    }

    public void revive(int golds) { 
        if (m_playerPrefs.costGold(golds))
        {
            m_player.revive();
            isGameOver = false;
        }
        else lackOfGold = true;
    }

    public void restart()
    {
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
        GameObject.FindGameObjectWithTag("EnemyManager").GetComponent<EnemyManager>().isPause = false;
        m_player.restart();
        isGameOver = false;
    }

    public void gameover()
    {
        m_Canvas.GetComponent<CreatUISence>().loadRevive();
        GameObject.Find("TouchController").GetComponent<MyTouchController>().PlayerDead();
        try
        {
            Destroy(GameObject.FindGameObjectWithTag("Guide"));
            GameObject.Find("GuideText").GetComponent<GuideText>().setText("");
        }
        catch { }
    }
}

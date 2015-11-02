using UnityEngine;
using System.Collections;

public class M_PlayerPrefs : MonoBehaviour {
    public GUISkin m_skin;
    private string scorePrefKey = "HighScore";
    private int m_highScore;
    private int m_lastHighScore;
    private bool isRecordBreaking = false;

    private string goldPrefKey = "PlayerGold";
    private int m_gold;

    private string musicMute = "MusicMute";
    private int isMusicMute;
    private string audioMute = "AudioMute";
    private int isAudioMute;
	// Use this for initialization
	void Start () {
        m_highScore = PlayerPrefs.GetInt(scorePrefKey,0);
        m_lastHighScore = m_highScore;

        m_gold = PlayerPrefs.GetInt(goldPrefKey, 500);
        isMusicMute = PlayerPrefs.GetInt(musicMute, 0);
        isAudioMute = PlayerPrefs.GetInt(audioMute, 0);
        GameObject.Find("Audios").GetComponent<AudioManager>().playInTitle();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnGUI() {
        GUI.skin = m_skin;
        // 改变字符的大小
        //GUI.skin.label.fontSize = Mathf.FloorToInt(50.0f/1080f*Screen.width);
        //GUI.skin.label.alignment = TextAnchor.UpperLeft;
        //// 输出文字
        //GUI.Label(new Rect(0, 0, Screen.width, Screen.height), "HighScore:"+m_highScore);
        //GUI.Label(new Rect(0, Screen.height/16.0f, Screen.width, Screen.height), "Gold:" + m_gold,"M_GoldLabel");

        //if (isRecordBreaking) {
        //    GUI.skin.label.alignment = TextAnchor.UpperLeft;
        //    GUI.skin.label.fontSize = Mathf.FloorToInt(60.0f / 1080f * Screen.width);
        //    GUI.Label(new Rect(Screen.width / 10 * 4, Screen.height / 10 * 4, Screen.width, Screen.height), "New Record:" + m_highScore);
        //}
    }

    public void updateHighScore(int Scores) {
        if (Scores > m_highScore) {
            m_highScore = Scores;
            PlayerPrefs.SetInt(scorePrefKey, m_highScore);
        }
    }
    public void updateNewRecord()
    {
        if (m_highScore > m_lastHighScore)
        {
            isRecordBreaking = true;
        }
    }

    public void addGold(int n) {
        m_gold += n;
        PlayerPrefs.SetInt(goldPrefKey, m_gold);
    }

    public  int getGolds() {
        return m_gold;
    }

    public bool costGold(int n) {
        if (m_gold >= n)
        {
            m_gold -= n;
            PlayerPrefs.SetInt(goldPrefKey, m_gold);
            return true;
        }
        else return false;
    }

    public void setMusicMute(bool TorF) {
        if (TorF)
        {
            PlayerPrefs.SetInt(musicMute, 1);
        }
        else PlayerPrefs.SetInt(musicMute, 0);
    }

    public bool getMusicMute() {
        bool isMute = false;
        if(PlayerPrefs.GetInt(musicMute, 0)==1) {
            isMute = true;
        }
        return isMute;
    }

    public void setAudioMute(bool TorF)
    {
        if (TorF)
        {
            PlayerPrefs.SetInt(audioMute, 1);
        }
        else PlayerPrefs.SetInt(audioMute, 0);
    }

    public bool getAudioMute()
    {
        bool isMute = false;
        if (PlayerPrefs.GetInt(audioMute, 0) == 1)
        {
            isMute = true;
        }
        return isMute;
    }

}

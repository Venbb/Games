using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class GameMaster : MonoBehaviour {
    private bool isChinese = false; //chinese or english
    private bool isKeyboard = false; //keyboard or touch
	// Use this for initialization
	void Start () {
        if (Application.systemLanguage + "" == "Chinese")
        {
            isChinese = true;
            GameObject[] m_EnglishTexts = GameObject.FindGameObjectsWithTag("Text_E");
            for (int i = 0; i < m_EnglishTexts.Length; i++)
            {
                m_EnglishTexts[i].GetComponent<Text>().enabled = false;
            }
            GameObject[] m_ChineseTexts = GameObject.FindGameObjectsWithTag("Text_C");
            for (int i = 0; i < m_ChineseTexts.Length; i++)
            {
                m_ChineseTexts[i].GetComponent<Image>().enabled = true;
            }
        }
        else
        {
            GameObject[] m_EnglishTexts = GameObject.FindGameObjectsWithTag("Text_E");
            for (int i = 0; i < m_EnglishTexts.Length; i++)
            {
                m_EnglishTexts[i].GetComponent<Text>().enabled = true;
            }
            GameObject[] m_ChineseTexts = GameObject.FindGameObjectsWithTag("Text_C");
            for (int i = 0; i < m_ChineseTexts.Length; i++)
            {
                m_ChineseTexts[i].GetComponent<Image>().enabled = false;
            }
        }


        if (Screen.width > 1024)
        {
            isKeyboard = true;
        }
        else {
            //isKeyboard = true;
            GameObject[] m_keyBoardSigns = GameObject.FindGameObjectsWithTag("KeyBoardSign");
            for (int i = 0; i < m_keyBoardSigns.Length; i++)
            {
                m_keyBoardSigns[i].active = false;
            }
        }
	}

    public bool languageIsChinese() {
        return isChinese;
    }

    public bool keyBoardControl() {
        return isKeyboard;
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnGUI() {
        
    }

    public void Reset() {
        GameObject.Find("Kill").GetComponent<ScoreManager>().resetScore();
        GameObject.Find("FuryBar").GetComponent<FuryBarManager>().resetFury();
        GameObject.Find("EnemyCreator").GetComponent<EnemyManager>().resetCreatRate();
    }

    public void startGame() {
        GameObject.Find("Audios").GetComponent<AudioManager>().playInfight();
        GameObject.Find("Kill").GetComponent<ScoreManager>().showScores();
        //GameObject.Find("Gold").GetComponent<GoldCount>().moveIn();
    }


}

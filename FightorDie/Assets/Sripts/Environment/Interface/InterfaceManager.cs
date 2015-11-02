using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.Events;

public class InterfaceManager : MonoBehaviour {
    //private Transform m_transform;
    
    public GameObject UI_Part;
    private float OutDistance = 15f;
    private Transform m_transform;
    
    //private bool isClickButton = false;
    SkeletonAnimation m_bgAnimation;
    //private bool isAvailable = true;

    public Sprite[] m_buttomImages;
    public SpriteRenderer m_musicImage;
    public SpriteRenderer m_audioImage;
    public M_PlayerPrefs m_prefs;
    private bool isMusicMute;
    private bool isAudioMute;

	// Use this for initialization
	void Start () {
        //m_transform = this.transform;
        //for (int i = 0; i < m_go.Length; i++) {
        //    addButtonListener(m_go[i]);
        //    isActive[i] = false;
        //}
        m_bgAnimation = GameObject.Find("bgAnimation").GetComponent<SkeletonAnimation>();
        m_prefs = GameObject.Find("MyPlayer").GetComponent<M_PlayerPrefs>();
        isMusicMute = m_prefs.getMusicMute();
        isAudioMute = m_prefs.getAudioMute();
        if (isMusicMute) {
            isMusicMute = false;
            switchMusic();
        }
        if (isAudioMute) {
            isAudioMute = false;
            switchAudio();
        }
	}

    //void addButtonListener(GameObject go) {
    //    EventTriggerListener.Get(go).onDown = OnButtonDown;
    //    EventTriggerListener.Get(go).onUp = OnButtonUp;
    //}
	
	// Update is called once per frame
	void Update () {
        //if (Input.GetKeyDown(KeyCode.Space) && isAvailable)
        //{
        //    Camera.main.GetComponent<CameraChange>().startGame();
        //    UI_Part.GetComponent<UI_PartHide>().show();
        //    Shop.GetComponent<ShopManager>().hide(true);
        //    isAvailable = false;
        //}

        //for (int i = 0; i < m_go.Length; i++)
        //{
        //    if (isActive[i]) {
        //        m_go[i].transform.localScale = new Vector2(1.2f,1.2f);
        //        Vector2 newPositin = m_go[i].transform.position;
        //        newPositin.y = m_transform.position.y - 1;
        //        m_go[i].transform.position = newPositin;
        //        return;
        //    }
        //}
	}

    void OnGUI() {
    }

    public void switchMusic() {
        isMusicMute = !isMusicMute;
        m_prefs.setMusicMute(isMusicMute);
        if (!isMusicMute)
        {
            m_musicImage.sprite = m_buttomImages[0];
            GameObject[] m_musics = GameObject.FindGameObjectsWithTag("Musics");
            for (int i = 0; i < m_musics.Length; i++)
            {
                AudioSource[] m_audioSources = m_musics[i].GetComponents<AudioSource>();
                for (int j = 0; j < m_audioSources.Length; j++)
                {
                    m_audioSources[j].mute = false;
                }
            }
        }
        else {
            m_musicImage.sprite = m_buttomImages[1];
            GameObject[] m_musics = GameObject.FindGameObjectsWithTag("Musics");
            for (int i = 0; i < m_musics.Length; i++)
            {
                AudioSource[] m_audioSources = m_musics[i].GetComponents<AudioSource>();
                for (int j = 0; j < m_audioSources.Length; j++)
                {
                    m_audioSources[j].mute = true;
                }
            }
        } 
    }
    public void switchAudio()
    {
        isAudioMute = !isAudioMute;
        m_prefs.setAudioMute(isAudioMute);
        if (!isAudioMute)
        {
            m_audioImage.sprite = m_buttomImages[2];
            GameObject[] m_audios = GameObject.FindGameObjectsWithTag("Audios");
            for (int i = 0; i < m_audios.Length; i++)
            {
                AudioSource[] m_audioSources = m_audios[i].GetComponents<AudioSource>();
                for (int j = 0; j < m_audioSources.Length; j++)
                {
                    m_audioSources[j].mute = false;
                }
            }
        }
        else {
            m_audioImage.sprite = m_buttomImages[3];
            GameObject[] m_audios = GameObject.FindGameObjectsWithTag("Audios");
            for (int i = 0; i < m_audios.Length; i++)
            {
                AudioSource[] m_audioSources = m_audios[i].GetComponents<AudioSource>();
                for (int j = 0; j < m_audioSources.Length; j++)
                {
                    m_audioSources[j].mute = true;
                }
            }
        } 
    }

    //public void setAvailable(bool TorF) {
    //    isAvailable = TorF;
    //}

    public void startGame() {
        Camera.main.GetComponent<CameraChange>().startGame();
        UI_Part.GetComponent<UI_PartHide>().show();
        //isAvailable = false;
    }

    //private void OnButtonDown(GameObject go)
    //{
    //    for (int i = 0; i < m_go.Length; i++)
    //    {
    //        if (go == m_go[i])
    //        {
    //            isClickButton = true;
    //            Vector2 newPostion = go.transform.position;
    //            newPostion.y += 0.8f;
    //            go.transform.position = newPostion;
    //            go.transform.localScale = new Vector2(0.85f, 0.85f);

    //        }
    //    }
    //}

    //private void OnButtonUp(GameObject go)
    //{
    //    for (int i = 0; i < m_go.Length; i++)
    //    {
    //        if (go == m_go[i])
    //        {
    //            isClickButton = false;
    //            Vector2 newPostion = go.transform.position;
    //            newPostion.y -= 3f;
    //            go.transform.position = newPostion;
    //            go.transform.localScale = new Vector2(1f, 1f);
    //            activeButton(i);
    //            return;
    //        }
    //    }
    //}

    //void activeButton(int j) {
    //    inactiveButton();
    //    isActive[j] = true;
    //}

    //void inactiveButton() {
    //    for (int i = 0; i < m_go.Length; i++)
    //    {
    //        if (isActive[i])
    //        {
    //            m_go[i].transform.localScale = new Vector2(1f, 1f);
    //            Vector2 newPositin = m_go[i].transform.position;
    //            newPositin.y = m_transform.position.y;
    //            m_go[i].transform.position = newPositin;
    //            isActive[i] = false;
    //            return;
    //        }
    //    }
    //}

}

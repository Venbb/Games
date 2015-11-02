using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.Events;

public class MyTouchController : MonoBehaviour
{

	public GameObject playerObj;
	PlayerActions playerScript;
	Button button;
	private bool isClickButton = false;
	private bool releaseButton = false;
	private bool pressButton = false;

	Vector2 m_screenpos = new Vector2();
	private int clickJudgePixels;
	private Hashtable m_touchTable = new Hashtable();
	private int lastTouchCount = 0;
	private bool isLongTap = false;
	private float minLongTapTime = 0.5f;
	private float tapTimer = 0f;

	private string touchState = "interface";// interface , fight , revive , settetment, wait

	public GameObject Interface;
	private InterfaceManager Interface_Script;
	private Transform Interface_transform;
	//public GameObject[] m_go;
	//private bool[] isActive = new bool[10];

	public GameObject WatchADs;
	public GameObject GiveUpRevive;
	public GameObject RestartButton;
	public GameObject HomeButton;
	public GameObject reviveButton;
	GameObject DefenceButton;
	private GameMaster m_gameMaster;

	public GameObject StartButton;
	public GameObject QuitButton;

	public GameObject MusicButton;
	public GameObject AudioButton;

	public GameObject UI_Part;
	private UI_PartHide m_UI_Hide;

	private int reviveTimes = 0;
	// Use this for initialization
	void Start()
	{
		Interface_transform = Interface.transform;
		Interface_Script = Interface.GetComponent<InterfaceManager>();

		playerObj = GameObject.Find("Hero");
		playerScript = playerObj.GetComponent<PlayerActions>();

		button = GameObject.Find("DefenceButton").GetComponent<Button>();
		addButtonListener(button.gameObject);
		DefenceButton = GameObject.Find("DefenceBut");

		m_UI_Hide = UI_Part.GetComponent<UI_PartHide>();

		addButtonListener(WatchADs);
		addButtonListener(GiveUpRevive);
		addButtonListener(RestartButton);
		addButtonListener(HomeButton);
		addButtonListener(reviveButton);
		addButtonListener(StartButton);
		addButtonListener(QuitButton);
		addButtonListener(MusicButton);
		addButtonListener(AudioButton);
		//for (int i = 0; i < m_go.Length; i++)
		//{
		//    addButtonListener(m_go[i]);
		//    isActive[i] = false;
		//}

		Input.multiTouchEnabled = true;
		clickJudgePixels = 1600 * Screen.width / 1080;

		m_gameMaster = GameObject.Find("MainScreen").GetComponent<GameMaster>();
		//EventTriggerListener.Get(button.gameObject).onClick = OnButtonClick;
	}

	void addButtonListener(GameObject go)
	{
		EventTriggerListener.Get(go).onDown = OnButtonDown;
		EventTriggerListener.Get(go).onUp = OnButtonUp;
	}

	void tryLightKeyBoard(int i)
	{
		if (!m_gameMaster.keyBoardControl())
		{
			return;
		}
		else
		{
			//0:up 1:down 2:left 3:right
			GameObject.Find("KeyBoard").GetComponent<KeyBoardManager>().lightAttackKey(i);
		}
	}

	// Update is called once per frame
	void Update()
	{
		switch (touchState)
		{
			case "interface":
				if (InputHelper.GetKeyDown(KeyCode.Space) || InputHelper.GetKeyDown(KeyCode.J))
				{
					Interface_Script.startGame();
					m_gameMaster.startGame();
					touchState = "wait";
					m_UI_Hide.TryHideKeySign(false);
				}
				if (InputHelper.GetKeyDown(KeyCode.L))
				{
					Application.Quit();
				}
				if (InputHelper.GetKeyDown(KeyCode.I))
				{
					Interface_Script.switchMusic();
				}
				if (InputHelper.GetKeyDown(KeyCode.K))
				{
					Interface_Script.switchAudio();
				}

				MobileInputUI();
				break;
			case "fight":
				if (InputHelper.GetKeyDown(KeyCode.D))
				{
					playerScript.touchEvent(1);
					tryLightKeyBoard(3);
				}
				;
				if (InputHelper.GetKeyDown(KeyCode.A))
				{
					playerScript.touchEvent(2);
					tryLightKeyBoard(2);
				}
				;
				if (InputHelper.GetKeyDown(KeyCode.W))
				{
					playerScript.touchEvent(3);
					tryLightKeyBoard(0);
				}
				;
				if (InputHelper.GetKeyDown(KeyCode.S))
				{
					playerScript.touchEvent(4);
					tryLightKeyBoard(1);
				}
				;
				if (InputHelper.GetKeyDown(KeyCode.J))
				{
					playerScript.touchEvent(7);
				}
				if (InputHelper.GetKeyDown(KeyCode.Space) || InputHelper.GetKeyDown(KeyCode.L))
				{
					playerScript.touchEvent(5);
				}
				MobileInput();
				break;
			case "revive":
				if (InputHelper.GetKeyDown(KeyCode.J))
				{
					revive();
				}
				if (InputHelper.GetKeyDown(KeyCode.L))
				{
					//give up revive
					resetReviveTimes();
					GameObject.Find("Canvas").GetComponent<CreatUISence>().loadSettetment();
					touchState = "wait";
				}
				break;
			case "settetment":
				if (InputHelper.GetKeyDown(KeyCode.L))
				{
					Application.LoadLevel("FightOrDie_Landscape");
				}
				if (InputHelper.GetKeyDown(KeyCode.J))
				{
					restart();
				}
				break;
			default:
				break;
		}

		if (releaseButton)
		{
			isClickButton = false;
			releaseButton = false;
		}
	}

	void OnGUI()
	{
	}

	public void PlayerDead()
	{
		touchState = "wait";
		m_UI_Hide.TryHideKeySign(true);
	}

	public string getTouchState()
	{
		return touchState;
	}

	public void setTouchState(string newState)
	{
		touchState = newState;
	}

	private void OnButtonDown(GameObject go)
	{
		if (go == button.gameObject)
		{
			DefenceButton.GetComponent<SkeletonAnimation>().state.SetAnimation(2, "animation2", true);
			playerScript.touchEvent(7);
			isClickButton = true;
		}

		if (go == WatchADs)
		{
			isClickButton = true;
		}
		if (go == GiveUpRevive)
		{
			isClickButton = true;
		}
		if (go == RestartButton)
		{
			isClickButton = true;
		}
		if (go == HomeButton)
		{
			isClickButton = true;
		}
		if (go == reviveButton)
		{
			isClickButton = true;
		}
		if (go == StartButton)
		{
			isClickButton = true;
		}
		if (go == QuitButton)
		{
			isClickButton = true;
		}
		if (go == MusicButton)
		{
			isClickButton = true;
		}
		if (go == AudioButton)
		{
			isClickButton = true;
		}


	}

	private void OnButtonUp(GameObject go)
	{
		if (go == button.gameObject)
		{
			DefenceButton.GetComponent<SkeletonAnimation>().Reset();
			playerScript.touchEvent(0);
			releaseButton = true;
		}

		if (go == WatchADs)
		{
			//if (Advertisement.isReady()) { Advertisement.Show(); }
			releaseButton = true;
		}
		if (go == GiveUpRevive)
		{
			resetReviveTimes();
			GameObject.Find("Canvas").GetComponent<CreatUISence>().loadSettetment();
			touchState = "wait";
			releaseButton = true;
		}
		if (go == RestartButton)
		{
			restart();
			releaseButton = true;
		}
		if (go == HomeButton)
		{
			Application.LoadLevel("FightOrDie_Landscape");
			releaseButton = true;
		}
		if (go == reviveButton)
		{
			releaseButton = true;
			revive();
		}

		if (go == StartButton)
		{
			Interface_Script.startGame();
			m_gameMaster.startGame();
			touchState = "fight";
			m_UI_Hide.TryHideKeySign(false);
		}
		if (go == QuitButton)
		{
			Application.Quit();
		}
		if (go == MusicButton)
		{
			Interface_Script.switchMusic();
		}
		if (go == AudioButton)
		{
			Interface_Script.switchAudio();
		}
	}

	public void resetReviveTimes()
	{
		reviveTimes = 0;
	}
	public int getReviveGolds()
	{
		return 100 * (int)Mathf.Pow(2, reviveTimes);
	}

	void MobileInputUI()
	{
		if (Input.touchCount <= 0)
		{
			return;
		}
		if (Input.touchCount == 1)
		{
			if (Input.touches [0].phase == TouchPhase.Began)
			{
				m_screenpos = Input.touches [0].position;
			}
			if (Input.touches [0].phase == TouchPhase.Ended && Input.touches [0].phase != TouchPhase.Canceled)
			{
				Vector2 pos = Input.touches [0].position;
				if (Mathf.Pow((m_screenpos.x - pos.x), 2) + Mathf.Pow((m_screenpos.y - pos.y), 2) < clickJudgePixels)
				{
					if (!isClickButton)
					{
						Interface_Script.startGame();
						m_gameMaster.startGame();
						touchState = "fight";
						m_UI_Hide.TryHideKeySign(false);
					}
				}
			}
		}
	}


	//mobile input function
	void MobileInput()
	{
		if (Input.touchCount <= 0)
		{
			return;
		}
		if (Input.touchCount == 1)
		{
			if (Input.touches [0].phase == TouchPhase.Began)
			{
				m_screenpos = Input.touches [0].position;
				m_touchTable.Add(Input.touches [0].position, Time.time);
			}
			if (Input.touches [0].phase == TouchPhase.Stationary)
			{
				Vector2 pos = Input.touches [0].position;
				if (Mathf.Pow((m_screenpos.x - pos.x), 2) + Mathf.Pow((m_screenpos.y - pos.y), 2) < clickJudgePixels)
				{
					tapTimer += Time.deltaTime;
					if (tapTimer >= minLongTapTime)
					{
						isLongTap = true;
						playerScript.touchEvent(7);
					}
				}
			}
			if (Input.touches [0].phase == TouchPhase.Ended && Input.touches [0].phase != TouchPhase.Canceled)
			{

				m_touchTable.Clear();
				Vector2 pos = Input.touches [0].position;
				tapTimer = 0f;
				if (Mathf.Pow((m_screenpos.x - pos.x), 2) + Mathf.Pow((m_screenpos.y - pos.y), 2) < clickJudgePixels)
				{
					//click or longTap
					if (isLongTap)
					{
						isLongTap = false;
						playerScript.touchEvent(0);
					}
					else if (!isClickButton)
						playerScript.touchEvent(5);
				}
				else if (lastTouchCount > 1)
				{
					judgeClickEvent(Input.touches [0]);
				}
				else
				{
					//slide

					//horizontal slide
					if (Mathf.Abs(m_screenpos.x - pos.x) > Mathf.Abs(m_screenpos.y - pos.y))
					{
						if (m_screenpos.x > pos.x)
						{
							// left
							playerScript.touchEvent(2);
							//shakeScreenScript.shakeScreen(12);
						}
						else
						{
							//right
							playerScript.touchEvent(1);
							//shakeScreenScript.shakeScreen(13);
						}
					}
                    //
                    else
					{
						if (m_screenpos.y > pos.y)
						{
							// down
							playerScript.touchEvent(4);
							//shakeScreenScript.shakeScreen(15);
						}
						else
						{
							//up
							playerScript.touchEvent(3);
							//shakeScreenScript.shakeScreen(14);
						}
					}
				}
				lastTouchCount = 1;
			}
		}
		else if (Input.touchCount > 1)
		{
			// more than one point
			int touchCount = Input.touchCount;
			for (int i = 0; i < touchCount; i++)
			{
				Touch touch = Input.touches [i];
				if (touch.phase == TouchPhase.Began)
				{
					m_touchTable.Add(touch.position, Time.time);
				}
				if (touch.phase == TouchPhase.Ended && touch.phase != TouchPhase.Canceled)
				{
					judgeClickEvent(touch);
					lastTouchCount = touchCount;
				}

			}
		}
	}

	void judgeClickEvent(Touch touch)
	{
		float touchX = touch.position.x;
		float touchY = touch.position.y;

		foreach (DictionaryEntry de in m_touchTable)
		{
			Vector2 touchPos = (Vector2)de.Key;
			float time = (float)de.Value;
			if (Time.time - time > 0.5f)
			{
				m_touchTable.Remove(de.Key);
			}
			else if (Mathf.Pow(touchX - touchPos.x, 2) + Mathf.Pow(touchY - touchPos.y, 2) < clickJudgePixels)
			{
				//actionNumber = 5;
				//furyBarScript.launchSkill();
				//isLaunchSkill = true;
				playerScript.touchEvent(5);
			}
		}
	}

	private void revive()
	{
		int needGold = 100 * (int)Mathf.Pow(2, reviveTimes);
		//int needGold = 10;
		if (needGold <= GameObject.Find("MyPlayer").GetComponent<M_PlayerPrefs>().getGolds())
		{
			GameObject.Find("GameOver").GetComponent<GameOver>().revive(needGold);
			GameObject.Find("Gold").GetComponent<GoldCount>().costGold(needGold);
			touchState = "fight";
			m_UI_Hide.TryHideKeySign(false);
			reviveTimes++;
			try
			{
				GameObject.FindGameObjectWithTag("ReviveSence").GetComponent<ReviveManager>().setAviliable(false);
			}
			catch
			{ 
				Debug.Log("something wrong with revive!!!"); 
			}
		}
		else
			GameObject.FindGameObjectWithTag("ReviveSence").GetComponent<ReviveManager>().lackOfGold();
	}

	private void restart()
	{
		touchState = "fight";
		m_UI_Hide.TryHideKeySign(false);
		m_gameMaster.Reset();
		GameObject.Find("GameOver").GetComponent<GameOver>().restart();
		try
		{
			Destroy(GameObject.FindGameObjectWithTag("CloudEffect"));
		}
		catch
		{
		}
		try
		{
			GameObject.FindGameObjectWithTag("SettetmentSence").GetComponent<SettetmentManager>().setAviliable(false);
			Destroy(GameObject.FindGameObjectWithTag("CloudEffect"));
		}
		catch
		{
			//Debug.Log("something wrong with restart!!!");
		}
	}
}

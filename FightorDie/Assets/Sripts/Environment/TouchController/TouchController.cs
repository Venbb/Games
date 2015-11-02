using UnityEngine;
using System.Collections;

public class TouchController : MonoBehaviour
{
	//private int actionNumber = 0; //0:breath, 1:right , 2:left , 3:up , 4:down
	Vector2 m_screenpos = new Vector2();
	private int clickJudgePixels;
	private Hashtable m_touchTable = new Hashtable();
	private int lastTouchCount = 0;
	public GameObject playerObj;
	PlayerActions playerScript;
	private bool isLongTap = false;
	private float minLongTapTime = 0.5f;
	private float tapTimer = 0f;

	// Use this for initialization
	void Start()
	{
		Input.multiTouchEnabled = true;
		playerObj = GameObject.Find("Hero");
		playerScript = playerObj.GetComponent<PlayerActions>();
		clickJudgePixels = 1600 * Screen.width / 1080;
		//easyTouchControl();
	}
	
	// Update is called once per frame
	void Update()
	{
		if (InputHelper.GetKeyDown(KeyCode.D))
		{
			playerScript.touchEvent(1);
		}
		;
		if (InputHelper.GetKeyDown(KeyCode.A))
		{
			playerScript.touchEvent(2);
		}
		;
		if (InputHelper.GetKeyDown(KeyCode.W))
		{
			playerScript.touchEvent(3);
		}
		;
		if (InputHelper.GetKeyDown(KeyCode.S))
		{
			playerScript.touchEvent(4);
		}
		;
		if (InputHelper.GetKeyDown(KeyCode.J))
		{
			playerScript.touchEvent(7);
		}
		if (InputHelper.GetKeyDown(KeyCode.Space))
		{
			playerScript.touchEvent(5);
		}
		MobileInput();
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
					else
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

	void easyTouchControl()
	{
		EasyTouch.On_SwipeEnd += EasyTouch_On_SwipeEnd;
		EasyTouch.On_LongTapEnd += EasyTouch_On_LongTapEnd;
		EasyTouch.On_SimpleTap += EasyTouch_On_SimpleTap;
		EasyTouch.On_SimpleTap2Fingers += EasyTouch_On_SimpleTap2Fingers;
	}

	void EasyTouch_On_SimpleTap2Fingers(Gesture gesture)
	{
		playerScript.touchEvent(5);
	}

	void EasyTouch_On_SimpleTap(Gesture gesture)
	{
		playerScript.touchEvent(5);
	}

	void EasyTouch_On_LongTapEnd(Gesture gesture)
	{
        
	}

	void EasyTouch_On_SwipeEnd(Gesture gesture)
	{
		switch (gesture.swipe + "")
		{
			case "Left":
				playerScript.touchEvent(2);
				break;
			case "Right":
				playerScript.touchEvent(1);
				break;
			case "Up":
				playerScript.touchEvent(3);
				break;
			case "Down":
				playerScript.touchEvent(4);
				break;
			default:
				break;
		}
	}
}

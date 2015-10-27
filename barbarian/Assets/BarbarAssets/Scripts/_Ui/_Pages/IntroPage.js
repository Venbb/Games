#pragma strict

class IntroPage extends Page
{
	var m_continueButtonInfo : HudInfo;

	var m_useNextPage : boolean = false;
	var m_nextPage : String;
	
	var m_useNextLevel : boolean = false;
	var m_nextLevel : String;
	
	var m_fadeInTime : float = 1.0f;
	private var m_currentTimer : float = 0.0f;
	//joystick
	private var m_JoyStickNext:boolean;
	
	function Awake()
	{
		m_currentTimer = 0.0f;
		m_continueButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_continueButtonInfo.position);
	}

	function Update()
	{
		var map = InputKeyCodeMapHelper.mapKeys;
		if(Input.GetButtonDown(EInputStringName.Next.ToString()) || Input.GetKeyUp(map["LeftFlipper"].ToString()))  //page back
		{
		   
		     m_JoyStickNext=true;
		    
			AudioManager.Singleton().PlayButtonAudio();
		}
		else
		{
		     m_JoyStickNext= false;

		}
		m_currentTimer += Time.deltaTime;
	}
	
	function OnGUI()
	{
		if (m_currentTimer <= m_fadeInTime)
		{
			GUI.color.a = Mathf.Lerp(0.0, 1.0, m_currentTimer / m_fadeInTime);
		}
		
		OnBackground();
		
		GUI.color.a = 1;
		
		OnContinueButton();
	}	
				
	function OnContinueButton()
	{		
		if ( PageButton(m_continueButtonInfo) ||m_JoyStickNext)
		{
			//SwitchPageTo(m_nextPage);
			SetEnabled(false);
			if (m_useNextPage)
			{
				UiManager.Singleton().SwitchPage(this, m_nextPage);
				return;
			}
			else if (m_useNextLevel)
			{
				SwitchLevelTrigger.SwitchLevel(m_nextLevel, "", true, 0, false);
			}
		}
	}
}
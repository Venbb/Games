#pragma strict

class GameEnd_Text extends Page
{
	class LevelDifficutyText
	{
		var text : String[];
	}
	
	var m_useNextPage : boolean = false;
	var m_nextPage : String;
	
	var m_useNextLevel : boolean = false;
	var m_nextLevel : String;
	
	var m_fadeInTime : float = 1.0f;
	var m_maxDisplayTime : float = 3.0f;
	var m_minDisplayTime : float = 0.3f;
	var m_textInfo : HudInfo;
	var m_texts : LevelDifficutyText[];
	
	private var m_currentTimer : float = 0.0f;
	
	function Awake()
	{
		m_currentTimer = 0.0f;
		m_textInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_textInfo.position);
	}

	function Update()
	{
		m_currentTimer += Time.deltaTime;
		
		OnContinue();
	}
	
	function OnGUI()
	{
		if (m_currentTimer <= m_fadeInTime)
		{
			GUI.color.a = Mathf.Lerp(0.0, 1.0, m_currentTimer / m_fadeInTime);
		}
		OnBackground();
		
		GUI.color.a = 1;

		
		GUI.color = Color.yellow;
		if (m_currentTimer <= m_fadeInTime)
		{
			GUI.color.a = Mathf.Lerp(0.0, 1.0, m_currentTimer / m_fadeInTime);
		}
		
		OnText();
		
		GUI.color.a = 1;
		
		GUI.color = Color.white;
		OnContinue();
	}	
	
	function OnText()
	{
		PageText(m_textInfo, m_texts[GameOptionsManager.Singleton().GetLanguage()].text[GameManager.Singleton().GetDifficulty()]);
	}
	
	function OnContinue()
	{		
		if ( m_currentTimer >= m_minDisplayTime
			&& (Input.anyKeyDown || Input.touchCount > 0 || m_currentTimer >= m_maxDisplayTime)
			)
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
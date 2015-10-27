#pragma strict

class CharacterButtonInfo extends HudInfo
{
	var enable : boolean = false;
	var actorName : String = "";
}

class CharacterSelectPage extends Page
{
	//var m_nextPage : String;

	var m_backButtonInfo : HudInfo;
	var m_backLevel : String;
	var m_characterButtons : CharacterButtonInfo[];
	
	var m_titlePosition : Vector2;
	var m_title : Texture;
	
	var m_nextLevel : String;
	
	private var i : int = 0;
	//joystick
	private var m_joyStickButtonDown:boolean;
	function Awake()
	{
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_titlePosition = UiManager.Singleton().ConvertToDeviceScreenPosition(m_titlePosition);
		
		for (i = 0; i < m_characterButtons.length; ++i)
		{
			m_characterButtons[i].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_characterButtons[i].position);
		}
	}
	function Update()
	{
		var map = InputKeyCodeMapHelper.mapKeys;
		
		if(Input.GetButtonDown(EInputStringName.Fire1.ToString()) || Input.GetKeyUp(map["Y"].ToString()))
		{

			m_joyStickButtonDown=true;
		}
		else
		{
			m_joyStickButtonDown=false;
		}
		
		if (Input.GetKeyUp(map["X"].ToString()))
		{
			BackAction();
			AudioManager.Singleton().PlayButtonAudio();
		}
	}
	function OnGUI()
	{
		OnBackground();
		
		OnTitle();
		
		OnBackButton();
		OnCharacterButtons();
	}
	
	function OnTitle()
	{
		GUI.DrawTexture(Rect(m_titlePosition.x, 
					m_titlePosition.y,
					m_title.width * UiManager.Singleton().GetScreenSizeFactor().x,
					m_title.height * UiManager.Singleton().GetScreenSizeFactor().y),
					m_title, 
					ScaleMode.StretchToFill, 
					true);
	}
	
	function BackAction()
	{
		GameManager.Singleton().SetPlayerCount(0);
		SetEnabled(false);
			
		SwitchLevelTrigger.SwitchLevel(m_backLevel, "", true, 0, false);
	}
	
	function OnBackButton()
	{		
		if ( PageButton(m_backButtonInfo) )
		{
			// Clear player count
			BackAction();
		}
	}
	
	function OnCharacterButtons()
	{	
		for (i = 0; i < m_characterButtons.length; ++i)
		{
			if (m_characterButtons[i].enable == true)
			{
				GUI.enabled = true;
				
				if ( PageButton(m_characterButtons[i])||m_joyStickButtonDown )
				{
					GameManager.Singleton().SetPlayerCount(1);
					GameManager.Singleton().SetActor(m_characterButtons[i].actorName, 0);
					GameManager.Singleton().SetDifficulty(EGameDifficulty.Normal);
				
					SetEnabled(false);
					SwitchLevelTrigger.SwitchLevel(m_nextLevel, "", true, 0, false);
				}
			}
			else
			{
				//GUI.enabled = false;
				//PageLabel(m_characterButtons[i]);
			}
		}
	}
	
} 
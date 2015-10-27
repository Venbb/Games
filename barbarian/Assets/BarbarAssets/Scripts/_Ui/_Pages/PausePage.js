#pragma strict

class PausePage extends Page
{
	var m_textInfo : HudInfo;
	var m_backButtonInfo : HudInfo;
	var m_mainMenuButtonInfo : HudInfo;
	var m_mainMenu : String;

	function Awake()
	{
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_textInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_textInfo.position);
		m_mainMenuButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_mainMenuButtonInfo.position);
	}

	function OnGUI()
	{
		OnText();
		OnBackButton();
		OnMainMenuButtonButton();
	}

	function OnText()
	{
		GUI.Label( GetRect(m_textInfo, m_customSkin),
						 "Pause" ,
						 m_customSkin.customStyles[m_textInfo.customStyleIndex]);


	}
	
	function OnBackButton()
	{		
		if ( GUI.Button( GetRect(m_backButtonInfo, m_customSkin),
						 "Back" ,
						 m_customSkin.customStyles[m_backButtonInfo.customStyleIndex]) 
			)
		{
			SceneManager.Singleton().StopGame(false);
			SwitchPageTo(m_prePage);
			SetEnabled(false);
		}
	}
	
	function OnMainMenuButtonButton()
	{		
		if ( GUI.Button( GetRect(m_mainMenuButtonInfo, m_customSkin),
						 "MainMenu" ,
						 m_customSkin.customStyles[m_mainMenuButtonInfo.customStyleIndex]) 
			)
		{
			SceneManager.Singleton().StopGame(false);
			SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel("MainMenu", Application.loadedLevelName, true, 0, true);
		}
	}
}
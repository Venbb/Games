#pragma strict

class LevelButtonInfo extends HudInfo
{
	var m_levelName : String;
	var enabled : boolean = true;
}

class LevelList extends Page
{
	var m_levelButtonInfos : LevelButtonInfo[];

	var m_backButtonInfo : HudInfo;
	var m_backLevel : String;


	function Awake()
	{
		for (var i = 0; i < m_levelButtonInfos.length; ++i)
		{
			m_levelButtonInfos[i].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_levelButtonInfos[i].position);
		}
	}

	function OnGUI()
	{
		for (var i = 0; i < m_levelButtonInfos.length; ++i)
		{
			if (m_levelButtonInfos[i].enabled)
			{
				OnLevelButton(m_levelButtonInfos[i]);
			}
		}

		OnBackButton();
	}
	
	function OnBackButton()
	{		
		if ( PageButton( m_backButtonInfo) )
		{
			SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_backLevel, "", true, 0, false);
		}
	}
	
	function OnLevelButton(info : LevelButtonInfo)
	{	
		if ( PageButton(info as HudInfo) )
		{
				// to do, for one player is working well; but for more?  i need to more things
				GameManager.Singleton().SetPlayerCount(1);
				GameManager.Singleton().SetActor(PreviewLabs.PlayerPrefs.GetString("m_lastPlayedActor"), 0);
				GameManager.Singleton().Load();
				
				SetEnabled(false);
				
				SwitchLevelTrigger.SwitchLevel(info.m_levelName, "", true, 0, false);
		}
	}
} 
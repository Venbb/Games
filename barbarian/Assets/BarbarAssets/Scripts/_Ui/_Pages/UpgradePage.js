#pragma strict

class LevelIndex
{
	var levelName : String = "";
	var index : int = 0;
}

class UpgradePage extends Page
{
	var m_mapMarkInfo : PageInfo[];
	var m_mapMarkTexture : Texture;
	var m_mapLockTexture : Texture;
	
	var m_upgradeButtonInfo : HudInfo;
	var m_upgradeLevel : String;
	var m_startButtonInfo : HudInfo;
	
	private var m_display : boolean = true;
	private var m_timer : float = 0;
	var m_diplayTime : float = 0.8f;
	
	var m_levelIndexArray : LevelIndex[];
	private var m_levelIndex : int = 0;
	
	var m_backButtonInfo : HudInfo;
	var m_backLevel : String;
	//joystick
	var m_currentMenuIndex : int;
	public var m_currentMenuCursor : Texture;
	var NowButtenID:ECurrentButtenID;
	var m_joyNum:int;
	private  var  m_joyStickButtonDown:boolean;
	private  var m_JoyStickBack:boolean;
	var m_buttenPressTime:ButtenPressTime;
	function Awake()
	{
	    NowButtenID=ECurrentButtenID.Start;
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_upgradeButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_upgradeButtonInfo.position);
		m_startButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_startButtonInfo.position);	
		
		for ( var i : int = 0; i < m_mapMarkInfo.length; ++i)
		{
			m_mapMarkInfo[i].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_mapMarkInfo[i].position);
		}
		
		m_timer = 0.0f;
		m_display = true;
		

	}
	
	function Start()
	{
		if (SceneManager.Singleton())
		{
			SceneManager.Singleton().StopGame(true);
			var currentLevelName : String = GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level;
			for (var i : int= 0; i < m_levelIndexArray.length; ++i)
			{
				if (currentLevelName == m_levelIndexArray[i].levelName)
				{
					m_levelIndex = m_levelIndexArray[i].index;
				}
			}
		}
		Time.timeScale = GameManager.Singleton().GetOriTimeScale();
	}
	
	function OnDisable()
	{
		if (SceneManager.Singleton())
		{
			SceneManager.Singleton().StopGame(false);
		}
		
		Time.timeScale = GameManager.Singleton().GetOriTimeScale();
	}
	
	function Update()
	{
		m_timer += Time.deltaTime;
		
		if (m_timer >= m_diplayTime)
		{
			m_timer = 0.0f;
			m_display = !m_display;
		}
	
		if (UiManager.Singleton().GetCurrentPage() != this)
		{
			if (GameManager.Singleton().IsFirstTimeRunGame())
			{
				SetEnabled(false);
				SwitchPageTo("InGameHud");
				//SceneManager.Singleton().StopGame(false);
			}
			else
			{
				SwitchPageTo(m_pageName);
				//SceneManager.Singleton().StopGame(true);
			}
		}
		if(m_joyNum>=1)
	  {
	  m_joyNum=0;
	  }
     if(Input.GetButtonDown(EInputStringName.Fire1.ToString()))
				{
				
				m_joyStickButtonDown=true;
				}
		   else
		   {
		        m_joyStickButtonDown=false;
		   }
		   
	  if(Input.GetButtonDown(EInputStringName.Back.ToString()))  //page back
       {
           
             m_JoyStickBack=true;
            
       }
		
		
		//joystick
		var map = InputKeyCodeMapHelper.mapKeys;
		if (Input.GetKeyUp(map["up"].ToString()))
		{
			m_currentMenuIndex--;
			if (m_currentMenuIndex < 0)
			{
				m_currentMenuIndex = 0;
			}
		}
		
		if (Input.GetKeyUp(map["down"].ToString()))
		{
			m_currentMenuIndex++;
			if (m_currentMenuIndex > 1)
			{
				m_currentMenuIndex = 1;
			}
		}
		
		if (Input.GetKeyUp(map["Y"].ToString()))
		{
			switch(m_currentMenuIndex)
			{
			case 0:
				ShowGameView();
				break;
			case 1:
				ShowUpgradeView();
				break;
			default:
				break;
			}
			
			AudioManager.Singleton().PlayButtonAudio();
		}
		
		if (Input.GetKeyUp(map["X"].ToString()))
		{
			AudioManager.Singleton().PlayButtonAudio();
			ShowMainView();
		}
		
	}
	
	function OnMapMark()
	{		
		for ( var i = 0; i < m_mapMarkInfo.length; ++i)
		{
			if (i < m_levelIndex)
			{
				GUI.Label(	Rect(m_mapMarkInfo[i].position.x, 
								 m_mapMarkInfo[i].position.y, 
								 m_mapMarkTexture.width, 
								 m_mapMarkTexture.height), m_mapMarkTexture );
			}
			else if ( i == m_levelIndex)
			{
				if (m_display)
				{
					GUI.color = Color.red;
					GUI.Label(	Rect(m_mapMarkInfo[i].position.x, 
								 m_mapMarkInfo[i].position.y, 
								 m_mapMarkTexture.width, 
								 m_mapMarkTexture.height), m_mapMarkTexture );
					GUI.color = Color.white;
				}
			}
			else
			{
				GUI.Label(	Rect(m_mapMarkInfo[i].position.x, 
								 m_mapMarkInfo[i].position.y, 
								 m_mapLockTexture.width, 
								 m_mapLockTexture.height), m_mapLockTexture );
			}
		}
	}

	function OnGUI()
	{
		OnBackground();
		
		OnBackButton();
		
		OnMapMark();
		
		OnUpgradeButton();
//		JoyStickOnUpgrade();
		
		OnStartButton();
//		JoyStickOnStart();

		OnCursor();
	}
	
	function OnCursor()
	{
		if (!ReleaseHelper.supportJoystick) {
			return;
		}
		var pos : Vector2;
		switch(m_currentMenuIndex)
		{
		case 0:
			pos = m_startButtonInfo.position;
			break;
		case 1:
			pos = m_upgradeButtonInfo.position;
			break;
		default:
			pos = m_startButtonInfo.position;
			break;
		}
		
		GUI.DrawTexture(Rect(pos.x + 100, pos.y + 50, m_currentMenuCursor.width, m_currentMenuCursor.height), m_currentMenuCursor, ScaleMode.ScaleAndCrop, true);
	}
	
	function ShowUpgradeView()
	{
		SwitchLevelTrigger.SwitchLevel(m_upgradeLevel, "", true, 0, false);
		SetEnabled(false);
	}
	
	function OnUpgradeButton()
	{
		if ( PageButton(m_upgradeButtonInfo) )
		{
			//SwitchPageTo(m_upgradeButtonPage);
			
			ShowUpgradeView();
		}
	}
	function JoyStickOnUpgrade()
	{
	if(NowButtenID==ECurrentButtenID.Upgrade)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               //NowButtenID=ECurrentButtenID.Upgrade;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               NowButtenID=ECurrentButtenID.Start;
	       }
	          
	        }
	        OptionsPageLabel(10,m_upgradeButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	        SwitchLevelTrigger.SwitchLevel(m_upgradeLevel, "", true, 0, false);
			SetEnabled(false);
	        }
	    }
	
	}
	
	function ShowGameView()
	{
		SetEnabled(false);
//		SwitchPageTo("InGameHud");
		SwitchLevelTrigger.SwitchLevel(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level, "", true, 0, false);
	}
	
	function OnStartButton()
	{
		if ( PageButton(m_startButtonInfo) )
		{
			ShowGameView();
		}
	}
	
	function JoyStickOnStart()
	{
	if(NowButtenID==ECurrentButtenID.Start)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.Upgrade;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	              // NowButtenID=ECurrentButtenID.IsPhone;
	       }
	          
	        }
//	        OptionsPageLabel(10,m_startButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	        SetEnabled(false);
			SwitchPageTo("InGameHud");
			//SceneManager.Singleton().StopGame(false);
			
			SwitchLevelTrigger.SwitchLevel(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level, "", true, 0, false);
	        }
	    }
	}
	
	function ShowMainView()
	{
		GameOptionsManager.Singleton().Save();
		SetEnabled(false);

		SwitchLevelTrigger.SwitchLevel(m_backLevel, "", true, 0, false);
	}
	
	function OnBackButton()
	{		
		if ( PageButton(m_backButtonInfo)||m_JoyStickBack )
		{
			// Save changes
			ShowMainView();
		}
	}
}
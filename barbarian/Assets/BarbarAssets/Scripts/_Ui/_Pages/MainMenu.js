#pragma strict

class MainMenu extends Page
{
	var m_logoTexture : Texture;
	var m_logoPos : Vector2;
	
	var m_playButtonInfo : HudInfo;
	var m_firstTimePlayLevel : String;
	var m_normalPlayLevel : String;
	
	var m_tutorialButtonInfo : HudInfo;
	var m_tutorialLevel : String;
	
	var m_optionsButtonInfo : HudInfo;
	var m_optionsLevel : String;
	
	var m_creditsButtonInfo : HudInfo;
	var m_creditsLevel : String;
	
	
	var m_defaultActorName : String = "Kato";
	
	var m_levelChooseButtonInfo : HudInfo;
	var m_levelChooseLevel : String;
	
	var m_facebookButtonInfo : HudInfo;
	var m_facebookUrl : String;
	
	var m_companyButtonInfo : HudInfo;
	var m_companyUrl : String;
	
	//-------------------------
	//------QUIT GAME----------
	var m_QuitButtonInfo : HudInfo;
	
	//joysitck
	var m_currentMenuIndex : int;
	public var m_currentMenuCursor : Texture;
	var NowButtenID:ECurrentButtenID;
	var m_joyNum:int;
	private  var  m_joyStickButtonDown:boolean;
	private  var m_JoyStickShopPageBack:boolean;
	var m_buttenPressTime:ButtenPressTime;
	function Awake()
	{
	    NowButtenID=ECurrentButtenID.Play;
		m_playButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_playButtonInfo.position);
		m_tutorialButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_tutorialButtonInfo.position);
		m_optionsButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_optionsButtonInfo.position);
		m_creditsButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_creditsButtonInfo.position);
		m_facebookButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_facebookButtonInfo.position);
		m_companyButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_companyButtonInfo.position);
		
		//----------------------
		//-----Quit Game--------
		m_QuitButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_QuitButtonInfo.position);
		
		// Test
		m_levelChooseButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_levelChooseButtonInfo.position);
	}
	
   	function Update()
   	{
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
			if (m_currentMenuIndex > 3)
			{
				m_currentMenuIndex = 3;
			}
		}
		
		if (Input.GetKeyUp(map["Y"].ToString()))
		{
			switch(m_currentMenuIndex)
			{
			case 0:
				StartPlayGame();
				break;
			case 1:
				ShowTutorial();
				break;
			case 2:
				ShowOptions();
				break;
			case 3:
				ShowCredits();
				break;
			default:
				break;
			}
			
			AudioManager.Singleton().PlayButtonAudio();
		}
   	}
   
	function OnGUI()
	{
		//Debug.Log(" 5 . screen scale " + Screen.width + " " + Screen.height);
		
		OnBackground();
		OnLogo();
		OnPlayButton();
//		JoyStickOnPlay();
		
		OnTutorialButtonInfo();
//		JoyStickOnTutorial();
		
		OnOptionsButton();
//		JoyStickOnOptions();
		 
		OnCreditsButton();
//		JoyStickOnCredits();
		
//		OnFacebookButton();
		OnCompanyButton();
//		OnQuitButton();

		OnCursor();
		
		// Test
		//OnLevelChooseButton();
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
			pos = m_playButtonInfo.position;
			break;
		case 1:
			pos = m_tutorialButtonInfo.position;
			break;
		case 2:
			pos = m_optionsButtonInfo.position;
			break;
		case 3:
			pos = m_creditsButtonInfo.position;
			break;
		default:
			pos = m_playButtonInfo.position;
			break;
		}
		
		GUI.DrawTexture(Rect(pos.x + 100, pos.y + 50, m_currentMenuCursor.width, m_currentMenuCursor.height), m_currentMenuCursor, ScaleMode.ScaleAndCrop, true);
	}
	
	function OnLogo()
	{
		GUI.DrawTexture(Rect(m_logoPos.x * UiManager.Singleton().GetScreenSizeFactor().x, 
							 m_logoPos.y * UiManager.Singleton().GetScreenSizeFactor().y, 
							 m_logoTexture.width, 
							 m_logoTexture.height), 
						m_logoTexture, 
						ScaleMode.ScaleAndCrop, 
						true);
	}
	function OnQuitButton()
	{
	   if(PageButton(m_QuitButtonInfo) )
	   {
	       Debug.Log("QUIT");
	       Application.Quit();
	   }
	}
	
	function StartPlayGame()
	{
		GameManager.Singleton().CheckFirstRunGame();
			
		if (GameManager.Singleton().IsFirstTimeRunGame())
		{
			SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_firstTimePlayLevel, "", true, 0, false);
		}
		else
		{
			// to do, for one player is working well; but for more?  i need to more things
			GameManager.Singleton().SetPlayerCount(1);
			GameManager.Singleton().SetActor(PreviewLabs.PlayerPrefs.GetString("m_lastPlayedActor"), 0);
			GameManager.Singleton().Load();
			
			SetEnabled(false);
			
			SwitchLevelTrigger.SwitchLevel(m_normalPlayLevel, "", true, 0, false);
		}
	}
	
	function OnPlayButton()
	{	
		if ( PageButton(m_playButtonInfo) )
		{
			StartPlayGame();
		}
	}
	function JoyStickOnPlay()
	{
	if(NowButtenID==ECurrentButtenID.Play)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.Tutorial;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	              // NowButtenID=ECurrentButtenID.IsPhone;
	       }
	          
	        }
//	        OptionsPageLabel(10,m_playButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	         GameManager.Singleton().CheckFirstRunGame();
			
			Debug.Log(1);
			if (GameManager.Singleton().IsFirstTimeRunGame())
			{
			Debug.Log(2);
				SetEnabled(false);
				SwitchLevelTrigger.SwitchLevel(m_firstTimePlayLevel, "", true, 0, false);
			}
			else
			   {
			   Debug.Log(3);
				// to do, for one player is working well; but for more?  i need to more things
				GameManager.Singleton().SetPlayerCount(1);
				GameManager.Singleton().SetActor(PreviewLabs.PlayerPrefs.GetString("m_lastPlayedActor"), 0);
				GameManager.Singleton().Load();
				
				SetEnabled(false);
				
				SwitchLevelTrigger.SwitchLevel(m_normalPlayLevel, "", true, 0, false);
			   }
	        }
	    }
	
	}
	
	function ShowTutorial()
	{
		SetEnabled(false);
		SwitchLevelTrigger.SwitchLevel(m_tutorialLevel, "", true, 0, false);
	}
	
	function OnTutorialButtonInfo()
	{
		if ( PageButton(m_tutorialButtonInfo) )
		{
			ShowTutorial();
		}
	}
	function JoyStickOnTutorial()
	{
	if(NowButtenID==ECurrentButtenID.Tutorial)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.Options;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               NowButtenID=ECurrentButtenID.Play;
	       }
	          
	        }
	        OptionsPageLabel(10,m_tutorialButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	        SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_tutorialLevel, "", true, 0, false);
	        }
	    }
	
	}
	
	function ShowOptions()
	{
		SetEnabled(false);
		SwitchLevelTrigger.SwitchLevel(m_optionsLevel, "", true, 0, false);
	}
	
	function OnOptionsButton()
	{
		if ( PageButton(m_optionsButtonInfo) )
		{
			ShowOptions();
		}
	}
	
	function JoyStickOnOptions()
	{
	if(NowButtenID==ECurrentButtenID.Options)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.Credits;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               NowButtenID=ECurrentButtenID.Tutorial;
	       }
	          
	        }
	        OptionsPageLabel(10,m_optionsButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	        SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_optionsLevel, "", true, 0, false);
	        }
	    }
	
	}
	
	function ShowCredits()
	{
		SetEnabled(false);
		SwitchLevelTrigger.SwitchLevel(m_creditsLevel, "", true, 0, false);
	}
	
	function OnCreditsButton()
	{
		if ( PageButton(m_creditsButtonInfo) )
		{
			ShowCredits();
		}
	}
	function JoyStickOnCredits()
	{
	if(NowButtenID==ECurrentButtenID.Credits)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.Options;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	              // NowButtenID=ECurrentButtenID.Tutorial;
	       }
	          
	        }
	        OptionsPageLabel(10,m_creditsButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	        SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_creditsLevel, "", true, 0, false);
	        }
	    }
	
	
	}
	/*function OnFacebookButton()
	{
		if ( PageButton(m_facebookButtonInfo) )
		{
			 Application.OpenURL(m_facebookUrl);
		}
	}*/
	
	function OnCompanyButton()
	{
		if ( PageButton(m_companyButtonInfo) )
		{
			 Application.OpenURL(m_companyUrl);
		}
	}
	
	function OnLevelChooseButton()
	{
		if ( PageButton(m_levelChooseButtonInfo) )
		{
			SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_levelChooseLevel, "", true, 0, false);
		}
	}
} 
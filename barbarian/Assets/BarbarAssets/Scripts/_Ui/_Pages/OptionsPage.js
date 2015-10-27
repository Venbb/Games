#pragma strict

class OptionsPage extends Page
{



	var m_backButtonInfo : HudInfo;
	var m_backLevel : String;
	
	var m_resetButtonInfo : HudInfo;
	
	var m_bgmToggleInfo : HudInfo;
	var m_bgmButtonInfo : HudInfo;
	var m_soundToggleInfo : HudInfo;
	var m_soundButtonInfo : HudInfo;
	var m_sliceBladeToggleInfo : HudInfo;
	var m_sliceBladeButtonInfo : HudInfo;

	var m_optionsBackgourndPosition : Vector2;
	
	var m_optionsBackground : Texture;
	
	var m_optionsTitlePosition : Vector2;
	
	var m_optionsTitle : Texture;
	
	private var selStringss : String[] = ["English", "Chinese"/*,"Chinese"*/];
	//------------
	var m_SelectionGridStyle : GUIStyle;
	var m_SelectionPosition : Rect;
	var m_SelectionString : LabelString[];
	var m_SelectionFont : Font[];
	//joystick
	var NowButtenID:ECurrentButtenID;
	var m_currentMenuIndex : int;
	public var m_currentMenuCursor : Texture;
	var m_joyNum:int;
	private  var  m_joyStickButtonDown:boolean;
	private  var m_JoyStickShopPageBack:boolean;
	var m_buttenPressTime:ButtenPressTime;
	function Awake()
	{
	    NowButtenID=ECurrentButtenID.Music;
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_resetButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_resetButtonInfo.position);
		
		m_bgmToggleInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_bgmToggleInfo.position);
		m_bgmButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_bgmButtonInfo.position);
		
		m_soundToggleInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_soundToggleInfo.position);
		m_soundButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_soundButtonInfo.position);
		
		m_sliceBladeToggleInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_sliceBladeToggleInfo.position);
		m_sliceBladeButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_sliceBladeButtonInfo.position);
	}
    function Start()
    {
        m_SelectionGridStyle.font = m_SelectionFont[GameOptionsManager.Singleton().GetLanguage()];
        for(var i : int = 0 ; i < (m_SelectionString[GameOptionsManager.Singleton().GetLanguage()].m_dialogue.length)-1; i++)
        {
             selStringss[i] = m_SelectionString[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[i];
        }
    }
    
    function Update()
    {
    	var map = InputKeyCodeMapHelper.mapKeys;
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
		   
		if(Input.GetButtonDown(EInputStringName.Back.ToString()) || Input.GetKeyUp(map["X"].ToString()))  //page back
		{
		   
		     m_JoyStickShopPageBack=true;
		    
		}
	  
	  	//joystick
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
				GameOptionsManager.Singleton().EnableBgm( !GameOptionsManager.Singleton().IsBgmEnabled() );
				break;
			case 1:
				GameOptionsManager.Singleton().EnableSound( !GameOptionsManager.Singleton().IsSoundEnabled() );
				break;
			case 2:
				GameOptionsManager.Singleton().EnableSliceBlade( !GameOptionsManager.Singleton().IsSliceBladeEnabled() );
				break;
			case 3:
				ResetAction();
				break;
			default:
				break;
			}
			
			AudioManager.Singleton().PlayButtonAudio();
		}
    }
    
	function OnGUI()
	{
	
		OnBackground();
		
				//GUI.DrawTexture(Rect(m_optionsBackgourndPosition.x * UiManager.Singleton().GetScreenSizeFactor().x, 
				//		   m_optionsBackgourndPosition.y * UiManager.Singleton().GetScreenSizeFactor().y,
				//		   m_optionsBackground.width * UiManager.Singleton().GetScreenSizeFactor().x,
				//		   m_optionsBackground.height * UiManager.Singleton().GetScreenSizeFactor().y),
				//	    m_optionsBackground, 
				//	    ScaleMode.StretchToFill, 
				//	    true);
					    
		GUI.DrawTexture(Rect(m_optionsTitlePosition.x * UiManager.Singleton().GetScreenSizeFactor().x, 
						   m_optionsTitlePosition.y * UiManager.Singleton().GetScreenSizeFactor().y,
						   m_optionsTitle.width * UiManager.Singleton().GetScreenSizeFactor().x,
						   m_optionsTitle.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_optionsTitle, 
					    ScaleMode.StretchToFill, 
					    true);
					    
		OnBackButton();
		OnResetButton();
//		JoyStickOnReset();
		
		// Bgm toggle
		OnBgmToggle();
//		JoyStickOnBgm();
		// Sound toggle
		OnSoundToggle();
//		JoyStickOnSound();
		// Language
		//----------------
		//---------For out---
//		OnLanguageSelectionGrid();
		// SLICE BLADE
		OnSliceBladeToggle();
//		JoyStickOnSliceBlade();

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
			pos = m_bgmButtonInfo.position;
			break;
		case 1:
			pos = m_soundButtonInfo.position;
			break;
		case 2:
			pos = m_sliceBladeButtonInfo.position;
			break;
		case 3:
			pos = m_resetButtonInfo.position;
			break;
		default:
			pos = m_bgmButtonInfo.position;
			break;
		}
		
		GUI.DrawTexture(Rect(pos.x + 100, pos.y + 50, m_currentMenuCursor.width, m_currentMenuCursor.height), m_currentMenuCursor, ScaleMode.ScaleAndCrop, true);
	}

	var selGridInt : int = 0;
	function JoystickLanguageSelectionGrid()
	{
	
	
	}

	function OnLanguageSelectionGrid () 
	{
	    m_SelectionGridStyle.font = m_SelectionFont[GameOptionsManager.Singleton().GetLanguage()];
        for(var i : int = 0 ; i < (m_SelectionString[GameOptionsManager.Singleton().GetLanguage()].m_dialogue.length)-1; i++)
        {
             selStringss[i] = m_SelectionString[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[i];
        }
    	GameOptionsManager.Singleton().SetLanguage( GUI.SelectionGrid (Rect (Screen.width/m_SelectionPosition.x,
    	                                                                     Screen.height/m_SelectionPosition.y, 
    	                                                                     Screen.width/m_SelectionPosition.width, 
    	                                                                     Screen.height/m_SelectionPosition.height), 
    																	GameOptionsManager.Singleton().GetLanguage(), 
    																	selStringss, 
    																	2,//3,
    																	m_SelectionGridStyle)
    											   );
	}

	function OnBackButton()
	{		
		if ( PageButton(m_backButtonInfo)||m_JoyStickShopPageBack )
		{
			// Save changes
			GameOptionsManager.Singleton().Save();
			SetEnabled(false);
			
			SwitchLevelTrigger.SwitchLevel(m_backLevel, "", true, 0, false);
		}
	}
	
	function ResetAction()
	{
		GameManager.Singleton().Reset();
		GameOptionsManager.Singleton().Reset();
	}
	
	function OnResetButton()
	{	
		if ( PageButton(m_resetButtonInfo) )
		{
			ResetAction();
		}
	}
	function JoyStickOnReset()
	{
	if(NowButtenID==ECurrentButtenID.ResetGame)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               //NowButtenID=ECurrentButtenID.Sound;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               NowButtenID=ECurrentButtenID.IsPhone;
	       }
	          
	        }
	        OptionsPageLabel(10,m_resetButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	         GameOptionsManager.Singleton().Reset();
	        }
	    }
	
	}
	
	function OnBgmToggle()
	{		
		GameOptionsManager.Singleton().EnableBgm( PageToggle(m_bgmToggleInfo, GameOptionsManager.Singleton().IsBgmEnabled(), "") );
												
		if ( PageButton(m_bgmButtonInfo) )
		{
			GameOptionsManager.Singleton().EnableBgm( !GameOptionsManager.Singleton().IsBgmEnabled() );
		}					
	}
	function JoyStickOnBgm()
	{
	if(NowButtenID==ECurrentButtenID.Music)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.Sound;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               //NowButtenID=ECurrentButtenID.Music;
	       }
	          
	        }
	        OptionsPageLabel(10,m_bgmButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	         GameOptionsManager.Singleton().EnableBgm( !GameOptionsManager.Singleton().IsBgmEnabled() );
	        }
	    }
	
	
	}
	function OnSoundToggle()
	{		
		GameOptionsManager.Singleton().EnableSound( PageToggle(m_soundToggleInfo, GameOptionsManager.Singleton().IsSoundEnabled(), "") );
		
		if ( PageButton(m_soundButtonInfo) )
		{
			GameOptionsManager.Singleton().EnableSound( !GameOptionsManager.Singleton().IsSoundEnabled() );
		}
		
	}
	function JoyStickOnSound()
	{
	if(NowButtenID==ECurrentButtenID.Sound)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.IsPhone;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               NowButtenID=ECurrentButtenID.Music;
	       }
	          
	        }
	        OptionsPageLabel(10,m_soundButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	         GameOptionsManager.Singleton().EnableSound( !GameOptionsManager.Singleton().IsSoundEnabled() );
	        }
	    }
	}
	
	function OnSliceBladeToggle()
	{		
		GameOptionsManager.Singleton().EnableSliceBlade( PageToggle(m_sliceBladeToggleInfo, GameOptionsManager.Singleton().IsSliceBladeEnabled(), "") );
												
		if ( PageButton(m_sliceBladeButtonInfo) )
		{
			GameOptionsManager.Singleton().EnableSliceBlade( !GameOptionsManager.Singleton().IsSliceBladeEnabled() );
		}	
	}
	function JoyStickOnSliceBlade()
	{
	 if(NowButtenID==ECurrentButtenID.IsPhone)
	 {
	     if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	       
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	               NowButtenID=ECurrentButtenID.ResetGame;
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	            
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               NowButtenID=ECurrentButtenID.Sound;
	       }
	          
	        }
	        OptionsPageLabel(10,m_sliceBladeButtonInfo);
	           if(m_joyStickButtonDown&&m_joyNum<1)
	        {
	         m_joyNum++;
	         GameOptionsManager.Singleton().EnableSliceBlade( !GameOptionsManager.Singleton().IsSliceBladeEnabled() );
	        }
	    }   
	
	}
}
#pragma strict


class ToturialInfo
{
	var m_texture : Texture;
	
	var m_texts : HudInfo[];
}

class Toturial extends Page
{
	// Use back button
	var m_useBackButton : boolean;
	var m_backButtonInfo : HudInfo;
	var m_backLevel : String;
	
	// Use next button
	var m_useContinueButton : boolean = false;
	var m_continueButtonInfo : HudInfo;
	var m_continueLevel : String;
	
	var m_titlePosition : Vector2;
	
	var m_title : Texture;
	
	var m_leftButtonInfo : HudInfo;
	var m_rightButtonInfo : HudInfo;
	
	var toturialGroupPosition : Vector2;
	var toturialGroupScale : Vector2;
	
	var m_toturials : ToturialInfo[];
	var m_toturialsOffset : Vector2;
	
	var m_toturialMoveSpeed : float;
	
	var m_startPosition : Vector2;
	 
	var m_showContinueButton : boolean = false;
	
	private var m_currentToturial : int = 0;
	
	private var m_currentStartPosition : Vector2;
	
	private var m_targetStartPosition : Vector2;
	private var m_turnLeft:boolean;
	private var m_turnRight:boolean;
	//joystick
	private  var m_JoyStickShopPageBack:boolean;
	private var m_joyStrickPageNext:boolean;
	var m_buttenPressTime:ButtenPressTime;
	function Awake()
	{
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_leftButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_leftButtonInfo.position);
		m_rightButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_rightButtonInfo.position);
		m_continueButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_continueButtonInfo.position);
		
		m_startPosition = UiManager.Singleton().ConvertToDeviceScreenPosition(m_startPosition);
		m_titlePosition = UiManager.Singleton().ConvertToDeviceScreenPosition(m_titlePosition);
		toturialGroupPosition = UiManager.Singleton().ConvertToDeviceScreenPosition(toturialGroupPosition);
		toturialGroupScale = UiManager.Singleton().ConvertToDeviceScreenPosition(toturialGroupScale);
		m_toturialsOffset = UiManager.Singleton().ConvertToDeviceScreenPosition(m_toturialsOffset);
		
		for (var i : int = 0; i < m_toturials.length; ++i)
		{
			for (var j : int = 0; j < m_toturials[i].m_texts.length; ++j)
			{
				m_toturials[i].m_texts[j].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_toturials[i].m_texts[j].position);
			}
		}
		
		m_currentToturial = 0;
		m_currentStartPosition = m_startPosition;
		m_targetStartPosition = m_currentStartPosition;
	}

	function Update()
	{
		UpdateTouch();

		UpdateStartPosition();
		if(Input.GetButtonDown(EInputStringName.Back.ToString()))  //page back
		{

			m_JoyStickShopPageBack=true;

		}
		else
		{
			m_JoyStickShopPageBack=false;

		}
		if(Input.GetButtonDown(EInputStringName.Next.ToString()))  //page next
		{

			m_joyStrickPageNext=true;
	
		}
		else
		{
			m_joyStrickPageNext=false;

		}
       
       
		var map = InputKeyCodeMapHelper.mapKeys;
		if (Input.GetKeyUp(map["left"].ToString()))
		{
			ChangeTutorial(-1);
			AudioManager.Singleton().PlayButtonAudio();
		}

		if (Input.GetKeyUp(map["right"].ToString()))
		{
			ChangeTutorial(1);
			AudioManager.Singleton().PlayButtonAudio();
		}
		
		if (m_showContinueButton == true)
		{
			if (Input.GetKeyUp(map["LeftFlipper"].ToString()))
			{
				ShowNextLevel();
				AudioManager.Singleton().PlayButtonAudio();
			}
		}
	}
	
	function IsInValidBoundary(pos : Vector2)
	{
		return pos.x >= toturialGroupPosition.x 
			&& pos.x <= toturialGroupPosition.x + toturialGroupScale.x 
			&& pos.y >= toturialGroupPosition.y
			&& pos.y <= toturialGroupPosition.y + toturialGroupScale.y;
	}
	
	function UpdateTouch()
	{
		if (Input.touchCount != 1)
		{
			return;
		}
		
		var touch : Touch = Input.touches[0];
		
		if (!IsInValidBoundary(touch.position))
		{
			return;
		}
		
		if (touch.phase == TouchPhase.Moved && m_targetStartPosition == m_currentStartPosition)
		{
			
			if (touch.deltaPosition.x < 0)
			{
				ChangeTutorial(1);
			}
			else
			{
				ChangeTutorial(-1);
			}
		}
	}
	
	function UpdateStartPosition()
	{
		// same
		if (m_targetStartPosition == m_currentStartPosition)
		{
			return;
		}
		
		var direction : Vector2 = m_targetStartPosition - m_currentStartPosition;

		var offset : Vector2 = direction.normalized * m_toturialMoveSpeed * Time.deltaTime;
		
		if (Mathf.Abs(offset.magnitude) <= Mathf.Abs(direction.magnitude))
		{
			m_currentStartPosition += offset;
		}
		else
		{
			m_currentStartPosition = m_targetStartPosition;
		}
		
		//Debug.Log(m_targetStartPosition + " " + m_currentStartPosition + " " + direction);
	}
	
	function OnGUI()
	{
	
	    JoyStickTurn();
		OnBackground();
					    
		GUI.DrawTexture(Rect(m_titlePosition.x,
						  	 m_titlePosition.y,
						   	 m_title.width * UiManager.Singleton().GetScreenSizeFactor().x,
						     m_title.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_title, 
					    ScaleMode.StretchToFill, 
					    true);
					    
		OnBackButton();
		
		OnLeftButton();
		
		
		OnRightButton();
		
		OnToturials();
		
		if(m_showContinueButton == true)
		{
		    OnContinueButton();
		}
	}

	function OnBackButton()
	{	
		if (!m_useBackButton)
		{
			return ;
		}
		
		if ( PageButton(m_backButtonInfo)||m_JoyStickShopPageBack)
		{
		Debug.Log(m_JoyStickShopPageBack);
			// Save changes
			SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_backLevel, "", true, 0, false);
		}
	}
	
	function ShowNextLevel()
	{
		SetEnabled(false);
		SwitchLevelTrigger.SwitchLevel(m_continueLevel, "", true, 0, false);
	}
	
	function OnContinueButton()
	{	
		if (!m_useContinueButton)
		{
			return ;
		}
		
		if ( PageButton(m_continueButtonInfo)||m_joyStrickPageNext )
		{
			ShowNextLevel();
		}
	}
	function JoyStickTurn()
	{
	var left:boolean=false;
	var right:boolean=false;
	m_turnLeft= left ;
	 m_turnRight= right ;
	 if(DelayTime(m_buttenPressTime,0.4))
	    {
	      if(GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0))
	      {
	          
	           left=true;
	           m_turnLeft= left ;
	      }
	      else if(GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0))
	      {
	             
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))
	      {
	          right=true;
	          m_turnRight= right ;
	         
	            
	      }
	      else if(GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0))
	       {
	               //NowButtenID=ECurrentButtenID.Music;
	       }
	
	
	     }
	}
	function OnLeftButton()
	{	
		if (m_currentToturial <= 0)
		{
			return ;
		}
		
		if ( PageButton(m_leftButtonInfo, 
					    Rect(m_leftButtonInfo.position.x, 
					         m_leftButtonInfo.position.y, 
					         m_customSkin.customStyles[m_leftButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
					         m_customSkin.customStyles[m_leftButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y )
					         )||m_turnLeft
					         )
		{
			ChangeTutorial(-1);
		}
	}
	
	function OnRightButton()
	{	
		if (m_currentToturial >= m_toturials.length - 1)
		{
		    m_showContinueButton = true;
			return ;
			
		}
		
		if ( PageButton(m_rightButtonInfo, 
					    Rect(m_rightButtonInfo.position.x, 
					         m_rightButtonInfo.position.y, 
					         m_customSkin.customStyles[m_rightButtonInfo.customStyleIndex].normal.background.width * UiManager.Singleton().GetScreenSizeFactor().x,
					         m_customSkin.customStyles[m_rightButtonInfo.customStyleIndex].normal.background.height * UiManager.Singleton().GetScreenSizeFactor().y )
					         )||m_turnRight
					         )

		{
			ChangeTutorial(1);
		}
	}
	
	function ChangeTutorial(deltaValue : int )
	{
			m_currentToturial += deltaValue;
			
			if (m_currentToturial >= m_toturials.length )
			{
				m_currentToturial = m_toturials.length - 1;
			}
			else if (m_currentToturial < 0 )
			{
				m_currentToturial = 0;
			}

			m_targetStartPosition = m_startPosition - m_toturialsOffset * m_currentToturial;
	}
	
	function OnToturials()
	{
		GUI.BeginGroup(Rect(toturialGroupPosition.x, toturialGroupPosition.y, toturialGroupScale.x, toturialGroupScale.y));
		
		for (var i : int = 0; i < m_toturials.length; ++i)
		{
			// Display each toturial
			GUI.DrawTexture(Rect(m_currentStartPosition.x + i * m_toturialsOffset.x,
						  m_currentStartPosition.y + i * m_toturialsOffset.y,
						  m_toturials[i].m_texture.width * UiManager.Singleton().GetScreenSizeFactor().x,
						  m_toturials[i].m_texture.height * UiManager.Singleton().GetScreenSizeFactor().y),
					      m_toturials[i].m_texture, 
					      ScaleMode.StretchToFill, 
					      true);
			OnToturialTexts(m_toturials[i].m_texts);
		}
		
		GUI.EndGroup();
	}
	
	function OnToturialTexts(texts : HudInfo[])
	{
		GUI.color = Color.black;
		for (var i : int = 0; i < texts.length; ++i)
		{
			PageText(texts[i], Vector2(m_currentStartPosition.x + texts[i].position.x, m_currentStartPosition.y + texts[i].position.y));
		}
		
		GUI.color = Color.white;
	}
}
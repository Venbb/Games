#pragma strict

class CreditsPage extends Page
{

	//var m_textInfo : HudInfo;
	var m_backButtonInfo : HudInfo;
	var m_backLevel : String;

	var m_titlePosition : Vector2;
	
	var m_title : Texture;
	//joystick
	 private var m_JoyStickShopPageBack:boolean;
	function Awake()
	{
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_titlePosition = UiManager.Singleton().ConvertToDeviceScreenPosition(m_titlePosition);
		//m_textInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_textInfo.position);
	}
    function Update()
    {
    	var map = InputKeyCodeMapHelper.mapKeys;
		if(Input.GetButtonDown(EInputStringName.Back.ToString()) || Input.GetKeyUp(map["X"].ToString()))  //page back
		{
		   
		     m_JoyStickShopPageBack=true;
		    
		}
    
    }
	function OnGUI()
	{
		OnBackground();
		//OnText();
		OnBackButton();
		OnTitle();
	}

	//function OnText()
	//{
		//PageText(m_textInfo);
	//}
	
	function OnBackButton()
	{		
		if ( PageButton( m_backButtonInfo)||m_JoyStickShopPageBack )
		{
			SetEnabled(false);
			SwitchLevelTrigger.SwitchLevel(m_backLevel, "", true, 0, false);
		}
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
	
} 
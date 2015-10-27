#pragma strict
 
class HudInfo
{
	var customStyleIndex : int = 0;
	var position : Vector2;
	
	var text : String[];
	
	var fonts : Font[];
}
class Page extends InputBase{
var m_customSkin : GUISkin;
	
var m_pageName : String = "";
var m_enabledAtFirst : boolean = false;

var m_background : Texture;
var m_fingerIcon : Texture;
protected var m_prePage : Page = null;


function Start()
{
	// Register
	UiManager.Singleton().RegisterPage(this);
	SetEnabled(m_enabledAtFirst);
}

function OnBackground()
{
	//GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), m_background, ScaleMode.StretchToFill, true);
	
	GUI.DrawTexture(Rect(0, 
						  0,
						   m_background.width * UiManager.Singleton().GetScreenSizeFactor().x,
						   m_background.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_background, 
					    ScaleMode.StretchToFill, 
					    true);
					    
	//Debug.Log("m_background.width : "  + m_background.width + " m_background.height : " +  m_background.height);
	//Debug.Log("UiManager.Singleton().GetScreenSizeFactor().x : "  + UiManager.Singleton().GetScreenSizeFactor().x + " UiManager.Singleton().GetScreenSizeFactor().y : " +  UiManager.Singleton().GetScreenSizeFactor().y);
	
}
	
function SetPrePage(page : Page)
{
	m_prePage = page;
}

function OnGUI()
{
}

function GetName() : String
{
	return m_pageName;
}

function SetEnabled(enable : boolean)
{
	this.gameObject.active = enable;
}

function SwitchPageTo(page : Page) : boolean
{
	return UiManager.Singleton().SwitchPage(this, page);
}

function SwitchPageTo(pageName : String) : boolean
{
	return UiManager.Singleton().SwitchPage(this, pageName);
}

function SwitchPageToPrePage() : boolean
{
	return UiManager.Singleton().SwitchPageWithOutSetPre(this, m_prePage);
}

function OnBackButton()
{
	if ( SwitchPageToPrePage() )
	{
		SetEnabled(false);
	}
}
function OptionsPageLabel(index:int,info:HudInfo)
{
GUI.Label(Rect(info.position.x,info.position.y,m_customSkin.customStyles[index].normal.background.width
		           ,m_customSkin.customStyles[index].normal.background.height),m_background);

}
function GetRect(info : HudInfo, custonSkin : GUISkin) : Rect
{
	return Rect(info.position.x, 
				info.position.y, 
				custonSkin.customStyles[info.customStyleIndex].normal.background.width, 
				custonSkin.customStyles[info.customStyleIndex].normal.background.height);
}

function GetGUIStyle(hudInfo : HudInfo, customSkin : GUISkin) : GUIStyle
{
	// Not use custom font
	if (GameOptionsManager.Singleton().GetLanguage() >= hudInfo.fonts.length)
	{
		return customSkin.customStyles[hudInfo.customStyleIndex];
	}
	
	if (customSkin.customStyles[hudInfo.customStyleIndex].font != hudInfo.fonts[GameOptionsManager.Singleton().GetLanguage()])
	{
		//Debug.Log("Font is not font");
		customSkin.customStyles[hudInfo.customStyleIndex].font = hudInfo.fonts[GameOptionsManager.Singleton().GetLanguage()];
	}

	return customSkin.customStyles[hudInfo.customStyleIndex];
}

function PageToggle(toggleInfo : HudInfo, flagIn : boolean) : boolean
{					   
	var flagOut : boolean = GUI.Toggle( GetRect(toggleInfo, m_customSkin),
										flagIn,
										toggleInfo.text[GameOptionsManager.Singleton().GetLanguage()],
										 GetGUIStyle(toggleInfo, m_customSkin) );
										
	if (flagOut != flagIn)
	{
		AudioManager.Singleton().PlayButtonAudio();
	}
	
	return flagOut;
}

function PageButton(buttonInfo : HudInfo) : boolean
{
    
    
	if ( GUI.Button( GetRect(buttonInfo, m_customSkin),
					   buttonInfo.text[GameOptionsManager.Singleton().GetLanguage()] ,
					   GetGUIStyle(buttonInfo, m_customSkin) ) )
	{
	//Debug.Log(GetRect(buttonInfo, m_customSkin));
		AudioManager.Singleton().PlayButtonAudio();
		return true;
	}
}

function PageButton(buttonInfo : HudInfo, audioSource : AudioSource) : boolean
{
	if ( GUI.Button( GetRect(buttonInfo, m_customSkin),
					   buttonInfo.text[GameOptionsManager.Singleton().GetLanguage()] ,
					   GetGUIStyle(buttonInfo, m_customSkin) ) )
	{
		AudioManager.Singleton().Play(audioSource);
		return true;
	}
}

function PageButton(buttonInfo : HudInfo, pos : Vector2) : boolean
{
	var tempRect = GetRect(buttonInfo, m_customSkin);
	tempRect.x = pos.x;
	tempRect.y = pos.y;  
	
	
	if ( GUI.Button( tempRect,
					   buttonInfo.text[GameOptionsManager.Singleton().GetLanguage()] ,
					   GetGUIStyle(buttonInfo, m_customSkin) ) )
	{
		AudioManager.Singleton().PlayButtonAudio();
		return true;
	}			   
}

function PageButton(buttonInfo : HudInfo, rect : Rect) : boolean
{		
	if ( GUI.Button( rect,
					   buttonInfo.text[GameOptionsManager.Singleton().GetLanguage()] ,
					   GetGUIStyle(buttonInfo, m_customSkin) ) )
	{
		AudioManager.Singleton().PlayButtonAudio();
		return true;
	}			   
}


function PageLabel(lableInfo : HudInfo)
{
	GUI.Label( GetRect(lableInfo, m_customSkin),
			   GUIContent(lableInfo.text[GameOptionsManager.Singleton().GetLanguage()], m_customSkin.customStyles[lableInfo.customStyleIndex].normal.background),
			   GetGUIStyle(lableInfo, m_customSkin) );
}

function PageText(textInfo : HudInfo)
{
	GUI.Label( Rect( textInfo.position.x, textInfo.position.y, 0, 0),
					 textInfo.text[GameOptionsManager.Singleton().GetLanguage()] ,
					 GetGUIStyle(textInfo, m_customSkin) );
}

function PageText(textInfo : HudInfo, pos : Vector2)
{
	GUI.Label( Rect( pos.x, pos.y, 0, 0),
					 textInfo.text[GameOptionsManager.Singleton().GetLanguage()] ,
					 GetGUIStyle(textInfo, m_customSkin) );
}

function PageText(textInfo : HudInfo, text : String)
{
	GUI.Label( Rect( textInfo.position.x, textInfo.position.y, 0, 0),
					 text,
					 GetGUIStyle(textInfo, m_customSkin) );
}

function PageText(textInfo : HudInfo, text : String, pos : Vector2)
{
	GUI.Label( Rect( pos.x, pos.y, 0, 0),
					 text,
					 GetGUIStyle(textInfo, m_customSkin) );
}

function PageToggle(toggleInfo : HudInfo, flagIn : boolean, text : String) : boolean
{
	var flagOut : boolean = GUI.Toggle( GetRect(toggleInfo, m_customSkin),
										flagIn,
										text,
										m_customSkin.customStyles[toggleInfo.customStyleIndex] );
										
	if (flagOut != flagIn)
	{
		AudioManager.Singleton().PlayButtonAudio();
	}
	
	return flagOut;
}

function PageToggle(toggleInfo : HudInfo, rect : Rect, flagIn : boolean) : boolean
{
	var flagOut : boolean = GUI.Toggle( rect,
										flagIn,
										toggleInfo.text[GameOptionsManager.Singleton().GetLanguage()],
										GetGUIStyle(toggleInfo, m_customSkin));
										
	if (flagOut != flagIn)
	{
		AudioManager.Singleton().PlayButtonAudio();
	}
	
	return flagOut;
}

function Delete()
{
	Destroy(this.gameObject);
}

function OnDestroy()
{
	if (UiManager.Singleton() != null)
	{
		// Unregister
		UiManager.Singleton().UnregisterPage(this);
	}
}
}
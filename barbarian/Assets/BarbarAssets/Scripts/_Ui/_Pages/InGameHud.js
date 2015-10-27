#pragma strict


class InGameHud extends Page
{

	// Main actor
	private var m_actor : ControllableActor = null;

	// MC Head Ico
	var m_headIcoInfo : HudInfo;

	// MC hp bar 
	var m_hpBarTexture : Texture2D;
	var m_hpBarInfo : HudInfo;
	var m_hpBarScale : Vector2;
	var m_hpBarColorList : Color[];

	private var m_hpBarColor : Color;
	private var m_hpRaido : float = 0;

	private var m_lengthRadio : float = 0;
	private var m_colorRadio : float = 0;
	private var m_colorIndex : int = 0;

	// MC stamina bar
	var m_staminaBarTexture : Texture2D;
	var m_staminaBarInfo : HudInfo;
	var m_staminaBarScale : Vector2;
	var m_staminaColor : Color;

	// Score
	var m_scoreBarInfo : HudInfo;
	private var m_scoreStr : String;
	private var m_scoreNum : int;

	// Special Skills
	var m_twoSkillBarInfo : HudInfo[];
	var m_threeSkillBarInfo : HudInfo[];
	var m_coolDownMaskTexture : Texture;
	
	private var m_coolDownTimer : float[];
	// Pause hud 
	var m_pauseButtonInfo : HudInfo;

	// Item : health pot
	var m_itemButtonInfo : HudInfo;


	var m_textInfo : HudInfo;
	var m_backButtonInfo : HudInfo;
	var m_mainMenuButtonInfo : HudInfo;
	var m_mainMenu : String;
	
	// Death
	//var m_deathBackground : Texture;
	var m_deathInfo : HudInfo;
	var m_retryButtonInfo : HudInfo;
	var m_deathQuitButtonInfo : HudInfo;
	
	// Hits Combo
	var m_hitsComboInfo : HudInfo;
	private var m_lastHitsCombo : int = 0;

	// Level name , difficulty
	var m_levelNameInfo : HudInfo;
	var m_levelDifficultyInfo : HudInfo;
	var m_levelNameDisplayTime : float = 5.0;
	
	class LevelDifficutyText
	{
		var text : String[];
	}
	
	var m_levelDifficutyTexts : LevelDifficutyText[];
	private var m_levelNameDisplayTimer : float = 0.0;
	
	// Go hud
	var m_goHudInfo : HudInfo;
	var m_goHudDisplayTime : float = 12;
	var m_goHudFlickeringDeltaTime : float = 0.15;
	private var m_goHudDisplayTimer : float = 0.0;
	private var m_goHudFlickeringDeltaTimer : float = 0.0;
	var m_skillTypeTextures : SkillTypeTexture[];
	var m_controlSkillActive : GameObject;
	//joystick
	var NowButtenID:ECurrentButtenID;
	var m_joyNum:int;
	private  var  m_joyStickPause:boolean;
	private  var m_joyStickBack:boolean;
	private var m_joyStickNext:boolean;
	var m_buttenPressTime:ButtenPressTime;
// TEMP
var m_text : String[];

// ...
private var m_scale : Vector2;

function Awake()
{
	//m_headIcoInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_headIcoInfo.position);
	//m_hpBarInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_hpBarInfo.position);
	m_scoreBarInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_scoreBarInfo.position);
	m_twoSkillBarInfo[0].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_twoSkillBarInfo[0].position);
	m_twoSkillBarInfo[1].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_twoSkillBarInfo[1].position);
	
	//---------------
//	m_twoSkillBarInfo[2].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_twoSkillBarInfo[2].position);
	//--------------------------
	
	m_coolDownTimer = new float[m_twoSkillBarInfo.length];
	
	for (var i = 0; i < m_coolDownTimer.length; ++i)
	{
		m_coolDownTimer[i] = 0;
	}
	//m_threeSkillBarInfo[0].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_threeSkillBarInfo[0].position);
	//m_threeSkillBarInfo[1].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_threeSkillBarInfo[1].position);
	//m_threeSkillBarInfo[2].position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_threeSkillBarInfo[2].position);
	//m_pauseButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_pauseButtonInfo.position);
	//health pot
	m_itemButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_itemButtonInfo.position);
	
	// Pause
	m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
	m_textInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_textInfo.position);
	m_mainMenuButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_mainMenuButtonInfo.position);
	//m_hitsComboInfo.position=UiManager.Singleton().ConvertToDeviceScreenPosition(m_hitsComboInfo.position);
	m_deathInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_deathInfo.position);
	m_retryButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_retryButtonInfo.position);
	m_deathQuitButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_deathQuitButtonInfo.position);
	
	// Level name, difficulty
	m_levelNameInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_levelNameInfo.position);
	m_levelDifficultyInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_levelDifficultyInfo.position);
	
	// Go Hud
	m_goHudInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_goHudInfo.position);
	transform.position =Vector3(0.86,0.6,0);
	//Debug.Log(transform.position);
}

	function GetNormalSkillTexture(skillType : ESkillType) : Texture
	{
		for (var i = 0; i < m_skillTypeTextures.length; ++i)
		{
			if (m_skillTypeTextures[i].skillType == skillType)
			{
				return m_skillTypeTextures[i].textureNormal;
			}
		}
		
		return null;
	}
	
function OnHeadIcoHud()
{
	//Debug.Log(m_customSkin.customStyles[0].normal.background.width + " height : " + m_customSkin.customStyles[0].normal.background.height);

		GUI.Label (Rect (m_headIcoInfo.position.x, 
						 m_headIcoInfo.position.y,
						 m_customSkin.customStyles[m_headIcoInfo.customStyleIndex].normal.background.width, 
						 m_customSkin.customStyles[m_headIcoInfo.customStyleIndex].normal.background.height)
			, ""
			, m_customSkin.customStyles[m_headIcoInfo.customStyleIndex]);

}

function OnHpBar()
{
	
	if (GetActor() == null)
	{
		return ;
	}
	
	m_hpRaido = (parseFloat)(GetActor().GetHp())/ (parseFloat)(GetActor().GetMaxHp());
	m_lengthRadio= Mathf.Lerp(0, m_hpBarTexture.width, m_hpRaido);
	
	m_colorRadio = Mathf.Lerp(1.0, 0, m_hpRaido);
	
	// Defalut it should be green
	m_hpBarColor = Color.green;
	
	if (m_hpBarColorList.length > 0)
	{
		// a = 1 / length
		// index = colorRadio / a
		// index = colorRadio / ( 1 / Length)
		//Debug.Log("m_colorRadio : " + m_colorRadio.ToString() + "m_hpBarColorList.length : " + m_hpBarColorList.length );
		m_colorIndex = Mathf.FloorToInt( (m_colorRadio + 0.0001) * m_hpBarColorList.length);
		//Debug.Log("m_colorRadio * (parseFloat)(m_hpBarColorList.length) : " + Mathf.FloorToInt( (m_colorRadio + 0.01) * m_hpBarColorList.length) );
		//Debug.Log(" Mathf.RoundToInt(m_colorRadio * m_hpBarColorList.length) : " + Mathf.RoundToInt(0.2 * 5));
		//Debug.Log(" Mathf.FloorToInt(m_colorRadio * m_hpBarColorList.length)" + Mathf.FloorToInt(0.2 * 5));
		m_colorIndex = Mathf.Clamp(m_colorIndex, 0, m_hpBarColorList.length - 1);
		m_hpBarColor = m_hpBarColorList[m_colorIndex];
	}

	m_hpBarColor.a = (SceneManager.Singleton().IsGamePaused() || SceneManager.Singleton().IsGameOver()) ? 0.5 : 1;
	GUI.color = m_hpBarColor;
	
	GUI.BeginGroup(Rect(m_hpBarInfo.position.x, m_hpBarInfo.position.y, m_lengthRadio, m_hpBarTexture.height));
	
	//Debug.Log(" size of group : " + m_lengthRadio + " " + m_hpBarTexture.height);
	GUI.DrawTexture(Rect (0, 
				     0,
					m_hpBarTexture.width, 
					m_hpBarTexture.height)
			, m_hpBarTexture);
	
	//Debug.Log(" size of hp bar : " + m_hpBarTexture.width + " " + m_hpBarTexture.height);
	
	GUI.EndGroup();
	
	GUI.color = Color.white;
}

// NO use
function OnHpBar2()
{
	if (GetActor() == null)
	{
		return ;
	}
	
	m_hpRaido = (parseFloat)(GetActor().GetHp())/ (parseFloat)(GetActor().GetMaxHp());
	m_lengthRadio= Mathf.Lerp(0, m_hpBarScale.x, m_hpRaido);
	m_colorRadio = Mathf.Lerp(1.0, 0, m_hpRaido);
	
	// Defalut it should be green
	m_hpBarColor = Color.green;
	
	if (m_hpBarColorList.length > 0)
	{
		// a = 1 / length
		// index = colorRadio / a
		// index = colorRadio / ( 1 / Length)
		//Debug.Log("m_colorRadio : " + m_colorRadio.ToString() + "m_hpBarColorList.length : " + m_hpBarColorList.length );
		m_colorIndex = Mathf.FloorToInt( (m_colorRadio + 0.0001) * m_hpBarColorList.length);
		//Debug.Log("m_colorRadio * (parseFloat)(m_hpBarColorList.length) : " + Mathf.FloorToInt( (m_colorRadio + 0.01) * m_hpBarColorList.length) );
		//Debug.Log(" Mathf.RoundToInt(m_colorRadio * m_hpBarColorList.length) : " + Mathf.RoundToInt(0.2 * 5));
		//Debug.Log(" Mathf.FloorToInt(m_colorRadio * m_hpBarColorList.length)" + Mathf.FloorToInt(0.2 * 5));
		m_colorIndex = Mathf.Clamp(m_colorIndex, 0, m_hpBarColorList.length - 1);
		m_hpBarColor = m_hpBarColorList[m_colorIndex];
	}

	GuiDrawLine.lineTex = m_hpBarTexture;
	
	if (m_lengthRadio != 0)
	{
		m_hpBarColor.a = (SceneManager.Singleton().IsGamePaused() || SceneManager.Singleton().IsGameOver()) ? 0.5 : 1;

		GuiDrawLine.DrawLine(m_hpBarInfo.position
							, Vector2(m_hpBarInfo.position.x + m_lengthRadio, m_hpBarInfo.position.y)
							, m_hpBarColor
							, m_hpBarScale.y);
	}
}

function OnStaminaBar()
{
	if (GetActor() == null)
	{
		return ;
	}
	
	m_lengthRadio = Mathf.Lerp(0, m_staminaBarTexture.width, (parseFloat)(GetActor().GetStamina())/ (parseFloat)(GetActor().GetMaxStamina()) );
	m_staminaColor.a = (SceneManager.Singleton().IsGamePaused() || SceneManager.Singleton().IsGameOver()) ? 0.5 : 1;

	GUI.color = m_staminaColor;
	
	GUI.BeginGroup(Rect(m_staminaBarInfo.position.x, m_staminaBarInfo.position.y, m_lengthRadio, m_staminaBarTexture.height));
	
	//Debug.Log(" size of group : " + m_lengthRadio + " " + m_hpBarTexture.height);
	GUI.DrawTexture(Rect (0, 
				     0,
					m_staminaBarTexture.width, 
					m_staminaBarTexture.height)
			, m_staminaBarTexture);
	
	//Debug.Log(" size of hp bar : " + m_hpBarTexture.width + " " + m_hpBarTexture.height);
	
	GUI.EndGroup();
	
	GUI.color = Color.white;
}

// NO use
function OnStaminaBar2()
{
	if (GetActor() == null)
	{
		return ;
	}
	
	m_lengthRadio = Mathf.Lerp(0, m_staminaBarScale.x, (parseFloat)(GetActor().GetStamina())/ (parseFloat)(GetActor().GetMaxStamina()) );
	GuiDrawLine.lineTex = m_staminaBarTexture;
	
	if (m_lengthRadio != 0)
	{
		m_staminaColor.a = (SceneManager.Singleton().IsGamePaused() || SceneManager.Singleton().IsGameOver()) ? 0.5 : 1;
		
		GuiDrawLine.DrawLine(m_staminaBarInfo.position
							, Vector2(m_staminaBarInfo.position.x + m_lengthRadio, m_staminaBarInfo.position.y)
							, m_staminaColor
							, m_staminaBarScale.y);
							
		//GUI.Label
	}
}

function GenerateScoreString()
{
	m_scoreNum = GetActor().GetMoney();
	var j : int = 100000000;
	m_scoreStr = "";
	for (var i : int = 1; i <=9 ; ++i)
	{
		m_scoreStr += (m_scoreNum / j).ToString();
		m_scoreNum = m_scoreNum % j;
		j /= 10; 
		
		if (i % 3 == 0)
		{
			m_scoreStr += " ";
		}
	}
}


function OnScoreBar()
{
	if (GetActor() == null)
	{
		return ;
	}
	
	GenerateScoreString();
	

	GUI.Label(GetRect (m_scoreBarInfo, m_customSkin), m_scoreStr, m_customSkin.customStyles[m_scoreBarInfo.customStyleIndex]);
}

function OnCoolDownMask(pos : Vector2, totalTime : float, timeList : float[], index : int)
{
	if (timeList[index] > 0 && totalTime > 0)
	{
		timeList[index] -= Time.deltaTime;
		
		var h : float = Mathf.Lerp(0, m_coolDownMaskTexture.height, timeList[index] / totalTime);
		GUI.DrawTexture( Rect(pos.x, pos.y, m_coolDownMaskTexture.width, h), m_coolDownMaskTexture, ScaleMode.StretchToFill, true);
		
	}
}

function UseHealthPot()
{
	GetActor().UseHealthPot();
}

function UseSpecialSkill(i : int) : boolean {
	if (i < m_twoSkillBarInfo.length) {
		if (GetActor().GetActiveSkillList()[i] != ESkillType.Invalid)
		{
			var tex : Texture = GetNormalSkillTexture(GetActor().GetActiveSkillList()[i]);
			if ( tex != null
				   && m_coolDownTimer[i] <= 0
				   && (m_controlSkillActive == null || (m_controlSkillActive != null && TheFinalWar.idle == false)))	   
			{	    
				if ( GetActor().ApplyUiInput(m_actor.GetActiveSkillList()[i]) )
				{
					m_coolDownTimer[i] = m_actor.GetSkill(GetActor().GetActiveSkillList()[i]).GetCoolDownTime();
					return true;
				}	
			}
		}
	}
	
	return false;
}

function OnSpecialSkills()
{
	if (GetActor() == null)
	{
		return ;
	}
	
	var i : int;

	GUI.skin = m_customSkin;
	
	// Two special skill
	if (GetActor().GetActiveSkillList().Count <= 3)
	{
		for ( i = 0; i < GetActor().GetActiveSkillList().Count && i < m_twoSkillBarInfo.length; ++i)
		{
			if (GetActor().GetActiveSkillList()[i] != ESkillType.Invalid)
			{	
				var tex : Texture = GetNormalSkillTexture(GetActor().GetActiveSkillList()[i]);
				
				if ( tex != null
				   
				   && GUI.Button( Rect(m_twoSkillBarInfo[i].position.x, m_twoSkillBarInfo[i].position.y, tex.width, tex.height), tex) 
				   && m_coolDownTimer[i] <= 0
				   && (m_controlSkillActive == null || (m_controlSkillActive != null && TheFinalWar.idle == false)))	   
				{	    
					if ( GetActor().ApplyUiInput(m_actor.GetActiveSkillList()[i]) )
					{
						m_coolDownTimer[i] = m_actor.GetSkill(GetActor().GetActiveSkillList()[i]).GetCoolDownTime();
						//m_coolDownTimer[i] = 1;//m_actor.GetSkill(GetActor().GetActiveSkillList()[i]).GetCoolDownTime();
						
					}
					
				}
//				if(  tex != null
//				&&m_joyStickNext
//				&&m_coolDownTimer[0] <= 0
//				&& (m_controlSkillActive == null || (m_controlSkillActive != null && TheFinalWar.idle == false)))
//				{
//				  if(GetActor().ApplyUiInput(m_actor.GetActiveSkillList()[0]))
//				  {
//				  m_coolDownTimer[0] = m_actor.GetSkill(GetActor().GetActiveSkillList()[0]).GetCoolDownTime();
//				  }
//				
//				}
//				if(  tex != null
//				&&m_joyStickBack
//				&&m_coolDownTimer[1] <= 0
//				&& (m_controlSkillActive == null || (m_controlSkillActive != null && TheFinalWar.idle == false)))
//				{
//				  if(GetActor().ApplyUiInput(m_actor.GetActiveSkillList()[1]))
//				  {
//				  m_coolDownTimer[1] = m_actor.GetSkill(GetActor().GetActiveSkillList()[1]).GetCoolDownTime();
//				  }
//				
//				}
				OnCoolDownMask(m_twoSkillBarInfo[i].position, m_actor.GetSkill(GetActor().GetActiveSkillList()[i]).GetCoolDownTime(), m_coolDownTimer, i);
				
				  
				
			}
		}
		
	}
	// Three special skill
	/*
	else
	{
		for ( i = 0; i < GetActor().GetActiveSkillList().Count && i < m_threeSkillBarInfo.length; ++i)
		{
			if (GetActor().GetActiveSkillList()[i] != ESkillType.Invalid)
			{	

					if (GUI.Button (Rect (m_threeSkillBarInfo[i].position.x, m_threeSkillBarInfo[i].position.y, m_customSkin.customStyles[2].normal.background.width, m_customSkin.customStyles[2].normal.background.height)
					, GetActor().GetActiveSkillList()[i].ToString()
					, m_customSkin.customStyles[2]))
					{
						GetActor().ApplyUiInput(m_actor.GetActiveSkillList()[i]);
					}
			}
		}
	}
	*/
}

function OnPauseHud()
{
	/*
		SceneManager.GetInstance().StopGame( GUI.Toggle(Rect (m_pauseButtonInfo.position.x, m_pauseButtonInfo.position.y, m_customSkin.customStyles[3].normal.background.width, m_customSkin.customStyles[3].normal.background.height)
				, SceneManager.GetInstance().IsGamePaused()
				, ""
				, m_customSkin.customStyles[3]) );
				*/
				
	if (GUI.Button( GetRect(m_pauseButtonInfo,  m_customSkin),
					"",
				     m_customSkin.customStyles[m_pauseButtonInfo.customStyleIndex])|| m_joyStickPause
	    && (m_controlSkillActive == null || (m_controlSkillActive != null && TheFinalWar.idle == false)))
	{
		SceneManager.Singleton().StopGame(true);
		//SetEnabled(false);
		AudioManager.Singleton().PlayButtonAudio();
		adverstment.Singleton().Control_AdWindow();
	}
}

function OnItem()
{
		if (GUI.Button(Rect (m_itemButtonInfo.position.x, m_itemButtonInfo.position.y, m_customSkin.customStyles[m_itemButtonInfo.customStyleIndex].normal.background.width, m_customSkin.customStyles[m_itemButtonInfo.customStyleIndex].normal.background.height)
				, "x " + GetActor().GetHealthPot()
				, m_customSkin.customStyles[m_itemButtonInfo.customStyleIndex]) )
		{
			GetActor().UseHealthPot();
		}
}

	function OnText()
	{
		GUI.Label( GetRect(m_textInfo, m_customSkin),
						 "" ,
						 m_customSkin.customStyles[m_textInfo.customStyleIndex]);


	}
	
	function OnBackButton()
	{		
		if (PageButton(m_backButtonInfo)||m_joyStickNext)
		{
			SceneManager.Singleton().StopGame(false);
			adverstment.Singleton().Close_AdWindow();
			m_joyStickPause=false;
		}
	}
	
	function OnDeath()
	{
		/*GUI.DrawTexture(Rect(0, 
						   0,
						   m_deathBackground.width * UiManager.Singleton().GetScreenSizeFactor().x,
						   m_deathBackground.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_deathBackground, 
					    ScaleMode.StretchToFill, 
					    true);
		*/
					    
		GUI.Label( GetRect(m_deathInfo, m_customSkin),
						 "" ,
						 m_customSkin.customStyles[m_deathInfo.customStyleIndex]);
//	    ControllableActor.Singleton().CloseJump();


	}
	
	function OnRetryButton()
	{		
		if (PageButton(m_retryButtonInfo)||m_joyStickNext)
		{
			SceneManager.Singleton().StopGame(false);
			SetEnabled(false);
			//Debug.Log(Application.loadedLevelName);
			SwitchLevelTrigger.SwitchLevel("Upgrade", Application.loadedLevelName, true, 0, true);
		}
		
		if ( PageButton(m_deathQuitButtonInfo)||m_joyStickBack)
		{
			SceneManager.Singleton().StopGame(false);
			SetEnabled(false);
			//Debug.Log(Application.loadedLevelName);
			SwitchLevelTrigger.SwitchLevel("MainMenu", Application.loadedLevelName, true, 0, true);
		}
	}
	
	function OnMainMenuButtonButton()
	{		
		if ( PageButton(m_mainMenuButtonInfo) ||m_joyStickBack)
		{
		    adverstment.Singleton().Close_AdWindow();
			SceneManager.Singleton().StopGame(false);
			SetEnabled(false);
			//Debug.Log(Application.loadedLevelName);
			SwitchLevelTrigger.SwitchLevel("MainMenu", Application.loadedLevelName, true, 0, true);
			
		}
	}
	
	private var m_hitsCombofaded : boolean = true;
	private var m_fadeOutTime : float = 1.0;
    private var currentHitsCombo : int = m_lastHitsCombo;
    private var time : int = 0;
    private var pointUp : boolean =false;
	function OnHitsCombo()
	{
	    
	    
		if (GetActor().GetHitsCombo() > 1 && GetActor().GetHitsComboCountDownTime() > m_fadeOutTime)
		{
			// MAKE LEVEL NAME UNDISPLAY
			help.Singleton().OpenThePoint();
			m_levelNameDisplayTimer = m_levelNameDisplayTime + 1;
			
			m_hitsCombofaded = false;
			guiText.material.color.a = 1;
			m_lastHitsCombo = GetActor().GetHitsCombo();
			
			//PageText(m_hitsComboInfo, (GetActor().GetHitsCombo().ToString() + " " + m_hitsComboInfo.text[GameOptionsManager.Singleton().GetLanguage()]) );
		}
		if(currentHitsCombo != m_lastHitsCombo)
		{
		    pointUp = true;
		    currentHitsCombo = m_lastHitsCombo;
		}
		if(pointUp)
		{
		    time++;
		    if(time < 42)
		    {
		      help.Singleton().ChangeThePoint();
		    }
		    else
		    {
		       time = 0;
		       pointUp = false;
		    }
		}
		guiText.text = (/*m_lastHitsCombo.ToString() + " " +*/ m_hitsComboInfo.text[GameOptionsManager.Singleton().GetLanguage()]);
		
		if (!m_hitsCombofaded && GetActor().GetHitsComboCountDownTime() <= m_fadeOutTime) 
    	{
    		//Debug.Log("GetActor().GetHitsComboCountDownTime() : " + GetActor().GetHitsComboCountDownTime());
        	m_hitsCombofaded = true;
       	 	//Fade.use.Alpha(m_hitsComboInfo.fonts[GameOptionsManager.Singleton().GetLanguage()].material, 1.0, 0.0, 1.0);
        	Fade.use.Alpha(guiText.material, 1.0, 0.0, GetActor().GetHitsComboCountDownTime());
        	help.Singleton().CloseThePoint();
        	help.Singleton().ResetThePoint();
    	}
		//PageText(m_hitsComboInfo, (m_lastHitsCombo.ToString() + " " + m_hitsComboInfo.text[GameOptionsManager.Singleton().GetLanguage()]) );
	}

	function OnLevelName()
	{
		if (m_levelNameDisplayTimer <= m_levelNameDisplayTime)
		{	
			m_levelNameDisplayTimer += Time.deltaTime;
			PageText(m_levelNameInfo);
			PageText(m_levelDifficultyInfo, m_levelDifficutyTexts[GameOptionsManager.Singleton().GetLanguage()].text[GameManager.Singleton().GetDifficulty()]);
		}
	}
	
	function OnGoHud()
	{
		if (m_goHudDisplayTimer <= m_goHudDisplayTime)
		{
			m_goHudDisplayTimer += Time.deltaTime;
			
			if (m_goHudFlickeringDeltaTimer < 0)
			{
				m_goHudFlickeringDeltaTimer += Time.deltaTime;
			}
			else if (m_goHudFlickeringDeltaTimer <= m_goHudFlickeringDeltaTime)
			{
				m_goHudFlickeringDeltaTimer += Time.deltaTime;
				// temp
				PageText(m_goHudInfo);
			}
			else
			{
				m_goHudFlickeringDeltaTimer = -m_goHudFlickeringDeltaTime;
			}
			

		}
	}
	
function Update()
{
	var map = InputKeyCodeMapHelper.mapKeys;
  	if(m_joyNum>=1)
	{
		m_joyNum=0;
	}
    if(Input.GetButtonDown(EInputStringName.Pause.ToString()) || Input.GetKeyUp(map["Select"].ToString()))
	{
		m_joyStickPause=true;
	}
		   
	if(Input.GetButtonDown(EInputStringName.Next.ToString()) || Input.GetKeyUp(map["Y"].ToString()))
	{
		m_joyStickNext=true;
	}
	else
	{
		m_joyStickNext=false;
	}
	  
	if(Input.GetButtonDown(EInputStringName.Back.ToString()) || Input.GetKeyUp(map["X"].ToString()))  //page back
    {
        m_joyStickBack=true;
            
    }
    else
    { 
        m_joyStickBack=false;
    }
    
 	if (Input.GetKeyUp(map["A"].ToString()))
 	{
 		if (!UseSpecialSkill(0)) {
 			UseSpecialSkill(1);
 		}
 	}
 	if (Input.GetKeyUp(map["Start"].ToString()))
 	{
 		UseHealthPot();
 	}
}
function Start()
{
	super.Start();
	
	// Combo hits text
	guiText.font = m_hitsComboInfo.fonts[GameOptionsManager.Singleton().GetLanguage()];
	guiText.material = m_hitsComboInfo.fonts[GameOptionsManager.Singleton().GetLanguage()].material;
	guiText.material.color.a = 0;
	m_controlSkillActive = GameObject.Find("_Platform_Level_6_2_1");
}

function OnGUI()
{
	if (GetActor() == null)
	{
		return ;
	}
	if ( SceneManager.Singleton().IsGamePaused() || SceneManager.Singleton().IsGameOver())
	{
		GUI.enabled = false;
	}
	else
	{
		GUI.enabled = true;
	}

	
	// MC hp bar
	OnHpBar();
	
	// MC stamina bar
	OnStaminaBar();
	
	// MC Head Ico
	OnHeadIcoHud();
	
	// Soul collection
	OnScoreBar();
	
	// Special Skills
	OnSpecialSkills();
	
	// Pause
	OnPauseHud();
	
	// Item : health pot
	OnItem();
	
	// Hits Combo
	OnHitsCombo();
	
	// Level Name and difficulty
	OnLevelName();
	
	// Go Hud, display and flush a while, then disappear
	OnGoHud();
	
	// Pause
	if ( SceneManager.Singleton().IsGamePaused() )
	{
		GUI.enabled = true;
		OnText();
		OnBackButton();

		OnMainMenuButtonButton();
	}
	
	if ( SceneManager.Singleton().IsGameOver() && FindTheFinalWar.Singleton().control() == null/*ControllableActor.m_firsteTimeForGame==false/*ControllableActor.Singleton().ReturnFirsteTime() == false*/)
	{
		GUI.enabled = true;
		
		OnDeath();
		OnRetryButton();
	}
	if(FindTheFinalWar.Singleton().control() != null)
	{
	if( SceneManager.Singleton().IsGameOver() && ControllableActor.m_firsteTimeForGame==true/*ControllableActor.Singleton().ReturnFirsteTime() == true*/)
	{
	   OnDeath();
	   TheFinalWar_2.Singleton().controlTheActorWindow();
	   
	  // ControllableActor.m_firsteTimeForGame = false;
	}
	}
	
	// TEMP
	// Level Name and difficulty
	//GUI.Label(Rect(0,0, 200, 200), (m_text[GameManager.Singleton().GetDifficulty()] + " " + Application.loadedLevelName + "  - Version 5 -"));
}

function GetActor() : ControllableActor
{
	if (m_actor == null)
	{
		m_actor = SceneManager.Singleton().GetMainActor();
	}
	
	return m_actor;
}

}
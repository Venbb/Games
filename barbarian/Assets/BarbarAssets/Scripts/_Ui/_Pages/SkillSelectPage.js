#pragma strict

import System.Collections.Generic;

class SkillTypeTexture
{
	var skillType : ESkillType;
	var textureNormal : Texture;
	var textureBeSelected : Texture;
}

class SkillSelectPage extends Page
{
	var m_backButtonInfo : HudInfo;
	var m_continueButtonInfo : HudInfo;
	var m_nextPage : String;
	
	var m_skillSelectGroupPos : Vector2;
	var m_skillSelectBackground : Texture;

	var m_skillPosList : Vector2[];
	var m_activeSkillPosList : Vector2[];

	var m_skillTypeTextures : SkillTypeTexture[];

	var m_skillTitlePosition : Vector2;
	var m_skillTitle : Texture;
	
	var m_emptySkillGrid : Texture;
	var m_lockedSkill : Texture;
	
	//joy member
	var m_joyStickNum:int;
	var m_textNum:int;
	var m_textNum2:int;
	var m_joyStickIndex:int;
	var m_joyStickTexName:String;
	var m_joyStickTexOldName:String;
	var m_joyStickIsActiveName:String;
 
	public var m_currentMenuCursor : Texture;
  
	var m_buttenPressTime:ButtenPressTime;
	private var m_mainActor : ControllableActor = null;
    private  var  m_joyStickButtonDown:boolean;
    private var m_joyStrickButtonSkillBackList:boolean;
    private var m_joyStickBack:boolean;
    private var m_joyStickNext:boolean;
	function GetActor() : ControllableActor
	{
		if (m_mainActor == null)
		{
			m_mainActor = SceneManager.Singleton().GetMainActor();
		}
		
		return m_mainActor;
	}
	
	function OnDisable()
	{
		if (SceneManager.Singleton())
		{
			SceneManager.Singleton().StopGame(false);
		}
	}
	
	function Awake()
	{
		m_backButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_backButtonInfo.position);
		m_continueButtonInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_continueButtonInfo.position);
		
		m_skillSelectGroupPos = UiManager.Singleton().ConvertToDeviceScreenPosition(m_skillSelectGroupPos);
		
		for (var i : int = 0; i < m_skillPosList.length; ++i )
		{
			m_skillPosList[i] = UiManager.Singleton().ConvertToDeviceScreenPosition(m_skillPosList[i]);
		}
		
		for (i = 0; i < m_activeSkillPosList.length; ++i )
		{
			m_activeSkillPosList[i] = UiManager.Singleton().ConvertToDeviceScreenPosition(m_activeSkillPosList[i]);
		}
	}

	function Start()
	{
		SceneManager.Singleton().StopGame(true);
	}
	function FixedUpdate()
	{
	
	
	}
	
	
	function Update()
	{
		m_joyStickNum = JoyStickMoveNum();
		if(m_joyStickNum == 0) {
			m_textNum2 = 5;
		} else if(m_joyStickNum == 1) {
			m_textNum2 = 6;
		} else if(m_joyStickNum == 2) {
			m_textNum2 = 10;
		} else if(m_joyStickNum == 3) {
			m_textNum2 = 11;
		} else if(m_joyStickNum == 4) {
			m_textNum2 = 12;
		}
		
		var map = InputKeyCodeMapHelper.mapKeys;
		if (Input.GetKeyUp(map["Y"].ToString())) {
			var index : int = FindFirstInvalidIndexInlist(GetActor().GetActiveSkillList());
			var propertyDataList : ControllableActorPropertyData[] = GetActor().GetAllPropertyData();
			var activityIndex = IsInListIndex(GetActor().GetActiveSkillList(), propertyDataList[m_textNum2].skillType);
			if (activityIndex >= 0) {
				GetActor().SetActiveSkill(activityIndex, ESkillType.Invalid);  //Reset active skill back
				AudioManager.Singleton().PlayButtonAudio();
			} else {
				if (index >= 0) {
					AudioManager.Singleton().PlayButtonAudio();
					GetActor().SetActiveSkill(index, propertyDataList[m_textNum2].skillType);
				}
			}
		}
		
		if (Input.GetKeyUp(map["LeftFlipper"].ToString())) {
			m_joyStickNext = true;
		}
		if (Input.GetKeyUp(map["X"].ToString())) {
			m_joyStickBack = true;
		}

//	if(m_joyStickIndex>=1)
//	{
//	m_joyStickIndex=0;
//	}
//	      
//	      if(Input.GetButtonDown(EInputStringName.Jump.ToString()))
//	      {
//	      m_joyStrickButtonSkillBackList=true;
//	      }
//	      else
//	      {
//	      m_joyStrickButtonSkillBackList=false;
//	      
//	      }
//	      if(Input.GetButtonDown(EInputStringName.Fire1.ToString()))
//				{
//				
//				m_joyStickButtonDown=true;
//				}
//		   else
//		   {
//		        m_joyStickButtonDown=false;
//		   }
//		   
//		   if(Input.GetButtonDown(EInputStringName.Back.ToString()))
//		   {
//		      m_joyStickBack=true;
//		   
//		   }
//		   else 
//		   {
//		       m_joyStickBack=false;
//		   	   
//		   }
//		  if(Input.GetButtonDown(EInputStringName.Next.ToString()))
//		  {
//		      m_joyStickNext=true;
//		  
//		  }
//		  else
//		  {
//		      m_joyStickNext=false;
//		  
//		  }

	}
	function OnGUI()
	{
	 
		OnBackground();

		// Title
   		GUI.DrawTexture(Rect(m_skillTitlePosition.x * UiManager.Singleton().GetScreenSizeFactor().x, 
						   m_skillTitlePosition.y * UiManager.Singleton().GetScreenSizeFactor().y,
						   m_skillTitle.width * UiManager.Singleton().GetScreenSizeFactor().x,
						   m_skillTitle.height * UiManager.Singleton().GetScreenSizeFactor().y),
					    m_skillTitle, 
					    ScaleMode.StretchToFill, 
					    true);	
					    
					    
		OnSkillSelect();
		
		OnBackButton();
		OnContinueButton();
		
		OnCursor();
	}
	
	function OnCursor() {
		if (!ReleaseHelper.supportJoystick) {
			return;
		}
		var pos : Vector2 = m_skillPosList[m_joyStickNum];
		GUI.DrawTexture(Rect(pos.x + 60, pos.y + 100, m_currentMenuCursor.width, m_currentMenuCursor.height), m_currentMenuCursor, ScaleMode.ScaleAndCrop, true);	
	}
	
	function OnBackButton()
	{		
		if ( PageButton(m_backButtonInfo)||m_joyStickBack )
		{
			//SwitchPageToPrePage();
			SetEnabled(false);
			SceneManager.Singleton().Save(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level);
			SwitchLevelTrigger.SwitchLevel("UpgradeShop", "", true, 0, false);
		}
	}
	
	function OnContinueButton()
	{		
		if ( PageButton(m_continueButtonInfo) ||m_joyStickNext)
		{
			//SwitchPageTo(m_nextPage);
			SetEnabled(false);
			SceneManager.Singleton().Save(GameManager.Singleton().GetGameData(GameManager.Singleton().GetMainActorId()).m_level);
			SwitchLevelTrigger.SwitchLevel("Upgrade", "", true, 0, false);
		}
	}
	
	function GetActiveSkillTexture(skillType : ESkillType) : Texture
	{
		for (var i = 0; i < m_skillTypeTextures.length; ++i)
		{
			if (m_skillTypeTextures[i].skillType == skillType)
			{
				return m_skillTypeTextures[i].textureBeSelected;
			}
		}
		
		return null;
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
	
	function IsInListIndex(activeSkillList : List.<ESkillType>, skillType : ESkillType) : int
	{
		for ( var i : int = 0; i < activeSkillList.Count && i < m_activeSkillPosList.length; ++i )
		{
			if ( activeSkillList[i] == skillType )
			{
				return i;
			}
		}
		return -1;
	}
	
	function IsInList(activeSkillList : List.<ESkillType>, skillType : ESkillType) : boolean
	{
		for ( var i : int = 0; i < activeSkillList.Count && i < m_activeSkillPosList.length; ++i )
		{
			if ( activeSkillList[i] == skillType )
			{
				return true;
			}
		}
		return false;
	}
	
	function FindFirstInvalidIndexInlist(activeSkillList : List.<ESkillType>) : int
	{
		for ( var i : int = 0; i < activeSkillList.Count && i < m_activeSkillPosList.length; ++i )
		{
			if ( activeSkillList[i] == ESkillType.Invalid )
			{
				return i;
			}
		}
		return -1;
	}
	
	function OnSkillSelect()
	{	 
		if (GetActor() == null)
		{
			return ;
		}
		
		GUI.skin = m_customSkin;
		//----------------------------------------------------------------------------------------------
		// Group begin
		GUI.BeginGroup ( Rect (m_skillSelectGroupPos.x, m_skillSelectGroupPos.y, m_skillSelectBackground.width * UiManager.Singleton().GetScreenSizeFactor().x, m_skillSelectBackground.height * UiManager.Singleton().GetScreenSizeFactor().y) );

		// Background
		//GUI.DrawTexture( Rect(0, 0,  m_skillSelectBackground.width * UiManager.Singleton().GetScreenSizeFactor().x,  m_skillSelectBackground.height * UiManager.Singleton().GetScreenSizeFactor().y),  m_skillSelectBackground, ScaleMode.StretchToFill, true);
		
        var UseSkill:String=null;
		var UseSkillArray:Array=new Array();			    
		var tex : Texture = null;
		var tex1:Texture=null;
		// Active skill
		var activeSkillList : List.<ESkillType> = GetActor().GetActiveSkillList();
		for ( var i : int = 0; i < activeSkillList.Count+1 && i < m_activeSkillPosList.length; ++i )
		{
			if ( activeSkillList[i] != ESkillType.Invalid )
			{
				tex = GetActiveSkillTexture(activeSkillList[i]);
				UseSkill=GetActiveSkillTexture(activeSkillList[i]).ToString();
			    UseSkillArray.Push(UseSkill);
			    
			    
				if ( tex != null
				   && GUI.Button( Rect(m_activeSkillPosList[i].x, m_activeSkillPosList[i].y, tex.width, tex.height), tex) )
				   
				{
				
				
					GetActor().SetActiveSkill(i, ESkillType.Invalid);  //Reset active skill back
					AudioManager.Singleton().PlayButtonAudio();
				}
			}
			else
			{
				GUI.Label( Rect(m_activeSkillPosList[i].x, m_activeSkillPosList[i].y, m_emptySkillGrid.width, m_emptySkillGrid.height), m_emptySkillGrid);
			}
		}
		
		// Select skill
		//var skillList : Skill[] = GetActor().GetSkillList();GetPropertyData(item.itemType, item.skillType)
		var propertyDataList : ControllableActorPropertyData[] = GetActor().GetAllPropertyData();
		
		var j : int = 0;
		var Old:String=null;
		var skill:String=null;
		for ( i = 0; i < propertyDataList.length && j < m_skillPosList.length; ++i )
		{
	
			if (propertyDataList[i].skillType != ESkillType.Invalid && propertyDataList[i].chooseable)
			{
				if (!propertyDataList[i].IsLocked()) {
				// If already in active list, set gui to be un enabled
					GUI.enabled = IsInList(GetActor().GetActiveSkillList(), propertyDataList[i].skillType) ? false : true;
				
					tex = GetNormalSkillTexture(propertyDataList[i].skillType);
				
					var index : int = FindFirstInvalidIndexInlist(GetActor().GetActiveSkillList());
					if ( tex != null
				   	&& GUI.Button( Rect(m_skillPosList[j].x, m_skillPosList[j].y, tex.width, tex.height), tex) )
					{
				
						if (index >= 0)
						{
							m_textNum = j;
							AudioManager.Singleton().PlayButtonAudio();
							GetActor().SetActiveSkill(index, propertyDataList[i].skillType);
						}
					}
				
				
					//this is joyStickUIMoveAndChoose
				
//					GUI.Label(Rect(m_skillPosList[m_joyStickNum].x, m_skillPosList[m_joyStickNum].y, tex.width, tex.height), m_background); 
				
				
//					tex1 = GetNormalSkillTexture(propertyDataList[m_textNum2].skillType);
//					m_joyStickTexOldName=tex1.ToString();
//			    	for(var f:int=0;f<UseSkillArray.length;f++)
//			    	{
//			             UseSkill= UseSkillArray[f];
//			             Old=m_joyStickTexOldName.Substring(8,5);
//			             skill= UseSkill.Substring(6,5);
//			            // Debug.Log(Old);
//			            // Debug.Log(skill);
//			         	if ( Old==skill)
//			         	{
//			          
//			             	tex1=null;
//			         	}
//			    
//			   		}
//					if(m_joyStickButtonDown&&tex1 != null&&m_joyStickIndex<1&&m_joyStickTexName!=m_joyStickTexOldName)
//					{
//				   		m_joyStickTexName=tex1.ToString();
//				  
//				   
//				      	if(index >= 0)
//				   		{
//				      		m_joyStickIndex++;
//				      		m_joyStickIsActiveName=m_joyStickTexName;
//				     
//				      		GetActor().SetActiveSkill(index, propertyDataList[m_textNum2].skillType);
//				     	}
//					}
				}
				else {
					GUI.Label( Rect(m_skillPosList[j].x, m_skillPosList[j].y, m_lockedSkill.width, m_lockedSkill.height), m_lockedSkill);
				}
				j++;
			} 
		}
	   
//	    var m_DeleteBool:boolean=false;
//		for ( var k : int = 0; k < activeSkillList.Count+1 && k < m_activeSkillPosList.length; ++k )
//		{
//			if ( activeSkillList[k] != ESkillType.Invalid )
//			{ 
//			
//			  for(var h:int=0;h<UseSkillArray.length;h++)
//			       {
//			             UseSkill= UseSkillArray[h];
//			             Old=m_joyStickTexOldName.Substring(8,5);
//			             skill= UseSkill.Substring(6,5);
//				//tex1 = GetActiveSkillTexture(activeSkillList[k]);
//				//Debug.Log(activeSkillList[k].ToString().Substring(0,5));
//				//Debug.Log(m_joyStickTexOldName.Substring(8,5));
//				if(activeSkillList[k].ToString().Substring(0,5)==m_joyStickTexOldName.Substring(8,5))
//				{
//				m_DeleteBool=true;
//				}
//				//Debug.Log(tex1);
//				//Debug.Log(m_DeleteBool);
//				//Debug.Log(m_joyStrickButtonSkillBackList);
//				//Debug.Log(Old==skill);
//				if ( tex1 == null
//				   && Old==skill&&m_joyStrickButtonSkillBackList&&m_joyStickIndex<1
//				   &&m_DeleteBool) 
//				   
//				{
//				   
//				    m_joyStickIndex++;
//				    m_joyStickTexName="";
//				    
//					GetActor().SetActiveSkill(k, ESkillType.Invalid);  //Reset active skill back
//					
//					AudioManager.Singleton().PlayButtonAudio();
//				}
//				   }
//			}
//			
//		 }
		
		GUI.enabled = true;
		
		GUI.EndGroup();

	}
	
	function JoyStickMoveNum():int
	{
		var map = InputKeyCodeMapHelper.mapKeys;
		if(Input.GetKeyUp(map["right"].ToString()) /*GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0) && DelayTime(m_buttenPressTime,0.2)*/)
		{

			if(m_textNum>=4){

				return 4;
			}
			m_textNum++;

			return m_textNum;

		}
		else if(Input.GetKeyUp(map["left"].ToString()) /*GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0) && DelayTime(m_buttenPressTime,0.2)*/)
		{
			if(m_textNum<=0)
				return 0;
			m_textNum--;
			return m_textNum;

		}
		return m_textNum;
	}
}
#pragma strict
class TheFinalWar_2 extends AiActor
{
var windowRect_After : Rect;
var windowRect_AfterPosition : Rect;
var windowRect_BOss_After : Rect;
var windowRect_Boss_AfterPosition : Rect;
var windowRect_Awake : Rect;
var windowRect_Awake_Shifu : Rect;
var m_showWindow_Control : Rect;
var windowRect_Boss : Rect;
var windowRect_Boss_Position : Rect;

var m_timecontrol : int;
var m_showWindow : int;
var m_showWindow_Awake : int = 0;
var m_timeCall : int = 0;
var targetPosition : Vector3;
var myskin : GUISkin;

private var m_distance : float;
private var m_bouzeSizeY : float;
private var distance1 : float;
private var m_controlEye : boolean = true;
public var controlactive : boolean =false;
private var windowshow_After : boolean = false;
private var windowshow_BOSS_After : boolean = false;
private var windowshow_Awake : boolean = false;
private var windowshow_Awake_Shifu : boolean = false;
private var windowshow_Control : boolean = false;
private var windowshow_BOSS : boolean = false;
private var m_firstTimeInfo : boolean = true;
private var m_charactor_Awake : boolean = false;
//--------------------
private var dialogueInfo_2 = new Array(4);
private var dialogueInfo_Shifu = new Array (7);
//----------------
var m_dialogueInfo_2 : LabelString[];
var m_dialogueInfo_Shifu : LabelString[];
var m_BossTopic : LabelString[];
private var m_targetBackGround : GameObject;
private var m_targetBackLand : GameObject;
private var m_targetEnemy : GameObject;
private var m_targetCharactor : GameObject;
private var m_targetUI : GameObject;
private var eye_Up : GameObject;
private var eye_Down : GameObject;
private var grand1 : GameObject;
private var grand2 : GameObject;
private var grand3 : GameObject;
private var grand4 : GameObject;

 var grand : GameObject[];

//-------------
var m_LabelDirection : label;
var m_controlDirectionTime : int = 0;
var m_DirectionShow : boolean = true;
var dialogeStyle : GUIStyle;
var dialogeStyle_Shifu : GUIStyle;
var m_BossTopicStyle : GUIStyle;
var m_font : Font[];
private static var m_instance : TheFinalWar_2 = null;
//-------------------
private var showBOSS : int = 0;
private var pos : Vector2 = Vector2.zero;

function Awake()
{
	if (m_instance == null)
	{
		m_instance = this;
	}
	
}
static function Singleton() : TheFinalWar_2
{	
	return m_instance;
}

function Start () {
   dialogeStyle.font = m_font[GameOptionsManager.Singleton().GetLanguage()];
   m_BossTopicStyle.font = m_font[GameOptionsManager.Singleton().GetLanguage()];
   dialogeStyle_Shifu.font = m_font[GameOptionsManager.Singleton().GetLanguage()];
   m_targetBackGround=GameObject.Find("_All Nies");
   m_targetBackLand=GameObject.Find("_Platform_Level_6_3");
   m_targetEnemy=GameObject.Find("Boss_Level_6");
   m_targetCharactor=GameObject.Find("Kato(Clone)");
   m_targetUI=GameObject.Find("InGameHud");
   eye_Up=GameObject.Find("eye_Up");
   eye_Down=GameObject.Find("eye_Down");
   grand1=GameObject.Find("ground1");
   grand2=GameObject.Find("ground2");
   grand3=GameObject.Find("ground3");
   grand4=GameObject.Find("ground4");
   if(eye_Up)
   {
   eye_Up.renderer.enabled=false;
   eye_Down.renderer.enabled=false;
   m_distance=(eye_Up.collider.bounds.size.y+eye_Down.collider.bounds.size.y)/2+50.0f;
   m_bouzeSizeY=(eye_Up.collider.bounds.size.y+eye_Down.collider.bounds.size.y)/2;
   }
   if(grand1)
   {
   grand1.renderer.enabled=false;
   grand2.renderer.enabled=false;
   grand3.renderer.enabled=false;
   grand4.renderer.enabled=false;
   }
   for( var i : int ; i < grand.length;i++)
   {
      grand[i].renderer.enabled = false;
   }
  // windowRect_After=new Rect(Screen.width/2,Screen.height/1.5,Screen.width/2.5,110);
   //windowRect_BOss_After=new Rect(m_targetEnemy.transform.position.x,Screen.height/2.5,350,150);
   windowRect_Awake=new Rect(Screen.width/2,Screen.height/2.5,350,150);
   windowRect_Awake_Shifu=new Rect(Screen.width/2,Screen.height/1.5,350,150);
   m_showWindow_Control=new Rect(0,0,1,1);
  // dialogueInformation();
   //dialogueInformation_Shifu();
   
  
}

function Update () {
    windowRect_After=new Rect(Screen.width/windowRect_AfterPosition.x,
                              Screen.height/windowRect_AfterPosition.y,
                              Screen.width/windowRect_AfterPosition.width,
                              Screen.height/windowRect_AfterPosition.height);
   /* if(m_firstTimeInfo)
    {
       if(m_targetEnemy)
       {
       pos = m_targetEnemy.transform.position;
       }
       timeRun();
    }
    if(m_targetEnemy)
    {
   if(BossRebirth.Singleton().Return_ControlRebirth() == false )
   {
       showBOSS++;
       if( showBOSS <= 200)
       {
          if(m_targetEnemy.transform.position.x > m_targetCharactor.transform.position.x)
          {
             //windowRect_Boss=new Rect(Screen.width/1.5,Screen.height/5,Screen.width/3,110);
             windowRect_Boss=new Rect(Screen.width/windowRect_Boss_Position.x,
                                      Screen.height/windowRect_Boss_Position.y,
                                      Screen.width/windowRect_Boss_Position.width,
                                      Screen.height/windowRect_Boss_Position.height);
          }
          else
          { 
            // windowRect_Boss=new Rect(m_targetEnemy.transform.position.x,Screen.height/2.5,Screen.width/3,180);
            windowRect_Boss=new Rect(m_targetEnemy.transform.position.x,
                                     Screen.height/windowRect_Boss_Position.y,
                                     Screen.width/windowRect_Boss_Position.width,
                                     Screen.height/windowRect_Boss_Position.height);
          }
      
          if(showBOSS >= 50 && showBOSS <=170)
          {
             windowshow_BOSS = true;
          }
          else if(showBOSS >=171 && showBOSS <=175)
          {
            windowshow_BOSS = false;
            windowControl();
          }
          else if(showBOSS >=196 && showBOSS <=199)
          {
            windowshow_Control = false;
          }
       }
   }
   }*/
    
}
function FixedUpdate()
{
     if(m_firstTimeInfo)
    {
       if(m_targetEnemy)
       {
       pos = m_targetEnemy.transform.position;
       }
       timeRun();
    }
    if(m_targetEnemy)
    {
   if(BossRebirth.Singleton().Return_ControlRebirth() == false )
   {
       showBOSS++;
       //if( showBOSS <= 200)
       if( showBOSS <= 400)
       {
          if(m_targetEnemy.transform.position.x > m_targetCharactor.transform.position.x)
          {
             //windowRect_Boss=new Rect(Screen.width/1.5,Screen.height/5,Screen.width/3,110);
             windowRect_Boss=new Rect(Screen.width/windowRect_Boss_Position.x,
                                      Screen.height/windowRect_Boss_Position.y,
                                      Screen.width/windowRect_Boss_Position.width,
                                      Screen.height/windowRect_Boss_Position.height);
          }
          else
          { 
            // windowRect_Boss=new Rect(m_targetEnemy.transform.position.x,Screen.height/2.5,Screen.width/3,180);
            windowRect_Boss=new Rect(m_targetEnemy.transform.position.x,
                                     Screen.height/windowRect_Boss_Position.y,
                                     Screen.width/windowRect_Boss_Position.width,
                                     Screen.height/windowRect_Boss_Position.height);
          }
      
         // if(showBOSS >= 50 && showBOSS <=170)
          if(showBOSS >= 100 && showBOSS <=300)
          {
             windowshow_BOSS = true;
          }
          //else if(showBOSS >=171 && showBOSS <=175)
          else if(showBOSS >=301 && showBOSS <=350)
          {
            windowshow_BOSS = false;
            windowControl();
          }
          //else if(showBOSS >=196 && showBOSS <=199)
          else if(showBOSS >=351 && showBOSS <=399)
          {
            windowshow_Control = false;
          }
       }
   }
   }
}
function window_Boss()
{
    if(!windowshow_BOSS)
    {
       windowshow_BOSS = true;
    }
    else
    {
       windowshow_BOSS = false;
    }
}
function OnGUI()
{
    DirectionShow();
   GUI.skin = myskin;
   if(windowshow_After)
   {
      GUI.color=Color.clear;
      windowRect_After=GUI.Window(0,windowRect_After,MyWindow_After,"");
   }
   if(windowshow_BOSS_After)
   {
      GUI.color=Color.clear;
      windowRect_BOss_After=GUI.Window(0,windowRect_BOss_After,MyWindow_BOSS_After,"");
   }
   if(windowshow_Awake)
   {
     GUI.color=Color.clear;
     windowRect_Awake=GUI.Window(0,windowRect_Awake,MyWindow_Awake,"");
   }
   if(windowshow_Awake_Shifu)
   {
     GUI.color=Color.clear;
     windowRect_Awake_Shifu=GUI.Window(0,windowRect_Awake_Shifu,MyWindow_Awake_Shifu,"");
   }
   if(windowshow_BOSS)
   {
     GUI.color = Color.clear;
     windowRect_Boss=GUI.Window(0,windowRect_Boss,MyWindow_Boss,"");
   }
   if(windowshow_Control)
   {
      GUI.color=Color.clear;
      m_showWindow_Control=GUI.Window(0,m_showWindow_Control,MyWindow_Control,"");
   }
   
}
function DirectionShow()
{
     if(m_DirectionShow)
   {
       m_controlDirectionTime++;
       if(m_controlDirectionTime >= 10 )
       {
           if(!m_LabelDirection.m_label_show)
           {   
               m_LabelDirection.m_label_show = true;
           }    
           else
           {  
               m_LabelDirection.m_label_show = false;
           }
           m_controlDirectionTime = 0;
        }
        if(m_LabelDirection.m_label_show)
        {
            GUI.color = Color.yellow;
        }
        else
        {
            GUI.color = Color.clear;
        }
        DrawLabel();
       
   }                 
}
function DrawLabel()
{
    GUI.Label(Rect(Screen.width/m_LabelDirection.m_label_PositionX,
                      Screen.height/m_LabelDirection.m_label_PositionY,
                      Screen.width/m_LabelDirection.m_label_BoundsX,
                      Screen.height/m_LabelDirection.m_label_BoundsY),
                      m_LabelDirection.m_label_Texture);
}
function MyWindow_Boss(windowID : int)
{
   GUI.color=Color.white;
   GUI.skin = myskin;
   GUI.Label(Rect(5,5,Screen.width/2.5,160),m_BossTopic[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[0],m_BossTopicStyle);
}

function MyWindow_After(windowID : int)
{
   GUI.color=Color.white;
   GUI.skin = myskin;
   GUI.Label(Rect(5,5,Screen.width/3.2,100)," "+m_dialogueInfo_2[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_showWindow-1]/*dialogueInfo_2[m_showWindow-1]*/+" ",dialogeStyle);
}
function MyWindow_BOSS_After(windowID : int)
{
   GUI.color=Color.white;
   GUI.skin = myskin;
   GUI.Label(Rect(5,5,Screen.width/3.2,100)," "+m_dialogueInfo_2[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_showWindow-1]/*dialogueInfo_2[m_showWindow-1]*/+" ",dialogeStyle);
}
function MyWindow_Awake(windowID : int)
{
   GUI.color=Color.yellow;
   GUI.skin = myskin;
   GUI.Label(Rect(10,5,330,130)," "+m_dialogueInfo_Shifu[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_showWindow_Awake-1]/*dialogueInfo_Shifu[m_showWindow_Awake-1]*/+" ",dialogeStyle_Shifu);
}
function MyWindow_Awake_Shifu(windowID : int)
{
  GUI.color=Color.white;
  GUI.skin = myskin;
  GUI.Label(Rect(10,5,330,130)," "+m_dialogueInfo_Shifu[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_showWindow_Awake-1]/*dialogueInfo_Shifu[m_showWindow_Awake-1]*/+" ",dialogeStyle_Shifu);
}
function MyWindow_Control(windowID : int)
{
  GUI.color=Color.clear;
     GUI.skin = myskin;

}
function timeRun()
{
  
   if(controlactive)
   {
     windowshow_BOSS = false ;
     m_timecontrol++;
     //Debug.Log(m_timecontrol);
     //targetPosition=camera.WorldToScreenPoint(m_targetEnemy.transform.position);
    // windowRect_BOss_After=new Rect(m_targetEnemy.transform.position.x,Screen.height/2.5,350,150);
     Get_UiPosition();
//     ControllableActor.Singleton().CloseJump();
    // if( m_timecontrol >= 100 && m_timecontrol <= 300)
     if( m_timecontrol >= 100 && m_timecontrol <= 700)
     {
         m_timeCall++;
         //if(m_timeCall % 50 == 0)
         if(m_timeCall % 150 == 0)
         {
            m_showWindow++;       
         }
     }
     //if(m_timecontrol >= 351 && m_timecontrol <= 1300)
     if(m_timecontrol >= 701 && m_timecontrol <= 2400)
     {
        
        eye_Up.renderer.enabled=true;
        eye_Down.renderer.enabled=true;
        distance1 = eye_Up.transform.position.y - eye_Down.transform.position.y;
        //if(m_timecontrol >=355 && m_timecontrol <= 600)
        if(m_timecontrol >=801 && m_timecontrol <= 1100)
        {
          windowshow_Control=true;
          m_timeCall=0;
          //m_controlEye=true;
          
        }
        if(distance1 > m_bouzeSizeY && m_controlEye == true)
        {
           eye_Up.transform.Translate(Vector3.down*Time.deltaTime*(Screen.height/400)/*0.7f*/);
           eye_Down.transform.Translate(Vector3.up*Time.deltaTime*(Screen.height/400)/*0.7f*/);
        }
        /*else if(m_controlEye == false && distance1 < m_distance)
        {
           eye_Up.transform.Translate(Vector3.up*Time.deltaTime*0.4f);
           eye_Down.transform.Translate(Vector3.down*Time.deltaTime*0.4f);
        }*/
        if(distance1 <= m_bouzeSizeY)
        {
           Debug.Log("false");
           m_controlEye = false;
        }
        /*if(distance1 >= m_distance)
        {
           Debug.Log("true");
           m_controlEye = true;
        }*/
        /*else if(m_timecontrol >=1205 && m_timecontrol <= 1355)
        {
           eye_Up.transform.Translate(Vector3.up*Time.deltaTime*0.4f);
           eye_Down.transform.Translate(Vector3.down*Time.deltaTime*0.4f);
        }
        else if(m_timecontrol >=1360 && m_timecontrol <= 1605)
        {
           eye_Up.transform.Translate(Vector3.down*Time.deltaTime*0.4f);
           eye_Down.transform.Translate(Vector3.up*Time.deltaTime*0.4f);
        }*/
        if(m_timecontrol >= 1800)
        { 
           eye_Up.transform.Translate(Vector3.up*Time.deltaTime*(Screen.height/400)/*0.4f*/);
           eye_Down.transform.Translate(Vector3.down*Time.deltaTime*(Screen.height/400)/*0.4f*/);
        }
        windowshow_After=false;
        windowshow_BOSS_After=false;
        //if(m_timecontrol > 600/*800*/)
        if(m_timecontrol > 1150/*800*/)
        {
        m_targetBackGround.SetActiveRecursively(false);
        m_targetBackLand.SetActiveRecursively(false);
        m_targetEnemy.SetActiveRecursively(false);
        for( var i : int ; i < grand.length;i++)
        {
             grand[i].renderer.enabled = true;
        }
        }
        m_targetUI.SetActiveRecursively(false);
     }
     //if( m_timecontrol >= 600/*800*/ && m_timecontrol <= 1000/*1150*/)
     if( m_timecontrol >= 1150/*800*/ && m_timecontrol <= 2350/*1150*/)
     {
         m_timeCall++;
         if(m_timeCall % 150 == 0)
         {
            m_showWindow_Awake++;       
         }
     }
   // if(m_timecontrol > 1201/*1301*/)
     if(m_timecontrol > 2251/*1301*/)
     {   
        m_controlEye = false;
        controlactive=false;
        windowshow_Awake = false;
        windowshow_Awake_Shifu = false;
        m_charactor_Awake=true;
        windowshow_Control=true;
        grand1.renderer.enabled=true;
        grand2.renderer.enabled=true;
        grand3.renderer.enabled=true;
        grand4.renderer.enabled=true;
        ControllableActor.m_firsteTimeForGame = false;
        m_DirectionShow = true;
        if(m_controlEye == false)
        {
           eye_Up.transform.Translate(Vector3.up*Time.deltaTime*(Screen.height/300)/*0.4f*/);
           eye_Down.transform.Translate(Vector3.down*Time.deltaTime*(Screen.height/300)/*0.8f*/);
        }    
     }
     if(m_timecontrol > 2350)
     {
         windowshow_Control=true;
         
     }
   
   if(m_showWindow > 0 && m_showWindow % 2 == 1 && windowshow_After == false)
   {
       windowshow_After=true;
       windowshow_BOSS_After=false;
   }
  if(m_showWindow > 0 && m_showWindow % 2 == 0 && windowshow_BOSS_After ==false)
   {
       windowshow_BOSS_After=true;
       windowshow_After=false;
   }
   if(m_showWindow_Awake > 0 &&  m_showWindow_Awake == Random.Range(3,7) )
   {
       windowshow_Awake = true;
       windowshow_Awake_Shifu = false;
       windowshow_Control=false;
   }
   if(m_showWindow_Awake > 0 &&(m_showWindow_Awake == 1 || m_showWindow_Awake == 2 ||m_showWindow_Awake == 7))
   {
       windowshow_Awake = false;
       windowshow_Awake_Shifu = true;
       windowshow_Control=false;
   }
  }
}

function controlTheActorWindow()
{
    if(!windowshow_After)
    {
       controlactive=true;;
    }
}
function firstTimeForGame()
{
   return m_firstTimeInfo;
}
function firstTimeFalse()
{
   if(m_firstTimeInfo)
   {
      m_firstTimeInfo=true;
   }
}
function charactor_Awake()
{
    return m_charactor_Awake;
}
function close_Awak()
{
    if(m_charactor_Awake)
    {
      m_charactor_Awake = false;
    }
}
function Get_UiPosition()
{
   
    if(m_targetEnemy.transform.position.x > m_targetCharactor.transform.position.x)
    {
         //windowRect_BOss_After=new Rect(Screen.width/1.8,Screen.height/5,Screen.width/3,110);
         windowRect_BOss_After=new Rect(Screen.width/windowRect_Boss_AfterPosition.x,
                                        Screen.height/windowRect_Boss_AfterPosition.y,
                                        Screen.width/windowRect_Boss_AfterPosition.width,
                                        Screen.height/windowRect_Boss_AfterPosition.height);
    }
    else
    {
         windowRect_BOss_After=new Rect(m_targetEnemy.transform.position.x,
                                        Screen.height/windowRect_Boss_AfterPosition.y,
                                        Screen.width/windowRect_Boss_AfterPosition.width,
                                        Screen.height/windowRect_Boss_AfterPosition.height);
    }
}
function windowControl()
{
   if(!windowshow_Control)
   {
      windowshow_Control=true;
   }
}
}
#pragma strict
class LabelString
{
    var m_dialogue : String[];
}
class TheFinalWar extends AiActor
{
var target :GameObject;
var m_targetTrigger : GameObject;
var m_targetWall : GameObject;
//var m_ade :String="bbaadsfe";
var windowRect:Rect;
var windowRectPosition : Rect;
var windowRect_BOSS : Rect;
var windowRect_Boss_Position : Rect;

//var myskin : GUISkin;
var controlDial : boolean = false;
var m_timecontrol : int = 0;
var m_showWindow : int=0;
var m_showBite : int = 4;
var m_lableStyle : GUIStyle;
var m_fontStyle : GUIStyle;
var m_font : Font[];
//-------------------------------
private static var m_instance : TheFinalWar = null;
private var windowshow : boolean=false;
private var windowshow_BOSS : boolean = false;
public static var idle : boolean = false;
//private var dialogueInfo = new Array(6);
var dialogueInfo : LabelString[];
//-------------------------------
var m_targetInput : GameObject;


function Start () {
   m_lableStyle.font = m_font[GameOptionsManager.Singleton().GetLanguage()];   
   target=GameObject.FindGameObjectWithTag("MainCharacter");
   m_targetInput = GameObject.Find("InputManager");
   m_targetTrigger=GameObject.FindGameObjectWithTag("CameraTargetAttributesModifier");  
   m_targetWall=GameObject.Find("wall");
 //  windowRect=new Rect(Screen.width/3.7,Screen.height/1.35,Screen.width/3,120);
   //windowRect_BOSS=new Rect(Screen.width/1.5,Screen.height/5,Screen.width/3,120);
   windowRect=new Rect(Screen.width/windowRectPosition.x,
                         Screen.height/windowRectPosition.y,
                         Screen.width/windowRectPosition.width,
                         Screen.height/windowRectPosition.height);
   windowRect_BOSS=new Rect(Screen.width/windowRect_Boss_Position.x,
                            Screen.height/windowRect_Boss_Position.y,
                            Screen.width/windowRect_Boss_Position.width,
                            Screen.height/windowRect_Boss_Position.height); 
   if(m_targetWall)
   {
   m_targetWall.collider.enabled=false;
   }
   dialogueInformation();
   
}

function Update () {
     //timeRun();
     //controlActor();
     if(ControllableActor.Singleton().ReturnControlActor())
     {
         target.GetComponent("ControllableActor").active = false;
         target.GetComponent("AnimationController").active = false;
         //m_targetInput.GetComponent("InputManager").active = false;
         m_targetInput.active = false;
         ControllableActor.Singleton().SetControlActor();
     }   
      
}
function FixedUpdate()
{
     timeRun();
     controlActor();
}
function OnTriggerEnter()
{
   if(target)
   {       
       idle=true;
       yield WaitForSeconds (2);
       controlDial=true; 
        
   }
}

static function Singleton() : TheFinalWar
{	
	return m_instance;
}
function OnGUI()
{
   //GUI.skin = myskin;
   if(windowshow)
   {
      GUI.color=Color.clear;
      windowRect=GUI.Window(0,windowRect,MyWindow,"");
   }
   if(windowshow_BOSS)
   {
      GUI.color=Color.clear;
      windowRect_BOSS=GUI.Window(1,windowRect_BOSS,MyWindow_BOSS,"");
   }
}

//--------------------------------
    //draw the window
function MyWindow(windowID : int)
{
   GUI.color=Color.white;
  // GUI.skin = myskin;
   GUI.Label(Rect(5,5,Screen.width/2.5,110)," "+dialogueInfo[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_showWindow]/*dialogueInfo[m_showWindow]*/+" ",m_lableStyle);
   GUI.depth = 2;
   //GUI.Label(Rect(10,10,Screen.width/3.4,90),""+dialogueInfo[m_showWindow]+"",m_fontStyle);
}
function MyWindow_BOSS(windowID : int)
{
   GUI.color=Color.white;
   //GUI.skin = myskin;
   GUI.depth = 2;
   GUI.Label(Rect(5,5,Screen.width/2.5,110)," "+dialogueInfo[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_showWindow]/*dialogueInfo[m_showWindow]*/+" ",m_lableStyle);
}


//------------------------------
  //control the dialogue，s time witch between the role and BOSS
  //also the window，s show time
function timeRun()
{
   if(controlDial)
   {
     if(m_timecontrol < (dialogueInfo.length+1)*100)
     {    
      m_timecontrol++;
     }
     else 
     {
        controlDial=false;
        idle=false;
        windowshow_BOSS=false;
        windowshow=false;
        m_targetTrigger.GetComponent("CameraTargetAttributesModifier").collider.enabled=false;
        m_targetTrigger.transform.position = new Vector3(m_targetTrigger.transform.position.x,m_targetTrigger.transform.position.y,5000);
        m_targetWall.collider.enabled=true;
        Destroy(this);
        
     }
     if(m_timecontrol % 101 ==0)
     {
        m_showWindow++;
     }
   }
   
   if(m_timecontrol>0 && m_showWindow % 2 == 0 && windowshow == false)
   {
       windowshow=true;
       windowshow_BOSS=false;
   }
   if(m_timecontrol>0 && m_showWindow % 2 == 1 && windowshow_BOSS ==false)
   {
       windowshow_BOSS=true;
       windowshow=false;
   }
}

//--------------------
  //continue the maincharactor，s animation
function controlActor()
{
   if(!idle)
   {
       if(target.GetComponent("ControllableActor").active == false)
       {
            Debug.Log("332211");
            target.active=true;
            target.GetComponent("ControllableActor").active = true;
            target.GetComponent("AnimationController").active = true;
            m_targetInput.active = true;
       }
   }
}

//---------------------
  //the dialogue information
function dialogueInformation()
{
  /* dialogueInfo[0]= "达克勒斯，终于找到你了";
   dialogueInfo[1]="你是.....那个时候的.....居然能够来到我的面前，值得称赞，不过，你的命运也就就此到头了";
   dialogueInfo[2]="为了你的一己私欲，竟然将我的故乡肆意破坏，这份罪孽，我今天就要让你用生命来偿还";
   dialogueInfo[3]="哼哼哼，来吧，让我见识见识你的力量";*/
}
}
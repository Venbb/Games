#pragma strict
class helpInfo
{
   var m_texture : Texture;
   var m_help_Information : String;
}
class windowRect
{
   var m_windowName : String;
   var m_windowShow : boolean;
   var m_window : Rect;
   var m_window_PositionX : float;
   var m_window_PositionY : float;
   var m_window_BoundsX : float;
   var m_window_BoundsY : float;
}
class label
{
   var m_label_String : String;
   var m_label_Texture : Texture;
   var m_label_PositionX : float;
   var m_label_PositionY : float;
   var m_label_BoundsX : float;
   var m_label_BoundsY : float;
   var m_label_show : boolean;
}
class button
{
   var m_button_String :String[];
   var m_button_Font : Font[];
   var m_button_Texture : Texture;
   var m_button_PositionX : float;
   var m_button_PositionY : float;
   var m_button_BoundsX : float;
   var m_button_BoundsY : float;
   var m_button_Style : GUIStyle;
}
class help extends Page
{
  //-----------------
    //----texture help Information------------
   var m_window_Help : Rect;
   var m_window_HelpShow : boolean = false;
   var m_myskin : GUISkin;
   var m_button : button[];
   var m_helpMessage : helpInfo[];
   var m_gestureMessage : helpInfo[];
   var m_EnterMessage : helpInfo[];
   var m_message : helpInfo[];
   var m_pagination : int = 0;
   var m_target : GameObject;
   var m_labelX : float = 5.0f;
   var m_labelY : float = 7.0f;
 //--------------------
   //-----tips help Information--------
   var m_window_Tips : windowRect[];
   //var m_window_TipsShow : boolean = false;
   var m_label : label[];
   var m_PointLabel : label[];
   var m_tipsPage : int = 0; 
   var m_labelInformation : String[];
   var m_time : int = 0;
   var m_timeInformation : int = 0;
   //----------
   var m_timeMessage : int = 0;
   var m_scroll : Vector2 = Vector2.zero;
   var scorll_Bigen : Rect;
   var scorll_End : Rect;
   var CloseStyle : GUIStyle;
   var RollStyle : GUIStyle;
   var fontStyle : GUIStyle;
   var m_HelpStyle : GUIStyle;
   //-----------
   var yanshiStyle : GUIStyle;
   var m_controlIndicate : boolean = true;
   var m_buttonInfo : String ;
   private static var m_instance : help = null;
   
   //var controlJump : boolean = false;
   var m_X : float = 0;
   var m_Y : float = 0;
   
   //--------
     //----THE FINGER GESTURE POSITION------
   var m_GestureRect : Rect[];
   var m_TextureRect : Rect[];
   var m_contorlGesture : boolean =true;
   var m_showFinger : int ;
   var m_FingerTime : int;
   var m_finger : boolean = true;
   var m_depth : int;
   var m_pointSpeed : float;
   var m_DirectInformation : LabelString[];
   var m_font : Font[];
 
function Awake()
{
	if (m_instance == null)
	{
		m_instance = this;
	}
	m_target = GameObject.Find("_Platform_Level_6_2");
}
static function Singleton() : help
{	
	return m_instance;
}

     

function Start () 
{
   //m_window_Help = new Rect(Screen.width/1.4,Screen.height/5,Screen.width/4,Screen.height/4);
   
   m_window_Tips[1].m_window = new Rect(Screen.width/m_window_Tips[1].m_window_PositionX,
                               Screen.height/m_window_Tips[1].m_window_PositionY,
                               Screen.width/m_window_Tips[1].m_window_BoundsX,
                               Screen.height/m_window_Tips[1].m_window_BoundsY);
   m_window_Tips[2].m_window = new Rect(Screen.width/m_window_Tips[2].m_window_PositionX,
                               Screen.height/m_window_Tips[2].m_window_PositionY,
                               Screen.width/m_window_Tips[2].m_window_BoundsX,
                               Screen.height/m_window_Tips[2].m_window_BoundsY);
   m_window_Help = new Rect(Screen.width/m_labelX,Screen.height/m_labelY,Screen.width/1,Screen.height/1.5);
   
   
   
                               
  RollStyle.font =  m_button[1].m_button_Font[GameOptionsManager.Singleton().GetLanguage()];
  CloseStyle.font =  m_button[0].m_button_Font[GameOptionsManager.Singleton().GetLanguage()];
  m_HelpStyle.font = m_button[0].m_button_Font[GameOptionsManager.Singleton().GetLanguage()];
   if(m_target)
   {
     // m_window_HelpShow = true;
     // m_window_Tips[2].m_windowShow = true;
     // m_window_Tips[0].m_windowShow = true;
      m_button[0].m_button_String[0] = "Close";
      m_button[0].m_button_String[1] = "关闭";
      m_button[0].m_button_String[2] = "关闭";
     
   }
   else
   {
      m_window_Tips[2].m_windowShow = false;
      m_window_Tips[0].m_windowShow = false;
      m_button[0].m_button_String[0] = "Help";
      m_button[0].m_button_String[1] = "帮助";
      m_button[0].m_button_String[2] = "帮助";
   }

}
function FixedUpdate()
{
   if( m_window_Tips[0].m_windowShow == true)
   {
  // m_time++;
   if( m_time % 100 == 0 )
   {
      //m_timeInformation++;
      //m_timeMessage++;
      if(m_timeMessage<m_labelInformation.Length)
      {
         m_label[0].m_label_String = m_DirectInformation[GameOptionsManager.Singleton().GetLanguage()].m_dialogue[m_timeMessage];//m_labelInformation[m_timeMessage];
         
         
         m_label[5].m_label_PositionX = m_GestureRect[m_timeMessage].x;
         m_label[5].m_label_PositionY = m_GestureRect[m_timeMessage].y;
         m_label[5].m_label_BoundsX =  m_GestureRect[m_timeMessage].width;
         m_label[5].m_label_BoundsY =  m_GestureRect[m_timeMessage].height;
         m_label[5].m_label_Texture = m_gestureMessage[m_timeMessage].m_texture;
         
         m_label[6].m_label_PositionX = m_TextureRect[m_timeMessage].x;
         m_label[6].m_label_PositionY = m_TextureRect[m_timeMessage].y;
         m_label[6].m_label_BoundsX =  m_TextureRect[m_timeMessage].width;
         m_label[6].m_label_BoundsY =  m_TextureRect[m_timeMessage].height;
         m_label[6].m_label_Texture = m_EnterMessage[m_timeMessage].m_texture;
         
         m_label[7].m_label_Texture = m_message[m_timeMessage].m_texture;
         
      }
      
      else
      {
         m_timeMessage = 0;
      }
      if(m_timeInformation < m_helpMessage.Length)
      {
        // m_label[0].m_label_Texture = m_helpMessage[m_timeInformation].m_texture;
      }
      else
      {
         m_timeInformation = 0;
      }
      m_timeInformation++;
      m_timeMessage++;
   }
   m_time++;
   MoveGesture();
   }
   if(m_target != null)
   {
       if( m_time % 1 == 0)
       {
           if(m_controlIndicate)
           {
               m_label[2].m_label_PositionY-=3;
               m_label[3].m_label_PositionY-=3;
           }
           else
           {   
               m_label[2].m_label_PositionY+=3;
               m_label[3].m_label_PositionY+=3;
           }
           if( m_label[2].m_label_PositionY <= 20 )
           {
               m_controlIndicate = false;
           }
           else if( m_label[2].m_label_PositionY >= 60)
           {
               m_controlIndicate = true;
           }
       }
   }
   //}
}

function Update () 
{
    m_window_Tips[0].m_window = new Rect(Screen.width/m_window_Tips[0].m_window_PositionX,
                               Screen.height/m_window_Tips[0].m_window_PositionY,
                               Screen.width/m_window_Tips[0].m_window_BoundsX,
                               Screen.height/m_window_Tips[0].m_window_BoundsY);
    m_window_Tips[3].m_window = new Rect(Screen.width/m_window_Tips[3].m_window_PositionX,
                               Screen.height/m_window_Tips[3].m_window_PositionY,
                               Screen.width/m_window_Tips[3].m_window_BoundsX,
                               Screen.height/m_window_Tips[3].m_window_BoundsY);
}
function MoveGesture()
{
     if(m_timeMessage ==3+1 )
   {
      if( m_label[5].m_label_PositionX >=3)
      {
         m_label[5].m_label_PositionX -=0.07;
      }
      else
      {
         m_label[5].m_label_PositionX = m_GestureRect[m_timeMessage-1].x;
      }
   }
   else if(m_timeMessage == 4+1)
   {
      if( m_label[5].m_label_PositionY <=27.7)
      {
         m_label[5].m_label_PositionY += 0.4;
      }
      else
      {
         m_label[5].m_label_PositionY = m_GestureRect[m_timeMessage-1].y;
      }
   }
   else if(m_timeMessage == 5+1)
   {
      if( m_label[5].m_label_PositionY >=3.66)
      {
         m_label[5].m_label_PositionY -= 0.6;
      }
      else
      {
          m_label[5].m_label_PositionY = m_GestureRect[m_timeMessage-1].y;
      }
   }
   else if(m_timeMessage == 0+1 || m_timeMessage == 1+1 || m_timeMessage == 6+1)
   {
      m_showFinger++;
      if(m_showFinger > m_FingerTime)
      {
          if(m_finger)
          {
             m_finger  = false;
          }
          else
          {
             m_finger= true;
          }
          m_showFinger = 0;
      }
      if(m_finger)
      {
         m_label[5].m_label_Texture = m_gestureMessage[m_timeMessage-1].m_texture;
      }
      else
      {
        m_label[5].m_label_Texture = m_gestureMessage[7].m_texture;
      }
   }
   else if(m_timeMessage == 2+1)
   {
      
      if(m_contorlGesture)
      {
         m_label[5].m_label_PositionX -=0.2;
      }
      else
      {
         m_label[5].m_label_PositionX +=0.2;
      }
      if(m_label[5].m_label_PositionX <=3)
      {
         if(m_contorlGesture)
         {
            m_contorlGesture =false;
         }
      }
      else if(m_label[5].m_label_PositionX >=5.9)
      {
         if(!m_contorlGesture)
         {
            m_contorlGesture =true;
         }
      }
      
   }
}
function OnGUI()
{
   if(m_window_HelpShow)
   {
       GUI.color=Color.clear;
       m_window_Help = GUI.Window(6,m_window_Help,MyWindow,"");
   }
   if(m_window_Tips[0].m_windowShow)
   {
       GUI.color=Color.clear;
       //GUI.color=Color.white;
       m_window_Tips[0].m_window = GUI.Window(5, m_window_Tips[0].m_window,MyWindow1,m_window_Tips[0].m_windowName);
   }
   if(m_window_Tips[1].m_windowShow)
   {
      GUI.color=Color.clear;
      m_window_Tips[1].m_window = GUI.Window(5, m_window_Tips[1].m_window,MyWindow2,m_window_Tips[1].m_windowName);
   }
   if(m_window_Tips[2].m_windowShow)
   {
      GUI.color=Color.clear;
      m_window_Tips[2].m_window = GUI.Window(2, m_window_Tips[2].m_window,MyWindow3,m_window_Tips[2].m_windowName);
   }  
   //------------------
   if(m_window_Tips[3].m_windowShow)
   {
      GUI.color=Color.clear;
     // GUI.color=Color.white;
      m_window_Tips[3].m_window = GUI.Window(3, m_window_Tips[3].m_window,MyWindow4,m_window_Tips[3].m_windowName);
   }  
   
}
function MyWindow()
{
   GUI.color=Color.white;
   /*if(GUI.Button(Rect(Screen.width/m_button[1].m_button_PositionX,
                      Screen.height/m_button[1].m_button_PositionY,
                      (Screen.width/m_button[1].m_button_BoundsX),
                      (Screen.height/m_button[1].m_button_BoundsY)),
                      m_button[1].m_button_String[GameOptionsManager.Singleton().GetLanguage()],
                      RollStyle) && !SceneManager.Singleton().IsGamePaused())
   {
      controlJump = true;
   }*/
  /* if(GUI.Button(Rect(Screen.width/m_button[0].m_button_PositionX,
                      Screen.height/m_button[0].m_button_PositionY,
                      (Screen.width/m_button[0].m_button_BoundsX),
                      (Screen.height/m_button[0].m_button_BoundsY)),
                       m_button[0].m_button_String[GameOptionsManager.Singleton().GetLanguage()],
                       CloseStyle) && !SceneManager.Singleton().IsGamePaused())
   {
      //m_window_Tips[1].m_windowShow = true;
      if(m_window_Tips[0].m_windowShow)
      {
         m_window_Tips[0].m_windowShow = false;
         m_button[0].m_button_String[0] = "Help";
         m_button[0].m_button_String[1] = "帮助";
         m_button[0].m_button_String[2] = "帮助";
      }
      else
      {
         m_window_Tips[0].m_windowShow = true;
         m_button[0].m_button_String[0] = "Close";
         m_button[0].m_button_String[1] = "关闭";
         m_button[0].m_button_String[2] = "关闭";
      }
   }*/
   
   /*GUI.Label(Rect(Screen.width/m_label[4].m_label_PositionX,
                  Screen.height/m_label[4].m_label_PositionY,
                  Screen.width/m_label[4].m_label_BoundsX,
                  Screen.height/m_label[4].m_label_BoundsY),
                  "仅供合作伙伴展示使用",
                  yanshiStyle);*/
}

//-----------
 //------FOR JUMP------
/*function JumpDown()
{ 
     return controlJump;
}
function controljump()
{
    if(controlJump)
    {
       controlJump = false;
    }
}*/
function MyWindow1()
{
   GUI.skin =  m_myskin;
   //GUI.color = Color.yellow;
   GUI.color = Color.white;
   GUI.Label(Rect(Screen.width/m_label[0].m_label_PositionX,
                  Screen.height/m_label[0].m_label_PositionY,
                  Screen.width/m_label[0].m_label_BoundsX,
                  Screen.height/m_label[0].m_label_BoundsY),
                  //m_label[0].m_label_String
                  m_label[0].m_label_Texture);
   
   GUI.Label(Rect(Screen.width/m_label[7].m_label_PositionX,
                  Screen.height/m_label[7].m_label_PositionY,
                  Screen.width/m_label[7].m_label_BoundsX,
                  Screen.height/m_label[7].m_label_BoundsY),
                  //m_label[0].m_label_String
                  m_label[7].m_label_Texture);
   //--------------------
     //----THE FINGER GESTURE-----
   GUI.depth = 2;
   GUI.Label(Rect((Screen.width/m_window_Tips[0].m_window_BoundsX)/m_label[5].m_label_PositionX,
                  (Screen.width/m_window_Tips[0].m_window_BoundsY)/m_label[5].m_label_PositionY,
                  Screen.width/m_label[5].m_label_BoundsX,
                  Screen.height/m_label[5].m_label_BoundsY),
                  m_label[5].m_label_Texture);
   //-----------------
     //------THE PICTURE FOR ENTER--------
   GUI.depth = 1;
   GUI.Label(Rect((Screen.width/m_window_Tips[0].m_window_BoundsX)/m_label[6].m_label_PositionX,
                  (Screen.width/m_window_Tips[0].m_window_BoundsY)/m_label[6].m_label_PositionY,
                  Screen.width/m_label[6].m_label_BoundsX,
                  Screen.height/m_label[6].m_label_BoundsY),
                  m_label[6].m_label_Texture);
   GUI.color = Color.yellow;
   GUI.Label(Rect(Screen.width/m_label[0].m_label_PositionX+1.7*Screen.height/m_label[0].m_label_BoundsY,
                  Screen.height/m_label[0].m_label_PositionY+Screen.height/m_label[0].m_label_BoundsY/3,
                  Screen.width/m_label[0].m_label_BoundsX,
                  Screen.height/m_label[0].m_label_BoundsY),
                  m_label[0].m_label_String,
                  m_HelpStyle);
}
function MyWindow3()
{
  GUI.color = Color.white;
  GUI.Label(Rect(Screen.width/m_label[2].m_label_PositionX,
                  Screen.height/m_label[2].m_label_PositionY,
                  Screen.width/m_label[2].m_label_BoundsX,
                  Screen.height/m_label[2].m_label_BoundsY),
                  m_label[2].m_label_Texture);
  GUI.Label(Rect(Screen.width/m_label[3].m_label_PositionX,
                  Screen.height/m_label[3].m_label_PositionY,
                  Screen.width/m_label[3].m_label_BoundsX,
                  Screen.height/m_label[3].m_label_BoundsY),
                  m_label[3].m_label_Texture);
  
}
function MyWindow2()
{
   GUI.color=Color.white;
  
   helpList();
   GUI.depth = 1;
    if(GUI.Button(Rect(((Screen.width/m_window_Tips[1].m_window_BoundsY)/5)*3.5,
                         0,
                         (Screen.width/m_window_Tips[1].m_window_BoundsY)/5,
                         (Screen.height/m_window_Tips[1].m_window_BoundsY)/5),
                  "Close",
                  CloseStyle))
   {
       m_window_Tips[1].m_windowShow = false;
   }
}
function MyWindow4(windowID : int)
{
    GUI.color = Color.white;
    GUI.Label(Rect(Screen.width/m_PointLabel[0].m_label_PositionX,
                   m_PointLabel[0].m_label_PositionY,
                   Screen.width/m_PointLabel[0].m_label_BoundsX,
                   Screen.height/m_PointLabel[0].m_label_BoundsY),
                   m_PointLabel[0].m_label_String,
                   fontStyle);
   for(var i : int = 1 ; i < m_PointLabel.length ; i++)
   {
         m_PointLabel[i].m_label_PositionX = m_PointLabel[0].m_label_PositionX;
         m_PointLabel[i].m_label_PositionY = m_PointLabel[0].m_label_PositionY + ((Screen.height/m_PointLabel[8].m_label_BoundsY)*1.1f)*i;
         m_PointLabel[i].m_label_BoundsX = m_PointLabel[0].m_label_BoundsX;
         m_PointLabel[i].m_label_BoundsY = m_PointLabel[0].m_label_BoundsY; 
         DrawLabel(m_PointLabel[i].m_label_show,
                   Screen.width/m_PointLabel[i].m_label_PositionX,
                   m_PointLabel[i].m_label_PositionY,
                   Screen.width/m_PointLabel[i].m_label_BoundsX,
                   Screen.height/m_PointLabel[i].m_label_BoundsY,
                   m_PointLabel[i].m_label_String,
                   fontStyle );
                   
   }
   if((fontStyle.padding.top+13)%41 == 0)
   {
       //if(m_PointLabel[Mathf.Abs((fontStyle.padding.top+13)/41)+1].m_label_show == false)
      // {
           m_PointLabel[Mathf.Abs((fontStyle.padding.top+13)/41)+1].m_label_show = true;
       //}
   }
                  
}
function DrawLabel(control : boolean,PX : float,PY : float,BX : float,BY : float,string : String, style : GUIStyle)
{
   if(control)
   {
      GUI.color=Color.white;
   }
   else
   {
      GUI.color =Color.clear;
   }   
   GUI.Label(Rect(PX,PY,BX,BY),
             string,
             style);
}
function ChangeThePoint()
{
    fontStyle.padding.top-=m_pointSpeed;
}
function ResetThePoint()
{
    fontStyle.padding.top = -3;
    for(var i : int =1; i < m_PointLabel.length; i++)
    {
        m_PointLabel[i].m_label_show = false;
    }
}
function OpenThePoint()
{
    if(!m_window_Tips[3].m_windowShow)
    {
        m_window_Tips[3].m_windowShow = true;
    }
}
function CloseThePoint()
{
    if(m_window_Tips[3].m_windowShow)
    {
        m_window_Tips[3].m_windowShow = false;
    }
}
function helpList()
{
   
   m_scroll = GUI.BeginScrollView(
	   scorll_Bigen,//Rect(0,0,100,100),
	   m_scroll,
	   scorll_End//Rect(0,0,200,600)
	   );
	   texture_Help();
	GUI.EndScrollView();
   
}
function texture_Help()
{
   for(var i : int; i < m_helpMessage.length; i++)
   {
    GUI.Label(Rect(Screen.width/m_label[1].m_label_PositionX+(i*(Screen.width/m_label[1].m_label_BoundsX)),
                   Screen.height/m_label[1].m_label_PositionY,
                   Screen.width/m_label[1].m_label_BoundsX,
                   Screen.height/m_label[1].m_label_BoundsY),
                   m_helpMessage[i].m_texture);
   }
}
function firstSkill_Control()
{
   if(m_target)
   {
     return true;
   }
   else
   {
     return false;
   }
   
}
}
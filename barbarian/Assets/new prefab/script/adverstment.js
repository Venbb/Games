#pragma strict
class adverstment extends Page
{
var AdWindow : windowRect;
var yunhui_log : Texture2D[];
var yunhui : Texture2D;
var Ad_address :String[];
var AdLabel : label;
var AdButton : button;
var m_currentID : int = 0 ;
var m_showAD : boolean;
var i : int = 0;

//-------------
private static var m_instance : adverstment = null;
function Awake()
{
    if (m_instance == null)
	{
		m_instance = this;
	}
}
static function Singleton() : adverstment
{	
	return m_instance;
}
function Control_AdWindow()
{
   if(AdWindow.m_windowShow == false)
   {
      AdWindow.m_windowShow = true;
   }
  /* else
   {
      AdWindow.m_windowShow = true;
   }*/
}
function Close_AdWindow()
{
   if(AdWindow.m_windowShow == true)
   {
      AdWindow.m_windowShow = false;
   }
}
function Start () 
{
     AdLabel.m_label_Texture=yunhui_log[0];
}
function OnGUI()
{
     if(AdWindow.m_windowShow == true)
    {  
       AdWindow.m_window = new Rect(Screen.width/AdWindow.m_window_PositionX,
                                        Screen.height/AdWindow.m_window_PositionY,
                                        Screen.width/AdWindow.m_window_BoundsX,
                                        Screen.height/AdWindow.m_window_BoundsY);
       //GUI.depth = 4;
       GUI.color = Color.clear;
       AdWindow.m_window = GUI.Window(2,AdWindow.m_window,Mywindow,"");
    }
}
function Mywindow(windowID : int)
{
    
     i++;
     GUI.color=Color.white;
     GUI.depth=4;
     GUI.Label(Rect(Screen.width/AdLabel.m_label_PositionX,
                    Screen.height/AdLabel.m_label_PositionY,
                    Screen.width/AdLabel.m_label_BoundsX,
                    Screen.height/AdLabel.m_label_BoundsY),
                    AdLabel.m_label_Texture);
     GUI.depth=2;
     if(GUI.Button(Rect(Screen.width/AdButton.m_button_PositionX,
                        Screen.height/AdButton.m_button_PositionY,
                        Screen.width/AdButton.m_button_BoundsX,
                        Screen.height/AdButton.m_button_BoundsY),
                        ""/*yunhui*/,
                        AdButton.m_button_Style))
     { 
         Application.OpenURL (Ad_address[m_currentID]);
         
     }
     //GUI.depth = 1;
     
     if(i%300 == 0)
     {
         m_currentID = (i/300)%(yunhui_log.Length);
         AdLabel.m_label_Texture=yunhui_log[m_currentID];
     }
}
function Update () {

}
}
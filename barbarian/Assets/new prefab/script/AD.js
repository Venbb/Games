#pragma strict
class AD extends Page
{
var yunhui_log : Texture2D[];
var yunhui : Texture2D;
var positionX : float = Screen.width/1.8;
var positionY : float = Screen.height;
var bounsX : float = Screen.width/3;
var bounsY : float = Screen.height/5;
//-------
var m_X : float = 2.9;
var m_Y : float = 8;
var window : Rect ;
var target_position : GameObject;
var windowShow : boolean = true;
var Ad_address :String[];
var windowPosition : Vector2;
var lable1 : GUI;
var i : int = 0 ;
var y : int = 0 ;
var m_currentID : int = 0 ;
var buttonStyle : GUIStyle;
var ADlabel : label[];

//---------------
var LabelStyle : GUIStyle;
var yanshiWindow : windowRect;
function Start () 
{
     
     //bounsX  = Screen.width/2.9;
    // bounsY  = Screen.height/10;
     target_position=GameObject.Find("IdPosition");
     if(target_position)
     {
        windowPosition=camera.WorldToScreenPoint(target_position.transform.position);
     }
     yunhui = yunhui_log[m_currentID];
  
}
function OnGUI()
{
    if(windowShow == true)
    {
       bounsX  = Screen.width/m_X;
       bounsY  = Screen.height/m_Y;
       window = Rect(windowPosition.x,Screen.height-windowPosition.y,bounsX,bounsY);
       GUI.color=Color.clear;
       //GUI.color=Color.white;
       window = GUI.Window(0,window,Mywindow,"");
    }   
    if(yanshiWindow.m_windowShow == true)
    {  
       yanshiWindow.m_window = new Rect(Screen.width/yanshiWindow.m_window_PositionX,
                                        Screen.height/yanshiWindow.m_window_PositionY,
                                        Screen.width/yanshiWindow.m_window_BoundsX,
                                        Screen.height/yanshiWindow.m_window_BoundsY);
       GUI.depth = 4;
       GUI.color = Color.clear;
       //
       yanshiWindow.m_window = GUI.Window(2,yanshiWindow.m_window,Mywindow1,"");
    }
   // GUI.Label(Rect(Screen.width/ADlabel[1].m_label_PositionX,Screen.height/ADlabel[1].m_label_PositionY,bounsX/ADlabel[1].m_label_BoundsX,bounsY/ADlabel[1].m_label_BoundsY),"合作伙伴演示版本",LabelStyle);

}
//-------------
function Mywindow1(windowID : int)
{
    GUI.depth = 4;
    GUI.color = Color.white;
    //GUI.Label(Rect(Screen.width/ADlabel[1].m_label_PositionX,Screen.height/ADlabel[1].m_label_PositionY,bounsX/ADlabel[1].m_label_BoundsX,bounsY/ADlabel[1].m_label_BoundsY),"仅供合作伙伴展示使用",LabelStyle);

}
function Mywindow(windowID : int)
{
    
     i++;
     GUI.color=Color.white;
     GUI.Label(Rect(Screen.width/ADlabel[0].m_label_PositionX,Screen.height/ADlabel[0].m_label_PositionY,bounsX/ADlabel[0].m_label_BoundsX,bounsY/ADlabel[0].m_label_BoundsY),yunhui);
     GUI.depth=2;
     if(GUI.Button(Rect(0,y,bounsX,bounsY),""/*yunhui*/,buttonStyle))
     { 
         Application.OpenURL (Ad_address[m_currentID]);
         
     }
     //GUI.depth = 1;
     
     if(i%300 == 0)
     {
        m_currentID = (i/300)%(yunhui_log.Length);
        yunhui=yunhui_log[m_currentID];
     }
}
function Update () {

}
}

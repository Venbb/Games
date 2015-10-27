//#pragma strict


var ServiceUrl : String;//---come from the server
var ServiceWWW : WWW; 
var ServiceText : String;
var UpadateUrl : String;
var IsUpadate : boolean = false;
var GameVersion : String;
var promptLabel : label;
var promptLStyle : GUIStyle;
var promptButton : button;

function Start () 
{
    //-----selet the service here---;
    StartCoroutine(ConnectJson(ServiceWWW,ServiceUrl,ServiceText));
}

function Update () 
{
    if(IsUpadate)
    {
//        IsUpadater(ServiceText,GameVersion);
        IsUpadate = false;
    }
}
function ConnectJson(UrlWWW : WWW ,Url : String ,UrlText : String )
{
    if(Url != null)
    {
       UrlWWW = new WWW(Url);
       yield UrlWWW;
       UrlText = UrlWWW.text.ToString();
       ServiceText = UrlWWW.text.ToString();
       
       IsUpadate = true;
    }
}
function IsUpadater(str : String,CurrentVersion : String) : boolean
{
	Debug.Log(str);
	var json : LitJson.JsonData = LitJson.JsonMapper.ToObject(str);
    var jd : LitJson.JsonData = LitJson.JsonMapper.ToObject(str);
    if(jd)
    {
       //----the method of the update---
       //----needs the member of the json to compare----
       if(jd["version"].ToString() == CurrentVersion)
       {
            //---do nothing
            Debug.Log("111");
       }
       else
       {
           promptLabel.m_label_show = true;
           Debug.Log("2222");
       }
    }
    else
    {
        Debug.Log("333");
    }
}
function OnGUI()
{
     GUI.depth = -1;
     if(promptLabel.m_label_show)
     {
	     GUI.Label(Rect(Screen.width/promptLabel.m_label_PositionX,
	                    Screen.height/promptLabel.m_label_PositionY,
	                    Screen.width/promptLabel.m_label_BoundsX,
	                    Screen.height/promptLabel.m_label_BoundsY),
	               promptLabel.m_label_String,
	               promptLStyle);
	    if(GUI.Button(Rect(Screen.width/promptButton.m_button_PositionX,
	                       Screen.height/promptButton.m_button_PositionY,
	                       Screen.width/promptButton.m_button_BoundsX,
	                       Screen.width/promptButton.m_button_BoundsY),
	                   promptButton.m_button_String[0],
	                   promptButton.m_button_Style))
	    {
	       Application.OpenURL(UpadateUrl);
	    }
    }
    
}

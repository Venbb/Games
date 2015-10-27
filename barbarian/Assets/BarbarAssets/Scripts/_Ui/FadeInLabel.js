// code : li yun
#pragma strict

class FadeInLabel extends ActorBase
{

//var m_startPosition : Vector3;  
var m_moveSpeed : Vector3;

var m_useMainCamera = true;   // Use the camera tagged MainCamera
var m_cameraToUse : Camera;   // Only use this if useMainCamera is false

var m_displayTime : float = 0.5;
var m_fadeOutTime : float = 0.2;

var m_textColor : Color;

private var m_cam : Camera;
private var m_camTransform : Transform;
private var m_currentPosition : Vector3;
private var m_guiText : GUIText;
private var m_timer : float = 0.0f;
private var ms_randomOffset : Vector3 = Vector3(1, 1, 0);

function Awake()
{    
	m_guiText = GetComponent(GUIText) as GUIText;
	m_guiText.material.color = m_textColor;
}

function Start () 
{
    if (m_useMainCamera)
    {
        m_cam = Camera.main;
    }
    else
    {
        m_cam = m_cameraToUse;
    }
    
    m_camTransform = m_cam.transform;
    
 	if (m_fadeOutTime >= m_displayTime)
 	{
 		Debug.LogError("Fade out time should not be bigger than display time.");
 	}
 	
 	//m_currentPosition = m_startPosition;
}

function OnEnable()
{
	m_timer = 0;
}

function SetText(str : String)
{
	m_guiText.text = str;
}

function SetInitPosition(pos : Vector3)
{
	m_currentPosition = pos + Vector3(Random.Range(-ms_randomOffset.x, ms_randomOffset.x), 
									  Random.Range(-ms_randomOffset.y, ms_randomOffset.y),
									  Random.Range(-ms_randomOffset.z, ms_randomOffset.z) );
}

function Update () 
{
	// Position
	m_currentPosition += m_moveSpeed * Time.deltaTime;
    this.transform.position = m_cam.WorldToViewportPoint(m_currentPosition);
    
    // Time
    m_timer += Time.deltaTime;
    
    // Alpha
    if (m_timer >= m_displayTime)
    {
    	m_guiText.material.color.a = 1;
    	DestorySelf();
    }
    else if (m_timer >= (m_displayTime - m_fadeOutTime))
    {
    	m_guiText.material.color.a = Mathf.Lerp(1, 0, (m_timer -  (m_displayTime - m_fadeOutTime)) / m_displayTime );
    }
    
    //GUI.color.a = 1;
}

}
@script RequireComponent(GUIText)
#pragma strict

//@script RequireComponent (GUITexture)

private var m_oriRect : Rect;
private var m_gui : GUITexture;
private var m_guiText : GUIText;

function Awake()
{
	this.transform.position = Vector3.zero;

	m_gui = GetComponent.<GUITexture> ();
	m_guiText = GetComponent.<GUIText> ();
	
	if (m_gui != null)
	{
	m_oriRect = m_gui.pixelInset;

		
	m_gui.pixelInset.x = m_oriRect.x * parseFloat(Screen.width)/scale.x;
	m_gui.pixelInset.y = m_oriRect.y * parseFloat(Screen.height)/scale.y;
	m_gui.pixelInset.width = m_oriRect.width * parseFloat(Screen.width)/scale.x;
	m_gui.pixelInset.height = m_oriRect.height * parseFloat(Screen.height) /scale.y;
	}
	
	if (m_guiText != null)
	{
		m_guiText.pixelOffset.x *= parseFloat(Screen.width)/scale.x;
		m_guiText.pixelOffset.y *= parseFloat(Screen.height)/scale.y;
	}
}

static private var scale : Vector2 = Vector2(1024, 768);
static private var pivotPoint : Vector2 = Vector2.zero;

function OnGUI()
{
	if (m_gui != null)
	{
	m_gui.pixelInset.x = m_oriRect.x * parseFloat(Screen.width)/scale.x;
	m_gui.pixelInset.y = m_oriRect.y * parseFloat(Screen.height)/scale.y;
	m_gui.pixelInset.width = m_oriRect.width * parseFloat(Screen.width)/scale.x;
	m_gui.pixelInset.height = m_oriRect.height * parseFloat(Screen.height) /scale.y;
	}
	//GUIUtility.ScaleAroundPivot (Vector2(parseFloat(Screen.width)/scale.x, parseFloat(Screen.height) /scale.y ), pivotPoint); 
}
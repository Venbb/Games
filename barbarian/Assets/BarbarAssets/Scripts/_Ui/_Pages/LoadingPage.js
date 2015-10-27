#pragma strict

class LoadingPage extends Page
{		
	var m_loadingInfo : HudInfo;

	var m_loadingPointInfo : HudInfo;
	var m_loadingPoint : String[];
	var m_loadingColor : Color;
	
	private var m_loadingTimer : float = 0;
	
	static private var m_instance : LoadingPage = null;
	
	private var m_currentPointIndex : int = 0;
	private var m_timer : float = 0;
	private var m_diplayTime : float = 0.004f;
	
	static function Singleton() : LoadingPage
	{
		return 	m_instance;
	}
	
	function OnEnable()
	{
		m_timer = 0.0f;
		m_currentPointIndex = 0;
	}
	
	function Awake()
	{
		if (m_instance == null)
		{
			m_instance = this;
			DontDestroyOnLoad(this.gameObject);
		}		
		else
		{
			Destroy(this.gameObject);
		}
		
		m_timer = 0.0f;
		m_currentPointIndex = 0;
	}
	
	function Start()
	{	
		m_loadingInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_loadingInfo.position);
		m_loadingPointInfo.position = UiManager.Singleton().ConvertToDeviceScreenPosition(m_loadingPointInfo.position);
		// Register the first one
		if (m_instance == this)
		{
			UiManager.Singleton().RegisterPage(this);
			SetEnabled(m_enabledAtFirst);
		}
	}
	
	function Update()
	{
		Time.timeScale = GameManager.Singleton().GetOriTimeScale();
		//Debug.Log("time scale : " + Time.timeScale);
		
		//Debug.Log("time delta : " + Time.deltaTime);
		m_timer += Time.deltaTime;
		
		if (m_timer >= m_diplayTime)
		{
			m_timer = 0.0f;
			m_currentPointIndex = (m_currentPointIndex + 1) % m_loadingPoint.length;
		}
	}
	
	function OnGUI()
	{			
		OnBackground();
		
		GUI.color = m_loadingColor;
		PageText( m_loadingInfo);
		
		PageText( m_loadingPointInfo, m_loadingPoint[m_currentPointIndex]);

		GUI.color = Color.white;
	}		

	
	function OnLevelWasLoaded( levelIndex : int)
	{
		// If it's not the first one, let it update fro destroy
		if (m_instance == this)
		{
			SetEnabled(false);
		}
	}
}

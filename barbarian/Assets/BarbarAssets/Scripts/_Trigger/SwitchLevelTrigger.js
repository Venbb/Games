#pragma strict

var m_timeDelay : float = 0;
var m_nextLevelName : String = "";
var m_effectiveTag : String = "";
var m_useLoadingStreen : boolean = true;
var m_autoSave : boolean = true;
var m_gameEnd : boolean = false;
var m_UILevel : String="";
//------------------
private var m_targetBoss : GameObject;

/*
var m_mainLight : GameObject;
var m_intensityRate : float = 3.0f;

private var m_light : Light = null;
private var m_oriIntensity : float = 0.0f;

private var m_triggered : boolean = false;
private var m_timer : float = 0;

function Awake()
{
	if (m_mainLight != null)
	{
		m_light = m_mainLight.GetComponent(Light) as Light;
		if (m_light != null)
		{
			m_oriIntensity = m_light.intensity;
		}
	}
}

function Update()
{
	if (m_triggered && m_timer <= m_timeDelay)
	{
		m_timer += Time.deltaTime;
		m_light.intensity = Mathf.Lerp(m_oriIntensity, m_oriIntensity * m_intensityRate, m_timer / m_timeDelay);
	}
}
*/

function Start()
{
        m_targetBoss=GameObject.Find("Boss_Level_6");

}
function OnTriggerEnter(other : Collider)
{
	
	if (other.tag == m_effectiveTag)
	{
		//m_triggered = true;
		
		yield WaitForSeconds(m_timeDelay);
		
		if (m_useLoadingStreen)
		{
			UiManager.Singleton().DisableAllPage();		
			UiManager.Singleton().SwitchPage(null, LoadingPage.Singleton());
		}
		// Save
		if (m_autoSave)
		{
			if (!m_gameEnd)
			{
				SceneManager.Singleton().Save(m_nextLevelName);
			}
			else // Game end
			{
			    Debug.Log("2111");
				// difficulty ++
				if(m_targetBoss != null)
				{
				   if(TheFinalWar_2.Singleton().firstTimeForGame())
				   {
				      GameManager.Singleton().SetDifficulty( GameManager.Singleton().GetDifficulty());
				      TheFinalWar_2.Singleton().firstTimeFalse();
				   }
				}
				else
				{
				   GameManager.Singleton().SetDifficulty( GameManager.Singleton().GetDifficulty() + 1 );
				}
				SceneManager.Singleton().Save("Level_1_1");
				Application.LoadLevelAsync(m_nextLevelName); 
				return ;
			}
		}
		
		//Application.LoadLevelAsync("Upgrade");
		Application.LoadLevelAsync(m_UILevel);
		Debug.Log("1111");
	}
}


static function SwitchLevel(nextlevel : String, currentLevel : String, useLoadingStreen : boolean, loadingStreenMarkIndex : int, autoSave : boolean)
{	
	Debug.Log("switch:" + nextlevel);
	if (useLoadingStreen)
	{
		UiManager.Singleton().DisableAllPage();
		UiManager.Singleton().SwitchPage(null, LoadingPage.Singleton());
	}
	
	// Save
	if (autoSave && SceneManager.Singleton())
	{
		SceneManager.Singleton().Save(currentLevel);
	}

	Application.LoadLevelAsync(nextlevel);
}


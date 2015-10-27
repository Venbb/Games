#pragma strict

var m_shadowSwordCount : int = 2;
var m_particleObj : Array;
var m_particleLifeTime : float = 0.3;

private var m_particleTimer : float[];
private var m_shadowSword : GameObject[];
private var m_shadowSwordPool : GamePool = null;
private var m_particlePool : GamePool = null;
private var m_position : Vector3;

function Start()
{
	m_particlePool = GamePoolManager.GetInstance().GetPool(EGamePool.fingerMovingParticle);
	m_shadowSwordPool = GamePoolManager.GetInstance().GetPool(EGamePool.ShadowSword);
	
	m_particleObj = new Array();
	m_particleTimer = new float[m_shadowSwordCount];
	m_shadowSword = new GameObject[m_shadowSwordCount];
	
	for (var i : int = 0; i < m_shadowSwordCount; ++i)
	{
		m_particleObj.Push(null);
		m_particleTimer[i] = 0;
		m_shadowSword[i] = m_shadowSwordPool.InitializeObject(transform.position, Vector3(0,0,0));
	}
}

function Update () 
{	
	// Off
	if ( GameOptionsManager.Singleton().IsSliceBladeEnabled() == false )
	{
		return ;
	}
	
	
	if ( SceneManager.Singleton().IsGamePaused() )
	{
		for (var i : int = 0; i < m_shadowSwordCount; ++i)
		{
			m_shadowSword[i].active = false;
		}
		return;
	}
	else
	{
		for ( i = 0; i < m_shadowSwordCount; ++i)
		{
			m_shadowSword[i].active = true;
		}
	}
	
	for (i = 0; i < m_shadowSwordCount; ++i)
	{
		if (m_particleObj[i] == null)
		{
			continue;
		}
		
		m_particleTimer[i] += Time.deltaTime;
		
		if (m_particleTimer[i] >= m_particleLifeTime && m_particlePool)
		{
			m_particleTimer[i] = 0;
			m_particlePool.KillObject(m_particleObj[i] as GameObject);
			m_particleObj[i] = null;
		}
	}
	
	if (InputManager.GetInstance().IsOnIPhone())
	{	
		UpdateMovingEffectIPhone();
	}
	else
	{
		UpdateMovingEffectMac();
	}
}

function UpdateMovingEffectIPhone()
{
	for (var i : int = 0; i < Input.touchCount && i < m_shadowSword.length; ++i)
	{
		m_position = Input.GetTouch(i).position;
		
		var camera : Camera = SceneManager.Singleton().GetMainCamera();
		m_position = camera.ScreenToWorldPoint (Vector3 (m_position.x, m_position.y, Mathf.Abs(camera.transform.position.z) ));
		
		m_shadowSword[i].transform.position = m_position;
		
		if (m_particleObj[i] == null && m_particlePool)
		{
			m_particleTimer[i]  = 0;
			m_particleObj[i] = m_particlePool.InitializeObject(m_position, Vector3(0,0,0));
		}
	}
}

function UpdateMovingEffectMac()
{
	if (Input.GetMouseButton(0) && m_shadowSword.length > 0)
	{
		m_position = Input.mousePosition;

		var camera : Camera = SceneManager.Singleton().m_mainCamera;
		m_position = camera.ScreenToWorldPoint (Vector3 (m_position.x,m_position.y,Mathf.Abs(camera.transform.position.z) ));
		
		m_shadowSword[0].transform.position = m_position;

		if (m_particleObj[0] == null && m_particlePool)
		{
			m_particleTimer[0]  = 0;
			m_particleObj[0] = m_particlePool.InitializeObject(m_position, Vector3(0,0,0));
		}
	}
}

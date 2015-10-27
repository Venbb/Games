#pragma strict

var m_normalShakeTime : float = 1.0;

var m_randomRange : Vector3 = Vector3(2, 2, 0);

private var m_shakeTimer : float = 0;
private var offset : Vector3;

function LateUpdate () 
{
	if (m_shakeTimer > 0.0 && Time.deltaTime > 0)
	{
		m_shakeTimer -= Time.deltaTime;
		OnShake();
	}
}

function Shake(time : float)
{
	m_shakeTimer = time;
}

function Shake()
{
	m_shakeTimer = m_normalShakeTime;
}

function Shake(time : float, range : Vector3)
{
	m_shakeTimer = time;
	m_randomRange = range;
}

function OnShake()
{
	offset.x = Random.Range(-m_randomRange.x, m_randomRange.x);
	offset.y = Random.Range(-m_randomRange.y, m_randomRange.y);
	offset.z = Random.Range(-m_randomRange.z, m_randomRange.z);
	
	this.transform.position += offset;
}
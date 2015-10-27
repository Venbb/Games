
private var m_posZ : float;

function Awake()
{
	m_posZ = this.transform.position.z;
}

function Update () 
{
	
	this.transform.position.z = m_posZ;
}
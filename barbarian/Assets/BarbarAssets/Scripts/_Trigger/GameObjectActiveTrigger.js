#pragma strict

var m_effectiveTag : String = "";
var m_objs : GameObject[];

private var m_trigged : boolean = false;

function Start()
{
	for (var i = 0; i < m_objs.length; ++i)
	{
		m_objs[i].SetActiveRecursively(false);
	}
}


function OnTriggerEnter(other : Collider)
{
	if (other.tag == m_effectiveTag && !m_trigged)
	{
		m_trigged = true;
		
		for (var i = 0; i < m_objs.length; ++i)
		{
			m_objs[i].SetActiveRecursively(true);
		}
	}
}
#pragma strict
	
var m_nextActionObjects : GameObject[];
var m_activeAtBegin : boolean = false;

function Start()
{
	this.gameObject.active = m_activeAtBegin ? true : false;
}
	
function Update()
{
}
	
function Exit()
{
	this.gameObject.active = false;
}


function TriggerNextActions()
{
	for (var i : int = 0; i < m_nextActionObjects.length; ++i)
	{
		if ( m_nextActionObjects[i] != null )
		{
			m_nextActionObjects[i].SetActiveRecursively(true);
		}
	}
}
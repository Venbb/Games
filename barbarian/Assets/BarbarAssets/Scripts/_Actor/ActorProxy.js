var m_actor : GameObject = null;

function GetActorObject() : GameObject
{
	if (m_actor == null)
	{
		Debug.LogError("Notice, you forget to set the actor in actor proxy.");
	}
	
	return m_actor;
}
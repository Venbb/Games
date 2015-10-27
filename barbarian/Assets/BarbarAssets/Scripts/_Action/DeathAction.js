#pragma strict

class DeathAction extends MonoActionBase
{
	var m_gameObjects : GameObject[];

	private var m_flag : boolean = false;
	
	function Update()
	{
		m_flag = true;
		
		for ( var i : int = 0; i < m_gameObjects.length; ++i)
		{
			if ( !(m_gameObjects[i] == null || m_gameObjects[i].active == false) )
			{
				m_flag = false; 
				break;
			}
		}
		
		if (m_flag)
		{
			TriggerNextActions();
			Exit();
		}
	}
}
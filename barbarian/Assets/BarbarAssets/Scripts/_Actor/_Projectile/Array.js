// coder : li yun

#pragma strict

class Array extends Projectile
{
	var m_dieWhenBeAttacked : boolean = true;
	
	function Update () 
	{
		if (m_dieWhenBeAttacked && IsDead())
		{
			Delete();
			return;
		}
		
		super.Update();
	}
}

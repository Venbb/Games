#pragma strict

class Spider extends Enemy
{
	var m_spawnMoveOnCeiling : boolean = true;

	function Start()
	{
		super.Start();
		
		AddState(new State(EFsmState.Ceiling, Ceiling_Enter, Ceiling_Update, Ceiling_Exit));
		AddState(new State(EFsmState.Fall, Fall_Enter, Fall_Update, Fall_Exit));
		InheritState(EFsmState.Patrol, Patrol_Enter, Patrol_Update, Patrol_Exit);
		
		if (m_spawnMoveOnCeiling)
		{
			ChangeStateTo(EFsmState.Ceiling);
		}
		
		//Debug.Log("*** rotation 2 : " + this.transform.eulerAngles);
	}
	
	function Reset()
	{
		super.Reset();
		
		if (m_physics.m_gravity < 0)
		{
			m_physics.m_gravity = -m_physics.m_gravity;
		 	//this.transform.Rotate(180, 180, 0);
			
		}
		
		//Debug.Log(" rotation 3 : " + this.transform.eulerAngles);
		if (m_spawnMoveOnCeiling)
		{
			ChangeStateTo(EFsmState.Ceiling);
		}
		//Debug.Log(" rotation 4 : " + this.transform.eulerAngles);
	}
	
	//----------------------------------------------------------------------------------------

	function Ceiling_Enter()
	{
		//Debug.Log("Enter Ceiling state");
		
		if (m_physics.m_gravity > 0)
		{
			m_physics.m_gravity = -m_physics.m_gravity;
			this.transform.Rotate(180, 180, 0);
		}
		
		super.Idle_Enter();
	}

	function Ceiling_Update()
	{
		//Debug.Log(" rotation 5 : " + this.transform.eulerAngles);
		// Have target, go to state MoveToTarget
		if (m_targetList.length > 0)
		{
			ChangeStateTo(EFsmState.Fall);
			return ;
		}
		
		if (m_timer < m_idleTime)
		{
			m_timer += Time.deltaTime;
		}
		else 
		{
			m_timer = 0;
		
			if (IsVisible() && m_patrolCount > 0)
			{
				//Debug.Log("EFsmState.MoveToTarget");
				m_currentPatrolTime = m_patrolCount;
				ChangeStateTo(EFsmState.Patrol);
			}
		}
	}

	function Ceiling_Exit()
	{
		//Debug.Log("Exit Ceiling state");
		
		super.Idle_Exit();
	}
	//----------------------------------------------------------------------------------------

	//----------------------------------------------------------------------------------------
	// MoveToTarget
	function Fall_Enter()
	{
		//Debug.Log("Enter Fall_Enter state");
		
		if (m_physics.m_gravity < 0)
		{
			m_physics.m_gravity = -m_physics.m_gravity;
		 	this.transform.Rotate(180, 180, 0);
		}
	}

	function Fall_Update()
	{
		if (m_physics.IsGrounded())
		{
			ChangeStateTo(EFsmState.Idle);
		}
	}

	function Fall_Exit()
	{
		//Debug.Log("Exit Fall_Exit state");
	}
	//----------------------------------------------------------------------------------------
	
	function Patrol_Enter()
	{
		//Debug.Log("Enter Patrol_Enter state");
		
		super.Patrol_Enter();
	}
	
	function Patrol_Update()
	{
		// Have target, go to state MoveToTarget
		if (m_targetList.length > 0)
		{
			if (m_physics.m_gravity < 0)
			{
				ChangeStateTo(EFsmState.Fall);
			}
			else
			{
				ChangeStateTo(EFsmState.MoveToTarget);
			}
			
			return ;
		}
	
		if (m_actorAction.Update())
		{
			//Debug.Log("move spider");
			if (m_currentPatrolTime > 0)
			{
				ChangeStateTo(EFsmState.Patrol);
			}
			else
			{
				if (m_physics.m_gravity < 0)
				{
					ChangeStateTo(EFsmState.Ceiling);
				}
				else
				{
					ChangeStateTo(EFsmState.Idle);
				}
			}	
		}
	}
	
	function Patrol_Exit()
	{
		//Debug.Log("Exit Patrol_Exit state");
		super.Patrol_Exit();
	}

}

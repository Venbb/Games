#pragma strict

class Piranha extends Enemy
{
	var m_fireDeltaTime : float = 2;
	
	private var m_fireballPool : GamePool = null;
	private var m_fireballtimer : float = 0;
	
	
	function Start()
	{
		super.Start();
		
		InheritState(EFsmState.Idle, Idle_Enter, Idle_Update,Idle_Exit);
		//InheritState(EFsmState.Attack, Attack_Enter, Attack_Update, Attack_Exit);
		InheritState(EFsmState.FallDown, FallDown_Enter, FallDown_Update, FallDown_Exit);
		
		m_fireballPool = GamePoolManager.GetInstance().GetPool(EGamePool.Fireball_1);
	}
	
	function Update()
	{
		super.Update();
		
		if (m_fireballtimer > 0)
		{
			m_fireballtimer -= Time.deltaTime;
		}
	}
		
	function ApplyDamage(damageInfo : DamageInfo) : boolean
	{	
		if (super.ParentApplyDamage(damageInfo))
		{
			//Debug.Log("Enemy being attacked");
			// Dead
			if (IsDead())
			{
				ChangeStateTo(EFsmState.Death);
			}
			else
			{
				// Sound
				if (HaveSound(0,5))
				{
					PlaySound(0,5, false);
				}
				//ChangeStateTo(EFsmState.Hurt);
			}
		
			if (m_hpBar != null)
			{
				m_hpBar.DisplayHpBar();
			}
			return true;
	}
	
		
		return false;
	}
	
	//----------------------------------------------------------------------------------------

	function Idle_Enter()
	{
		//Debug.Log("Enter Idle state");
		m_animation.CrossFade(AnimationType.Get(EAnimationType.Idle), 0.2);
	}

	function Idle_Update()
	{
		// Have target, go to state MoveToTarget
		if (m_targetList.length > 0)
		{
			ChangeStateTo(EFsmState.Prepare);
			return ;
		}
	}


	function Idle_Exit()
	{
		////Debug.Log("Exit Idle state");
	}
	//----------------------------------------------------------------------------------------

	//----------------------------------------------------------------------------------------
	// MoveToTarget
	function FallDown_Enter()
	{

	}

	function FallDown_Update()
	{
		ChangeStateTo(EFsmState.Idle);
	}

	function FallDown_Exit()
	{

	}
	//----------------------------------------------------------------------------------------
}


class Projectile extends Actor
{
	var m_actorInfo : EnemyInfo;
	var m_offset : Vector3;
	var autoDestroyInvisible : boolean = true;
	var m_lifeTime : float = -1;
	
	var m_onceAttack : boolean = true;
	
	var m_dieOnBlock : boolean = false;
	var m_jianqiSpeed : float;
	private var m_lifeTimer : float = 0;
	
	function Start()
	{
		// hud
		if (m_hudPool == null)
		{
			m_hudPool = GamePoolManager.GetInstance().GetPool(EGamePool.hud);
		}
	}
	
	function Update()
	{
		super.Update();
		
		if (m_lifeTime > 0)
		{
			m_lifeTimer += Time.deltaTime;
			
			if (m_lifeTimer >= m_lifeTime)
			{
				Delete();
				return;
			}
		}
		
		if (m_dieOnBlock && Blocked())
		{
			Delete();
			return;
		}
	}
	
	function GetActorInfo() : ActorInfo
	{
		return m_actorInfo;
	}
		
	function OnTriggerAttacked(collision : Collision)
	{
		var flag : boolean = false;
	
	
		var obj : GameObject = collision.gameObject;
	
		if (obj.GetComponent(ActorProxy) != null)
		{
			obj = (obj.GetComponent(ActorProxy) as ActorProxy).GetActorObject();
		}
	
		var actor : Actor = obj.GetComponent(Actor) as Actor;
	
		if (actor == null)
		{
			var pos2 : Vector3 = collision.contacts[0].point;
			DisplayHurtHud(pos2, false);
			
			flag =  true;
		}
	
		if (AttackAble(obj) && actor != null)
		{
			//Debug.Log(this.gameObject + " Actor is attacking " + obj);

			if ( actor.ApplyDamage(GetCurrentDamageInfo(obj)) )
			{
				// Using the first contact point
				var pos : Vector3 = collision.contacts[0].point;		   
				DisplayHurtHud(pos, actor.IsDead());
				DisplayAttackSound();
				flag = true;
			}
			else
			{
				//Debug.Log("Failed");
				flag =  false;
			}
			
		}

		if (flag && m_onceAttack)
		{
			DestorySelf();
		}
		
		return flag;
	}
	
	function OnBecameInvisible () 
	{
		if (autoDestroyInvisible) 
		{
			Delete();
		}
	}
	
	function Delete()
	{    		
		if (m_lifeControllCallback != null) 
		{
			m_lifeControllCallback(this.gameObject);
		}
		else
		{
			Destroy(this.gameObject);
		}
	}

	function SetFatherRate(rate : float)
	{
		super.SetFatherRate(rate);
		
		// Updating damage info
		
		if (m_skillList.length > 0)
		{
			GenerateDamageInfo();
		}
	}

	function Attack()
	{
		//Debug.Log("x direction : " + m_physics.GetDirectionX());
		
		if (m_skillList.length <= 0)
		{
			return ;
		}
		
		GenerateDamageInfo();
		if (m_currentSkill >= 0 && m_skillList[m_currentSkill].effectiveObj != null)
		{
			m_skillList[m_currentSkill].effectiveObj.SetActiveRecursively(true);
		}
	}
	
	function Reset()
	{
		super.Reset();
	
		m_physics.SetSpeed(Vector3.zero);
		m_physics.SetSpeedX(m_physicsInfo.m_walkSpeed+m_jianqiSpeed);
		m_lifeTimer = 0;
		m_currentSkill = 0;
	}
	
	function OnEnable()
	{
		Reset();
		Attack();
		
		m_prePosX = 0;
		m_blockTimer = 0;
	}
	
	function SetToOffsetPosition()
	{
		m_physics.Translate(m_offset);
	}
	
	function OnDisable()
	{
		if (m_skillList.length <= 0)
		{
			return ;
		}
		
		if (m_currentSkill >= 0 && m_skillList[m_currentSkill].effectiveObj != null)
		{
			m_skillList[m_currentSkill].effectiveObj.SetActiveRecursively(false);
		}
	}
	
	private var m_prePosX : float = 0;
	private var m_blockDeviation : float = 0.05;
	private var m_blockMaxTime : float = 0.1;
	private var m_blockTimer : float = 0;
	
	function Blocked() : boolean
	{
		if (Mathf.Abs(m_prePosX - GetPhysics().GetPosition().x) < m_blockDeviation)
		{
			m_blockTimer += Time.deltaTime;
			if (m_blockTimer > m_blockMaxTime)
			{
				//Debug.Log("Stop on block");
				return true;
			}
		}
		else
		{
			m_prePosX = GetPhysics().GetPosition().x;
			m_blockTimer = 0;
		}
		
		return false;
	}

}

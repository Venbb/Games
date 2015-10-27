#pragma strict

class Enemy extends AiActor
{

var m_actorInfo : EnemyInfo;
var m_idleTime : float = 5;
var m_layDownTime : float = 0.5;
private var m_currentStunTime : float = 1.5;
var m_prepareTime : float = 2;

var m_rotateMax : float = 40;
var m_rotateMin : float = 15;
private var m_rotateRandom : float = 0;

var m_deathLayDownTime : float = 3;
private var m_deathLayDownTimer : float = 0;

var m_deathFlickeringTime : float = 1;
private var m_deathFlickeringDeltaTimer : float = 0;

var m_useCounterattack : boolean = false;
var m_maxHurtCount : int = 10000;
protected var m_currentHurtCount : int = 0;

private var m_multiAttakTimer : float = 0;
private var m_attackTimer : float = 0;
protected var m_timer : float = 0;
private var m_layDownTimer : float = 0;
private var m_stunTimer : float = 0;
private var m_prepareTimer : float = 0;

var m_moveAwayTime : float = 2;
private var m_moveAwayTimer : float = 0;

var m_moveAwayProbability : float = 0.5;
private var m_attackSucceed : boolean = false;
//private static var ms_moneyPool : GamePool = null;
private var m_appeared : boolean = false;

var m_patrolOffsetDistance : Vector3 = Vector3(10, 0, 0);
private var m_patrolDirection : int = 1;

var m_patrolCount : int = 2;
protected var m_currentPatrolTime : int = 0;

var m_neverLostTarget : boolean = false;

var m_autoDestroyFarDistanceWithCamera : float = -1;

var m_fallDownAble : boolean = true;

protected var m_hpBar : HpBar = null;
protected var m_targetList : Array = null;

//--------------------
private var BossGetup : int = 200;
private var m_targetBoss : GameObject;
//private var 

function InitActorInfo()
{
	//Debug.Log("GameManager.Singleton().GetDifficulty() : " + GameManager.Singleton().GetDifficulty());
	//Debug.Log("m_actorInfo.modeFactor : " + m_actorInfo.modeFactor.length);
	// use mode factor
	super.InitActorInfo();
}

function Awake()
{
	super.Awake();
	m_actorInfo.hp *= m_actorInfo.modeFactor[GameManager.Singleton().GetDifficulty()];
	m_actorInfo.attack *= m_actorInfo.modeFactor[GameManager.Singleton().GetDifficulty()];
	m_actorInfo.stun *= m_actorInfo.modeFactor[GameManager.Singleton().GetDifficulty()];
}

function Start()
{
	super.Start();
	//----------------
	
	//---------------
    m_targetBoss=GameObject.Find("Boss_Level_6");
	InheritState(EFsmState.Idle, Idle_Enter, Idle_Update, Idle_Exit);
	AddState(new State(EFsmState.Patrol, Patrol_Enter, Patrol_Update, Patrol_Exit));
	AddState(new State(EFsmState.Attack, Attack_Enter, Attack_Update, Attack_Exit));
	AddState(new State(EFsmState.Hurt, Hurt_Enter, Hurt_Update, Hurt_Exit));
	AddState(new State(EFsmState.Death, Death_Enter, Death_Update, Death_Exit));
	AddState(new State(EFsmState.MoveToTarget, MoveToTarget_Enter, MoveToTarget_Update, MoveToTarget_Exit));
	AddState(new State(EFsmState.FallDown, FallDown_Enter, FallDown_Update, FallDown_Exit));
	AddState(new State(EFsmState.GetUp, GetUp_Enter, GetUp_Update, GetUp_Exit));
	InheritState(EFsmState.Stun, Stun_Enter, Stun_Update, Stun_Exit);
	AddState(new State(EFsmState.Prepare, Prepare_Enter, Prepare_Update, Prepare_Exit));
	AddState(new State(EFsmState.MoveAway, MoveAway_Enter, MoveAway_Update, MoveAway_Exit));
	AddState(new State(EFsmState.Spawn, Spawn_Enter, Spawn_Update, Spawn_Exit));
	ChangeStateTo(EFsmState.Idle);
	
	// Target
	m_targetList = new Array();
	
	// Hp bar
	m_hpBar = GetComponent(HpBar) as HpBar;
	
	if (Random.seed == 0)
	{
		Random.seed = Time.realtimeSinceStartup;
	}
	
	m_patrolDirection = Random.Range(0.0, 1.0) > 0.5 ? 1 : -1;	
}

function Update()
{	
	super.Update();
	
	//Debug.Log("deltaTime : " + Time.deltaTime);
	if ( SceneManager.Singleton().IsGamePaused() )
	{
		return ;
	}
	
	UpdateAutoDestroy();
}

function UpdateAutoDestroy()
{
	if (m_autoDestroyFarDistanceWithCamera > 0 
	&& m_autoDestroyFarDistanceWithCamera < Vector3.Distance(m_physics.GetPosition(), SceneManager.Singleton().GetMainCamera().transform.position))
	{
		//Debug.Log(Vector3.Distance(m_physics.GetPosition(), SceneManager.Singleton().GetMainCamera().transform.position));
		DestorySelf();
	}
}

function OnTriggerAttacked(collision : Collision) : boolean
{
	var flag = super.OnTriggerAttacked(collision);
	
	if (flag == true)
	{
		m_attackSucceed = true;
	}
	
	//Debug.Log("m_attackSucceed " + m_attackSucceed);
	return flag;
}

function GetActorInfo() : ActorInfo
{
	return m_actorInfo;
}
/*function SetActoInfo() : ActorInfo
{
    var targe : ActorInfo;
    
    targe.hp=10000;
    targe.attack = 2500;
    targe.defence = 1000;
}*/
function ParentApplyDamage(damageInfo : DamageInfo) : boolean
{
	return (super.ApplyDamage(damageInfo));
}

function ApplyDamage(damageInfo : DamageInfo) : boolean
{
	if (ParentApplyDamage(damageInfo))
	{
		//Debug.Log("Enemy being attacked");
		// Dead
		if (IsDead())
		{
		    if(FindTheFinalWar.Singleton().control() != null)
		    {
		       if(m_targetBoss)
		       {
			      if(BossRebirth.Singleton().Return_ControlRebirth() == true)
		          {
		              ChangeStateTo(EFsmState.FallDown);
		              BossRebirth.Singleton().Close_Rebirth();
		              //yield WaitForSeconds(0.5f);
		             // TheFinalWar_2.Singleton().window_Boss();
		          }
		          else if(BossRebirth.Singleton().Return_ControlRebirth() == false && TheFinalWar_2.Singleton().firstTimeForGame())
		          { 
		              ChangeStateTo(EFsmState.Idle);
		              //TheFinalWar_2.Singleton().windowControl();
		              //TheFinalWar_2.Singleton().window_Boss();
		          }
		       }
		    }
		    else
		    {
		      ChangeStateTo(EFsmState.Death);

		    }
		    
		}
		else if (!IsInState(EFsmState.Stun))
		{
			// Stun
			if (m_stun <= 0 && m_fallDownAble)
			{
				ChangeStateTo(EFsmState.FallDown);
			}
			// Normal hurt
			else if (!m_useCounterattack || m_currentHurtCount <= m_maxHurtCount )
			{
				//Debug.Log("Enemy being attacked, go to hurt");
				ChangeStateTo(EFsmState.Hurt);
			}
		}
		
		if (m_hpBar != null)
		{
			m_hpBar.DisplayHpBar();
		}
		return true;
	}
	
	return false;
}

function ForceDeath()
{
	super.ForceDeath();	
	
	if (!IsInState(EFsmState.Death))
	{
		ChangeStateTo(EFsmState.Death);
	}
}

function RandomGenerateCurrentSkill()
{
	var p : float = 0;
	var q : float = 0;
	
	for (var i : int = 0; i < m_skillList.length; ++i)
	{
		p += m_skillList[i].probability;
	}
	
	p = Random.Range(0.0, p);
	
	for (i = 0; i < m_skillList.length; ++i)
	{	
		q += m_skillList[i].probability;
		if (p <= q)
		{
			m_currentSkill = i;
			return;
		}
	}
}

function SetStunTime( stunTime : float)
{
	//Debug.Log("time : " + stunTime);
	m_currentStunTime = stunTime;
}

// Fsm below

//----------------------------------------------------------------------------------------
// Idle
function Idle_Enter()
{	
	EnableCurrentSkillBounding(false);
	//Debug.Log("Enter Idle state");
	m_animation.CrossFade(AnimationType.Get(EAnimationType.Idle), 0.2);
	m_physics.SetSpeedX(0);
	
	m_timer = 0;
}

function Idle_Update()
{
	
	if (m_attackSucceed && Random.Range(0.0, 1.0) <= m_moveAwayProbability)
	{
		ChangeStateTo(EFsmState.MoveAway);
		return;
	}
	
	// Have target, go to state MoveToTarget
	if (m_targetList.length > 0)
	{
		if ( !(m_targetList[0] as Actor).IsDead() )
		{
			//Debug.Log("EFsmState.MoveToTarget");
			ChangeStateTo(EFsmState.MoveToTarget);
			return ;
		}
		else
		{
			m_targetList.RemoveAt(0);
		}
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

function Idle_Exit()
{
	m_attackSucceed = false;
	RandomGenerateCurrentSkill();
	//Debug.Log("Exit Idle state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Spawn
function Spawn_Enter()
{
	//Debug.Log("Enter Spawn state");
	//Debug.Log("ani length : " +  m_animation[AnimationType.Get(EAnimationType.Spawn)].length);
	m_animation.CrossFade(AnimationType.Get(EAnimationType.Spawn), 0.1);
	
	if (m_spawnEffect != null)
	{
		m_spawnEffect.SetActiveRecursively(true);
	}
	
	if (m_targetList.length > 0)
	{
		if (IsOnLeftSide((m_targetList[0] as Actor).gameObject))
		{
			m_physics.SetDirectionX(-1);
		}
		else
		{
			m_physics.SetDirectionX(1);
		}
	}
}

function Spawn_Update()
{
	// Have target, go to state MoveToTarget
	if (!m_animation.isPlaying)
	{
		ChangeStateTo(EFsmState.Idle);
		return ;
	}
}

function Spawn_Exit()
{
	if (m_spawnEffect != null)
	{
		m_spawnEffect.SetActiveRecursively(false);
	}
	//Debug.Log("Exit Spawn state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// MoveAway
function MoveAway_Enter()
{
	//Debug.Log("Enter MoveAway state");
	
	m_attackSucceed = false;
	
	m_moveAwayTimer = m_moveAwayTime;
	m_animation.CrossFade(AnimationType.Get(EAnimationType.Walk), 0.2);
	
	if (m_targetList.length != 0 )
	{
		if (IsOnLeftSide((m_targetList[0] as Actor).gameObject))
		{
			m_physics.SetDirectionX(1);
		}
		else
		{
			m_physics.SetDirectionX(-1);
		}
	}
	else
	{
		m_physics.SetDirectionX( -m_physics.GetDirectionX());
	}
	
	//Debug.Log( m_targetList[0] + " " + m_currentSkill);
	var tempPos : Vector3 = transform.position;
	tempPos.x +=  m_physics.GetDirectionX() * 10000;
	
	m_actorAction = new MoveActorAction(this, tempPos, m_physicsInfo.m_walkSpeed, 0, true);

	m_actorAction.Enter();
}

function MoveAway_Update()
{
	//Debug.Log("Update MoveAway state");
	m_moveAwayTimer -= Time.deltaTime;
	
	if (m_actorAction.Update() || m_moveAwayTimer <= 0)
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function MoveAway_Exit()
{ 
	//Debug.Log("Exit MoveAway state");
	m_actorAction.Exit();
	m_actorAction = null;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Patrol
function Patrol_Enter()
{
	//Debug.Log("Enter Patrol state");
	m_animation.Play(AnimationType.Get(EAnimationType.Walk));
	
	m_actorAction = new MoveActorAction(this, m_physics.GetPosition() + m_patrolOffsetDistance * m_patrolDirection, m_physicsInfo.m_walkSpeed, m_physicsInfo.m_walkSpeed * Time.deltaTime, true);
	
	m_patrolDirection = -m_patrolDirection;
	
	m_currentPatrolTime--;
	
	m_actorAction.Enter();
}

function Patrol_Update()
{
	// Have target, go to state MoveToTarget
	if (m_targetList.length > 0)
	{
		ChangeStateTo(EFsmState.MoveToTarget);
		return ;
	}
	
	if (m_actorAction.Update())
	{
		if (m_currentPatrolTime > 0)
		{
			ChangeStateTo(EFsmState.Patrol);
		}
		else
		{
			ChangeStateTo(EFsmState.Idle);
		}
	}
}

function Patrol_Exit()
{
	////Debug.Log("Exit Patrol state");
	m_actorAction.Exit();
	m_actorAction = null;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// MoveToTarget
function MoveToTarget_Enter()
{	
	//Debug.Log("Enter MoveToTarget state");
	m_animation.Play(AnimationType.Get(EAnimationType.Walk));
	
	//Debug.Log( m_targetList[0] + " " + m_currentSkill);
	
	m_actorAction = new MoveActorAction(this, m_targetList[0] as Actor, m_physicsInfo.m_walkSpeed, (m_targetList[0] as Actor).GetActorInfo().scale.x / 2 + m_skillList[m_currentSkill].attackRange - Random.Range(0,0.5), true);
	m_actorAction.Enter();
}

function MoveToTarget_Update()
{
	// Have no target, go to state Idle
	if (m_targetList.length == 0)
	{
		ChangeStateTo(EFsmState.Idle);
	}
	else if (m_actorAction.Update())
	{
		if (m_actorAction.IsFinishedSuccess())
		{
			ChangeStateTo(EFsmState.Prepare);
		}
		else
		{
			ChangeStateTo(EFsmState.MoveAway);
		}
	}
}

function MoveToTarget_Exit()
{
	//Debug.Log("Exit MoveToTarget state");
	m_actorAction.Exit();
	m_actorAction = null;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Prepare
function Prepare_Enter()
{
	////Debug.Log("Enter Patrol state");
	m_animation.CrossFade(AnimationType.Get(EAnimationType.Idle), 0.2);
	m_physics.SetSpeedX(0);
	
	m_prepareTimer = m_prepareTime;	
	
	// Sound
	if (HaveSound(0,1) && Random.Range(0.0, 1.0) < 0.2)
	{
		PlaySound(0,1, false);
	}
}

function Prepare_Update()
{
	m_prepareTimer -= Time.deltaTime;
	// Have target, go to state MoveToTarget
	if (m_prepareTimer <= 0)
	{
		ChangeStateTo(EFsmState.Attack);
	}
}

function Prepare_Exit()
{
	////Debug.Log("Exit Patrol state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Attack
function Attack_Enter()
{
	//Debug.Log("Enter Attack state");
	m_attackSucceed = false;
	
	m_attackTimer = 0;
	m_multiAttakTimer = 0;
	
	if (m_targetList.length > 0 && m_targetList[0] != null)
	{
		if (IsOnLeftSide((m_targetList[0] as Actor).gameObject) )
		{
			m_physics.SetDirectionX(-1);
		}
		else
		{
			m_physics.SetDirectionX(1);
		}
	}
	else
	{
		ChangeStateTo(EFsmState.Idle);
		return;
	}
	
	var skill : Skill = m_skillList[m_currentSkill];
	m_animation.Play(AnimationType.Get(skill.animationType));
	
	//Debug.Log(m_animation[AnimationType.Get(skill.animationType)].length);
	
	m_physics.SetSpeedX(0);
	m_physics.AddImpulse( Vector3(skill.selfImpulse.x * m_physics.GetDirectionX(), skill.selfImpulse.y, skill.selfImpulse.z) );
	//skill.effectiveObj.SetActiveRecursively(true);
	
	m_invincible = skill.invincible;
	
	GenerateDamageInfo();

}

function Attack_Update()
{
	var skill : Skill = m_skillList[m_currentSkill];
	if (skill.durationAsAnimation)
	{
		if (!m_animation.isPlaying)
		{	
			m_currentHurtCount = 0;
			ChangeStateTo(EFsmState.Idle);
		}
	}
	else
	{
		m_attackTimer += Time.deltaTime;
		if (m_attackTimer >= skill.duration)
		{
			m_currentHurtCount = 0;
			ChangeStateTo(EFsmState.Idle);
		}
	}
	
	// Multi hurt
	if (skill.multiTimeHurt)
	{
		m_multiAttakTimer += Time.deltaTime;
		
		if (m_multiAttakTimer >= skill.hurtDeltaTime)
		{
			m_multiAttakTimer = 0;
			GenerateDamageInfo();
		}
	}
}

function Attack_Exit()
{

	//Debug.Log("Exit Attack state");
	EnableCurrentSkillBounding(false);
	EnableCurrentSkillEffect(false);
	m_invincible = false;
}
//----------------------------------------------------------------------------------------

private var ms_hurtRandomWaitTime : float = 0.1f;
private var m_hurtFlag : boolean = false;
private var m_waitTime : float = 0.0f;
private var m_waitTimer : float = 0.0f;

//----------------------------------------------------------------------------------------
// Hurt
function Hurt_Enter()
{
	m_hurtFlag	= false;
	m_animation.Stop();
	
	//Debug.Log("Enter Hurt state1");
	
	//yield WaitForSeconds (Random.Range(0.0f, ms_hurtRandomWaitTime));
	m_waitTime = Random.Range(0.0f, ms_hurtRandomWaitTime);
	m_waitTimer = 0.0f;
	
	//Debug.Log("Enter Hurt state2");
	//m_animation.Play(AnimationType.Get(EAnimationType.Hurt));
	
	// Sound
	if (HaveSound(0,5))
	{
		PlaySound(0,5, false);
	}
	
	m_hurtFlag = true;
	
	m_currentHurtCount++;
	
	//m_animation.Stop();
}

function Hurt_Update()
{
	if(m_waitTimer < m_waitTime)
	{
		m_waitTimer += Time.deltaTime;
		
		if (m_waitTimer >= m_waitTime)
		{
			m_animation.Play(AnimationType.Get(EAnimationType.Hurt));
		}
	}
	
	if (m_waitTimer >= m_waitTime && !m_animation.isPlaying)
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function Hurt_Exit()
{
	////Debug.Log("Exit Hurt state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//  FallDown
function FallDown_Enter()
{
	//Debug.Log("Enter FallDown state");
	m_invincible = true;
	m_animation.Stop();
	m_animation.Play(AnimationType.Get(EAnimationType.FallDown));
	m_physics.SetSpeedX(0);
	m_layDownTimer = m_layDownTime;
	
	if (m_physics != null)
	{
		m_physics.DetectCollisions(false);
	}
	
	// Sound
	if (HaveSound(0,4))
	{
		PlaySound(0,4, false);
	}
}

function FallDown_Update()
{
	if (!m_animation.isPlaying)
	{
	    if(m_targetBoss == null)
	    {
	        m_layDownTimer -= Time.deltaTime;
		    if (m_layDownTimer <= 0)
		    {
			  ChangeStateTo(EFsmState.GetUp);
		    }
	    }
	    else
	    {
	     
	      BossGetup -= Time.deltaTime;
	      Debug.Log(BossGetup);
	      UseHealthPot();
	      if(BossGetup <= 0)
	      {
	          //GetActorInfo().hp = 1000000;
	          //super.Awake();
	          //Awake();
	         // m_actorInfo.hp = 10000;
	          m_actorInfo.hp *= m_actorInfo.modeFactor[GameManager.Singleton().GetDifficulty()];
	          m_actorInfo.attack *= m_actorInfo.modeFactor[GameManager.Singleton().GetDifficulty()];
	          m_actorInfo.stun *= m_actorInfo.modeFactor[GameManager.Singleton().GetDifficulty()];	     

	          //m_actorInfo.stun = 1000;
	          BossRebirth.Singleton().showTheFire();
	          ChangeStateTo(EFsmState.Attack);
	      }
	    }
		
	}
}
function UseHealthPot() 
{
		m_actorInfo.hp = 20000;	
		m_actorInfo.attack = 30000;
	    m_actorInfo.defence = 1000;
}

function  FallDown_Exit()
{
	//Debug.Log("Exit FallDown state");
	if (m_physics != null)
	{
		m_physics.DetectCollisions(true);
	}
	
	m_invincible = false;
	m_stun = GetActorInfo().stun;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//  GetUp
function GetUp_Enter()
{
	//Debug.Log("Enter GetUp state");
	m_animation.Play(AnimationType.Get(EAnimationType.GetUp));

}

function GetUp_Update()
{
	if (!m_animation.isPlaying)
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function  GetUp_Exit()
{
	//Debug.Log("Exit GetUp state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//  Stun
function Stun_Enter()
{
	//Debug.Log("Enter Stun state");
	
	if (m_animation[AnimationType.Get(EAnimationType.Stun)] == null)
	{
		BackToIdle();
		return ;
	}
	
	if (m_stunEffect)
	{
		m_stunEffect.SetActiveRecursively(true);
	}
	
	m_animation.Play(AnimationType.Get(EAnimationType.Stun));
	m_stunTimer = m_currentStunTime;
	//Debug.Log("stun time " + m_currentStunTime);
}

function Stun_Update()
{
	m_stunTimer -= Time.deltaTime;
	
	if (m_stunTimer <= 0)
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function  Stun_Exit()
{
	if (m_stunEffect)
	{
		m_stunEffect.SetActiveRecursively(false);
	}
	//Debug.Log("Exit Stun state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Death
function Death_Enter()
{
	EnableCurrentSkillBounding(false);
	//Debug.Log("Enter Death state");
	
	if (m_animation[AnimationType.Get(EAnimationType.Death)] != null)
	{
		m_animation.Play(AnimationType.Get(EAnimationType.Death));
	}
	else if (m_animation[AnimationType.Get(EAnimationType.FallDown)] != null)
	{
		m_animation[AnimationType.Get(EAnimationType.FallDown)].speed *= 0.4;
		m_animation.Play(AnimationType.Get(EAnimationType.FallDown));
	}
	//m_animation.PlayQueued (AnimationType.Get(EAnimationType.Death));
	m_physics.SetSpeedX(0);
	m_physics.SetSpeedY(0);
	m_invincible = true;
	
	m_deathLayDownTimer = m_deathLayDownTime;
	m_deathFlickeringTimer = m_deathFlickeringTime;
	
	if (m_physics != null)
	{
		m_physics.DetectCollisions(false);
	}
	
	// Rotate
	m_rotateRandom = Random.Range(m_rotateMin, m_rotateMax) / m_animation[AnimationType.Get(EAnimationType.FallDown)].length * Random.Range(-1.0, 1.0);
	
	// Sound
	if (HaveSound(0,3))
	{
		PlaySound(0,3, false);
	}
	
	//m_looted = false;
	Loot();
}

//private var m_looted : boolean = false;

function Death_Update()
{
	if (!m_animation.isPlaying)
	{
		//if ( !m_looted )
		//{
		//	m_looted = true;
			//Loot();
		//}
		
		m_deathLayDownTimer -= Time.deltaTime;
		
		// Flickering
		if (m_renderer != null && m_deathLayDownTimer <= 0)
		{
			m_deathFlickeringDeltaTimer -= Time.deltaTime;
			m_deathFlickeringTimer -= Time.deltaTime;
		
			if (m_deathFlickeringDeltaTimer <= 0 )
			{
				m_renderer.enabled = !m_renderer.enabled;
				m_deathFlickeringDeltaTimer = m_deathFlickeringDeltaTime;
			}
		}

		
		if (m_deathFlickeringTimer <= 0)
		{
			//Loot();
			
			// Kill this object
			DestorySelf();
		}
	}
	// slow rotate
	else
	{
		//m_physics.RotateY( m_rotateDirection * Mathf.Lerp(0, m_rotateRandom, m_animation[AnimationType.Get(EAnimationType.FallDown)].time / m_animation[AnimationType.Get(EAnimationType.FallDown)].length) );
		//Debug.Log(m_rotateRandom);
		//Debug.Log("rotate delta:" + m_rotateRandom* Time.deltaTime);
		m_physics.RotateY(m_rotateRandom * Time.deltaTime);
	}
}

static var ms_lootsRandomOffset : Vector3 = Vector3(0.8, 0.3, 0.2);
private var ms_lootsOffsetY : float = 0.35f;

function Loot()
{	
	var pool : GamePool;
			
	var temp : GameObject;
	
	var tempPos : Vector3 = transform.position + Vector3(0, ms_lootsOffsetY, 0);
	
	
	for (var i = 0; i < m_actorInfo.lootList.length; ++i)
	{
		if (Random.value <= m_actorInfo.lootList[i].dropProbability)
		{
			for (var j = 0; j < m_actorInfo.lootList[i].dropCount[GameManager.Singleton().GetDifficulty()]; ++j)
			{
				pool = GamePoolManager.GetInstance().GetPool(m_actorInfo.lootList[i].itemType);
				
				tempPos += Vector3(Random.Range(-ms_lootsRandomOffset.x, ms_lootsRandomOffset.x), 
					      Random.Range(-ms_lootsRandomOffset.y, ms_lootsRandomOffset.y), // Make it higher than ground
					      Random.Range(-ms_lootsRandomOffset.z, ms_lootsRandomOffset.z) );
					      
				temp = pool.InitializeObject(tempPos);

				var prj : ActorBase = temp.GetComponent(ActorBase) as ActorBase;
				//Debug.Log("ms_moneyPool : " +  ms_moneyPool);
				//Debug.Log("ms_moneyPool.KillObject : " + ms_moneyPool.KillObject);
				prj.SetLifeControllCallback(pool.KillObject);
				
				
				// For pickable element
				
				var pE : PickableElement = prj as PickableElement;
				
				if (pE != null)
				{
					pE.SetPointAndScale(m_actorInfo.lootList[i].eachPoint);
				}
			}
		}
	}
}

function Death_Exit()
{
	if (m_animation[AnimationType.Get(EAnimationType.FallDown)] != null)
	{
		m_animation[AnimationType.Get(EAnimationType.FallDown)].speed = 1;
	}
	
	////Debug.Log("Exit Death state");
	m_invincible = false;
	m_renderer.enabled = true;
	
	if (m_physics != null)
	{
		m_physics.DetectCollisions(true);
	}
}
//----------------------------------------------------------------------------------------

function Reset()
{
	//InitActorInfo();
	super.Reset();
	m_appeared = false;
	m_targetList = new Array();
	m_currentHurtCount = 0;
	
	if (m_physics != null)
	{
		this.transform.eulerAngles = Vector3(0, 90, 0);
		m_physics.SetDirection(Vector3(1, 1, 0)); // 2D GAME
		m_physics.SetDirectionX(m_initDirectionX); // Init direction
	}
	
	ChangeStateTo(EFsmState.Idle);
	
	//Debug.Log("*** rotation 1 : " + this.transform.eulerAngles);
}

function OnEnable()
{
	Reset();
}

function OnTriggerEnter(collision : Collider)
{
	var obj = collision.gameObject;
	var other : Actor = obj.GetComponent(Actor) as Actor;
	
	if ( (other != null) // Should be a actor
		&&  !IsSameCamp(other.GetCamp()) ) // Not in same camp
	{	

		//CheckDuplicate
		for (var i : int = 0; i < m_targetList.length; ++i)
		{
			if (m_targetList[i] == other)
			{
				return ;
			}
		}
		
		m_targetList.Push(other);		
		
		// first time find target
		if (m_appeared == false)
		{
			m_appeared = true;
			// Sound
			if (HaveSound(0,0))
			{
				PlaySound(0,0, false);
			}
			
			// Change to spawn state
			
			if (m_animation[AnimationType.Get(EAnimationType.Spawn)] != null)
			{
				ChangeStateTo(EFsmState.Spawn);
			}
		}
	}
}

function OnTriggerExit(collision : Collider)
{
	// //Debug.Log("Someone exit enemy's detection trigger");
	
	var obj = collision.gameObject;
	var other : Actor = obj.GetComponent(Actor) as Actor;
	
	if (m_neverLostTarget)
	{
		return;
	}
	
	if ( (other != null) // Should be a actor
		&&  !IsSameCamp(other.GetCamp()) ) // Not in same camp
	{
		for (var i : int = 0; i < m_targetList.length; ++i)
		{
			// Remove from target list
			if (m_targetList[i] == other)
			{
				m_targetList.RemoveAt(i);
				return;
			}
		}
	}
}
function getTheBoss()
{
}

}

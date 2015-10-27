#pragma strict

import System.Collections.Generic;

class Actor extends ActorBase
{
var m_skillList : Skill[];

var m_physicsInfo : ActorPhysicsInfo;
// The character will spawn at spawnPoint's position when needed.  This could be changed via a script at runtime to implement, e.g. waypoints/savepoints.
var spawnPoint : Transform = null;

var m_initDirectionX : int = -1;
var m_invincible : boolean = false;
var m_usingAttackHud : boolean = true;
var m_canBeRepeled : boolean = true;
var m_deathFlickeringDeltaTime : float = 0.15;
var m_animationObj : GameObject = null;
var m_renderObj : GameObject = null;

var m_audioClipList : AudioClip[];

var m_stunEffect : GameObject;
var m_spawnEffect : GameObject;

private static var ms_damageId : int = 1;
protected var m_hudPool : GamePool = null;
protected var m_bigHudPool : GamePool = null;

protected var m_damageInfo : DamageInfo;
protected var m_deathFlickeringTimer : float = 0;
protected var m_currentSkill : int = 0;
protected var m_hp : int = 0;
protected var m_stun : int = 0;
protected var m_physics : ActorPhysics = null;
protected var m_actorAction : ActionBase = null;
protected var m_animation : Animation = null;
protected var m_renderer : Renderer = null;
protected var m_spawnPoint : GameObject = null;
protected var m_lastEnabledSkill : int = -1;
protected var m_attackMoveable : boolean = false;

private var m_appliedDamage : Array;

protected var m_audioSourceList : AudioSource[] = null;
protected var m_buffList : Dictionary.<EBuffType, BuffBase> = null;

protected var m_oriScale : Vector3;

//----------
	//--Position for SmallBLood----
	var m_BloodPosition : Vector3;

function Awake()
{	
	// Physics
	m_physics = GetComponent(ActorPhysics) as ActorPhysics;
	
	m_oriScale = this.transform.localScale;
	
	// Actor Info
	m_damageInfo = new DamageInfo();
	m_damageInfo.attacker = this.gameObject;
	
	m_appliedDamage = new Array(); 
	
	if (m_animationObj != null)
	{
		m_animation = m_animationObj.animation;
	}
	
	if (m_renderObj != null)
	{
		m_renderer = m_renderObj.GetComponent(Renderer) as Renderer;
	}

	m_audioSourceList = GetComponents.<AudioSource>() as AudioSource[];
	
	m_buffList = new Dictionary.<EBuffType, BuffBase>();
}

function InitActorInfo()
{
	m_hp = GetActorInfo().hp;
	m_stun = GetActorInfo().stun;
}

function IsVisible() : boolean
{
	if (m_renderer != null)
	{
		return m_renderer.isVisible;
	}
	
	return true;
}

function IsStunable() : boolean
{
	return GetActorInfo().stunable && !IsDead();
}

function HaveSound(sourceIndex : int, clipIndex : int) : boolean
{
	if (m_audioSourceList.length <= sourceIndex
		|| m_audioClipList.length <= clipIndex)
	{
		return false;
	}
	
	return true;
}

function PlaySound(sourceIndex : int, clipIndex : int, bLoop : boolean)
{
	m_audioSourceList[sourceIndex].clip = m_audioClipList[clipIndex];
	m_audioSourceList[sourceIndex].loop = bLoop;
	
	AudioManager.Singleton().Play(m_audioSourceList[sourceIndex]);
}

function StopSound(sourceIndex : int)
{
	m_audioSourceList[sourceIndex].Stop();
}


function Start()
{
	// hud
	if (m_hudPool == null)
	{
		m_hudPool = GamePoolManager.GetInstance().GetPool(EGamePool.hud);
	}
	
	// big hud
	if (m_bigHudPool == null)
	{
		m_bigHudPool = GamePoolManager.GetInstance().GetPool(EGamePool.BigHud);
	}
	
	Reset();
}

function Reset()
{
	if (m_physics != null)
	{
		m_physics.Reset();
		m_physics.SetDirection(Vector3(1, 1, 0)); // 2D GAME
		m_physics.SetDirectionX(m_initDirectionX); // Init direction
	}
	
	InitActorInfo();
	
	DisableAttackBoundingBox();
	DisableAttackEffect();
	
	if (m_stunEffect)
	{
		m_stunEffect.SetActiveRecursively(false);
	}
}

function Update ()
{
	if ( SceneManager.Singleton().IsGamePaused() )
	{
		if (m_animation != null)
		{
			m_animation.enabled = false;
		}
		return ;
	}
	else
	{
		if (m_animation != null && m_animation.enabled == false)
		{
			m_animation.enabled = true;
		}
	}
	
	//Debug.Log(this.gameObject + " Updating.");
}

function DisableAttackBoundingBox()
{
	// Disable the attack object
	for (var skill : Skill in m_skillList)
	{
		if (skill.effectiveObj != null)
		{
			skill.effectiveObj.SetActiveRecursively(false);
			// For there's no assert in unity3d, so if it's null, we'll see a error here at the beginning.
			(skill.effectiveObj.GetComponent(ActorAttackTrigger) as ActorAttackTrigger).m_func = TriggerAttacked;
		}
	}
}

function DisableAttackEffect()
{
	// Disable the attack object
	for (var skill : Skill in m_skillList)
	{
		if (skill.effect != null)
		{
			skill.effect.SetActiveRecursively(false);
		}
	}
}

function GetSkill(skillType : ESkillType) : Skill
{
	for (var i = 0; i < m_skillList.length; ++i)
	{
		if (skillType == m_skillList[i].type)
		{
			return m_skillList[i];
		}
	}
	
	return null;
}

function GetSkillList() : Skill[]
{
	return m_skillList;
}

function GetNextDamageId() : int
{
	return ms_damageId++;
}

function TriggerAttacked(collision : Collision) : boolean
{
	return OnTriggerAttacked(collision);
}

function AttackAble(obj : GameObject) : boolean
{
	// Not self
	if (obj != this.gameObject)
	{
		return true;
	}
	
	return false;
}

function OnTriggerAttacked(collision : Collision) : boolean
{
	var obj : GameObject = collision.gameObject;
	
	if (obj.GetComponent(ActorProxy) != null)
	{
		obj = (obj.GetComponent(ActorProxy) as ActorProxy).GetActorObject();
	}
	
	var actor : Actor = obj.GetComponent(Actor) as Actor;
	
	if (AttackAble(obj) && actor != null)
	{
		//Debug.Log(this.gameObject + " Actor is attacking " + obj);

		if ( actor.ApplyDamage(GetCurrentDamageInfo(obj)) )
		{
			// Using the first contact point
			var pos : Vector3 = collision.contacts[0].point;
			m_BloodPosition = pos;
			DisplayHurtHud(pos, actor.IsDead());
			DisplayAttackSound();
			ControllableActor.Singleton().DisplayBlood(m_BloodPosition);
			return true;
		}
		else
		{
			//Debug.Log("Failed");
			return false;
		}
		
		 
	}
	return false;
} 

function DisplayAttackSound()
{
	if ( m_currentSkill >= 0 && m_skillList[m_currentSkill] != null && m_skillList[m_currentSkill].attackSucceedAudio >= 0 )
	{
		PlaySound(0, m_skillList[m_currentSkill].attackSucceedAudio, false);
	}
}

function DisplayHurtHud( pos : Vector3, withBigHud : boolean )
{
	if (m_usingAttackHud && (m_hudPool != null))
	{	
		var tempPool : GamePool = (withBigHud && m_bigHudPool != null) ? m_bigHudPool : m_hudPool;
		
		var hud : GameObject = tempPool.InitializeObject(pos);
		var actor : ActorBase = hud.GetComponent(ActorBase) as ActorBase;
				
		if (actor != null)
		{
			actor.SetLifeControllCallback(tempPool.KillObject);
		}
	}
}
function GetActorInfo() : ActorInfo
{
	Debug.LogError("No implement in base actor");
	return null;
}

function IsOnLeftSide(obj : GameObject)
{
	return m_physics.IsOnLeftSide(obj);
}

function IsDamageApplied(id : int) : boolean
{
	for (var i : int = 0; i < m_appliedDamage.length; ++i)
	{
		if (id == m_appliedDamage[i])
		{
			return true;
		}
	}
	
	return false;
}

function ApplyDamage(damageInfo : DamageInfo) : boolean
{
	if (m_invincible) // more to do
	{
		return false;
	}
	
	// Not always can attack, we use id to mark duplicate attack
	if (!damageInfo.alwaysCanAttack)
	{
		// Have alredy been applied
		if (IsDamageApplied(damageInfo.id))
		{
			return false;
		}
	
		// Save the damage info id
		// 5 is really enough for this damage id
		if (m_appliedDamage.length < 5)
		{
			m_appliedDamage.Push(damageInfo.id);
		}
		else
		{	
			m_appliedDamage.RemoveAt(0);
			m_appliedDamage.Push(damageInfo.id);
		}
	}
	
	//Debug.Log(" damageInfo.hurtValue : " + damageInfo.hurtValue);
	// Hp +/-
	m_hp -= Mathf.Max(1, damageInfo.hurtValue * ( 1.0f - GetActorInfo().defence / GetActorInfo().MAX_DEFENCE) );
	
	//Debug.Log(" current hp after attack : " + m_hp);
	//Debug.Log(GetActorInfo().defence / GetActorInfo().MAX_DEFENCE);
	
	// Stun -
	m_stun -= damageInfo.stunValue;
	//Debug.Log("damageInfo.stunValue : " + damageInfo.stunValue);

	// Buff
	for (var i = 0; i < damageInfo.buffs.length; ++i)
	{
		// Not self only, and delete duplicate buff succeed
		if ( !damageInfo.buffs[i].isSelfOnly && DeleteDuplicateBuff(damageInfo.buffs[i].buffType) )
		{
			//Debug.Log("Apply buff : " + i + " " + damageInfo.buffs[i].buffType);
			AddBuff(damageInfo.buffs[i].buffType, BuffManager.Singleton().GenerateBuff(this, damageInfo.buffs[i]));
		}
	}
	
	//Debug.Log("Apply buff length " + damageInfo.buffs.length);
	
	if (m_physics != null && damageInfo.attacker != null)
	{
		m_physics.SetDirectionX( IsOnLeftSide(damageInfo.attacker) ? -1 : 1);
	}
	
	if (m_canBeRepeled && damageInfo.attacker != null)
	{
		var impulse : Vector3 = damageInfo.impulse * 0.6; // This rate if for easy to change all the imulse
		impulse.x = IsOnLeftSide(damageInfo.attacker) ? impulse.x : -impulse.x;
		m_physics.AddImpulse(impulse);
	}
	
	return true;
}

function DeleteDuplicateBuff(buffType : EBuffType) : boolean
{
	// Have same type?
	// May we should check which buff is strong, like WOW, but not now.
	if (m_buffList.ContainsKey(buffType))
	{
		// Remove old same buff
		m_buffList[buffType].BuffOver();
	}
	
	return true;
}

function RemoveBuff(buffType : EBuffType)
{
	m_buffList.Remove(buffType);
}

function AddBuff(buffType : EBuffType, buff : BuffBase)
{
	m_buffList[buffType] = buff;
}

function GenerateDamageInfo()
{
	if (m_currentSkill < 0)
	{
		return ;
	}
	
	// generate new damageInfo
	m_damageInfo.hurtValue = GetAttack() * ( 1.0f + m_skillList[m_currentSkill].GetAttackAdditiveRate() + m_fatherRate);
	m_damageInfo.impulse = m_skillList[m_currentSkill].impulse;
	
	//Debug.Log("Hurt value : " + m_damageInfo.hurtValue + " father rate : " + m_fatherRate
	//+ "m_skillList[m_currentSkill].GetAttackAdditiveRate() : " + m_skillList[m_currentSkill].GetAttackAdditiveRate() );
	// new id
	m_damageInfo.id = GetNextDamageId();
	m_damageInfo.alwaysCanAttack = m_skillList[m_currentSkill].alwaysCanAttack;
	
	//Debug.Log("m_currentSkill : " +  m_currentSkill);
	// Stun
	m_damageInfo.stunValue = m_skillList[m_currentSkill].stun * ( 1.0f + m_skillList[m_currentSkill].GetAttackAdditiveRate() + m_fatherRate);
	
	m_damageInfo.buffs = m_skillList[m_currentSkill].GetBuffs();
	
	// Self only buff
	for (var i = 0; i < m_damageInfo.buffs.length; ++i)
	{
		// Not self only, and delete duplicate buff succeed
		if ( m_damageInfo.buffs[i].isSelfOnly && DeleteDuplicateBuff(m_damageInfo.buffs[i].buffType) )
		{
			//Debug.Log("Apply buff : " + i + " " + damageInfo.buffs[i].buffType);
			AddBuff(m_damageInfo.buffs[i].buffType, BuffManager.Singleton().GenerateBuff(this, m_damageInfo.buffs[i]));
		}
	}
}

function GetCurrentDamageInfo(obj : GameObject) : DamageInfo
{
	return m_damageInfo;
}

function SetHp(hp : int)
{
	m_hp = hp;
}

function GetHp() : int
{
	if (m_hp < 0)
	{
		m_hp = 0;
	}
	
	return m_hp;
}

function SetMaxHp(hp : int)
{
	GetActorInfo().hp = hp;
}

function GetMaxHp() : int
{
	return GetActorInfo().hp;
}

function SetAttack(attack : int)
{
	GetActorInfo().attack = attack;
}

function GetAttack() : int
{
	return GetActorInfo().attack;
}

function GetStamina() : int
{
	return 0;
}

function GetMaxStamina() : int
{
	return GetActorInfo().GetStamina();
}

function GetCamp() : ECamp
{
	return GetActorInfo().camp;
}

function IsDead() : boolean
{
	return m_hp <= 0;
}

function IsSameCamp(camp : ECamp) : boolean
{
	return GetCamp() == camp;
}

function GetPhysics() : ActorPhysics
{
	return m_physics;
}

function GetAnimation() : Animation
{
	return m_animation;
}


function SetScaleAddtiveRate(scaleRate : float)
{
	this.transform.localScale = m_oriScale + Vector3(scaleRate, scaleRate, scaleRate);
}

function GetOriScale() : Vector3
{
	return m_oriScale;
}

function GetOriScaleRate() : float
{
	return 1;
}

function OnDrawGizmos () 
{
	if (GetPhysics() != null && GetActorInfo() != null)
	{
	Gizmos.color = Color.red;

	var m_rayStartPosition : Vector3 = GetPhysics().GetPosition();
	
	if (GetPhysics().GetDirectionX() == 1)
	{
		m_rayStartPosition.x += GetActorInfo().scale.x / 2.0;
	}
	else
	{
		m_rayStartPosition.x -= GetActorInfo().scale.x / 2.0;
	}
		
	var m_rayEndPosition : Vector3 = m_rayStartPosition;
	m_rayEndPosition.y -= 5.0 / 2.0; // 5 is enough for check the
	m_rayStartPosition.y += 5.0/ 2.0;
	
	Gizmos.DrawLine (m_rayStartPosition, m_rayEndPosition);
	
	//("draw owner Pos : " + GetPhysics().GetPosition() + " start Pos : " + m_rayStartPosition + " end Pos : " + m_rayEndPosition);
	
	Gizmos.color = Color.gray;

	m_rayStartPosition = GetPhysics().GetPosition();
		
	m_rayEndPosition = m_rayStartPosition;
	m_rayEndPosition.y -= 0.2;
	
	Gizmos.DrawLine (m_rayStartPosition, m_rayEndPosition);
	}
}

function ForceDeath()
{
	SetHp(0);
	DisplayHurtHud(this.transform.position, true);
}

function EnableCurrentSkillBounding(flag : boolean)
{
	if ( m_currentSkill < 0 )
	{
		return ;
	}
	
	if ( m_skillList[m_currentSkill].effectiveObj != null )
	{
		m_skillList[m_currentSkill].effectiveObj.SetActiveRecursively(flag);
		
		m_lastEnabledSkill = flag ? m_currentSkill : -1;
	}
}

function EnableCurrentSkillEffect(flag : boolean)
{
	if ( m_currentSkill < 0 )
	{
		return ;
	}
	
	if ( m_skillList[m_currentSkill].effect != null )
	{
		m_skillList[m_currentSkill].effect.SetActiveRecursively(flag);
	}
}

function EnableLastSkillBounding(flag : boolean)
{
	if ( m_lastEnabledSkill < 0 )
	{
		return ;
	}
	
	if ( m_skillList[m_lastEnabledSkill].effectiveObj != null )
	{
		m_skillList[m_lastEnabledSkill].effectiveObj.SetActiveRecursively(flag);
		
		m_lastEnabledSkill = flag ? m_lastEnabledSkill : -1;
	}
}

function EnableAttackMove(flag : boolean)
{
	m_attackMoveable = flag;
}

function Combo()
{
	Debug.LogError("No Combo() implemented in Actor.");
}

function SummonAttack() : Actor[]
{
	//Debug.Log("m_currentSkill : " + m_currentSkill);
	//Debug.Log("m_skillList[m_currentSkill].useSummon : " + m_skillList[m_currentSkill].useSummon);
	
	if ( m_currentSkill >= 0 && m_skillList[m_currentSkill].useSummon)
	{
		var actors : Actor[] = new Actor[m_skillList[m_currentSkill].summonCount];
		
		for ( var i = 0; i < m_skillList[m_currentSkill].summonCount; ++i)
		{
			
		var skill : Skill = m_skillList[m_currentSkill];
		
		var pool : GamePool = GamePoolManager.GetInstance().GetPool(skill.summonType);
		
		var dir : Vector3 = m_physics.GetDirection();
		dir.x = skill.summonedActorDirectionSameAsMaster ? dir.x : - dir.x;
		
		var pos : Vector3 = m_physics.GetPosition(); 
		pos.x = dir.x > 0 
		? pos.x + skill.summonedActorInitPositionOffset.x + Random.Range(0.0, m_skillList[m_currentSkill].summonedActorRandomOffset.x) 
		: pos.x - skill.summonedActorInitPositionOffset.x - Random.Range(0.0, m_skillList[m_currentSkill].summonedActorRandomOffset.x);
		
		pos.y += skill.summonedActorInitPositionOffset.y + Random.Range(0.0, m_skillList[m_currentSkill].summonedActorRandomOffset.y);
		pos.z += skill.summonedActorInitPositionOffset.z + Random.Range(0.0, m_skillList[m_currentSkill].summonedActorRandomOffset.z);
		
		var impluse : Vector3 = skill.summonedActorInitImpulse;
		impluse.x = dir.x > 0 ? impluse.x : - impluse.x;
		
		var summonerObj : GameObject = pool.InitializeObject(pos);

		var summoner : Actor = summonerObj.GetComponent(Actor) as Actor;
		summoner.SetLifeControllCallback(pool.KillObject);

		//Debug.Log(" summon direction : " + dir.x);
		summoner.m_physics.SetDirectionX(dir.x);
		//Debug.Log(" summoned direction : " + summoner.m_physics.GetDirectionX());
		summoner.AddImpulse(impluse);
		
		actors[i] = summoner;
		
		// Father rate
		actors[i].SetFatherRate(m_skillList[m_currentSkill].GetAttackAdditiveRate() + m_fatherRate);
		
		//Debug.Log(" Father rate " + m_fatherRate);
		//Debug.Log(" skill rate " + m_skillList[m_currentSkill].GetAttackAdditiveRate());

		}
		
		return actors;
	}
	
	return null;
}

function SetDirection(dir : Vector3)
{
	m_physics.SetDirection(dir);
}

function AddImpulse(impluse : Vector3)
{
	m_physics.AddImpulse(impluse);
}

function ShakeCamera(time : float)
{
	var camera : Camera = SceneManager.Singleton().GetMainCamera();
	(camera.GetComponent(CameraShake) as CameraShake).Shake(time);
}

function TrapDamage()
{
	// generate new damageInfo
	var damageInfo = new DamageInfo();
	damageInfo.hurtValue = 30;
	damageInfo.impulse = Vector3.zero;
	
	// new id
	damageInfo.id = GetNextDamageId();
	// Stun
	damageInfo.stunValue = 0;
	damageInfo.attacker = null;
	
	damageInfo.buffs = new BuffInfo[0];
	
	if ( ApplyDamage(damageInfo) )
	{		
		DisplayHurtHud(this.transform.position, IsDead() );
		//DisplayAttackSound(this.transform.position);
		return true;
	}
}
//
/*
// Moving platform support.
private var activePlatform : Transform;
private var activeLocalPlatformPoint : Vector3;
private var activeGlobalPlatformPoint : Vector3;
//private var lastPlatformVelocity : Vector3;
private var lastPlatform : Transform;

// If you want to support moving platform rotation as well:
//private var activeLocalPlatformRotation : Quaternion;
//private var activeGlobalPlatformRotation : Quaternion;

function OnUpdatePlatformMove()
{
	if (m_physics == null)
	{
		return ;
	}
	
	// Moving platform support
    if (activePlatform != null 
    	&& activeGlobalPlatformPoint != Vector3.zero
    	&& lastPlatform == activePlatform)
    {
        var newGlobalPlatformPoint = activePlatform.TransformPoint(activeLocalPlatformPoint);
        var moveDistance = (newGlobalPlatformPoint - activeGlobalPlatformPoint);
        if (moveDistance != Vector3.zero)
        {
        	m_physics.SetPosition(m_physics.GetPosition() + moveDistance);
        	//controller.Move(moveDistance);
        }
       // lastPlatformVelocity = (newGlobalPlatformPoint - activeGlobalPlatformPoint) / Time.deltaTime;

        // If you want to support moving platform rotation as well:
        //var newGlobalPlatformRotation = activePlatform.rotation * activeLocalPlatformRotation;
        //var rotationDiff = newGlobalPlatformRotation * Quaternion.Inverse(activeGlobalPlatformRotation);

        // Prevent rotation of the local up vector
        //rotationDiff = Quaternion.FromToRotation(rotationDiff * transform.up, transform.up) * rotationDiff;

        //transform.rotation = rotationDiff * transform.rotation;
    }
    //else 
    //{
    //    lastPlatformVelocity = Vector3.zero;
    //}

    //activePlatform = null;
    
    // Moving platforms support
    if (activePlatform != null) 
    {
        activeGlobalPlatformPoint = transform.position;
        activeLocalPlatformPoint = activePlatform.InverseTransformPoint (transform.position);

        // If you want to support moving platform rotation as well:
        //activeGlobalPlatformRotation = transform.rotation;
        //activeLocalPlatformRotation = Quaternion.Inverse(activePlatform.rotation) * transform.rotation; 
    }
	
	lastPlatform = activePlatform;
	
}

function OnControllerColliderHit (hit : ControllerColliderHit) 
{	
	// Make sure we are really standing on a straight platform
	// Not on the underside of one and not falling down from it either!
	// 13 is ground
	if (!hit.gameObject.isStatic && hit.gameObject.layer == 13 && hit.moveDirection.y < -0.9 && hit.normal.y > 0.5) 
	{
		activePlatform = hit.collider.transform;
		//Debug.Log(" Platform : " + activePlatform);
	}
	else
	{
		activePlatform = null;
	}
}
*/


function OnLevelWasLoaded (level : int) 
{
    ms_damageId  = 1;
}
}
//@script RequireComponent (ActorPhysics)
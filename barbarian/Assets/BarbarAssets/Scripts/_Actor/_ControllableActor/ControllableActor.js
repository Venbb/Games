#pragma strict

import System.Collections.Generic;

class ControllableActor extends AiActor
{
var m_name : String = "Kato";	
var m_actorInfo : ControllableActorInfo;

var m_propertyData : ControllableActorPropertyData[];

var m_climbOffsetZ : float = -2.3;
var m_climpSpeed : float = 3;
var m_checkFallingDeltaTime : float = 0.15;
var m_staminaRecoverDeltaTime : float = 0.45;
var m_staminaRecoverPoint : float = 5;
var m_enemyLayer : LayerMask;
var m_activeSkillMax : int = 3;
var m_layDownTime : float = 0.5;

var m_climbTriggerOffset : Vector2 = Vector2(1, 0.5);

var m_activeSkill : List.<ESkillType> = null;

var m_hitsComboTime : float = 3;
var m_attackComboTime : float = 0.5;
var m_initEnabledSkill1 : ESkillType;
var m_initEnabledSkill2 : ESkillType;

//-----------------------------
var m_RecoverSkill1 : ESkillType;
var m_RecoverSkill2 : ESkillType;
public static var m_firsteTimeForGame : boolean = true;
private static var m_instance : ControllableActor = null;
//----------------------------

private var m_currentInputInfo : InputInfo;
private var m_ladderTriggerPosition : Vector3;
private var m_layDownTimer : float = 0;
private var m_fixedZAxisValue : float = 0;
private var m_checkFallingTimer : float = 0;
private var m_multiAttakTimer : float = 0;
private var m_attackTimer : float = 0;
private var m_stamina : float = 0;
private var m_staminaRecoverTimer : float = 0;
private var m_target : Actor = null;
private var m_canPushBox : boolean = false;
private var m_enterLadderDownTrigger : boolean = false;
private var m_enterLadderUpTrigger : boolean = false;

private var m_inputPool : List.<InputInfo> = null;
private var m_playerId : int = 0;

private var m_climbDicection : int = 0;

private var i : int = 0;

private var m_hitsComboTimer : float = 0;
private var m_hitsCombo : int = 0;

private var m_onMovingPlatform : boolean = false;

private var m_playedAttackEndAnimation : boolean = false;

//---------------------
 private var m_targetBoss : GameObject;
 private var m_targetControl : GameObject;
 var m_xuewu_1 : GameObject;
 var m_fireBall : GameObject;
 var m_wind : GameObject;
 var m_jian : GameObject;
 //var m_controlJump : boolean = true;
 var m_HellFire : GameObject;
 var controller : CharacterController;
 var timeControl : int = 0;
 var m_SmallBlood : GameObject;
 var m_controrActor : boolean = false;
/*private var m_touchEnum = {
	"TouchUnknown":0,
	"TouchTap":1,
	"TouchDoubleTap":2,
	"TouchDrag":3,
	"TouchMultitouchTap":4,
	"TouchMultitouchDoubleTap":5,
	"TouchSwipeLeft":6,
	"TouchSwipeRight":7,
	"TouchSwipeUp":8,
	"TouchSwipeDown":9,
	"TouchPinchIn":10,
	"TouchPinchOut":11,
	"TouchDoubleSwipeLeft":12,
	"TouchDoubleSwipeRight":13,
	"TouchDoubleSwipeUp":14,
	"TouchDoubleSwipeDown":15,
	"TouchSwipeOblique":16,
	"TouchDoubleSwipeOblique":17
};*/
	


public class EInputCommand 
{

	static var Jump : int = InputManager.ETouchEnum.TouchDoubleTap | InputManager.ETouchEnum.TouchMultitouchDoubleTap;//ETouchEnum.TouchSwipeOblique | ETouchEnum.TouchDoubleSwipeOblique| ETouchEnum.TouchSwipeDown;
	static var Attack : int = InputManager.ETouchEnum.TouchSwipeLeft | InputManager.GetInstance().ETouchEnum.TouchSwipeRight | InputManager.ETouchEnum.TouchSwipeOblique;
	static var HeavyAttack : int = InputManager.ETouchEnum.TouchSwipeUp;
	static var JumpAttack : int= InputManager.ETouchEnum.TouchSwipeDown;
	static var ShoulderAttack : int= InputManager.ETouchEnum.TouchDoubleSwipeRight | InputManager.ETouchEnum.TouchDoubleSwipeLeft | InputManager.ETouchEnum.TouchDoubleSwipeOblique;
};


//--------------------------------------------------

var m_defaultBoneStuff : Dictionary.<String, Quaternion>;

function SetBindPose( bones : Transform[] ) 
{ // array of bone transforms to reset
  // with some finagling this could be rewritten to accept names of bones; it'd be slower though.
  for ( var b in bones ) 
  {
    var boneInfo : Quaternion = (m_defaultBoneStuff[(b as Transform).name]);
    (b as Transform).localRotation = boneInfo;
  }
}
//--------------------------------------------------

function SetPlayerId(id : int)
{
	m_playerId = id;
}

function GetPlayerId() : int
{
	return m_playerId;
}

function Save(gameData : GameData) : boolean
{	
	gameData.m_actorName = m_name;
	
	gameData.m_actorHealthPot = m_actorInfo.healthPot;
	gameData.m_actorMoney = m_actorInfo.money;

	gameData.m_propertyCount = m_propertyData.length;
	gameData.m_propertyLevel.Clear();
	
	for (i = 0; i < m_propertyData.length; ++i)
	{
		gameData.m_propertyLevel.Add(m_propertyData[i].currentLevel);
		//Debug.Log(" Save m_propertyData[i] : " + m_propertyData[i].skillType + " level : " + m_propertyData[i].currentLevel);
	}
	
	gameData.m_activeSkillCount = m_activeSkill.Count;

	gameData.m_activeSkill.Clear();
	
	for (i = 0; i < m_activeSkill.Count; ++i)
	{
		gameData.m_activeSkill.Add(m_activeSkill[i]);
	}
	
	return true;
}

function Load(gameData : GameData) : boolean
{
	m_actorInfo.healthPot = gameData.m_actorHealthPot;
	m_actorInfo.money = gameData.m_actorMoney;
	
	//gameData.m_propertyCount = m_propertyData.length;
	Debug.Log(m_propertyData.length);
	for (var i : int = 0; i < m_propertyData.length; ++i)
	{
		m_propertyData[i].currentLevel = gameData.m_propertyLevel[i];
		OnLoadPropertyData(m_propertyData[i]);
		//Debug.Log("Load index " + i + " " + "m_propertyData[i] : " + m_propertyData[i].skillType + " level : " + m_propertyData[i].currentLevel);
	}

	
	m_activeSkill.Clear();
	
	for (i = 0; i < gameData.m_activeSkillCount; ++i)
	{
		m_activeSkill.Add(gameData.m_activeSkill[i]);
	}
	
	Reset();
	
	return true;
}

function GetAllPropertyData() : ControllableActorPropertyData[]
{
	return m_propertyData;
}

function GetPropertyData(type : EPropertyType, skillType : ESkillType) : ControllableActorPropertyData
{
	for (var i : int = 0; i < m_propertyData.length; ++i)
	{
		if ( m_propertyData[i].propertyType == type && (m_propertyData[i].skillType == ESkillType.Invalid || m_propertyData[i].skillType == skillType) )
		{
			return m_propertyData[i];
		}
	}
	
	return null;
}

//--------------------------------
  //Reset All property
function Restproperty()
{
     this.m_propertyData[0].currentLevel = 0;
     this.m_propertyData[1].currentLevel = 0;
     this.m_propertyData[2].currentLevel = 0;
     this.m_propertyData[3].currentLevel = 0;
     this.m_propertyData[4].currentLevel = 0;
     this.m_propertyData[5].currentLevel = 0;
     this.m_propertyData[6].currentLevel = 0;
     this.m_propertyData[7].currentLevel = 0;
     this.m_propertyData[8].currentLevel = 0;
     this.m_propertyData[9].currentLevel = 0;
     this.m_propertyData[10].currentLevel = 0;
     this.m_propertyData[11].currentLevel = 0;
     this.m_propertyData[12].currentLevel = 0;
     m_initEnabledSkill1 = m_RecoverSkill1;
     m_initEnabledSkill2 = m_RecoverSkill2;
     
}

function OnLoadPropertyData(propertyData : ControllableActorPropertyData)
{		
	switch (propertyData.propertyType)
	{
	case EPropertyType.Hp:
		m_actorInfo.SetHpLevel(propertyData.currentLevel);
		break;
	case EPropertyType.Attack:
		m_actorInfo.SetAttackLevel(propertyData.currentLevel);
		break;
	case EPropertyType.Defence:
		m_actorInfo.SetDefenceLevel(propertyData.currentLevel);
		m_actorInfo.SetStunLevel(propertyData.currentLevel);
		break; 
	case EPropertyType.Stamina:
		m_actorInfo.SetStaminaLevel(propertyData.currentLevel);
		break; 
	case EPropertyType.Skill:
		//Debug.Log("property.skillType : " + propertyData.skillType + " level : " + propertyData.currentLevel);
		SetSkillLevel(propertyData.skillType, propertyData.currentLevel);
		break; 
	default:
		Debug.Log("Unknown property type.");
		break;
	}
}

function SetSkillLevel(skillType : ESkillType, skillLevel : int)
{
	for (var i : int = 0; i < m_skillList.length; ++i )
	{
		if (m_skillList[i].type == skillType)
		{
			//Debug.Log("skillType : " + skillType + " level : " + skillLevel);
			m_skillList[i].currentLevel = skillLevel;
		}
	}
}

function GetActiveSkillList() : List.<ESkillType>
{
	return m_activeSkill;
}

function SetActiveSkill(index : int,  skillType : ESkillType)
{
	if (index < m_activeSkill.Count && index >= 0)
	{
		m_activeSkill[index] = skillType;
	}
	else
	{
		Debug.LogError("Out of boundary, SetActiveSkill(int : index,  skillType : ESkillType).");
	}
}

function GetHitsComboCountDownTime() : float
{
	return m_hitsComboTimer;
}

function GetHitsCombo() : int
{
	return m_hitsCombo;
}

function SummonAttack() : Actor[]
{
	//Debug.Log("controllable actor summon attack.");
	var actors : Actor[] = super.SummonAttack();
	
	if (actors == null)
	{
		return null;
	}
	
	//Debug.Log("controllable actor summon attack.");
	
	for (var i = 0; i < actors.length; ++i)
	{
		//Debug.Log("attack 1 : " + i);
		actors[i].SetFatherRate(m_skillList[m_currentSkill].GetAttackAdditiveRate());
	}
	
	return actors;
}

function Awake()
{
	super.Awake();
	
	m_hitsCombo = 0;
	
	m_stamina = GetActorInfo().GetStamina();
	m_staminaRecoverTimer = 0;
	
	m_activeSkill = new List.<ESkillType>();
	m_inputPool = new List.<InputInfo>();
	// Active skill init	
	m_activeSkill.Add(m_initEnabledSkill1);
	m_activeSkill.Add(m_initEnabledSkill2);
	
	//----
	if (m_instance == null)
	{
		m_instance = this;
	}
}

function Reset()
{
	super.Reset();
	m_hp = m_actorInfo.hp;
	m_stamina = m_actorInfo.stamina;
	m_stun = m_actorInfo.stun;
	
	m_hitsCombo = 0;
	
	m_checkFallingTimer = 0.0f;
}

function SetSpawnPoint(spawnPoint : GameObject)
{
	m_spawnPoint = spawnPoint;
}

function Spawn () 
{	
	// reset the character's position to the spawnPoint
	if ( m_spawnPoint != null)
	{	
		//transform.position = m_spawnPoint.transform.position;
	}
	Reset();
}

function OnDeath () 
{
	Spawn();
}

function ForceDeath()
{
	super.ForceDeath();	
	
	if (!IsInState(EFsmState.Death))
	{
		ChangeStateTo(EFsmState.Death);
		return;
	}
}

function xuewuActive()
{
   if(m_xuewu_1.active == false)
   {
      m_xuewu_1.SetActiveRecursively(true);
   }
   else
   {
       m_xuewu_1.SetActiveRecursively(false);
   }
}
function fireBall()
{
  
   if(m_fireBall.active == false)
   {
      m_fireBall.SetActiveRecursively(true);
   }
}
function clseFireBall()
{
   if(m_fireBall.active == true)
   {
       m_fireBall.SetActiveRecursively(false);
   }
}
function DisplayBlood(pos : Vector3)
{
    if(m_SmallBlood)
    {
         m_SmallBlood.transform.position = pos;
    //if(m_SmallBlood.active == false)
   // {
         m_SmallBlood.SetActiveRecursively(true);
    }
   // }
}

function Start()
{
	super.Start();
	//---------------------------
	    m_targetBoss=GameObject.Find("Boss_Level_6");
	    m_targetControl=GameObject.Find("wall1");
	    m_SmallBlood=GameObject.Find("bloodSmall");
	   // m_xuewu_1 = GameObject.Find("xuewu1");
	   // m_fireBall = GameObject.Find("bigfireball_bb");
	    xuewuActive();
	    clseFireBall();
	if(m_SmallBlood && m_SmallBlood.active == true)
	{
	   m_SmallBlood.active = false;
	}
	
	InheritState(EFsmState.Idle, Idle_Enter, Idle_Update, Idle_Exit);
	AddState(new State(EFsmState.Walk, Walk_Enter, Walk_Update, Walk_Exit));
	AddState(new State(EFsmState.Run, Run_Enter, Run_Update, Run_Exit));
	AddState(new State(EFsmState.Jump, Jump_Enter, Jump_Update, Jump_Exit));
	AddState(new State(EFsmState.Attack, Attack_Enter, Attack_Update, Attack_Exit));
	AddState(new State(EFsmState.Climb, Climb_Enter, Climb_Update, Climb_Exit));
	AddState(new State(EFsmState.SpecialAttack, SpecialAttack_Enter, SpecialAttack_Update, SpecialAttack_Exit));
	AddState(new State(EFsmState.Hurt, Hurt_Enter, Hurt_Update, Hurt_Exit));
	AddState(new State(EFsmState.Fall, Fall_Enter, Fall_Update, Fall_Exit));
	AddState(new State(EFsmState.FallLand, FallLand_Enter, FallLand_Update, FallLand_Exit));
	AddState(new State(EFsmState.Death, Death_Enter, Death_Update, Death_Exit));
	AddState(new State(EFsmState.FallDown, FallDown_Enter, FallDown_Update, FallDown_Exit));
	AddState(new State(EFsmState.MoveToTarget, MoveToTarget_Enter, MoveToTarget_Update, MoveToTarget_Exit));
	AddState(new State(EFsmState.GetUp, GetUp_Enter, GetUp_Update, GetUp_Exit));
	
	m_defaultBoneStuff = new Dictionary.<String, Quaternion>();
  	var transforms : Transform[] = (m_renderObj.GetComponent(SkinnedMeshRenderer) as SkinnedMeshRenderer).bones;
 	// record default positions & rotations of all child objects, indexed by their name
 	// might try indexing by the actual transform, which ~might~ work better.
  	for ( var t in transforms ) 
  	{
  		//Debug.Log("t.name" + (t as Transform).name);
    	m_defaultBoneStuff.Add( (t as Transform).name,  (t as Transform).localRotation  );
 	}
  
	ChangeStateTo(EFsmState.Idle);

	// Register input
	InputManager.GetInstance().Register(this.gameObject);
}
//------------
function ReturnControlActor()
{
   return m_controrActor;
}
function SetControlActor()
{
   if(m_controrActor)
   {
      m_controrActor = false;
   }
   else
   {
     m_controrActor = true;
   }
}
//------------

function Update () 
{	
	super.Update();
	//------------------------
	  //stop the maincharactor，s animation
	if(FindTheFinalWar.Singleton().control() != null)
	{
	   if(m_targetBoss != null)
	   {
	      if(TheFinalWar.idle)
	      {
	          ChangeStateTo(EFsmState.Idle);
	          Debug.Log("control OK");
	          //m_controrActor = true;
	          SetControlActor();
	          if(m_wind.active == true)
	          {
	              m_wind.SetActiveRecursively(false);
	             // = false;
	          }
	          //this.GetComponent("ControllableActor").active=false;
              //this.GetComponent("AnimationController").active=false;
	      }
	
	      if(TheFinalWar_2.Singleton().charactor_Awake())
	      {
	          ChangeStateTo(EFsmState.Idle);
	         // m_controlJump = true;  
	          //this.GetComponent("ControllableActor").active=true;
              //this.GetComponent("AnimationController").active=true;
             // this.m_propertyData[property].currentLevel = 0;
              Restproperty();
             TheFinalWar_2.Singleton().close_Awak();
	      }
	   }
	}
	if(m_fireBall.active == true)
	{
	   timeControl++;
      if(timeControl >=30)
      {
         clseFireBall();
         timeControl = 0;
      }
    }  
    
	if ( SceneManager.Singleton().IsGamePaused() )
	{
		return ;
	}
		
	// Fall
	//UpdateFall();

	// Stamina
	UpdateStamina();
	
	// Hits Combo
	UpdateHitsCombo();
}

function LateUpdate()
{
	//Debug.Log(" UpdateFall late update");
	UpdateFall();
}
function GetHealthPot() : int 
{
     return m_actorInfo.healthPot;

	//m_actorInfo.hp = GetMaxHp();
}

function OnTriggerAttacked(collision : Collision) : boolean
{
	if ( super.OnTriggerAttacked(collision) )
	{
		m_hitsCombo++;
		m_hitsComboTimer = m_hitsComboTime;
		return true;
	}
	
	return false;
}

function UpdateHitsCombo()
{
	m_hitsComboTimer -= Time.deltaTime;
	
	if (m_hitsComboTimer <= 0)
	{
		m_hitsComboTimer = 0;
		m_hitsCombo = 0;
	}
}

function GetStamina() : int
{
	return m_stamina;
}

function GetMoney() : int 
{
	if (m_actorInfo.money >= 1000000000) // Max money
	{
		m_actorInfo.money = 999999999;
	}
	//Debug.Log("m_actorInfo.money : " + m_actorInfo.money);
	return m_actorInfo.money;
}
function UseHealthPot() : boolean
{
	if (m_actorInfo.healthPot > 0 
	    && (m_hp < GetMaxHp() ||  m_stamina < GetMaxStamina()))
	{
		PlaySound(0, 7, false);
		m_actorInfo.healthPot -= 1;
		m_hp = GetMaxHp();
		m_stamina = GetMaxStamina();
		return true;
	}
	
	return false;
}
//------------
function GetHealthPot_ForItem() 
{
    return m_actorInfo.healthPot;
}
function Add_HealthPot()
{
    m_actorInfo.healthPot++;
}
function BossUpHp()
{
	m_hp = GetMaxHp();
}
//-----------
function IncreaseElement( type : EPickableElementType, count : int)
{
	switch (type)
	{
		case EPickableElementType.Money:
			OnIncreaseMoney(count);
			break;
		case EPickableElementType.HealthPot:
			OnIncreaseHealthPot(count);
			break;
		case EPickableElementType.None :
			break;
		default :
			break;
	}
	
}

function OnIncreaseMoney(count : int)
{	
	m_actorInfo.money += count;
	
	if (m_actorInfo.money >= 1000000000) // Max money
	{
		m_actorInfo.money = 999999999;
	}
	
	//Debug.Log("m_actorInfo.money : " + m_actorInfo.money);
}

function OnIncreaseHealthPot(count : int)
{	
	m_actorInfo.healthPot += count;
	
	if (m_actorInfo.healthPot >= 100)	// Max health pot
	{
		m_actorInfo.healthPot = 99;
	}
	//Debug.Log("m_actorInfo.healthPot : " + m_actorInfo.healthPot);
}

function UpdateStamina()
{
	if ( IsDead() )
	{
		return ;
	}
	
	m_staminaRecoverTimer -= Time.deltaTime;
	
	if ( (m_staminaRecoverTimer <= 0) && (m_stamina < GetMaxStamina()) )
	{
		m_stamina += m_staminaRecoverPoint;
		
		if (m_stamina > GetMaxStamina())
		{
			m_stamina = GetMaxStamina();
		}
		
		m_staminaRecoverTimer = m_staminaRecoverDeltaTime;
	}
}

function UpdateFall()
{
	// Update fall
	if (Time.deltaTime < Time.maximumDeltaTime
	 && !m_onMovingPlatform
	 && !m_physics.IsGrounded()
	 && !IsInState(EFsmState.Jump)
	 && !IsInState(EFsmState.Fall)
	 && !IsInState(EFsmState.Death)
	 && !IsInState(EFsmState.Climb)
	 && !IsInState(EFsmState.Attack)
	 && !IsInState(EFsmState.FallDown) )
	{
		// to make actor walks well on slope platform
		m_checkFallingTimer += Time.deltaTime;
		//Debug.Log("m_checkFallingTimer : " + m_checkFallingTimer);
	}
	else
	{
		m_checkFallingTimer = 0;
	}
	
	if (m_checkFallingTimer >= m_checkFallingDeltaTime)
	{
		m_checkFallingTimer = 0;
		ChangeStateTo(EFsmState.Fall);
		return;
	}
}

function FixedUpdate () 
{
	// Make sure we are absolutely always in the 2D plane.
	transform.position.z = m_fixedZAxisValue;
}

function GetActorInfo() : ActorInfo
{
	return m_actorInfo;
}

function ApplyDamage(damageInfo : DamageInfo) : boolean
{
	////Debug.Log("Actor being attacked");
	
	if (!IsInState(EFsmState.Death) && super.ApplyDamage(damageInfo))
	{
		// Dead
		if (IsDead())
		{
			ChangeStateTo(EFsmState.Death);
		}
		// Stun
		else if (m_stun <= 0)
		{
			ChangeStateTo(EFsmState.FallDown);
		}
		// Normal hurt
		else
		{
			ChangeStateTo(EFsmState.Hurt);
		}
		return true;
	}
	
	return false;
}

function OnFindTarget(startPos : Vector2, endPos : Vector2) : boolean
{
	m_target = null;
	var camera : Camera = SceneManager.Singleton().GetMainCamera();
	
	var startPosition : Vector3 = camera.ScreenToWorldPoint( Vector3(startPos.x, startPos.y, Mathf.Abs(camera.transform.position.z) ));
	var endPosition : Vector3 = camera.ScreenToWorldPoint( Vector3(endPos.x, endPos.y, Mathf.Abs(camera.transform.position.z)) );
	
	////Debug.Log("Main actor position : " + transform.position.ToString());
	
	////Debug.Log("Line start positino : " + startPosition.ToString());
	////Debug.Log("End start position : " + endPosition.ToString());
	
	var hitInfo : RaycastHit;
	
	if (Physics.Linecast(startPosition, endPosition, hitInfo, m_enemyLayer.value))
	{
		if ( m_target == null
			|| (Mathf.Abs(hitInfo.collider.gameObject.transform.position.x - m_physics.GetPosition().x) < (Mathf.Abs(m_target.transform.position.x - m_physics.GetPosition().x) ) )
			)
		{
			m_target = (hitInfo.collider.gameObject.GetComponent(ActorProxy) as ActorProxy).GetActorObject().GetComponent(Actor) as Actor;
		}
	}

	if (m_target != null)
	{
		return true;
	}
	
	return false;
}


function FindTarget(inputInfo : InputInfo) : boolean
{
	if (!InputManager.GetInstance().IsOnIPhone())
	{
	
		return true;
	}
	
	m_target = null;
	
	for (var i : int = 0; i < inputInfo.m_touchCount && i < 1; ++i)
	{
		if (OnFindTarget(inputInfo.m_startPoints[i], inputInfo.m_endPoints[i]))
		{
			return true;
		}
	}
	return false;
}

function UpdateMoveEx()
{
	var inputManager : InputManager = InputManager.GetInstance();
	
	if (inputManager.IsTriggerRunningLeft())
	{
		m_physics.SetDirectionX(-1);
	}
	else if (inputManager.IsTriggerRunningRight())
	{
		m_physics.SetDirectionX(1);
	}
	else if (inputManager.IsTriggerWalkingLeft())
	{
		m_physics.SetDirectionX(-1);
	}
	else if (inputManager.IsTriggerWalkingRight())
	{
		m_physics.SetDirectionX(1);
	}
}


function UpdateMove()
{
	var inputManager : InputManager = InputManager.GetInstance();
	
	if (inputManager.IsTriggerRunningLeft())
	{
		m_physics.SetDirectionX(-1);
		m_physics.SetSpeedX(m_physicsInfo.m_runSpeed);
	}
	else if (inputManager.IsTriggerRunningRight())
	{
		m_physics.SetDirectionX(1);
		m_physics.SetSpeedX(m_physicsInfo.m_runSpeed);
	}
	else if (inputManager.IsTriggerWalkingLeft())
	{
		m_physics.SetDirectionX(-1);
		m_physics.SetSpeedX(m_physicsInfo.m_walkSpeed);
	}
	else if (inputManager.IsTriggerWalkingRight())
	{
		m_physics.SetDirectionX(1);
		m_physics.SetSpeedX(m_physicsInfo.m_walkSpeed);
	}
	else if (inputManager.IsTriggerStopMoving() || inputManager.IsNoInput())
	{
		m_physics.SetSpeedX(0);
	}
}

function UpdateDirection(posIn : Vector2 )
{
	if (!InputManager.GetInstance().IsOnIPhone())
	{
		return;
	}
	
	if (GameOptionsManager.Singleton().IsUseGamePad())
	{
		if (InputManager.GetInstance().IsTriggerRunningRight())
		{
			m_physics.SetDirectionX(1);
		}
		else if (InputManager.GetInstance().IsTriggerRunningLeft())
		{
			m_physics.SetDirectionX(-1);
		}
		return;
	}
	
	var camera : Camera = SceneManager.Singleton().GetMainCamera();
	
	var pos : Vector3 = camera.ScreenToWorldPoint( Vector3(posIn.x, posIn.y, Mathf.Abs(camera.transform.position.z) ));


	if ( pos.x >= m_physics.GetPosition().x)
	{
		m_physics.SetDirectionX(1);
	}
	else
	{
		m_physics.SetDirectionX(-1);
	}
}

function NormalAttack(pos : Vector2)
{
	UpdateDirection(pos);
	
	m_currentSkill = m_currentSkill + 1;
	
	if (m_currentSkill >= 3)
	{
		m_currentSkill = 0;
	}
	
	//Debug.Log("m_currentSkill : " + m_currentSkill);	
	
	// Enough stamina
	if (m_stamina < m_skillList[m_currentSkill].stamina)
	{
		//Debug.Log("Not enough stamina.");
		return ;
	}
		
	if (m_target == null)
	{
		ChangeStateTo(EFsmState.Attack);
	}
	else
	{
		ChangeStateTo(EFsmState.MoveToTarget);
	}
}

function NormalAttack(pos : Vector2, skillType : ESkillType) : boolean
{
	UpdateDirection(pos);
	
	var tempSkill : int = -1;
	
	for (var i = 0; i < m_skillList.length; ++i)
	{
		if (m_skillList[i].type == skillType)
		{
			tempSkill = i;
			break;
		}	
	}
	
	if (tempSkill < 0) // Not valid skill
	{
		return false;
	}

	// Enough stamina
	if (m_stamina < m_skillList[tempSkill].stamina)
	{
		//Debug.Log("Not enough stamina.");
		return false;
	}
	
	m_currentSkill = tempSkill;
	
	if (m_target == null)
	{
		ChangeStateTo(EFsmState.Attack);
	}
	else
	{
		ChangeStateTo(EFsmState.MoveToTarget);
	}
	
	return true;
}

function ApplyUiInput(skillType : ESkillType) : boolean
{
	//Debug.Log("You clicked Skill " + skillType.ToString());
	
	if ( SceneManager.Singleton().IsGamePaused() )
	{
		return false;
	}

	var tempSkill : int = -1;
	
	for (var i = 0; i < m_skillList.length; ++i)
	{
		if (m_skillList[i].type == skillType)
		{
			tempSkill = i;
			break;
		}
	}
	
	if (tempSkill < 0) // Not valid skill
	{
		return false;
	}
		
	if ( IsInState(EFsmState.Idle) 
		|| IsInState(EFsmState.Walk)
		|| IsInState(EFsmState.Run)
		|| IsInState(EFsmState.Hurt) 
		|| IsInState(EFsmState.GetUp) 
		)
	{
		m_currentSkill = tempSkill;
		
		//Debug.Log("You clicked Skill succeed" + skillType.ToString());
		ChangeStateTo(EFsmState.Attack);
		return true;
	}
		
	return false;
}

function CanCombo(inputInfo : InputInfo) : boolean
{
	// Only
	return ((inputInfo.m_inputType & EInputCommand.Attack) != 0);
}

function Combo()
{
	for (var i : int = 0; i < m_inputPool.Count; ++i)
	{
		if ( CanCombo(m_inputPool[i]) )
		{
			FindTarget(m_inputPool[i]);
			NormalAttack(m_inputPool[i].m_endPoints[0]);
			break;
		}
	}
	
	m_inputPool.Clear();
}

function ApplyInput(inputInfo : InputInfo)
{
	// We need a input analysis, to do
	//Debug.Log("kato have a touch input : " + inputInfo.m_inputType.ToString() );
	
	if ( !(IsInState(EFsmState.Idle) 
		|| IsInState(EFsmState.Walk)
		|| IsInState(EFsmState.Run)
		|| IsInState(EFsmState.Hurt) ) )
	{
		if (m_inputPool.Count > 1) // Input Pool max count
		{
			m_inputPool.RemoveAt(0);
		}
		
		m_inputPool.Add(inputInfo);
		//Debug.Log("Actor is busy, can't response the input.");
		return;
	}
	
	m_inputPool.Clear();
	
	m_currentInputInfo = inputInfo;
	
	// Attack input
	if ( (inputInfo.m_inputType & EInputCommand.Attack) != 0
			/*&& FindTarget(inputInfo)*/ ) // Find a target
	{
		FindTarget(inputInfo);
		NormalAttack(inputInfo.m_endPoints[0]);
	}
	else if ( (inputInfo.m_inputType & EInputCommand.JumpAttack) != 0 && !GetPropertyData(EPropertyType.Skill, ESkillType.JumpAttack).IsLocked()) 
	{
		FindTarget(inputInfo);
		NormalAttack(inputInfo.m_endPoints[0], ESkillType.JumpAttack);
	}
	else if ( (inputInfo.m_inputType & EInputCommand.HeavyAttack) != 0 && !GetPropertyData(EPropertyType.Skill, ESkillType.HeavyAttack).IsLocked()  ) 
	{
		FindTarget(inputInfo);
		NormalAttack(inputInfo.m_endPoints[0], ESkillType.HeavyAttack);
	}
	else if ( (inputInfo.m_inputType & EInputCommand.ShoulderAttack) != 0 && !GetPropertyData(EPropertyType.Skill, ESkillType.ShoulderAttack).IsLocked()) 
	{
		FindTarget(inputInfo);
		NormalAttack(inputInfo.m_endPoints[0], ESkillType.ShoulderAttack);
	}
	else if ((inputInfo.m_inputType & EInputCommand.Jump) != 0)
	{
		// If it's idle, we need to force update it once
		// Because maybe in the same time it'll change state to run/walk
		if (IsInState(EFsmState.Idle))
		{
			GetCurrentState().Update();
		}
				
		if( FindTarget(inputInfo)  && InputManager.GetInstance().IsOnIPhone()) // Find a target
		{
			NormalAttack(inputInfo.m_endPoints[0]);
		}	
		else if ( IsInState(EFsmState.Idle) 
			|| IsInState(EFsmState.Walk)
			|| IsInState(EFsmState.Run) )
		{
			ChangeStateTo(EFsmState.Jump);
		}
	}
	
	// Debug Log
	/*
	if (Debug.isDebugBuild)
	{
	if ( (inputInfo.m_inputType & EInputCommand.Jump) != 0 ) 
	{
		////Debug.Log("Start position : " + inputInfo.m_startPoints[0].ToString() + " End position : " + inputInfo.m_endPoints[0].ToString() );
		if (inputInfo.m_touchCount > 1)
		{
			////Debug.Log("Start position : " + inputInfo.m_startPoints[1].ToString() + " End position : " + inputInfo.m_endPoints[1].ToString() );
		}
	}
	}
	*/
}

function IsInUpArea(pos : Vector2) : boolean
{
	//Debug.Log("Mouse screen pos : " + pos);
	
	//Debug.Log("Actor pos : " + transform.position);
	
	var camera : Camera = SceneManager.Singleton().GetMainCamera();
	
	var pointPos : Vector3 = camera.ScreenToWorldPoint(Vector3(pos.x, pos.y, Mathf.Abs(camera.transform.position.z)));
	
	//Debug.Log("Mouse world pos : " + pointPos);
	
	//Debug.Log("m_ladderTriggerPosition : " + m_ladderTriggerPosition);
	
	if ( pointPos.x >= m_ladderTriggerPosition.x - m_climbTriggerOffset.x 
	&& pointPos.x <= m_ladderTriggerPosition.x + m_climbTriggerOffset.x
	&& pointPos.y >= transform.position.y + m_climbTriggerOffset.y )
	{
		return true;
	}
	
	return false;
}

function IsInDownArea(pos : Vector2) : boolean
{	
	var camera : Camera = SceneManager.Singleton().GetMainCamera();
	
	var pointPos : Vector3 = camera.ScreenToWorldPoint(Vector3(pos.x, pos.y, Mathf.Abs(camera.transform.position.z)));
	
	if ( pointPos.x >= m_ladderTriggerPosition.x - m_climbTriggerOffset.x 
	&& pointPos.x <= m_ladderTriggerPosition.x + m_climbTriggerOffset.x
	&& pointPos.y <= transform.position.y )
	{
		return true;
	}
	
	return false;
}

function IsTriggerClimbUp() : boolean
{
    
	if (InputManager.GetInstance().IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return InputManager.GetInstance().IsTriggerClimbUp();
		}
		else
		{
			return (Input.touchCount >= 1 && IsInUpArea(Input.GetTouch(0).position) );
		}
	}
	else
	{
		var map = InputKeyCodeMapHelper.mapKeys;
		return ( Input.GetKey(KeyCode.W)) || (Input.GetMouseButton(0) && IsInUpArea(Input.mousePosition)
		||GetInputJoystickNamePositive(EInputStringName.JoystickY.ToString(),0) || Input.GetKeyUp(map["up"].ToString())); //test for mac
	}
}

function IsTriggerClimbDown() : boolean
{
	if (InputManager.GetInstance().IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return InputManager.GetInstance().IsTriggerClimbDown();
		}
		else
		{
			return (Input.touchCount >= 1 && IsInDownArea(Input.GetTouch(0).position) );
		}
	}
	else
	{
		var map = InputKeyCodeMapHelper.mapKeys;
		return ( Input.GetKey(KeyCode.S)) || (Input.GetMouseButton(0) && IsInDownArea(Input.mousePosition)
		||GetInputJoystickNameNegative(EInputStringName.JoystickY.ToString(),0) || Input.GetKeyUp(map["down"].ToString())); //test for mac
	}
}

private var m_prePosY : float = 0;
private var m_blockDeviation : float = 0.05;
private var m_blockMaxTime : float = 0.1;
private var m_blockTimer : float = 0;
	
function BlockOnYAxis() : boolean
{
	if (Mathf.Abs(m_prePosY - GetPhysics().GetPosition().y) < m_blockDeviation)
	{
		m_blockTimer += Time.deltaTime;
		if (m_blockTimer > m_blockMaxTime)
		{
			m_blockTimer = 0;
			//Debug.Log("Stop on block");
			return true;
		}
	}
	else
	{
		m_prePosY = GetPhysics().GetPosition().y;
		m_blockTimer = 0;
	}
	
	return false;
}

// FSM

//----------------------------------------------------------------------------------------
// Idle
function Idle_Enter()
{
	EnableLastSkillBounding(false);
	m_currentSkill = -1;
	////Debug.Log("Enter Idle state");
	// Play Idle m_animation
	//Debug.Log(AnimationType.Get(EAnimationType.Idle));

	// ---------------------------------------
	// Temp way to solve the animation rotaion bigger than 180 degrees problem. I'll move this when animation changed
	//var transforms : Transform[] = (m_renderObj.GetComponent(SkinnedMeshRenderer) as SkinnedMeshRenderer).bones;
	//SetBindPose(transforms);
	// Temp
	// ---------------------------------------
	
	m_animation.CrossFade (AnimationType.Get(EAnimationType.Idle), 0.2);
	
	m_physics.SetSpeedX(0);
	//m_physics.AddImpulse(Vector3(15, 0 ,0));
}

function Idle_Update()
{	
	var inputManager : InputManager = InputManager.GetInstance();
	
	if ( (m_enterLadderDownTrigger && IsTriggerClimbUp())
		|| (m_enterLadderUpTrigger && IsTriggerClimbDown()) )
	{
		ChangeStateTo(EFsmState.Climb);
	}
	else if (inputManager.IsTriggerRunningLeft())
	{
		m_physics.SetDirectionX(-1);
		ChangeStateTo(EFsmState.Run);
	}
	else if (inputManager.IsTriggerRunningRight())
	{
		m_physics.SetDirectionX(1);
		ChangeStateTo(EFsmState.Run);
	}
	else if (inputManager.IsTriggerWalkingLeft())
	{
		m_physics.SetDirectionX(-1);
		ChangeStateTo(EFsmState.Walk);
	}
	else if (inputManager.IsTriggerWalkingRight())
	{
		m_physics.SetDirectionX(1);
		ChangeStateTo(EFsmState.Walk);
	}
}

function Idle_Exit()
{
	////Debug.Log("Exit Idle state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Hurt
function Hurt_Enter()
{
	EnableCurrentSkillBounding(false);
	
	m_animation.Stop();
	//Debug.Log("Enter Hurt state");
	m_animation[AnimationType.Get(EAnimationType.Hurt)].wrapMode = WrapMode.Once;
	m_animation.Play(AnimationType.Get(EAnimationType.Hurt));
	m_physics.SetSpeedX(0);
	
	PlaySound(0, 5, false);
	// Clear combo
	m_hitsCombo = 0;
}

function Hurt_Update()
{
	if (!m_animation.isPlaying)
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function Hurt_Exit()
{
	EnableCurrentSkillBounding(false);
	m_animation.Stop();
	
	// ---------------------------------------
	// Temp way to solve the animation rotaion bigger than 180 degrees problem. I'll move this when animation changed
	var transforms : Transform[] = (m_renderObj.GetComponent(SkinnedMeshRenderer) as SkinnedMeshRenderer).bones;
	SetBindPose(transforms);
	// Temp
	// ---------------------------------------
	
	//Debug.Log("Exit Hurt state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Walk
function Walk_Enter()
{
	//Debug.Log("Enter Walk state");
	
	m_animation.CrossFade (AnimationType.Get(EAnimationType.Walk), 0.2);
	
	m_physics.SetSpeedX(m_physicsInfo.m_walkSpeed);
	m_physics.SetImpulse(Vector3.zero);
}

function Walk_Update()
{
    if (m_canPushBox)
    {
    	if (!m_animation.IsPlaying(AnimationType.Get(EAnimationType.Push)))
    	{
    		m_animation[AnimationType.Get(EAnimationType.Push)].wrapMode = WrapMode.Loop;
    		//Debug.Log("Push animation length : " + m_animation[AnimationType.Get(EAnimationType.Push)].length);
        	m_animation.CrossFade (AnimationType.Get(EAnimationType.Push), 0.2);
    	}
    }
    else
    {
        m_animation.CrossFade (AnimationType.Get(EAnimationType.Walk), 0.2);
    }

	var inputManager : InputManager = InputManager.GetInstance();
	
	if ( (m_enterLadderDownTrigger && IsTriggerClimbUp())
		|| (m_enterLadderUpTrigger && IsTriggerClimbDown()) )
	{
		ChangeStateTo(EFsmState.Climb);
	}
	else if (inputManager.IsNoInput())
	{
		ChangeStateTo(EFsmState.Idle);
	}
	else if (inputManager.IsTriggerRunningLeft())
	{
		m_physics.SetDirectionX(-1);
		ChangeStateTo(EFsmState.Run);
	}
	else if (inputManager.IsTriggerRunningRight())
	{
		m_physics.SetDirectionX(1);
		ChangeStateTo(EFsmState.Run);
	}
	else if (inputManager.IsTriggerWalkingLeft())
	{
		m_physics.SetDirectionX(-1);
	}
	else if (inputManager.IsTriggerWalkingRight())
	{
		m_physics.SetDirectionX(1);
	}
	else if (inputManager.IsTriggerStopMoving())
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function Walk_Exit()
{
	//Debug.Log("Exit Walk state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Run
function Run_Enter()
{
	//Debug.Log("Enter Run state");
	
	m_animation.CrossFade (AnimationType.Get(EAnimationType.Run), 0.2);
	
	m_physics.SetSpeedX(m_physicsInfo.m_runSpeed);
	m_physics.SetImpulse(Vector3.zero);
}

function Run_Update()
{	
    if (m_canPushBox)
    {
    	if (!m_animation.IsPlaying(AnimationType.Get(EAnimationType.Push)))
    	{
    		m_animation[AnimationType.Get(EAnimationType.Push)].wrapMode = WrapMode.Loop;
        	m_animation.CrossFade (AnimationType.Get(EAnimationType.Push), 0.2);
    	}
    }
    else
    {
        m_animation.CrossFade (AnimationType.Get(EAnimationType.Run), 0.2);
    }
    
    var inputManager : InputManager = InputManager.GetInstance();
    
	if ( (m_enterLadderDownTrigger && IsTriggerClimbUp())
		|| (m_enterLadderUpTrigger && IsTriggerClimbDown()) )
	{
		ChangeStateTo(EFsmState.Climb);
	}
	else if (inputManager.IsNoInput())
	{
		ChangeStateTo(EFsmState.Idle);
	}
	else if (inputManager.IsTriggerWalkingLeft())
	{
		m_physics.SetDirectionX(-1);
		ChangeStateTo(EFsmState.Walk);
	}
	else if (inputManager.IsTriggerWalkingRight())
	{
		m_physics.SetDirectionX(1);
		ChangeStateTo(EFsmState.Walk);
	}
	else if (inputManager.IsTriggerRunningLeft())
	{
		m_physics.SetDirectionX(-1);
	}
	else if (inputManager.IsTriggerRunningRight())
	{
		m_physics.SetDirectionX(1);
	}
	else if (inputManager.IsTriggerStopMoving())
	{
		ChangeStateTo(EFsmState.Idle);
	}
}

function Run_Exit()
{
	//Debug.Log("Exit Run state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Jump
function Jump_Enter()
{
	//Debug.Log("Enter Jump state");

	if (InputManager.GetInstance().IsOnIPhone() && !GameOptionsManager.Singleton().IsUseGamePad() )
	{
		var dir : int = 0;
		
		if (m_currentInputInfo.m_touchCount > 1)
		{
			dir = m_currentInputInfo.m_startPoints[1].x > SceneManager.Singleton().GetMainCamera().WorldToScreenPoint(m_physics.GetPosition()).x ? 1 : -1;
		}
		else
		{
			dir = m_currentInputInfo.m_startPoints[0].x > SceneManager.Singleton().GetMainCamera().WorldToScreenPoint(m_physics.GetPosition()).x ? 1 : -1;
		}
		// Set direction
		m_physics.SetDirectionX(dir);
	}
	
	if (m_currentInputInfo.m_inputType == InputManager.ETouchEnum.TouchSwipeDown)
	{
		m_physics.SetSpeedY(m_physicsInfo.m_walkJumpSpeed);
		m_physics.SetSpeedX(0);
		m_animation.Play(AnimationType.Get(EAnimationType.JumpBegin));
	}
	else if (m_currentInputInfo.m_touchCount == 1)
	{
		m_physics.SetSpeedY(m_physicsInfo.m_runJumpSpeed);
		m_physics.SetSpeedX(m_physicsInfo.m_runSpeed);
		m_animation.Play (AnimationType.Get(EAnimationType.JumpBegin));
	}
	else if (m_currentInputInfo.m_touchCount == 2)
	{
		m_physics.SetSpeedY(m_physicsInfo.m_walkJumpSpeed);
		m_physics.SetSpeedX(m_physicsInfo.m_walkSpeed);
		m_animation.Play (AnimationType.Get(EAnimationType.JumpBegin));
	}
	else if (m_currentInputInfo.m_touchCount == 3) // Y axis only
	{
		m_physics.SetSpeedX(0);
		m_physics.SetSpeedY(m_physicsInfo.m_walkJumpSpeed);
		m_animation.Play (AnimationType.Get(EAnimationType.JumpBegin));
	}
	
	m_animation.PlayQueued (AnimationType.Get(EAnimationType.Jump));
}

function Jump_Update()
{
	UpdateMoveEx();
	if (m_physics.GetSpeedY() <= 0 || BlockOnYAxis())
	{
		ChangeStateTo(EFsmState.Fall);
	}
}

function Jump_Exit()
{
	m_physics.SetSpeedY(0);
	//Debug.Log("Exit Jump state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Fall
function Fall_Enter()
{
	//Debug.Log("Enter Fall state");
	m_animation.CrossFade(AnimationType.Get(EAnimationType.Fall), 0.1);
}

function Fall_Update()
{
	UpdateMoveEx();
	if (m_physics.IsGrounded())
	{
		ChangeStateTo(EFsmState.FallLand);
	}
}

function Fall_Exit()
{
	//Debug.Log("Exit Fall state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Fall
function FallLand_Enter()
{
	//Debug.Log("Enter FallLand state");
	
	m_animation.CrossFade(AnimationType.Get(EAnimationType.JumpLand), 0.1);
	
	m_physics.SetSpeedX(0);
	
	// PlaySound land
	PlaySound(1, 0, false);

}

function FallLand_Update()
{
	if (!m_animation.isPlaying)
	{
		ChangeStateTo(EFsmState.Idle);
	}
	
	var inputManager : InputManager = InputManager.GetInstance();
	
	if ( (m_enterLadderDownTrigger && IsTriggerClimbUp())
		|| (m_enterLadderUpTrigger && IsTriggerClimbDown()) )
	{
		ChangeStateTo(EFsmState.Climb);
	}
	else if (inputManager.IsTriggerRunningLeft())
	{
		m_physics.SetDirectionX(-1);
		ChangeStateTo(EFsmState.Run);
	}
	else if (inputManager.IsTriggerRunningRight())
	{
		m_physics.SetDirectionX(1);
		ChangeStateTo(EFsmState.Run);
	}
	else if (inputManager.IsTriggerWalkingLeft())
	{
		m_physics.SetDirectionX(-1);
		ChangeStateTo(EFsmState.Walk);
	}
	else if (inputManager.IsTriggerWalkingRight())
	{
		m_physics.SetDirectionX(1);
		ChangeStateTo(EFsmState.Walk);
	}

}

function FallLand_Exit()
{
	//Debug.Log("Exit FallLand state");
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// MoveToTarget
function MoveToTarget_Enter()
{
	//Debug.Log("Enter MoveToTarget state");
	m_animation.CrossFade (AnimationType.Get(EAnimationType.Run), 0.2);
	
	m_actorAction = new MoveActorAction(this, m_target, m_physicsInfo.m_runSpeed, m_target.GetActorInfo().scale.x / 2 + m_skillList[m_currentSkill].attackRange, true);
	m_actorAction.Enter();
}

function MoveToTarget_Update()
{
	 if (GameOptionsManager.Singleton().IsUseGamePad())
	 {
	 	ChangeStateTo(EFsmState.Attack);
	 	return;
	 }
	 
	// Update action action
	if (m_actorAction.Update())
	{
		if (m_actorAction.IsFinishedSuccess())
		{
			ChangeStateTo(EFsmState.Attack);
		}
		else
		{
			// Make him also attack
			ChangeStateTo(EFsmState.Attack);
			//ChangeStateTo(EFsmState.Idle);
		}
	}
}

function MoveToTarget_Exit()
{
	////Debug.Log("Exit MoveToTarget state");
	m_actorAction.Exit();
	m_actorAction = null;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Attack
function Attack_Enter()
{
	//Debug.Log("Enter Attack state");
	
	m_attackTimer = 0;
	m_multiAttakTimer = 0;
	
	var skill : Skill = m_skillList[m_currentSkill];
	
	if (skill.beginAnimationType != EAnimationType.Invalid)
	{
		m_animation.Play(AnimationType.Get(skill.beginAnimationType));
		m_animation.PlayQueued( AnimationType.Get(skill.animationType) );
	}
	else
	{
		m_animation.Play(AnimationType.Get(skill.animationType));
	}
	
	if (skill.durationAsAnimation && skill.endAnimationType != EAnimationType.Invalid)
	{
		m_animation.PlayQueued( AnimationType.Get(skill.endAnimationType) );
	}
	
	m_stamina -= skill.stamina;
	
	m_physics.SetSpeedX(0);
	m_physics.AddImpulse( Vector3(skill.selfImpulse.x * m_physics.GetDirectionX(), skill.selfImpulse.y, skill.selfImpulse.z) );
//	if (skill.effectiveObj != null)
//	{
//		skill.effectiveObj.SetActiveRecursively(true);
//	}
	
	m_invincible = skill.invincible;
	
	//m_attackComboTimer = m_attackComboTime;

	GenerateDamageInfo();
	
	m_playedAttackEndAnimation = false;
}

function Attack_Update()
{
	var skill : Skill = m_skillList[m_currentSkill];
	if (skill.durationAsAnimation)
	{
		if (!m_animation.isPlaying)
		{
			ChangeStateTo(EFsmState.Idle);
			return ;
		}
	}
	else
	{
		m_attackTimer += Time.deltaTime;
		
		if (m_attackTimer >= skill.GetDuration())
		{
			if (skill.endAnimationType != EAnimationType.Invalid )
			{
				if (m_playedAttackEndAnimation == false)
				{
					m_playedAttackEndAnimation = true;
					m_animation.Play(AnimationType.Get(skill.endAnimationType));
				}
				else if (!m_animation.isPlaying)
				{
					ChangeStateTo(EFsmState.Idle);
					return ;
				}
			}
			else 
			{
				ChangeStateTo(EFsmState.Idle);
				return ;
			}
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
	
	// Move
	if (m_attackMoveable)
	{
		UpdateMove();
	}
	else
	{
		m_physics.SetSpeedX(0);
	}
}

function Attack_Exit()
{
	//Debug.Log("Exit Attack state");
	m_animation.Stop();
	m_invincible = false;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// Climb
function Climb_Enter()
{
	//Debug.Log("Enter Climb state");
	
	m_physics.SetPositionX(m_ladderTriggerPosition.x);
	m_physics.SetSpeedX(0);
	m_physics.SetImpulse(Vector3.zero);
	m_physics.m_enableGravity = false;
	m_climbDicection = m_physics.GetDirectionX();
	if (m_climbDicection == -1)
	{
		transform.Rotate(Vector3.up * 180);
	}
	
	m_animation.Play(AnimationType.Get(EAnimationType.Climb));
	m_fixedZAxisValue = m_climbOffsetZ;
	
	if (IsTriggerClimbUp())
	{
		m_physics.SetSpeedY(m_climpSpeed);
	}
	else if (IsTriggerClimbDown())
	{
		m_physics.SetSpeedY(-m_climpSpeed);
	}
}

function Climb_Update()
{
	if (IsTriggerClimbUp())
	{
		m_physics.SetSpeedY(m_climpSpeed);
	}
	else if (IsTriggerClimbDown())
	{
		m_physics.SetSpeedY(-m_climpSpeed);
	}


	if (m_physics.GetSpeedY() > 0)
	{
		if (m_enterLadderUpTrigger)
		{
			// Throw to up platform
			m_physics.SetPositionY(m_ladderTriggerPosition.y);
			ChangeStateTo(EFsmState.Idle);
			return;
		}

	}
	else 
	{
		if (m_enterLadderDownTrigger)
		{
			ChangeStateTo(EFsmState.Idle);
			return;
		}
	}
}

function Climb_Exit()
{
	//Debug.Log("Exit Climb state");
	m_physics.SetPositionX(m_ladderTriggerPosition.x);
	m_physics.m_enableGravity = true;
	if (m_climbDicection == -1)
	{
		transform.Rotate(Vector3.up * 180);
	}
	m_fixedZAxisValue = 0;
	
	m_animation.Stop();
	m_physics.SetSpeedY(0);
	
	// ---------------------------------------
	// Temp way to solve the animation rotaion bigger than 180 degrees problem. I'll move this when animation changed
	var transforms : Transform[] = (m_renderObj.GetComponent(SkinnedMeshRenderer) as SkinnedMeshRenderer).bones;
	SetBindPose(transforms);
	// Temp
	// ---------------------------------------
	
	// Stop trigger move once
	//InputManager.GetInstance().ForceStopTirggerMoveOnce();
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// SpecialAttack
function SpecialAttack_Enter()
{
	//Debug.Log("Enter SpecialAttack state");
}

function SpecialAttack_Update()
{
	//Debug.Log("Update SpecialAttack state");
}

function SpecialAttack_Exit()
{
	//Debug.Log("Exit SpecialAttack state");
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// Death
function Death_Enter()
{
	EnableCurrentSkillBounding(false);
	
	//Debug.Log("Enter Death state");
	m_animation[AnimationType.Get(EAnimationType.Death)].speed *= 0.4;
	m_animation.Play(AnimationType.Get(EAnimationType.Death));
	//m_animation.PlayQueued (AnimationType.Get(EAnimationType.Death));
	m_physics.SetSpeedX(0);
	m_physics.SetSpeedY(0);
	m_invincible = true;
	
	m_layDownTimer = m_layDownTime;
	
	if (m_physics != null)
	{
		m_physics.DetectCollisions(false);
	}
	
	PlaySound(0, 6, false);
}

function Death_Update()
{
	//Debug.Log("Update Death state");

	/*if (!m_animation.isPlaying)
	{
		// Flickering
		if (m_renderer != null)
		{
			m_deathFlickeringTimer -= Time.deltaTime;
		
			if (m_deathFlickeringTimer <= 0 )
			{
				m_renderer.enabled = !m_renderer.enabled;
				m_deathFlickeringTimer = m_deathFlickeringDeltaTime;
			}
		}
		
		//m_layDownTimer -= Time.deltaTime;
		
		//if (m_layDownTimer <= 0)
		//{
		//	OnDeath();
		//	ChangeStateTo(EFsmState.Idle);
		//	return;
		//}
	}
	*/

}

function Death_Exit()
{
	//Debug.Log("Exit Death state");
	m_animation[AnimationType.Get(EAnimationType.Death)].speed = 1;
	m_invincible = false;
	m_renderer.enabled = true;
	if (m_physics != null)
	{
		m_physics.DetectCollisions(true);
	}
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//  FallDown
function FallDown_Enter()
{
	EnableLastSkillBounding(false);
	//m_currentSkill = -1;
	//Debug.Log("Enter FallDown state");
	m_invincible = true;
	m_animation.Play(AnimationType.Get(EAnimationType.FallDown));
	m_physics.SetSpeedX(0);
	m_physics.SetSpeedY(0);

	if (m_physics != null)
	{
		m_physics.DetectCollisions(false);
	}
	
	m_layDownTimer = m_layDownTime;
	
	PlaySound(1, 5, false);
	PlaySound(0, 8, false);
}

function FallDown_Update()
{
	if (!m_animation.isPlaying)
	{
		m_layDownTimer -= Time.deltaTime;
		if (m_layDownTimer <= 0 && m_physics.IsGrounded())
		{
			ChangeStateTo(EFsmState.GetUp);
			return;
		}
	}
}

function  FallDown_Exit()
{
	if (m_physics != null)
	{
		m_physics.DetectCollisions(true);
	}
	
	//Debug.Log("Exit FallDown state");
	m_invincible = false;
	m_stun = GetActorInfo().stun;
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//  GetUp
function GetUp_Enter()
{
	//Debug.Log("Enter GetUp state");
	m_invincible = true;
	if (m_physics != null)
	{
		m_physics.DetectCollisions(false);
	}
	m_animation[AnimationType.Get(EAnimationType.FallDown)].speed *= -1;
	m_animation[AnimationType.Get(EAnimationType.FallDown)].time = m_animation[AnimationType.Get(EAnimationType.FallDown)].length;
	m_animation.Play(AnimationType.Get(EAnimationType.FallDown));

}

function GetUp_Update()
{
	if (!m_animation.isPlaying)
	{
		ChangeStateTo(EFsmState.Idle);
		return;
	}
}

function  GetUp_Exit()
{
	//Debug.Log("Exit GetUp state");
	m_invincible = false;
	if (m_physics != null)
	{
		m_physics.DetectCollisions(true);
	}
	m_animation[AnimationType.Get(EAnimationType.FallDown)].time = 0;
	m_animation[AnimationType.Get(EAnimationType.FallDown)].speed = 1.0;
	
	// ---------------------------------------
	// Temp way to solve the animation rotaion bigger than 180 degrees problem. I'll move this when animation changed
	var transforms : Transform[] = (m_renderObj.GetComponent(SkinnedMeshRenderer) as SkinnedMeshRenderer).bones;
	SetBindPose(transforms);
	// Temp
	// ---------------------------------------
}
//----------------------------------------------------------------------------------------

// Script added to a player for it to be able to push rigidbodies around.

// How hard the player can push
var m_pushPower : float = 0.5;
//var m_friction : float = 0.5;
// Which layers the player can push
// This is useful to make unpushable rigidbodies
var m_pushLayers : LayerMask = -1;

//---------------------------------------------------------------------

function OnControllerColliderHit (hit : ControllerColliderHit) 
{	
	//super.OnControllerColliderHit(hit);
	
	// Not pushable gpe
	if (hit.collider.gameObject.tag != "PushableGpe")
	{
		return ;
	}
		
	var body : Rigidbody = hit.collider.attachedRigidbody;
	// no rigidbody
	if (body == null || body.isKinematic)
	{
		return;
	}

	// Only push rigidbodies in the right layers
	var bodyLayerMask : int = 1 << body.gameObject.layer;
	if ((bodyLayerMask & m_pushLayers.value) == 0)
	{
		return;
	}
		
	// We dont want to push objects below us
	if (hit.moveDirection.y < -0.3) 
	{
		return;
	}
	
	// Calculate push direction from move direction, we only push objects to the sides
	// never up and down
	var pushDir : Vector3 = Vector3 (hit.moveDirection.x, 0, 0);
	
	// push with move speed but never more than walkspeed
	var speed : float = m_pushPower * m_physics.GetSpeedX();
	//speed = Mathf.Max(speed - body.mass * m_friction, 0);
	body.velocity = pushDir * speed;
}

function OnTriggerEnter(collision : Collider)
{
	//super.OnTriggerEnter(collision);
	
    var trigger : GameObject = collision.gameObject;
	
	switch(trigger.tag)
	{
	case  "PushableGpe" :
		//Debug.Log("Actor enter a PushableGpe trigger");
        m_canPushBox = true;
        //Debug.Log("CanPushBox : " + m_canPushBox);
		break;
		
	case "LadderUp" :
		//Debug.Log("Actor enter a LadderUp trigger");
		m_enterLadderUpTrigger = true;
		m_ladderTriggerPosition = trigger.transform.position;
		break;
		
	case "LadderDown" :
		//Debug.Log("Actor enter a LadderDown trigger");
		m_enterLadderDownTrigger = true;
		m_ladderTriggerPosition = trigger.transform.position;
		break;
	case "MovingPlatform" :
		m_onMovingPlatform = true;
		break;
		
	default : 
		break;
	}
	
}

function OnTriggerStay(collision : Collider)
{
	//super.OnTriggerStay(collision);
	
    var trigger : GameObject = collision.gameObject;
	
	switch(trigger.tag)
	{
	case  "DeathTrigger" :
		if (IsInState(EFsmState.Fall) || GetPreState().m_name == EFsmState.Fall)
		{
			TrapDamage();
		}
		break;
	case "MovingPlatform" : 
		m_onMovingPlatform = true;
		break;
	default : 
		break;
	}
}

function OnTriggerExit(collision : Collider)
{
	//super.OnTriggerEnter(collision);
	
    var trigger : GameObject = collision.gameObject;
	
	switch(trigger.tag)
	{
	case  "PushableGpe" :
		//Debug.Log("Actor exit a PushableGpe trigger");
        m_canPushBox = false;
        //Debug.Log("CanPushBox : " + m_canPushBox);
		break;
		
	case "LadderUp" :
		//Debug.Log("Actor exit a LadderUp trigger");
		m_enterLadderUpTrigger = false;
		break;
		
	case "LadderDown" :
		//Debug.Log("Actor exit a LadderDown trigger");
		m_enterLadderDownTrigger = false;
		break;
	
	case "MovingPlatform": 
		m_onMovingPlatform = false;
		break;
		
	default : 
		break;
	}
}
static function Singleton() : ControllableActor
{
	return m_instance;
}
function firsteTime()
{
     if(m_firsteTimeForGame)
     {
         m_firsteTimeForGame=false;
     }
}
function GetInputJoystickNameNegative(name:String,buffer:float): boolean
{

if (Input.GetAxis(name) < buffer)
		{	
		
        return true;
      }
else
      return false;
}
function GetInputJoystickNamePositive(name:String,buffer:float): boolean
{

if (Input.GetAxis(name) > buffer)
		{	
		
        return true;
      }
else
      return false;
}
function ReturnFirsteTime()
{
     return m_firsteTimeForGame;
}
}
//}
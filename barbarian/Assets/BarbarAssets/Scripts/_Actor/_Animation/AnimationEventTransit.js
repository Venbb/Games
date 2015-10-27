#pragma strict

var m_actorObj : GameObject = null;

private var m_actor : Actor = null;
private var m_nextAudioSource : int = -1;
private var m_targetSword : GameObject;
function Awake()
{
	if (m_actorObj != null)
	{
		m_actor = m_actorObj.GetComponent(Actor) as Actor;
	}
}

function effect()
{
   ControllableActor.Singleton().fireBall();
}
function closeEffect()
{   
    ControllableActor.Singleton().clseFireBall();
}
function hellFire()
{
//    ControllableActor.Singleton().HellFire();
}
function EnableCurrentSkillBounding(flag : int)
{
	var bFlag : boolean = flag > 0 ? true : false;
	
	if (m_actor != null)
	{
		m_actor.EnableCurrentSkillBounding(bFlag);
	}
}

function EnableCurrentSkillEffect(flag : int)
{
	var bFlag : boolean = flag > 0 ? true : false;
	
	if (m_actor != null)
	{
		m_actor.EnableCurrentSkillEffect(bFlag);
	}
}

function PlaySound(index : int)
{
	if (m_actor != null)
	{
		if (m_nextAudioSource >= 0)
		{
			m_actor.PlaySound(m_nextAudioSource, index, false);
			m_nextAudioSource = -1;
		}
		else
		{
			// Use first audio source to play such sound
			m_actor.PlaySound(0, index, false);
		}
	}
}

function PlayNextSoundWithAudioSource(audioSourceIndex : int)
{
	m_nextAudioSource = audioSourceIndex;
}

function ComboEvent()
{
	if (m_actor != null)
	{
		m_actor.Combo();
	}
}

function SummonAttack()
{
	if (m_actor != null)
	{
		m_actor.SummonAttack();
	}
}

function ShakeCamera(time : float)
{
	if (m_actor != null)
	{
		m_actor.ShakeCamera(time);
	}
}

function EnableAttackMove(flag : int)
{
	var bFlag : boolean = flag > 0 ? true : false;
	
	if (m_actor != null)
	{
		m_actor.EnableAttackMove(bFlag);
	}
}
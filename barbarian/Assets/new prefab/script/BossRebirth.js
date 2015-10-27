#pragma strict
class BossRebirth extends AiActor
{
var m_targetBoss : GameObject;
var m_controlRebirth : boolean = true;
private static var m_instance : BossRebirth = null;

function Awake()
{
  if(m_instance == null)
  {
     m_instance = this;
  }
}

static function Singleton() : BossRebirth
{	
	return m_instance;
}

function Start () {
    m_targetBoss=GameObject.Find("Object003");
    m_targetBoss.active=false;
}

function Update () {
   if(!m_controlRebirth)
   {
     // m_targetBoss.active = true;
   }
}

function Return_ControlRebirth()
{
    return m_controlRebirth;
}

function Close_Rebirth()
{
   if(m_controlRebirth)
   {
      m_controlRebirth = false;
   }
}
function showTheFire()
{
  if(m_targetBoss.active ==false)
  {
      m_targetBoss.active = true;
  }
}
}
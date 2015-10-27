#pragma strict

class FindTheFinalWar extends Actor
{
private var m_targetControl : GameObject;
private var m_first : boolean = true;
static private var m_instance : FindTheFinalWar = null;

function Awake()
{
	if (m_instance == null)
	{
		m_instance = this;
	}
}
static function Singleton() : FindTheFinalWar
{	
	return m_instance;
}
function Start () {

     m_targetControl=GameObject.Find("wall2");
     if(m_first == false)
     {     
     }
}
function control()
{
    return m_targetControl;
}

function Update () {

}
}
#pragma strict

class State
{		
	// public member
	public var m_name : EFsmState = 0;
	
	// private member 
	private var m_enter : Function;
	private var m_update : Function;
	private var m_exit : Function;
	

	public function State(name : EFsmState, enter : Function, update : Function, exit : Function)
	{
		m_name = name;
		SetObjects(enter, update, exit);
	}
	
	public function Enter()
	{
		m_enter();
	}
	public function Update()
	{
		m_update();
	}
	public function Exit()
	{
		m_exit();
	}
	
	public function SetObjects(enter : Function, update : Function, exit : Function)
	{
		m_enter = enter;
		m_update = update;
		m_exit = exit;
	}
};

/*

//----------------------------------------------------------------------------------------
// Climb
function Climb_Enter()
{
	//Debug.Log("Enter Climb state");
}

function Climb_Update()
{
	
}

function Climb_Exit()
{
	//Debug.Log("Exit Climb state");
}
//----------------------------------------------------------------------------------------

*/
#pragma strict

class AiActor extends Actor
{
	private var m_fsm : FsmDiagram = null;
	
	function Awake()
	{	
		super.Awake();
		
		// Fsm init
		m_fsm = new FsmDiagram();
		
		AddState(new State(EFsmState.Idle, Idle_Enter, Idle_Update, Idle_Exit));
		AddState(new State(EFsmState.OtherControlled, OtherControlled_Enter, OtherControlled_Update, OtherControlled_Exit));
		AddState(new State(EFsmState.Stun, Stun_Enter, Stun_Update, Stun_Exit));
	}
	
	function Start()
	{
		super.Start();
	}
	
	function Update()
	{
		super.Update();
		
		if ( SceneManager.Singleton().IsGamePaused() )
		{
			return ;
		}
		
		m_fsm.Update_();
	}
	
	
	function AddState(state : State)
	{
		m_fsm.AddState(state);
	}
	
	function InheritState(name : EFsmState, enter : Function, update : Function, exit : Function)
	{
		var state : State = m_fsm.GetState(name);
		
		if (state == null)
		{
			Debug.LogError("No such state have been added, please check your code in base Start function");
		}
		else
		{
			state.SetObjects(enter, update, exit);
		}
	}
	
	function ChangeStateTo(name : EFsmState)
	{
		m_fsm.ChangeStateTo(name);
	}
	
	function IsInState(name : EFsmState) : boolean
	{
		return m_fsm.IsInState(name);
	}
	
	function GetCurrentState() : State
	{
		return m_fsm.GetCurrentState();
	}
	
	function GetPreState() : State
	{
		return m_fsm.GetPreState();
	}
	
	function OtherControlled()
	{
		ChangeStateTo(EFsmState.OtherControlled);
	}
	
	function BackToIdle()
	{
		ChangeStateTo(EFsmState.Idle);
	}
	
	function IsControlledByOther() : boolean
	{
		return IsInState(EFsmState.OtherControlled);
	}
	
	function Stun()
	{
		ChangeStateTo(EFsmState.Stun);
	}
	
	function SetStunTime(stunTime : float)
	{
		// No implement in ai actor, if you want to have this value, please Inherit this function.
	}
	
	// FSM
	//----------------------------------------------------------------------------------------
	// Idle
	function Idle_Enter()
	{
	}

	function Idle_Update()
	{	
	}

	function Idle_Exit()
	{
	}
	//----------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------
	// OtherControlled
	function OtherControlled_Enter()
	{
		//Debug.Log("OtherControlled_Enter");
	}

	function OtherControlled_Update()
	{	
	}

	function OtherControlled_Exit()
	{
		//Debug.Log("OtherControlled_Exit");
	}
	//----------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------
	// Stun
	function Stun_Enter()
	{
		//Debug.Log("Stun_Enter");
	}

	function Stun_Update()
	{	
	}

	function Stun_Exit()
	{
		//Debug.Log("Stun_Exit");
	}
	//----------------------------------------------------------------------------------------
	
}


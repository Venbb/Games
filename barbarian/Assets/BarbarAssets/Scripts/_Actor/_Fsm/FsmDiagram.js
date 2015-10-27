#pragma strict

class FsmDiagram
{	
	private var m_stateList : Array = new Array();
	private var m_currentState : State = null;
	private var m_preState : State = null;
	
	// Update current state
	public function Update_()
	{
		if (m_currentState != null)
		{
			m_currentState.Update();
		}
	}
	
	public function AddState(state : State)
	{
		// Debug, check duplicate
		if (Debug.isDebugBuild) 
		{
			var tempState : State = GetState(state.m_name);
			
			if (tempState != null)
			{
				//Debug.LogError("Duplicate state name.");
			}
		}
		
		if (state != null)
		{
			m_stateList.Push(state);
		}
	}
	
	public function ChangeStateTo(name : EFsmState)
	{
		var nextState : State = GetState(name);
		
		if (nextState != null)
		{
			if (m_currentState != null)
			{
				m_currentState.Exit();
			}

			m_preState = m_currentState;
			m_currentState = nextState;
			nextState.Enter();
		}
		else
		{
			//Debug.LogError("[state] : " + name.ToString() + " not existed.");
		}
	}
	
	public function IsInState(name : EFsmState)
	{
		if (m_currentState == null 
			|| m_currentState.m_name != name)
		{
			return false;
		}
		
		return true;
	}
	
	public function GetCurrentState()
	{
		return m_currentState;
	}
	
	public function GetPreState()
	{
		return m_preState;
	}
	
	public function GetState(name : EFsmState) : State
	{
		for (var i : int = 0; i < m_stateList.length; ++i)
		{
			if ((m_stateList[i] as State).m_name == name)
			{
				return m_stateList[i] as State;
			}
		}
		
		return null;
	}

}
/*
 *  MoveAction.js
 *	For 2D only
 *
 *  Created by li yun on 7/6/11.
 *  Copyright 2011 Enveesoft. All rights reserved.
 *
 */
 
#pragma strict

class MoveActorAction extends ActorAction
{
	private var m_rayStartPosition : Vector3;
	private var m_rayEndPosition : Vector3;
	private var m_targetPos : Vector3 = Vector3.zero;
	private var m_groundLayer : float = 1 << 13; // Ground
	private var m_rayLength : float = 5; // 1.5 is enough for check the ground
	private var m_speed : float = 0;
	private var m_range : float = 0; 
	private var m_prePosX : float = 0;
	private var m_blockDeviation : float = 0.05;
	private var m_blockMaxTime : float = 0.2;
	private var m_blockTimer : float = 0;
	private var m_target : Actor = null;
	private var m_stopWhenReachEdge : boolean = false;

	function MoveActorAction(owner : Actor, target : Actor, speed : float, range : float, stopWhenReachEdge : boolean)
	{
		super(owner);
		
		m_target = target;
		m_speed = speed;
		m_range = range;
		m_stopWhenReachEdge = stopWhenReachEdge;
	}
	
	function MoveActorAction(owner : Actor, targetPos : Vector3, speed : float, range : float, stopWhenReachEdge : boolean)
	{
		super(owner);
		
		m_target = null;
		m_targetPos = targetPos;
		m_speed = speed;
		m_range = range;
		m_stopWhenReachEdge = stopWhenReachEdge;
	}
	

	function Enter()
	{
		//only need to move on x axis
		m_owner.GetPhysics().SetSpeedX(0);
		m_prePosX = m_owner.GetPhysics().GetPosition().x;
		m_blockTimer = 0;
	}
	
	function Update () 
	{
		if (m_target != null)
		{
			m_targetPos = m_target.GetPhysics().GetPosition();
			
			//Debug.Log(" m_target : " + m_target);
		}
		
		//Debug.Log(" Owner Pos : " + m_owner.GetPhysics().GetPosition() + " Target Pos : " + m_targetPos);
		
		if (Mathf.Abs(m_targetPos.x - m_owner.GetPhysics().GetPosition().x) <= m_range)
		{
			//Debug.Log("Range : " + m_range);
			m_isFinishedSuccess = true;
			return true;
		}
		else
		{
			m_owner.GetPhysics().SetSpeedX(m_speed);
			
			//only need to move on x axis
			var dis = m_targetPos.x - m_owner.GetPhysics().GetPosition().x;
			
			if (dis >= 0) 
			{
				m_owner.GetPhysics().SetDirectionX(1);
			}
			else
			{
				m_owner.GetPhysics().SetDirectionX(-1);
			}
			
			if (m_stopWhenReachEdge && (StepOnEdge() || Blocked()))
			{
				//Debug.Log("Stop on edge#####");
				m_owner.GetPhysics().SetSpeedX(0);
				m_isFinishedSuccess = false;
				return true;
			}
		}
		
		return false;
	}
	
	function Exit()
	{	
		m_owner.GetPhysics().SetSpeedX(0);
	}

	function StepOnEdge() : boolean
	{
		var hitInfo : RaycastHit;
		m_rayStartPosition = m_owner.GetPhysics().GetPosition();
		
		if (m_owner.GetPhysics().GetDirectionX() == 1)
		{
			m_rayStartPosition.x += m_owner.GetActorInfo().scale.x / 2.0;
		}
		else
		{
			m_rayStartPosition.x -= m_owner.GetActorInfo().scale.x / 2.0;
		}
		
		m_rayEndPosition = m_rayStartPosition;
		
		if (m_owner.GetPhysics().m_gravity < 0)
		{
			m_rayEndPosition.y += m_rayLength / 2.0; 
			m_rayStartPosition.y -= m_rayLength / 2.0;
		}
		else
		{
			m_rayEndPosition.y -= m_rayLength / 2.0; 
			m_rayStartPosition.y += m_rayLength / 2.0;
		}
		
		//Debug.Log("owner Pos : " + m_owner.GetPhysics().GetPosition() + " start Pos : " + m_rayStartPosition + " end Pos : " + m_rayEndPosition);
		
		if (Physics.Linecast(m_rayStartPosition, m_rayEndPosition, hitInfo, m_groundLayer) == false)
		{
			//Debug.Log("Stop on edge");
			return true;
		}
		
		return false;
	}
	
	function Blocked() : boolean
	{
		if (Mathf.Abs(m_prePosX - m_owner.GetPhysics().GetPosition().x) < m_blockDeviation)
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
			m_prePosX = m_owner.GetPhysics().GetPosition().x;
			m_blockTimer = 0;
		}
		
		return false;
	}
}
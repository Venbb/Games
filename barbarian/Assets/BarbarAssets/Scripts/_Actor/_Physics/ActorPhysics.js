#pragma strict

	// -Y axis is the gravity direction
	
	// Max Speed
	var m_maxSpeed : Vector3 = Vector3(float.MaxValue, float.MaxValue ,float.MaxValue);
	var m_maxImpulse : Vector3 = Vector3(float.MaxValue, float.MaxValue ,float.MaxValue);

	// The gravity for the character
	var m_gravity : float= 45.0;
	var m_friction : float = 0.5;

	var m_enableGravity : boolean = true;
	var m_enableFriction : boolean = true;
	
	var m_characterContorllerObject : GameObject = null;
	
	private var m_speed : Vector3 = Vector3(0, 0 ,0);
	private var m_acceleration : Vector3 = Vector3(0, 0 ,0);
	var m_moveDirection : Vector3 = Vector3(0, 0, 0);
	private var m_impulse : Vector3 = Vector3(0, 0, 0);
	private var m_movement : Vector3 = Vector3(0, 0, 0);
	
	private var m_controller : CharacterController = null;
	private var m_oriLayer : int = 0;
	
	private static var m_maxDeltaTime : float = 0.04;
	
	function Awake()
	{
		if (m_characterContorllerObject != null && (m_characterContorllerObject.GetComponent(CharacterController) as CharacterController) != null)
		{
			m_controller = m_characterContorllerObject.GetComponent(CharacterController) as CharacterController;
			m_oriLayer = m_characterContorllerObject.layer;
		}
		else
		{
			m_controller = GetComponent(CharacterController) as CharacterController;
			m_oriLayer = this.gameObject.layer;
		}
		
		//m_oriLayer = this.gameObject.layer;
	}
	
	function Update()
	{
		//Debug.Log(" actor physics update");
		if ( SceneManager.Singleton().IsGamePaused() )
		{
			return ;
		}
	
		if (Time.deltaTime > m_maxDeltaTime)
		{
			Update_(m_maxDeltaTime);
		}
		else
		{
			Update_(Time.deltaTime);
		}
	}
	
	function Update_(deltaTime : float)
	{
		m_speed.x += m_acceleration.x * deltaTime;
		m_speed.y += m_acceleration.y * deltaTime; 
		m_speed.z += m_acceleration.z * deltaTime;
		
		m_speed.x = m_speed.x > m_maxSpeed.x ? m_maxSpeed.x : m_speed.x;
		m_speed.y = m_speed.y > m_maxSpeed.y ? m_maxSpeed.y : m_speed.y;
		m_speed.z = m_speed.z > m_maxSpeed.z ? m_maxSpeed.z : m_speed.z;
		
		m_speed.x = m_speed.x < -m_maxSpeed.x ? -m_maxSpeed.x : m_speed.x;
		m_speed.y = m_speed.y < -m_maxSpeed.y ? -m_maxSpeed.y : m_speed.y;
		m_speed.z = m_speed.z < -m_maxSpeed.z ? -m_maxSpeed.z : m_speed.z;
		
		m_movement.x = m_moveDirection.x * m_speed.x * deltaTime + m_impulse.x * deltaTime;
		m_movement.y = m_moveDirection.y * m_speed.y * deltaTime + m_impulse.y * deltaTime;
		m_movement.z = m_moveDirection.z * m_speed.z * deltaTime + m_impulse.z * deltaTime;

		if (m_enableFriction)
		{
			// Not in the air
			if (IsGrounded())
			{
				m_impulse.x = Mathf.Abs(m_impulse.x) <= Mathf.Abs(m_gravity) * m_friction * deltaTime ? 0 : ((m_impulse.x > 0 ? 1 : -1)  * (Mathf.Abs(m_impulse.x) - Mathf.Abs(m_gravity) * m_friction * deltaTime));
				m_impulse.z = Mathf.Abs(m_impulse.z) <= Mathf.Abs(m_gravity) * m_friction * deltaTime ? 0 : ((m_impulse.z > 0 ? 1 : -1)  * (Mathf.Abs(m_impulse.z) - Mathf.Abs(m_gravity) * m_friction * deltaTime));
			}
			
			m_impulse.y = Mathf.Abs(m_impulse.y) <= Mathf.Abs(m_gravity) * m_friction * deltaTime ? 0 : ((m_impulse.y > 0 ? 1 : -1)  * (Mathf.Abs(m_impulse.y) - Mathf.Abs(m_gravity) * m_friction * deltaTime));
			
			m_impulse.x = m_impulse.x > m_maxImpulse.x ? m_maxImpulse.x : m_impulse.x;
			m_impulse.y = m_impulse.y > m_maxImpulse.y ? m_maxImpulse.y : m_impulse.y;
			m_impulse.z = m_impulse.z > m_maxImpulse.z ? m_maxImpulse.z : m_impulse.z;
		
			m_impulse.x = m_impulse.x < -m_maxImpulse.x ? -m_maxImpulse.x : m_impulse.x;
			m_impulse.y = m_impulse.y < -m_maxImpulse.y ? -m_maxImpulse.y : m_impulse.y;
			m_impulse.z = m_impulse.z < -m_maxImpulse.z ? -m_maxImpulse.z : m_impulse.z;
		}
		
		//Debug.Log("impulse.x " + m_impulse.x + "Mathf.Abs(m_gravity) * m_friction * deltaTime : " + Mathf.Abs(m_gravity) * m_friction * deltaTime );
		
		// Gravity
		if(m_enableGravity)
		{
			m_speed.y -= m_gravity * deltaTime;
			
			if (m_gravity > 0)
			{
				m_impulse.y = (m_impulse.y > 0) ? Mathf.Max(0, m_impulse.y - m_gravity * deltaTime) : m_impulse.y;
			}
			else
			{
				m_impulse.y = (m_impulse.y < 0) ? Mathf.Min(0, m_impulse.y - m_gravity * deltaTime) : m_impulse.y;
			}
		}
		
		// If on ground, set the y axis speed to be 0
		if (m_enableGravity && IsGrounded() && m_speed.y < 0)
		{
			m_speed.y = -5f;
		}


		//Debug.Log(m_movement);
 		m_controller.Move(m_movement);
	}
	
	function SetPosition(pos : Vector3)
	{
		m_controller.transform.position = pos;
	}
	
	function GetPosition() : Vector3
	{
		return m_controller.transform.position;
	}
	
	function SetPositionX(x : float)
	{
		m_controller.transform.position.x = x;
	}
	
	function SetPositionY(y : float)
	{
		m_controller.transform.position.y =y;
	}
	
	function SetPositionZ(z : float)
	{
		m_controller.transform.position.z = z;
	}
	
	function Translate(offset : Vector3)
	{
		offset.x *= m_moveDirection.x;
		offset.y *= m_moveDirection.y;
		offset.z *= m_moveDirection.z;
		
		m_controller.Move(offset);
	}
	
	function AddImpulse(impulse : Vector3)
	{
		m_impulse += impulse;
	}
	
	function SetImpulse(impulse : Vector3)
	{
		m_impulse = impulse;
	}
	
	function GetImpulse() : Vector3
	{
		return m_impulse;
	}
	
	function AddImpulseX(impulseX : float)
	{
		m_impulse.x += impulseX;
	}
	
	function GetImpulseX() : float
	{
		return m_impulse.x;
	}
	
	function AddImpulseY(impulseY : float)
	{
		m_impulse.y += impulseY;
	}
	
	function GetImpulseY() : float
	{
		return m_impulse.y;
	}
	
	function AddImpulseZ(impulseZ : float)
	{
		m_impulse.z += impulseZ;
	}
	
	function GetImpulseZ() : float
	{
		return m_impulse.z;
	}
	
	function IsGrounded()
	{
		return m_controller.isGrounded;
	}
	
	function SetSpeed(speed : Vector3)
	{
		m_speed = speed;
	}
	
	function GetSpeed() : Vector3
	{
		return m_speed;
	}
	
	function SetSpeedX(speedX : float)
	{
		m_speed.x = speedX;
	}
	
	function GetSpeedX() : float
	{
		return m_speed.x;
	}
	
	function SetSpeedY(speedY : float)
	{
		m_speed.y = speedY;
	}
	
	function GetSpeedY() : float
	{
		return m_speed.y;
	}
	
	function SetSpeedZ(speedZ : float)
	{
		m_speed.z = speedZ;
	}
	
	function GetSpeedZ() : float
	{
		return m_speed.z;
	}

	function SetDirection( direction : Vector3 )
	{
		//Debug.Log("Set direction xb : " + direction.x);
		m_moveDirection = direction;
	}
	
	function GetDirection ()  : Vector3
	{
		return m_moveDirection;
	}
	
	function SetDirectionX( directionX : float )
	{
		// turn
		if (m_moveDirection.x != directionX)
		{
			if (m_controller != null)
			{
				m_controller.transform.Rotate(0, 180, 0);
			}
			else
			{
				this.transform.Rotate(0, 180, 0);
			}
		}
		
		//Debug.Log("Set direction xa : " + directionX);
		m_moveDirection.x = directionX;
	}
	
	function GetDirectionX()  : float
	{
		return m_moveDirection.x;
	}


	function SetDirectionY( directionY : float )
	{
		m_moveDirection.y = directionY;
	}
	
	function GetDirectionY()  : float
	{
		return m_moveDirection.y;
	}
	
	function SetDirectionZ( directionZ : float )
	{
		m_moveDirection.z = directionZ;
	}
	
	function GetDirectionZ()  : float
	{
		return m_moveDirection.z;
	}

	function Rotate(axis : Vector3)
	{
		m_controller.transform.Rotate(axis);
	}
	
	function RotateX(axis : float)
	{
		m_controller.transform.Rotate(Vector3(axis, 0, 0));
	}
	
	
	function RotateY(axis : float)
	{
		m_controller.transform.Rotate(Vector3(0, axis, 0));
	}
	
	function RotateZ(axis : float)
	{
		m_controller.transform.Rotate(Vector3(0, 0, axis));
	}
	
	function SetGravity(gravity : float)
	{
		m_gravity = gravity;
	}
	
	function GetGravity() : float
	{
		return m_gravity;
	}
	
	function IsOnLeftSide(obj : GameObject)
	{
		return obj.transform.position.x < m_controller.transform.position.x;
	}
	
	function DetectCollisions(flag : boolean)
	{
		if (m_characterContorllerObject != null && (m_characterContorllerObject.GetComponent(CharacterController) as CharacterController) != null)
		{
			// 16 : with ground only
			m_characterContorllerObject.layer = flag ? m_oriLayer : 16;
		}
		else
		{
			// 16 : with ground only
			this.gameObject.layer = flag ? m_oriLayer : 16;
		}
	}
	
	function GetMovement() : Vector3
	{
		return m_movement;
	}
	
	function IsMoving() : boolean
	{	
		// Is zero?
		return (Mathf.Abs(m_movement.x) > 0.001 || Mathf.Abs(m_movement.z) > 0.001) ;
	}
	
	function Reset()
	{
		m_moveDirection = Vector3.zero;
		m_impulse = Vector3.zero;
	}
	
// Require a character controller to be attached to the same game object
//@script RequireComponent(CharacterController);


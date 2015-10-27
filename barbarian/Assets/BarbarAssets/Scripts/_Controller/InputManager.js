#pragma strict
//import System.Collections.Generic;
class InputManager extends InputBase
{
public var m_swipeDragMin : int = 150;
public var m_doubleSwipeDragMax : int = 100;
public var m_dragLimitMaxHorizontal : int = 50;
public var m_dragLimitMaxVertical : int = 50;
public var m_minPinch : int = 8;
//public var m_swipeStartEndMin_ScreenWidthRate : float = 0.1;
public var m_swipeStartEndMin : float = 100;
public var m_keyPointDistanceMin : float = 6.00;
public var m_keyPointLimitMin : int = 2;
private var m_keyPointLimitMax : int = 15;
public var m_keyPointSlopeErrorMax : float = 0.35;

public var m_touchInputCheckMovingTime : float = 0.3;

public var m_touchInputUiDelayTime : float = 0.1;

private var m_touchInputUiDelayTimer : float = 0;
private var m_touchInputCheckMovingTimer : float = 0;

// Input manager will trigger the register when get a valid input
private var m_keyPointSlopeArray : Array;

private var m_registers : Array;
private var m_startPoints : Vector2[];
private var m_endPoints : Vector2[];

private var m_maxInputCount : int = 2;
/*
private var m_leftArea : Vector2;
private var m_rightArea : Vector2;
private var m_upArea : Vector2;
private var m_downArea : Vector2;
*/

private var m_currentPoint1 : Vector2;
private var m_currentPoint2 : Vector2;

private var m_dx1 : float;
private var m_dy1 : float;
private var m_dx2 : float;
private var m_dy2 : float;

private var m_touchType : int;
private var m_pointCount : int;

private var m_multiTouch : boolean;
private var m_finished : boolean;

private var m_started : boolean;

private var m_canTriggerMove : boolean;
private var m_forceStopTriggerMove : boolean;

private var m_mainActor : Actor = null;

private static var m_instance : InputManager = null;


// JoyStick
public var m_joyStickObj : GameObject = null;
public var m_attackButtonObj : GameObject = null;
public var m_jumpButtonObj : GameObject = null;

private var m_joyStick : Joystick = null;
private var m_attackButton : Joystick = null;
private var m_jumpButton : Joystick = null;
private var m_asdasdasda:int;
//@System.NonSerialized
public enum ETouchEnum 
{
	TouchUnknown = 0,
	TouchTap = 1, // 1
	TouchDoubleTap = 2, // 2  / 1 << 1
	TouchDrag = 4, // 4
	TouchMultitouchTap = 8, //8
	TouchMultitouchDoubleTap = 16, // 16
	TouchSwipeLeft = 32, // 32
	TouchSwipeRight = 64, // 64
	TouchSwipeUp = 128, // 128
	TouchSwipeDown = 256, // 256
	TouchPinchIn = 512, // 512
	TouchPinchOut = 1024, // 1024
	TouchDoubleSwipeLeft = 2048, // 2048
	TouchDoubleSwipeRight = 4096, // 4096
	TouchDoubleSwipeUp = 8192, // 8192
	TouchDoubleSwipeDown = 16384, // 1
	TouchSwipeOblique = 32768, //3
	TouchDoubleSwipeOblique = 65536,  // 65536
	TouchStationary = 131072, //
	TouchMultiStationary = 262144,
		
	ForceTo32Bytes = 0x7FFFFFFF
};

static function GetInstance() : InputManager
{
	//if (m_instance == null)
	//{
		//Debug.LogError("Singleton Input Manager is null.");
	//}
	
	return m_instance;
}

function Awake()
{
	if (m_instance == null)
	{
		m_registers = new Array();
		m_instance = this;
		
		m_startPoints = new Vector2[m_maxInputCount];
		m_endPoints = new Vector2[m_maxInputCount];
	}
	else
	{
		Debug.LogError("Singleton InputManager should not be created more than once.");
	}
}

function Register(gameObject : GameObject)
{
	var tempActor : ControllableActor = gameObject.GetComponent(ControllableActor) as ControllableActor; 
	
	if (tempActor != null)
	{
		m_registers.Push(tempActor);
	}
}

function OnDestroy()
{
	m_instance = null;
}

function Start()
{
	/*
	var screenWidth : float = SceneManager.GetInstance().GetScreenWidth();
	var screenHeight : float = SceneManager.GetInstance().GetScreenHeight();
	
	m_leftArea = Vector2(0,  screenWidth / 2);
	m_rightArea = Vector2(screenWidth / 2, screenWidth);
	m_downArea = Vector2(0, screenHeight / 2);
	m_upArea = Vector2(screenHeight / 2, screenHeight);
	*/
	
	//m_swipeStartEndMin = screenWidth * m_swipeStartEndMin_ScreenWidthRate;
	
	
	
	m_mainActor = SceneManager.Singleton().GetMainActor();
	
	m_joyStick = m_joyStickObj.GetComponent(Joystick);
 	m_attackButton = m_attackButtonObj.GetComponent(Joystick);
 	m_jumpButton = m_jumpButtonObj.GetComponent(Joystick);

	if (!GameOptionsManager.Singleton().IsUseGamePad())
	{
		m_joyStickObj.active = false;
		m_attackButtonObj.active = false;
		m_jumpButtonObj.active = false;
	}
	
	Init();
}

function Init()
{
	m_multiTouch = false;
	m_finished = false;
	m_touchType = 0;
	m_pointCount = 0;
	m_started = false;
	//m_keyPointSlopeArray = null;
	m_canTriggerMove = true;
	m_forceStopTriggerMove = false;
}

function IsMultipleTouchEnabled()
{
	return true;
}

// Hack it here
function IsOnIPhone()
{
	return SceneManager.Singleton().IsPlatform_Phone();
}

function TouchesBegan()
{
	//Debug.Log("TouchesBegan");
	
	m_touchType = ETouchEnum.TouchUnknown;
	m_finished = false;
	m_multiTouch = (Input.touchCount > 1) ? true : false;
		
	//m_keyPointSlopeArray = new Array();
	
	for (var i : int = 0; i < Input.touchCount && i < m_maxInputCount; ++i)
	{
		m_startPoints[i] = Input.GetTouch(i).position;
		m_endPoints[i] = m_startPoints[i];
		//m_keyPointSlopeArray.Push(new Array());
	}
	
	m_pointCount = 1;
}


function TouchesMoved()
{
	////Debug.Log("Touches move");
	m_pointCount++;
	
	// Handle multitouch, but only first two touches
	if (Input.touchCount > 1)
	{
		////Debug.Log("currentPoint1 : " + Input.GetTouch(0).position);
		////Debug.Log("currentPoint2 : " + Input.GetTouch(1).position);
		
		// get touches
		m_currentPoint1 = Input.GetTouch(0).position;
		m_currentPoint2 = Input.GetTouch(1).position;

		if (m_multiTouch == false)
		{
			m_multiTouch = true;
			m_startPoints[1] = m_currentPoint2;
			m_endPoints[1] = m_currentPoint2;
		}
	
		// Check trigger moving
		/*
		m_dx1 = m_endPoints[0].x - m_currentPoint1.x;
		m_dy1 = m_endPoints[0].y - m_currentPoint1.y;
		m_dx2 = m_endPoints[1].x - m_currentPoint2.x;
		m_dy2 = m_endPoints[1].y - m_currentPoint2.y;
		
		if (m_canTriggerMove 
			&& (Mathf.Abs(m_dx1) > 20 
				|| Mathf.Abs(m_dx2) > 20 
				|| Mathf.Abs(m_dy1) > 20 
				|| Mathf.Abs(m_dy2) > 20 ) )
		{
			m_canTriggerMove = false;
			m_touchInputCheckMovingTimer = m_touchInputCheckMovingTime;
		}
		else if (!m_canTriggerMove 
			&& (Mathf.Abs(m_dx1) <= m_swipeDragMin 
				&& Mathf.Abs(m_dx2) <= m_swipeDragMin 
				&& Mathf.Abs(m_dy1) <= m_swipeDragMin 
				&& Mathf.Abs(m_dy2) <= m_swipeDragMin ) )
		{
			m_touchInputCheckMovingTimer -= Time.deltaTime;
			
			if (m_touchInputCheckMovingTimer <= 0)
			{
				m_canTriggerMove = true;
			}
		}
		*/
		
		m_dx1 = m_startPoints[0].x - m_currentPoint1.x;
		m_dy1 = m_startPoints[0].y - m_currentPoint1.y;
		m_dx2 = m_startPoints[1].x - m_currentPoint2.x;
		m_dy2 = m_startPoints[1].y - m_currentPoint2.y;
		
		m_endPoints[0] = m_currentPoint1;
		m_endPoints[1] = m_currentPoint2;
		
		////Debug.Log(" distance x1 : " + dx1.ToString() + "  y1 : " + dy1.ToString());
		////Debug.Log(" distance x2 : " + dx2.ToString() + "  y2 : " + dy2.ToString());
		
		m_finished = true;

		// I know I need to refactoring this code someday.
		if ( (m_dx1 > m_swipeDragMin) && (Mathf.Abs(m_dy1) < m_doubleSwipeDragMax)
			&&	(m_dx2 > m_swipeDragMin) && (Mathf.Abs(m_dy2) < m_doubleSwipeDragMax) ) // hswipe left
		{
			m_touchType = ETouchEnum.TouchDoubleSwipeLeft;
			
			//Debug.Log(" TouchDoubleSwipeLeft ");
		}
		else if ( (-m_dx1 > m_swipeDragMin) && (Mathf.Abs(m_dy1) < m_doubleSwipeDragMax) 
			&& (-m_dx2 > m_swipeDragMin) && (Mathf.Abs(m_dy2) < m_doubleSwipeDragMax) ) // hswipe right
		{
			m_touchType = ETouchEnum.TouchDoubleSwipeRight;
			
			//Debug.Log(" TouchDoubleSwipeRight ");
		}
		else if ( (m_dy1 > m_swipeDragMin) && (Mathf.Abs(m_dx1) < m_doubleSwipeDragMax) 
			&& (m_dy2 > m_swipeDragMin) && (Mathf.Abs(m_dx2) < m_doubleSwipeDragMax) ) // vswipe up
		{
			m_touchType = ETouchEnum.TouchDoubleSwipeUp;
			
			//Debug.Log(" TouchDoubleSwipeUp ");
		}
		else if ( (-m_dy1 > m_swipeDragMin) && (Mathf.Abs(m_dx1) < m_doubleSwipeDragMax) 
			&&  (-m_dy2 > m_swipeDragMin) && (Mathf.Abs(m_dx2) < m_doubleSwipeDragMax) ) // vswipe down
		{
			m_touchType = ETouchEnum.TouchDoubleSwipeDown;
			
			//Debug.Log(" TouchDoubleSwipeDown ");
		}
		//else if ( CheckObliqueLine(m_keyPointSlopeArray[0]) )
		//{
			////Debug.Log(" TouchSwipeOblique ");
			//m_touchType = m_touchEnum["TouchSwipeOblique"];
		//}
		else
		{
			m_finished = false;
		}

	}
	else if (Input.touchCount == 1)
	{
		// Check single touch for swipe
		m_currentPoint1 = Input.GetTouch(0).position;

		m_multiTouch = false;
		
		// Check trigger moving
		/*
		m_dx1 = m_endPoints[0].x - m_currentPoint1.x;
		m_dy1 = m_endPoints[0].y - m_currentPoint1.y;

		if (m_canTriggerMove 
			&& (Mathf.Abs(m_dx1) > 20 
				|| Mathf.Abs(m_dy1) > 20) )
		{
			m_touchInputCheckMovingTimer = m_touchInputCheckMovingTime;
			m_canTriggerMove = false;
		}
		else if (!m_canTriggerMove 
				&& (Mathf.Abs(m_dx1) <= m_swipeDragMin 
			   		&& Mathf.Abs(m_dy1) <= m_swipeDragMin) )
		{
			m_touchInputCheckMovingTimer -= Time.deltaTime;
			
			if (m_touchInputCheckMovingTimer <= 0)
			{
				m_canTriggerMove = true;
			}
		}
		*/
		
	    m_dx1 = m_startPoints[0].x - m_currentPoint1.x;
		m_dy1  = m_startPoints[0].y - m_currentPoint1.y;;
		////Debug.Log(" distance x : " + dx.ToString() + "  y : " + dy.ToString());
		
		m_finished = true;
		
		
		//if ( (m_keyPointSlopeArray[0] as Array).length < m_keyPointLimitMax
		//	&&  Vector2.Distance(m_currentPoint1, m_endPoints[0]) >= m_keyPointDistanceMin)
		//{
	 	//	var slope : float = Slope(m_currentPoint1, m_endPoints[0]);
		//	(m_keyPointSlopeArray[0] as Array).Push(slope);
				
			////Debug.Log("CurrentPoint : " + currentPoint.ToString() + " lastPoint : " + m_endPoints[0].ToString());
			////Debug.Log("Add a slope" + " : " + slope.ToString());
					
			m_endPoints[0] = m_currentPoint1;
				
		//}

		if ( (m_dx1 > m_swipeDragMin) && (Mathf.Abs(m_dy1) < m_dragLimitMaxVertical) ) // hswipe left
		{
			m_touchType = ETouchEnum.TouchSwipeLeft;
			
			//Debug.Log(" TouchSwipeLeft ");
		}
		else if ( (-m_dx1 > m_swipeDragMin) && (Mathf.Abs(m_dy1) < m_dragLimitMaxVertical) ) // hswipe right
		{
			m_touchType = ETouchEnum.TouchSwipeRight;
			
			//Debug.Log(" TouchSwipeRight ");
		}
		else if ( (m_dy1 > m_swipeDragMin) && (Mathf.Abs(m_dx1) < m_dragLimitMaxHorizontal) ) // vswipe up
		{
			m_touchType = ETouchEnum.TouchSwipeUp;
			
			//Debug.Log(" TouchSwipeUp ");
		}
		else if ( (-m_dy1 > m_swipeDragMin) && (Mathf.Abs(m_dx1) < m_dragLimitMaxHorizontal) ) // vswipe down
		{
			m_touchType = ETouchEnum.TouchSwipeDown;
			
			//Debug.Log(" TouchSwipeDown ");
		}
		else if ( /*CheckObliqueLine(m_keyPointSlopeArray[0] as Array) &&*/ Vector2.Distance(m_startPoints[0], m_endPoints[0]) >= m_swipeStartEndMin)
		{
			//Debug.Log(" TouchSwipeOblique ");
			//Debug.Log("m_startPoints[0] : " + m_startPoints[0] + " m_endPoints[0] : " + m_endPoints[0]);
			//Debug.Log(" Vector2.Distance(m_startPoints[0], m_endPoints[0]) :" + Vector2.Distance(m_startPoints[0], m_endPoints[0]));
			m_touchType = ETouchEnum.TouchSwipeOblique;
		}
		else
		{
			m_finished = false;
		}
	}
}

function TouchesEnded()
{
	//Debug.Log("Touches end");
	// was not detected as a swipe
	if (!m_finished && !m_multiTouch)
	{
		m_touchType = ETouchEnum.TouchUnknown;
		for (var i : int = 0; i < Input.touchCount && i < m_maxInputCount; ++i)
		{
			if (Input.GetTouch(i).tapCount == 2)
			{
				m_touchType = ETouchEnum.TouchDoubleTap;
				break;
			}
		}
			
		//if (m_touchType == ETouchEnum.TouchUnknown)
		//{
			// check oblique
			//if (m_pointCount > 2 && Vector2.Distance(m_startPoints[0], m_endPoints[0]) >= m_swipeStartEndMin)
			//{
				//m_touchType = ETouchEnum.TouchSwipeOblique;
			//}
		//}
	}
		
	// Is this properly a tap/double tap?
	if (m_multiTouch || (Input.touchCount > 1))		
	{
		//m_touchType = m_touchEnum["TouchUnknown"];
		for (var j : int = 0; j < Input.touchCount && j < m_maxInputCount; ++j)
		{
			if (Input.GetTouch(j).tapCount == 2)
			{
				m_touchType = ETouchEnum.TouchMultitouchDoubleTap;
				break;
			}
		}
			
		if (m_touchType == ETouchEnum.TouchUnknown)
		{
			// check oblique
			if (m_pointCount > 1 
			&& Vector2.Distance(m_startPoints[0], m_endPoints[0]) >= m_swipeStartEndMin / 2
			&& Vector2.Distance(m_startPoints[1], m_endPoints[1]) >= m_swipeStartEndMin / 2) // to do , check slope
			{
				m_touchType = ETouchEnum.TouchDoubleSwipeOblique;
			}
		}

	}
	
	//Debug.Log("Touch type : " + m_touchType.ToString());
	
	// Translate the input information to register
	OnTouchesEnded();
	
	ClearInput();
}


function OnTouchesEnded()
{
	// Unknown type
	if (m_touchType == ETouchEnum.TouchUnknown)
	{
		return ;
	}
	
	// Generate input info
	var inputInfo : InputInfo = new InputInfo();
	inputInfo.m_inputType = m_touchType;
	inputInfo.m_touchCount = m_multiTouch ? m_maxInputCount : 1;
	inputInfo.m_startPoints = new Vector2[inputInfo.m_touchCount];
	inputInfo.m_endPoints = new Vector2[inputInfo.m_touchCount];
	
	var i : int = 0;
	
	for (i = 0; i < inputInfo.m_touchCount && i < m_maxInputCount; ++i)
	{
		inputInfo.m_startPoints[i] = m_startPoints[i];
		inputInfo.m_endPoints[i] = m_endPoints[i];
	}
	
	// Not trigger
	//if (m_touchType == ETouchEnum.TouchSwipeOblique)
	//{
	//	var dy : float = m_endPoints[0].y - m_startPoints[0].y;
		
		//if ( dy < 0 )
		//{
		//	return ;
		//}
	//}
		
	//if (m_touchType == ETouchEnum.TouchDoubleSwipeOblique)
	//{			
		//dy = m_endPoints[1].y - m_startPoints[1].y;
		
		//if ( dy < 0 )
		//{
		//	return ;
		//}
	//}
	
	// Seed input message
	for (i = 0; i < m_registers.length; ++i)
	{
		(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
	}
}

function Slope(pointA : Vector2, pointB : Vector2) : float
{
	var dx : float = pointA.x - pointB.x;
	var dy : float = pointA.y - pointB.y;
	
	var distance : float = Mathf.Sqrt( dx * dx + dy * dy);
	return (dy / distance);
}

function CheckObliqueLine(keyPointSlopeArray : Array) : boolean
{
	////Debug.Log("keyPointSlopeArray.length :" + keyPointSlopeArray.length.ToString());
	
	if (keyPointSlopeArray.length >= m_keyPointLimitMin && keyPointSlopeArray.length < m_keyPointLimitMax)
	{
		var string : String = "";
		for (var i : int = 0; i < keyPointSlopeArray.length; ++i)
		{
			string += "Slope " + i.ToString() + " : " + keyPointSlopeArray[i].ToString() + " ** ";
		}
		
		//Debug.Log(string);
		
		var lastSlope : float = float.Parse(keyPointSlopeArray[0].ToString());
		
		for (var j : int = 1; j  < keyPointSlopeArray.length; ++j)
		{
			if (Mathf.Abs(lastSlope - float.Parse(keyPointSlopeArray[j].ToString()) ) > m_keyPointSlopeErrorMax)
			{
				m_keyPointSlopeArray[0] = new Array();
				m_startPoints[0] = m_endPoints[0];
				return false;
			}
			
			lastSlope = float.Parse(keyPointSlopeArray[0].ToString());
		}
		
		return true;
	}
	
	return false;
}

function IsNoInput() : boolean
{
	if (IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return m_joyStick.m_noInput;
		}
		else
		{
			
			return Input.touchCount == 0;
		}
	}
	else
	{
	// 
		return Mathf.Abs(Input.GetAxis(EInputStringName.JoystickX.ToString()))==0&&!Input.anyKey
		&&Mathf.Abs(Input.GetAxis(EInputStringName.JoystickY.ToString()))==0; //test for mac
	}
}

function InLeftArea(pos : Vector2) : boolean
{
	return pos.x <= SceneManager.Singleton().GetMainCamera().WorldToScreenPoint( m_mainActor.GetPhysics().GetPosition() - Vector3( (m_mainActor.GetActorInfo().scale.x / 2), 0, 0) ).x;
}

function InRightArea(pos : Vector2) : boolean
{
	return pos.x >= SceneManager.Singleton().GetMainCamera().WorldToScreenPoint( m_mainActor.GetPhysics().GetPosition() + Vector3( (m_mainActor.GetActorInfo().scale.x / 2), 0, 0) ).x ;
}

/*
function InUpArea(pos : Vector2) : boolean
{
	return (pos.y >= m_upArea.x && pos.y < m_upArea.y);
}

function InDownArea(pos : Vector2) : boolean
{
	return (pos.y >= m_downArea.x && pos.y < m_downArea.y);
}
*/

function IsTriggerJump() : boolean
{
	var map = InputKeyCodeMapHelper.mapKeys;
	return Input.GetKeyUp(map["B"].ToString());
}
 
function IsTriggerRunningLeft() : boolean
{
	if (IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return  m_canTriggerMove && (!m_forceStopTriggerMove) ? m_joyStick.m_left : false;
		}
		else
		{
			return m_canTriggerMove && (!m_forceStopTriggerMove) ? (GetInputCount() == 1 && InLeftArea(Input.GetTouch(0).position) && Input.GetTouch(0).phase == TouchPhase.Stationary) : false;
		}
	}
	else 
	{
		var map = InputKeyCodeMapHelper.mapKeys;
		return Input.GetKey(KeyCode.A) || ( GetInputCount() == 1 && InLeftArea(Input.mousePosition))
		||GetInputJoystickNameNegative(EInputStringName.JoystickX.ToString(),0) || Input.GetKey(map["left"].ToString()); //test for mac
	}
}
function IsTriggerRunningRight() : boolean
{
	if (IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return  m_canTriggerMove && (!m_forceStopTriggerMove) ? m_joyStick.m_right : false;
		}
		else
		{
		return  m_canTriggerMove && (!m_forceStopTriggerMove) ? (GetInputCount() == 1 && InRightArea(Input.GetTouch(0).position) && Input.GetTouch(0).phase == TouchPhase.Stationary) : false;
		}
	}
	else
	{
	//Debug.Log(Input.GetKey(KeyCode.D));
		var map = InputKeyCodeMapHelper.mapKeys;
	 	return Input.GetKey(KeyCode.D) || ( GetInputCount() == 1 && InRightArea(Input.mousePosition)
		||GetInputJoystickNamePositive(EInputStringName.JoystickX.ToString(),0))  || Input.GetKey(map["right"].ToString()); //test for mac
		
	}
}


function IsTriggerWalkingLeft() : boolean
{
	if (IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return false;
		}
		else
		{
		return  m_canTriggerMove && (!m_forceStopTriggerMove) ? 
		(GetInputCount() >= 2 && InLeftArea(Input.GetTouch(0).position) && InLeftArea(Input.GetTouch(1).position) && Input.GetTouch(1).phase == TouchPhase.Stationary) : false;
		}
	}
	else
	{
		return ( Input.GetKey(KeyCode.Q) ) || ( GetInputCount() == 2 && InLeftArea(Input.mousePosition) ); //test for mac
	}
}

function IsTriggerWalkingRight() : boolean
{
	if (IsOnIPhone())
	{
		// HACK CHANGE,
		// To make it support game pad
		if ( GameOptionsManager.Singleton().IsUseGamePad() )
		{
			return false;
		}
		else
		{
			return  m_canTriggerMove && (!m_forceStopTriggerMove) ? 
		(GetInputCount() >= 2 && InRightArea(Input.GetTouch(0).position) && InRightArea(Input.GetTouch(1).position) && Input.GetTouch(0).phase == TouchPhase.Stationary) : false;
		}
	}
	else
	{
		return ( Input.GetKey(KeyCode.E)) || ( GetInputCount() == 2 && InRightArea(Input.mousePosition) ); //test for mac
	}
}

function IsTriggerClimbUp() : boolean
{
	return  m_canTriggerMove && (!m_forceStopTriggerMove) ? m_joyStick.m_up : false;
}

function IsTriggerClimbDown() : boolean
{
	return  m_canTriggerMove && (!m_forceStopTriggerMove) ? m_joyStick.m_down : false;
}

function IsTriggerStopMoving() : boolean
{
	return !m_canTriggerMove;
}

function ClearInput()
{
	Init();
}

function ForceStopTirggerMoveOnce()
{
	m_forceStopTriggerMove = true;
}

function CheckCancelled() : boolean
{
	////Debug.Log("Check cancelled");
	
	for (var i : int = 0; i < Input.touchCount && i < m_maxInputCount; ++i)
	{
		if (Input.GetTouch(i).phase == TouchPhase.Canceled)
		{
			return true;
		}
	}
	
	return false;
}

function CheckEnded() : boolean
{
	////Debug.Log("Check ended");
	
	for (var i : int = 0; i < Input.touchCount && i < m_maxInputCount; ++i)
	{
		if (Input.GetTouch(i).phase == TouchPhase.Ended)
		{
			//Debug.Log("end by who : " + i);
			m_canTriggerMove = true;
			return true;
		}
	}
	
	return false;
}
	
function UpdateKeyInput()
{
	var touchType : int= 0;
	var map = InputKeyCodeMapHelper.mapKeys;
	if (Input.GetKeyUp(map["Y"].ToString())) {  //Attack
		touchType = ETouchEnum.TouchSwipeRight;
	} else if (Input.GetKeyUp(map["B"].ToString())) { //Jump
		touchType = ETouchEnum.TouchDoubleTap;
	}
	
	
//	if (Input.GetKey(KeyCode.K)||Input.GetButtonDown(EInputStringName.Jump.ToString())) // Jump
//	{
//		touchType = ETouchEnum.TouchDoubleTap; //ETouchEnum.TouchSwipeOblique;
//	}
//	else if (Input.GetKeyDown(KeyCode.J)||Input.GetButtonDown(EInputStringName.Fire1.ToString())) // Attack
//	{
//		touchType = ETouchEnum.TouchSwipeRight;
//	
//	}
//	else if (Input.GetKeyDown(KeyCode.U)) // HeavyAttack
//	{
//		touchType = ETouchEnum.TouchSwipeDown;
//	}
//	else if (Input.GetKeyDown(KeyCode.I)) // JumpAttack
//	{
//		touchType = ETouchEnum.TouchSwipeUp;
//	}
//	else if (Input.GetKeyDown(KeyCode.O)) // ShoulderAttack
//	{
//		touchType = ETouchEnum.TouchDoubleSwipeRight;
//	}
	
	var inputInfo : InputInfo = new InputInfo();
	inputInfo.m_inputType = touchType;
	inputInfo.m_touchCount = IsTriggerRunningRight() || IsTriggerRunningLeft() ? 1 : 2;
	inputInfo.m_startPoints = new Vector2[inputInfo.m_touchCount];
	inputInfo.m_endPoints = new Vector2[inputInfo.m_touchCount];
	
	if (touchType == 0)
	{
		return;
	}
	
	// Seed input message
	for (var i : int = 0; i < m_registers.length; ++i)
	{
		(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
	}
}

function UpdateTouchInput()
{
	if (Input.touchCount > 0)
	{
		// Cancelled
		if (CheckCancelled())
		{
			ClearInput();
		}
		// End
		else if (m_started && ( CheckEnded() || m_finished) )
		{
			TouchesEnded();
			m_started = false;
		}
		// Begin
		else if (m_started == false)
		{
			m_started = true;
			TouchesBegan();
		}
		// Move
		else 
		{
			TouchesMoved();
		}
	}

}

function UpdateGamePad()
{
	
	var touchType : int= 0;
	var inputInfo : InputInfo = null;
	var i : int = 0;
	
	var map = InputKeyCodeMapHelper.mapKeys;
	//Debug.Log("m_attackButton.IsFingerJustDown : " + m_attackButton.IsFingerJustDown());
	if (/*true)*/m_attackButton.IsFingerJustDown() || Input.GetKeyUp(map["Y"].ToString()))
	{
		if (IsTriggerClimbUp())
		{
			touchType = ETouchEnum.TouchSwipeDown;
			
			inputInfo = new InputInfo();
			inputInfo.m_inputType = touchType;
			inputInfo.m_touchCount = IsTriggerRunningRight() || IsTriggerRunningLeft() ? 1 : 2;
			inputInfo.m_startPoints = new Vector2[inputInfo.m_touchCount];
			inputInfo.m_endPoints = new Vector2[inputInfo.m_touchCount];
	
			// Seed input message
			for (i = 0; i < m_registers.length; ++i)
			{
				(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
			}
		}
		else if (IsTriggerClimbDown())
		{
			touchType = ETouchEnum.TouchSwipeUp;
			
			inputInfo = new InputInfo();
			inputInfo.m_inputType = touchType;
			inputInfo.m_touchCount = IsTriggerRunningRight() || IsTriggerRunningLeft() ? 1 : 2;
			inputInfo.m_startPoints = new Vector2[inputInfo.m_touchCount];
			inputInfo.m_endPoints = new Vector2[inputInfo.m_touchCount];
	
			// Seed input message
			for (i = 0; i < m_registers.length; ++i)
			{
				(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
			}
		}
	
		touchType = ETouchEnum.TouchSwipeRight;	
		
		inputInfo = new InputInfo();
		inputInfo.m_inputType = touchType;
		inputInfo.m_touchCount = IsTriggerRunningRight() || IsTriggerRunningLeft() ? 1 : 2;
		inputInfo.m_startPoints = new Vector2[inputInfo.m_touchCount];
		inputInfo.m_endPoints = new Vector2[inputInfo.m_touchCount];
	
		// Seed input message
		for (i = 0; i < m_registers.length; ++i)
		{
			(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
		}
		
	}
	else if (/*true)//*/m_attackButton.IsFingerJustLastForSecond1Point5())
	{
		touchType = ETouchEnum.TouchDoubleSwipeRight;	
		
		inputInfo = new InputInfo();
		inputInfo.m_inputType = touchType;
		inputInfo.m_touchCount = IsTriggerRunningRight() || IsTriggerRunningLeft() ? 1 : 2;
		inputInfo.m_startPoints = new Vector2[inputInfo.m_touchCount];
		inputInfo.m_endPoints = new Vector2[inputInfo.m_touchCount];
	
		// Seed input message
		for (i = 0; i < m_registers.length; ++i)
		{
			(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
		}
	}
	
		
	if (/*true)*/m_jumpButton.IsFingerJustDown() || IsTriggerJump())
	{
		touchType = ETouchEnum.TouchDoubleTap;	
		
		inputInfo = new InputInfo();
		inputInfo.m_inputType = touchType;
		
		if (IsTriggerRunningRight() || IsTriggerRunningLeft())
		{
			inputInfo.m_touchCount = 1;
		}
		else 
		{
			inputInfo.m_touchCount = 3;
		}
		
		inputInfo.m_startPoints = new Vector2[m_maxInputCount];
		inputInfo.m_endPoints = new Vector2[m_maxInputCount];
		// Seed input message
		for (i = 0; i < m_registers.length; ++i)
		{
			(m_registers[i] as ControllableActor).ApplyInput(inputInfo);
		}
	}
}

function Update () 
{	
	// HACK CHANGE,
	// To make it support game pad
	//var dx=Input.GetAxis("JoystickX");
	//var dy=Input.GetAxis("JoystickY");
	//Debug.Log(dx);
	//Debug.Log(dy);
	if (SceneManager.Singleton().IsGamePaused()) 
	{
		return;
	}
	
	m_asdasdasda++;
	if (GameOptionsManager.Singleton().IsUseGamePad())
	{
		UpdateGamePad();
		return ;
	}
	
	// Game paused, clear all input.
	if (SceneManager.Singleton().IsGamePaused())
	{
		ClearInput();
		//return ;
	}
	
	if (!IsOnIPhone())
	{
		// Key input for mac test
		UpdateKeyInput();
	}
	else
	{
		UpdateTouchInput();
	}
}

function GetInputCount() : int
{
	if (GUIUtility.hotControl != 0)
	{
		//Debug.Log("Input count : 0");
		m_touchInputUiDelayTimer = m_touchInputUiDelayTime;
		return 0;
	}
	else
	{
		if (IsOnIPhone())
		{
			if ( m_touchInputUiDelayTimer > 0 )
			{
				m_touchInputUiDelayTimer -= Time.deltaTime;
			}
			
			return m_touchInputUiDelayTimer <= 0 ? Input.touchCount : 0;
		}
		else
		{
			if (Input.GetMouseButton(1))
			{
				return 2;
			}
			
			return Input.GetMouseButton(0) ? 1 : 0;
		}
	}
}
}
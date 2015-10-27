//#pragma strict

@script RequireComponent (GUITexture)

class Boundary {
	var min : Vector2 = Vector2.zero;
	var max : Vector2 = Vector2.zero;
} 
	
static private var joysticks : Joystick[];					// A static collection of all joysticks
static private var enumeratedJoysticks : boolean = false;
static private var tapTimeDelta : float = 0.3;				// Time allowed between taps

var touchPad : boolean; 									// Is this a TouchPad?
var touchZone : Rect;
var deadZone : float = 0;									// Control when position is output
var normalize : boolean = false; 							// Normalize output after the dead-zone?
var position : Vector2; 									// [-1, 1] in x,y
var tapCount : int;											// Current tap count

private var lastFingerId = -1;								// Finger last used for this joystick
private var tapTimeWindow : float;							// How much time there is left for a tap to occur
private var fingerDownPos : Vector2;
private var fingerDownTime : float;
private var firstDeltaTime : float = 0.5;

private var m_fingerJustDown : boolean = false;

private var gui : GUITexture;								// Joystick graphic
private var defaultRect : Rect;								// Default position / extents of the joystick graphic
private var guiBoundary : Boundary = Boundary ();			// Boundary for joystick graphic
private var guiTouchOffset : Vector2;						// Offset to apply to touch input
private var guiCenter : Vector2;							// Center of joystick

public var m_noInput : boolean = true;
public var m_left : boolean = false;
public var m_right : boolean = false;
public var m_up : boolean = false;
public var m_down : boolean = false;

//--------
public var m_awake_control : GameObject;

//#if !UNITY_IPHONE && !UNITY_ANDROID
//
//function Awake () {
//	gameObject.active = false;	
//}
//
//#else

function Start () {
//    Debug.Log("1234");
	// Cache this component at startup instead of looking up every frame	
	gui = GetComponent.<GUITexture> ();
	
	// Store the default rect for the gui, so we can snap back to it
	defaultRect = gui.pixelInset;	
        
    defaultRect.x += transform.position.x * Screen.width;// + gui.pixelInset.x; // -  Screen.width * 0.5;
    defaultRect.y += transform.position.y * Screen.height;// - Screen.height * 0.5;
    
    transform.position.x = 0.0;
    transform.position.y = 0.0;
        
	if (touchPad) {
		// If a texture has been assigned, then use the rect ferom the gui as our touchZone
		if (gui.texture)
			touchZone = defaultRect;
	}
	else {				
		// This is an offset for touch input to match with the top left
		// corner of the GUI
		guiTouchOffset.x = 50;
		guiTouchOffset.y = 50;
		
		// Cache the center of the GUI, since it doesn't change
		guiCenter.x = defaultRect.x + guiTouchOffset.x;
		guiCenter.y = defaultRect.y + guiTouchOffset.y;
		
		// Let's build the GUI boundary, so we can clamp joystick movement
		guiBoundary.min.x = defaultRect.x - guiTouchOffset.x;
		guiBoundary.max.x = defaultRect.x + guiTouchOffset.x;
		guiBoundary.min.y = defaultRect.y - guiTouchOffset.y;
		guiBoundary.max.y = defaultRect.y + guiTouchOffset.y;
	}
	m_awake_control = GameObject.Find("eye_Up");
}

function Disable () {
	gameObject.active = false;
	enumeratedJoysticks = false;
}

function ResetJoystick () {
	// Release the finger control and set the joystick back to the default position
	gui.pixelInset = defaultRect;
	lastFingerId = -1;
	position = Vector2.zero;
	fingerDownPos = Vector2.zero;
	
	//Debug.Log(this.gameObject + "m_fingerJustDown false");
	m_fingerJustDown = false;
	m_noInput = true;
	//m_noInput
	fingerDownTime = 0;
	m_triggered1Ponit5 = false;

	if (!(SceneManager.Singleton().IsGameOver() || SceneManager.Singleton().IsGamePaused()) )
	{
		gui.color.a = 1;
	}	
}

function IsFingerDown () : boolean {
	return (lastFingerId != -1);
}

function IsFingerJustDown() : boolean 
{
	return m_fingerJustDown;
}

private var m_triggered1Ponit5 : boolean = false;

function IsFingerJustLastForSecond1Point5() : boolean
{
	if (fingerDownTime >= 1.5f)
	{
		if (!m_triggered1Ponit5)
		{
			m_triggered1Ponit5 = true;
			return true;
		}
	}
	
	return false;
}

function LatchedFinger (fingerId : int) {
	// If another joystick has latched this finger, then we must release it
	if (lastFingerId == fingerId)
		ResetJoystick ();
}

function Update () {	
	if(m_awake_control)
	{
	  // Debug.Log();
	}
	else
	{
	   if (SceneManager.Singleton().IsGameOver() || SceneManager.Singleton().IsGamePaused())
	   {
		   gui.color.a = 0.15;
		   return;
	   }
	}
	
	m_left = false;
	m_right = false;
	m_up = false;
	m_down = false;

	if (!enumeratedJoysticks) {
		// Collect all joysticks in the game, so we can relay finger latching messages
		joysticks = FindObjectsOfType (Joystick) as Joystick[];
		enumeratedJoysticks = true;
	}	
		
	var count = Input.touchCount;
	
	// Adjust the tap time window while it still available
	if (tapTimeWindow > 0)
		tapTimeWindow -= Time.deltaTime;
	else
		tapCount = 0;
	
	if (count == 0) {
		ResetJoystick ();
	}
	else {
		for (var i : int = 0; i < count; i++) {
			var touch : Touch = Input.GetTouch (i);			
			var guiTouchPos : Vector2 = touch.position - guiTouchOffset;
	
			var shouldLatchFinger = false;
			if (touchPad) {				
				if (touchZone.Contains (touch.position))
					shouldLatchFinger = true;
			}
			else if (gui.HitTest (touch.position)) {
				shouldLatchFinger = true;
			}
	
			if (shouldLatchFinger)
			{
				if (lastFingerId == -1)
				{
					//Debug.Log(this.gameObject + "is just down.");
					m_fingerJustDown = true;
					fingerDownTime = 0;
				}
				else
				{
					//Debug.Log(this.gameObject + "m_fingerJustDown false");
					m_fingerJustDown = false;
					
					if (lastFingerId == touch.fingerId)
					{
						fingerDownTime += Time.deltaTime;
					}
				}
			}
			
			// Latch the finger if this is a new touch
			if (shouldLatchFinger && (lastFingerId == -1 || lastFingerId != touch.fingerId)) {
				
				if (touchPad) {
					gui.color.a = 0.15;
					
					fingerDownPos = touch.position;
				}
				
				lastFingerId = touch.fingerId;
				
				// Accumulate taps if it is within the time window
				if (tapTimeWindow > 0) {
					tapCount++;
				}
				else {
					tapCount = 1;
					tapTimeWindow = tapTimeDelta;
				}
											
				// Tell other joysticks we've latched this finger
				for (var j : Joystick in joysticks) {
					if (j != null && j != this)
						j.LatchedFinger (touch.fingerId);
				}						
			}				
	        else if (lastFingerId == touch.fingerId) {
				// Override the tap count with what the iPhone SDK reports if it is greater
				// This is a workaround, since the iPhone SDK does not currently track taps
				// for multiple touches
				if (touch.tapCount > tapCount)
					tapCount = touch.tapCount;
				
				if (touchPad) {	
					// For a touchpad, let's just set the position directly based on distance from initial touchdown
					position.x = Mathf.Clamp ((touch.position.x - fingerDownPos.x) / (touchZone.width / 2), -1, 1);
					position.y = Mathf.Clamp ((touch.position.y - fingerDownPos.y) / (touchZone.height / 2), -1, 1);
				}
				else {					
					// Change the location of the joystick graphic to match where the touch is
					position.x = (touch.position.x - guiCenter.x) / guiTouchOffset.x;
					position.y = (touch.position.y - guiCenter.y) / guiTouchOffset.y;
				}
				
				if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
					ResetJoystick ();
			}			
		}
	}
	
	// Calculate the length. This involves a squareroot operation,
	// so it's slightly expensive. We re-use this length for multiple
	// things below to avoid doing the square-root more than one.
	var length : float = position.magnitude;
	
	
	if (length < deadZone) {
		// If the length of the vector is smaller than the deadZone radius,
		// set the position to the origin.
		position = Vector2.zero;
		m_noInput = true;
	}
	else {
		m_noInput = false;
		if (length > 1) {
			// Normalize the vector if its length was greater than 1.
			// Use the already calculated length instead of using Normalize().
			position = position / length;
		}
		else if (normalize) {
			// Normalize the vector and multiply it with the length adjusted
			// to compensate for the deadZone radius.
			// This prevents the position from snapping from zero to the deadZone radius.
			position = position / length * Mathf.InverseLerp (length, deadZone, 1);
		}
	}
	
	if (!touchPad) {
		// Change the location of the joystick graphic to match the position
		gui.pixelInset.x = (position.x - 1) * guiTouchOffset.x + guiCenter.x;
		gui.pixelInset.y = (position.y - 1) * guiTouchOffset.y + guiCenter.y;
	}
	
	if (!m_noInput)
	{
		if (gui.pixelInset.x > defaultRect.x + 19)
		{
			m_right = true;
		}
		else if (gui.pixelInset.x < defaultRect.x - 19)
		{
			m_left = true;
		}
		
		if (gui.pixelInset.y > (defaultRect.y + 30))
		{
			m_up = true;
		}
		else if (gui.pixelInset.y < (defaultRect.y - 30))
		{
			m_down = true;
		}
	}
}

//#endif

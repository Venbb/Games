//#pragma strict

import System.Collections.Generic;

/** 
 * Helps keeping charactercontroller entities nicely on the platform
 * Needs a Collider set as trigger in the gameobject this script is added to
 * works best if collider is bit smaller as platform but extends quite a lot
 * (say .5m or so) above the platform, As the platform possibly already has
 * a normal collider the easiest way is to add a GameObject to the platform,
 * give it a trigger collider and add this script. The yOffset is the vertical 
 * offset the character should have above the platform (a good value to start
 * with is half the y value of the Collider size).
 */

    // helper struct to contain the transform of the player and the
    // vertical offset of the player (how high the center of the
    // charcontroller must be above the center of the platform)
class PlatformSupportData 
{
    	public function PlatformSupportData( actorPhysics : ActorPhysics, ctrl : CharacterController, t : Transform, yOffset : float) 
    	{
    		this.actorPhysics = actorPhysics;
    		this.ctrl = ctrl;
    		this.t = t;
    		this.yOffset = yOffset;
    	}
    	
    	public var actorPhysics : ActorPhysics = null; // the char controller
    	public var ctrl : CharacterController = null; // the char controller
    	public var t : Transform = null; // transform of char
    	public var yOffset : float = 0.0; // y offset of char above platform center
};

public var verticalOffset : float = 0.25f; // height above the center of object the char must be kept
/*
// declaration:
var myDictionary = new Dictionary.<KeyType,ValueType>();

// and a real-world declaration example (where 'Person' is a custom class):
var myContacts = new Dictionary.<string,Person>();

// insert or change the value for the given key
myDictionary[anyKey] = newValue;                 

// retrieve a value for the given key
var thisValue = myDictionary[theKey];      

// get the number of items in the Hashtable
var howBig = myDictionary.Count;                 

// remove the key & value pair from the Hashtable, for the given key.
myDictionary.Remove(theKey);
*/
// store all playercontrollers currently on platform
private var onPlatform : Hashtable = new Hashtable();

// used to calculate horizontal movement
private var lastPos : Vector3 = Vector3.zero;

function OnTriggerEnter(other : Collider) 
{
	if (onPlatform.ContainsKey(other.transform) || other.isTrigger || other.gameObject == this.gameObject)
	{
		return ;
	}

		//Debug.Log(other.gameObject + "  attached to " + this.gameObject);

    	var actorPhysics : ActorPhysics = other.GetComponent(ActorPhysics) as ActorPhysics;
    	
    	var ctrl : CharacterController = other.GetComponent(CharacterController) as CharacterController;
    	// make sure we only move objects that are rigidbodies or charactercontrollers.
    	// this to prevent we move elements of the level itself
    	if (actorPhysics == null) return;

    	var t : Transform = other.transform; // transform of character


    	// we calculate the yOffset from the character height and center
    	var yOffset : float = ctrl.height / 2f - ctrl.center.y + verticalOffset;

    	var data : PlatformSupportData = new PlatformSupportData(actorPhysics, ctrl, t, yOffset);
    	
    	// add it to table of characters on this platform
    	// we use the transform as key
    	onPlatform.Add(other.transform, data);
        //(other.GetComponent(ActorPhysics) as ActorPhysics).m_enableGravity = false;
}

function OnTriggerExit(other : Collider) 
{
		//Debug.Log(other.gameObject + " deattached to " + this.gameObject);
    	// remove (if in table) the uncollided transform
    	if (onPlatform.ContainsKey(other.transform))
    	{
    		onPlatform.Remove(other.transform);
    		//(other.GetComponent(ActorPhysics) as ActorPhysics).m_enableGravity = true;
    	}
}

function Start() 
{
    lastPos = transform.position;
}

function Update()
{
	var item : DictionaryEntry;
	var data : PlatformSupportData = null;
		
    // let's loop over all characters in the table
    for ( item in onPlatform)
    {
    	data = item.Value as PlatformSupportData; // get the data
    	//var charYVelocity : float = data.ctrl2.velocity.y;

    	// check if char seems to be jumping
    	if (data.t.gameObject.active == false) 
    	{
			onPlatform.Remove(data.t);
			return ;
    	}
    }
}

function LateUpdate () 
{
	//Debug.Log(" platform late update");
	
    	var curPos : Vector3 = transform.position;
    	var y : float = curPos.y; // current y pos of platform

    	// we calculate the delta
    	var delta : Vector3 = curPos - lastPos;
    	//var yVelocity : float = delta.y;

    	// remove y component of delta (as we use delta only for correcting
    	// horizontal movement now...
    	delta.y = 0f;

    	lastPos = curPos;

		var item : DictionaryEntry;
		var data : PlatformSupportData = null;
		
    	// let's loop over all characters in the table
    	for ( item in onPlatform)
    	{
    		data = item.Value as PlatformSupportData; // get the data
    		//var charYVelocity : float = data.ctrl2.velocity.y;

    		// check if char seems to be jumping
    		if (data.actorPhysics.GetSpeedY() <= 0) 
    		{
    			// no, lets do our trick!
    			var pos : Vector3 = data.t.position; // current charactercontroller position
    			pos.y = y + data.yOffset; // adjust to new platform height
    			pos += delta; // adjust to horizontal movement
    			data.t.position = pos; // and write it back!
    		}
    	}
}


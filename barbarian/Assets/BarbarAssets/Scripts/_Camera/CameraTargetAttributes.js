#pragma strict

// This script goes on any GameObject in your scene that you will track with the camera.
// It'll help customize the camera tracking to your specific object to polish your game.

// See the GetGoalPosition () function in CameraScrolling.js for an explanation of these variables.
var heightOffset = 0.0;
var distanceModifier = 1.0;
var velocityLookAhead = 0.15;
var maxLookAhead = Vector2 (3.0, 3.0);

var widthOffset = 0.0;

private var m_oriOffset : Vector2;
private var m_oriBounds : Rect;

function Awake()
{
	m_oriOffset.x = widthOffset;
	m_oriOffset.y = heightOffset;
}

function Start()
{
	m_oriBounds = (SceneManager.Singleton().GetMainCamera().GetComponent(CameraScrolling) as CameraScrolling).GetBounds();
}

function SetWidthOffset(offset : float)
{
	this.widthOffset = offset;
}

function SetHeightOffset(offset : float)
{
	this.heightOffset = offset;
}

function SetOffset(offset2 : Vector2)
{
	this.widthOffset = offset2.x;
	this.heightOffset = offset2.y;
}

function ResetOffset()
{
	widthOffset = m_oriOffset.x;
	heightOffset = m_oriOffset.y;
}

function SetBounds(bound : Rect)
{
	(SceneManager.Singleton().GetMainCamera().GetComponent(CameraScrolling) as CameraScrolling).SetBounds(bound);
}

function ResetBounds()
{
	(SceneManager.Singleton().GetMainCamera().GetComponent(CameraScrolling) as CameraScrolling).SetBounds(m_oriBounds);
}
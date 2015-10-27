
var m_pos : Vector2 = Vector2(10, 10);
var icon : Texture2D;

function Update () {
}

private var textFieldStr : String = "Input here";
private var toggleBool : boolean = false;
var toolbarInt = 0;
var toolbarStrings : String[] = ["Toolbar1", "Toolbar2", "Toolbar3"];
var selectionGridInt : int = 0;
var selectionStrings : String[] = ["Grid 1", "Grid 2", "Grid 3", "Grid 4"];
var hSliderValue : float = 0.0;

var m_customSkin : GUISkin;

var m_colorStamina : Color;

private var m_mcHeadIcoPosition_iphone : Vector2 = Vector2(10, 10);
private var m_mcHeadIcoScale_iphone : Vector2 = Vector2(50, 50);
private var m_mcHeadIcoScale_ipad : Vector2 = Vector2(100, 100);

function Start()
{
}

function OnGUI () 
{	
	GUI.Label (Rect (Screen.width - 200,Screen.height- 20,200,20), " copyright@enveesoft 2011 ");
	/*
	//GUI.skin = m_customSkin;
	GUI.Label (Rect (m_mcHeadIcoPosition_iphone.x, m_mcHeadIcoPosition_iphone.y, m_mcHeadIcoScale_iphone.x, m_mcHeadIcoScale_iphone.y), "", m_customSkin.customStyles[0]);Made in Chengdu
	
	var actor : Actor = GetComponent(Actor) as Actor;
	var r : float = Mathf.Lerp(0, 70, (parseFloat)(actor.GetHp())/ (parseFloat)(actor.GetMaxHp()) );
	
	var c : float = Mathf.Lerp(0, 1, (parseFloat)(actor.GetHp())/ (parseFloat)(actor.GetMaxHp()) );
	
	var color : Color = Color(0, 1, 0);
	
	
	if ( c >= (0.8) )
	{
		color.r = 0;
		color.g = 1;
		color.b = 0;
	}
	else if( c >= (0.4) )
	{
		color.r = 1;
		color.g = 1;
		color.b = 0;
	}
	else 
	{
		color.r = 1;
		color.g = 0;
		color.b = 0;
	}

	GuiDrawLine.DrawLine(Vector2(80, 20), Vector2(80 + r, 20), color, 15);
	
	r = Mathf.Lerp(0, 70, (parseFloat)(actor.GetStamina())/ (parseFloat)(actor.GetMaxStamina()) );
	GuiDrawLine.DrawLine(Vector2(80, 40), Vector2(80 + r, 40), m_colorStamina, 5);

	/*
	
	// Fixed Layout
	GUI.Button (Rect (25,25,100,30), "I am a Fixed Layout Button");

	// Automatic Layout
	GUILayout.Button ("I am an Automatic Layout Button");
	
	
	if (GetComponent(Actor) != null
	&& GUI.Button (
	Rect (m_pos.x,m_pos.y,150,50), this.gameObject.name 
	+ " Hp :" 
	+ (GetComponent(Actor) as Actor).GetHp().ToString()
	+ "/" 
	+ (GetComponent(Actor) as Actor).GetMaxHp().ToString()
	)
	) 
	{
		print ("You clicked the button!");
	}
	
	//Using GUIContent to display an image and a string 


	GUI.Box (Rect (100,50,100,50), GUIContent("This is text", icon));
	
		// This line feeds "This is the tooltip" into GUI.tooltip
	GUI.Button (Rect (10,30,100,20), GUIContent ("Click me", icon, "This is the tooltip"));
	// This line reads and displays the contents of GUI.tooltip
	GUI.Label (Rect (10,60,100,20), GUI.tooltip);
	
	GUI.Label (Rect (Screen.width - 110,Screen.height- 20,110,20), "Made in Chengdu");
	
	textFieldStr = GUI.TextField (Rect (250, 250, 100, 30), textFieldStr);
	
	toggleBool = GUI.Toggle (Rect (300, 300, 100, 30), toggleBool, "Toggle");

	toolbarInt = GUI.Toolbar (Rect (25, 25, 250, 30), toolbarInt, toolbarStrings);

selectionGridInt = GUI.SelectionGrid (Rect (270, 270, 100, 30), selectionGridInt, selectionStrings, 2);

hSliderValue = GUI.HorizontalSlider (Rect (25, 250, 100, 30), hSliderValue, 0.0, 10.0);

// ScrollView example 


	// Begin the ScrollView
	scrollViewVector = GUI.BeginScrollView (Rect (25, 25, 100, 100), scrollViewVector, Rect (0, 0, 400, 400));

	// Put something inside the ScrollView
	innerText = GUI.TextArea (Rect (0, 0, 400, 400), innerText);

	// End the ScrollView
	GUI.EndScrollView();
	
	// Make a label that uses the "box" GUIStyle.
	GUI.Label (Rect (0,0,200,100), "Hi - I'm a label looking like a box", "box");

	// Make a button that uses the "toggle" GUIStyle
	GUI.Button (Rect (10,140,180,20), "This is a button", "toggle");
	


	// Make a button. We pass in the GUIStyle defined above as the style to use
	GUI.Button (Rect (10,200,150,20), "I am a Custom Button", customButton);
	*/
}

	var customButton : GUIStyle;
	
var scrollViewVector : Vector2 = Vector2.zero;
var innerText : String = "I am inside the ScrollView";


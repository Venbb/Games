#pragma strict

//vars for the whole sheet
var colCount    : int =  4;
var rowCount    : int =  4;

//vars for animation
var rowNumber   : int =  0; //Zero Indexed
var colNumber   : int =  0; //Zero Indexed
var totalCells  : int =  4;
var fps  : int = 10;
var offset  : Vector2;  //Maybe this should be a private var

var m_texture : Texture2D = null;

var m_moveSpeed : Vector2 = Vector2(0.002, 0.001);

//Update
function Update () { SetSpriteAnimation(colCount,rowCount,rowNumber,colNumber,totalCells,fps);  }

//SetSpriteAnimation
function SetSpriteAnimation(colCount : int,rowCount : int,rowNumber : int,colNumber : int,totalCells : int,fps : int){

/*
    // Calculate index
    var index : int = Time.time * fps;
    // Repeat when exhausting all cells
    index = index % totalCells;
    
    // Size of every cell
    var size = Vector2 (1.0 / colCount, 1.0 / rowCount);
    
    // split into horizontal and vertical index
    var uIndex = index % colCount;
    var vIndex = index / colCount;
 
 */
    // build offset
    // v coordinate is the bottom of the image in opengl so we need to invert.
    
    if (offset.x > 1 || offset.x < 0)
    {
    	 m_moveSpeed.x = - m_moveSpeed.x;
    }
    
    if (offset.y > 1 || offset.y < 0)
    {
    	 m_moveSpeed.y = - m_moveSpeed.y;
    }
    
    offset = Vector2 (offset.x + m_moveSpeed.x * Time.deltaTime, offset.y + m_moveSpeed.y * Time.deltaTime);
    
    renderer.material.SetTextureOffset ("_MainTex", offset);
    renderer.material.SetTextureScale  ("_MainTex", Vector2(1, 1));
}
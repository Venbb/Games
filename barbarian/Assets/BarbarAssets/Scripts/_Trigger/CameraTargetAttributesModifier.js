#pragma strict

var m_offset : Vector2;
var m_widthModify : boolean = true;
var m_heightModify : boolean = false;
var m_bounds : Rect;

function GetOffset() : Vector2 
{
	return m_offset;
}

function IsEnableWidthModify() : boolean
{
	return m_widthModify;
}

function IsEnableHeightModify() : boolean
{
	return m_heightModify;
}

function GetBounds() : Rect
{
	return m_bounds;
}
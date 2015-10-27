#pragma strict
var m_particle:GameObject;
var m_instancePositon : Quaternion;
function Awake()
{

m_instancePositon=transform.rotation;

}
function Start () {

}

function Update () {
 gameObject.transform.rotation=m_instancePositon;
 Debug.Log(gameObject.transform.rotation);
}
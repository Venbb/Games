#pragma strict

class GamePool
{
var torpedoPrefab : GameObject;
private var torpedoPool : GameObjectPool;
var torpedoPrefabsToPreAllocate : int = 1;

function Preload(){
torpedoPool = GameObjectPool( torpedoPrefab, torpedoPrefabsToPreAllocate, null, true);
torpedoPool.PrePopulate(torpedoPrefabsToPreAllocate);
}

// Create
function InitializeObject(spawnPoint : Vector3, eulerAngles : Vector3) : GameObject
{
	var newTorpedo : GameObject= torpedoPool.Spawn(spawnPoint, Quaternion.identity);
	newTorpedo.transform.eulerAngles = eulerAngles;

	return newTorpedo;
}

function InitializeObject(spawnPoint : Vector3) : GameObject
{
	var newTorpedo : GameObject= torpedoPool.Spawn(spawnPoint, Quaternion.identity);

	return newTorpedo;
}

// back
function KillObject(obj : GameObject)
{
	//Debug.Log(obj);
	torpedoPool.Unspawn(obj);
}

}
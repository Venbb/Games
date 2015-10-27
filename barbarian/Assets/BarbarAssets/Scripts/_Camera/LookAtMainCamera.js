#pragma strict

function Update()
{
	transform.LookAt(SceneManager.Singleton().GetMainCamera().transform.position);
}
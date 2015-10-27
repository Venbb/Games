
function Update() 
{
	var meshRenderer = GetComponent(SkinnedMeshRenderer) as SkinnedMeshRenderer;
	var meshFilter = GetComponent(MeshFilter) as MeshFilter;
	meshFilter.mesh = meshRenderer.sharedMesh;
	meshFilter.sharedMesh = meshRenderer.sharedMesh;
}
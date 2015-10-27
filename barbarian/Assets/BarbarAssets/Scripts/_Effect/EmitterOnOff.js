#pragma strict 


function OnEnable()
{
	(GetComponent(ParticleEmitter) as ParticleEmitter).ClearParticles();
}

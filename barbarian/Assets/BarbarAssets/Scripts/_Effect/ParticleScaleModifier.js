// coder : li yun
#pragma strict

private var m_oriMaxScale : float = 0.0f;
private var render : ParticleRenderer = null;

function Awake ()
{
	render = GetComponent(ParticleRenderer) as ParticleRenderer;
	m_oriMaxScale = render.maxParticleSize;
}

function Update () 
{
	render.maxParticleSize = m_oriMaxScale * this.transform.lossyScale.x;
}
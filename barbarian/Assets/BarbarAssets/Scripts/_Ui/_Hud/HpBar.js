#pragma strict

var m_hpBarDisplayTime : float = 3;
var m_hpBarLength : float = 1;
var m_hpOffsetX : float = 0.0f;
var m_hpOffsetY : float = 0.5;
var m_attackedBone : GameObject;

private var m_hpBarDisplayTimer : float = 0;

private var m_c1 : Color = Color.red;
private var m_c2 : Color = Color.red;

private var m_actor : Actor = null;
private var m_lineRenderer : LineRenderer = null;

function Start() 
{
     m_lineRenderer = gameObject.AddComponent(LineRenderer) as LineRenderer;
     m_lineRenderer.material = new Material(Shader.Find("Particles/Additive"));  
     var lineTex : Texture2D = Texture2D(1, 1);
     lineTex.SetPixel(0, 0, Color(1,0,0,1));
     lineTex.Apply();
     
     m_lineRenderer.material.color = Color.red;
     m_lineRenderer.material.mainTexture = lineTex;
     
     m_lineRenderer.SetColors(m_c1, m_c2);
     m_lineRenderer.SetWidth(0.09,0.09);
     
     m_actor = GetComponent(Actor) as Actor;
}

function DisplayHpBar()
{
	m_hpBarDisplayTimer = m_hpBarDisplayTime;
}
/*
function OnGUI()
{
	if (m_hpBarDisplayTimer > 0 )
	{
		m_hpBarDisplayTimer -= Time.deltaTime;
		

		var pos1 : Vector2 = SceneManager.GetInstance().GetMainCamera().WorldToScreenPoint(Vector3(m_actor.GetPhysics().GetPosition().x - m_hpBarLength / 2, 
				m_actor.GetPhysics().GetPosition().y + m_actor.GetActorInfo().scale.y + m_hpOffsetY,
				0));
		var pos2 : Vector2 = SceneManager.GetInstance().GetMainCamera().WorldToScreenPoint(Vector3( m_actor.GetPhysics().GetPosition().x - m_hpBarLength / 2 + Mathf.Lerp(0, m_hpBarLength, (parseFloat)(m_actor.GetHp()) / (parseFloat)(m_actor.GetMaxHp())), 
				 m_actor.GetPhysics().GetPosition().y + m_actor.GetActorInfo().scale.y +m_hpOffsetY,
				 0 ));
		
		
		//pos1.x *= SceneManager.GetInstance().GetScreenWidth();
		//pos1.y *= SceneManager.GetInstance().GetScreenHeight();
		//pos2.x *= SceneManager.GetInstance().GetScreenWidth();
		//pos2.y *= SceneManager.GetInstance().GetScreenHeight();
		
		//Debug.Log("Pos 1 : " + pos1 + " pos 2 " + pos2);
		
		GuiDrawLine.DrawLine(pos1, pos2, Color.red, 3);
		
	}
	else
	{
		//m_lineRenderer.enabled = false;
		
	}
}
*/
function Update() 
{
	if (m_hpBarDisplayTimer > 0 )
	{
		m_hpBarDisplayTimer -= Time.deltaTime;
		
		var pos : Vector2 = Vector2.zero;
		pos = (m_attackedBone == null) ? m_actor.GetPhysics().GetPosition() : m_attackedBone.transform.position;
		
		var offsetX : float = 0.0f;
		offsetX =  m_actor.GetPhysics().GetDirectionX() < 0 ? m_hpOffsetX : -m_hpOffsetX;
		
		m_lineRenderer.SetPosition( 0, 
		Vector3(pos.x - m_hpBarLength / 2 + offsetX, 
				pos.y + m_actor.GetActorInfo().scale.y + m_hpOffsetY,
				0) 					
									);
				
		//Debug.Log(" current hp : " + m_actor.GetHp() + " ori hp : " + m_actor.GetMaxHp() + " rate : " + (parseFloat)(m_actor.GetHp()) / (parseFloat)(m_actor.GetMaxHp()));
		m_lineRenderer.SetPosition( 1, 
		Vector3( pos.x - m_hpBarLength / 2 + Mathf.Lerp(0, m_hpBarLength, (parseFloat)(m_actor.GetHp()) / (parseFloat)(m_actor.GetMaxHp())) + offsetX, 
				 pos.y + m_actor.GetActorInfo().scale.y +m_hpOffsetY,
				 0 ) 
									);
		
		m_lineRenderer.enabled = true;
		
	}
	else
	{
		m_lineRenderer.enabled = false;
		
	}
}

@script RequireComponent(Actor);
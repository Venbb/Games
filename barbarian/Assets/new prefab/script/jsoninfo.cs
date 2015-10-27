using UnityEngine;
using System.Collections;
using LitJson;
public class jsoninfo : MonoBehaviour {

	// Use this for initialization
	
	void Start () 
	{
	    
	}
	
	// Update is called once per frame
	void Update () 
	{
	
	}
	public void WriteToService()
	{
		System.Text.StringBuilder m_write = new System.Text.StringBuilder();
	    JsonWriter m_writer = new JsonWriter(m_write); 
		m_writer.WriteObjectStart();
		m_writer.WritePropertyName("ButtonID");
		
	}
}

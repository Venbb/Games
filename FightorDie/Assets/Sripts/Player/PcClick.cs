using UnityEngine;
using System.Collections;

public class PcClick : MonoBehaviour {

    public GameObject playerObj;
    PlayerActions m_playerScript;
	// Use this for initialization
	void Start () {
        playerObj = GameObject.Find("Hero");
        m_playerScript = playerObj.GetComponent<PlayerActions>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnMouseDown()
    {

        m_playerScript.m_click();

    }
}

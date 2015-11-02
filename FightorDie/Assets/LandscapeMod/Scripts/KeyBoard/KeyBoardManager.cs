using UnityEngine;
using System.Collections;

public class KeyBoardManager : MonoBehaviour {
    public GameObject[] m_Keys; //0:up 1:down 2:left 3:right
    private KeyLight[] m_lightKeyScripts = new KeyLight[4]; 
	// Use this for initialization
	void Start ()  {
        for (int i = 0; i < m_Keys.Length ; i++ )
        {
            m_lightKeyScripts[i] = m_Keys[i].GetComponent<KeyLight>();
        }
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void lightAttackKey(int i){
        if (i < m_lightKeyScripts.Length) {
            m_lightKeyScripts[i].lightKey();
        }
    }    

}

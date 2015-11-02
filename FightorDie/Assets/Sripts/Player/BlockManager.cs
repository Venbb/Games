using UnityEngine;
using System.Collections;

public class BlockManager : MonoBehaviour {
    //private float stayTime = 0.05f;
    GameObject playerObj;
    PlayerActions m_playerScript;
	// Use this for initialization
	void Start () {
        playerObj = GameObject.Find("Hero");
        m_playerScript = playerObj.GetComponent<PlayerActions>();
	}
	
	// Update is called once per frame
	void Update () {
        //stayTime -= Time.deltaTime;
        if (m_playerScript.playerState !="block")
        {
            Destroy(this.gameObject);
        }
	}

    void OnTriggerEnter2D(Collider2D other)
    {
        if ( (other.tag.CompareTo("EnemyBullet") == 0))
        {
            m_playerScript.BlockEnemy();  
        }
    }
}

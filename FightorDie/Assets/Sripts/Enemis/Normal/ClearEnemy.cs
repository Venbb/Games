using UnityEngine;
using System.Collections;

public class ClearEnemy : MonoBehaviour {
    public string enemyDirection;
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void clearEnemy() {
        switch (enemyDirection)
        {
            case "L":
                this.GetComponent<EnemyMove2RMore>().clean();
                break;
            case "R":
                this.GetComponent<EnemyMove2LMore>().clean();
                break;
            case "U":
                this.GetComponent<EnemyMove2DMore>().clean();
                break;
            case "D":
                this.GetComponent<EnemyMove2UMore>().clean();
                break;
            default: break;
        }
    }
}

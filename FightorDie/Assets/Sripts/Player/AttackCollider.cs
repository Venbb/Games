using UnityEngine;
using System.Collections;

public class AttackCollider : MonoBehaviour {

    private float liveTime = 0.06f;
    private float timer = 0;

    public GameObject shakeScreenObj;
    ShakeScreen shakeScreenScript;

    public GameObject attackAudioObj;
    attackAudio attackAudioScript;

    public GameObject scoreObj;
    ScoreManager scoreScript;

    private int kills = 0;
    public GameObject m_comboObj;
    CombosManager combosScript;
    public GameObject combosObj;
    ComboManager_L comboShowScript;

    private string attackDirection; //1:left 2:right 3:up 4:down
    private int m_comboScores;

    public Transform trap;
    public bool isPlayerAttack = false;

	// Use this for initialization


	void Start () {
        shakeScreenObj = GameObject.Find("Main Camera");
        shakeScreenScript = shakeScreenObj.GetComponent<ShakeScreen>();

        attackAudioObj = GameObject.Find("AttackAudios");
        attackAudioScript = attackAudioObj.GetComponent<attackAudio>();

        scoreObj = GameObject.Find("Kill");
        scoreScript = scoreObj.GetComponent<ScoreManager>();

        m_comboObj = GameObject.Find("Combos");
        combosScript = m_comboObj.GetComponent<CombosManager>();

        combosObj = GameObject.Find("combos");
        comboShowScript = combosObj.GetComponent<ComboManager_L>();

        m_comboScores = scoreScript.comboScores;
        attackAudioScript.attack();
	}
	
	// Update is called once per frame
	void Update () {
        if (timer > liveTime) {
            if (kills == 0)
            {
                scoreScript.comboScores = 0;
            }
            //else if (kills >= 3) {
            //    attackAudioScript.tripleKill();
            //}
            //else if (kills == 2) {
            //    attackAudioScript.doubleKill();
            //}
            Destroy(this.gameObject);
        }
        timer += Time.deltaTime;
	}

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag.CompareTo("Enemy") == 0)
        {
            //creat trap?
            bool isTrap = false;
            Vector2 trapPosition = new Vector2(0, 0);
            int randomKey = Random.Range(0, 1000) % 100;
            if (randomKey < 5 && isPlayerAttack) {
                isTrap = true;
            }

            kills++;

            float x = other.gameObject.transform.position.x;
            float y = other.gameObject.transform.position.y;
            if (Mathf.Abs(x) > Mathf.Abs(y)) {
                if (x < 0)
                {
                    attackDirection = "Left";
                    shakeScreenScript.shakeScreen(2);
                    trapPosition = new Vector2(-6f, -0.1f);
                }
                else {
                    attackDirection = "Right";
                    shakeScreenScript.shakeScreen(3);
                    trapPosition = new Vector2(6f, -0.25f);
                } 
            }
            else if (y > 0) {
                attackDirection = "Up";
                shakeScreenScript.shakeScreen(4);
                trapPosition = new Vector2(-0.4f, 4.5f);
            }
            else
            {
                attackDirection = "Down";
                shakeScreenScript.shakeScreen(5);
                trapPosition = new Vector2(0, -5.6f);
            }
            attackAudioScript.hit();
            scoreScript.addScore(other.transform.position);
            scoreScript.addSpeedCounter();
            addCombos(other);

            if (isTrap && isPlayerAttack) {
                //Instantiate(trap, trapPosition, Quaternion.Euler(0, 0, 0));
            }

        }
        if (other.tag.CompareTo("EnemyBullet") == 0) {
            kills++;
            attackAudioScript.hit();
            scoreScript.addScore(other.transform.position);
            addCombos(other);
        }
    }

    void addCombos(Collider2D other)
    {
        m_comboScores++;
        if (m_comboScores > 1)
        {
            comboShowScript.setComboPosition(other.gameObject.transform.position, 1f,attackDirection);
        }
        if (m_comboScores >= 50)
        {
            attackAudioScript.perfectAttack();
            switch (attackDirection)
            {
                case "Left":
                    combosScript.setAnimation("yellow_L");
                    break;
                case "Right":
                    combosScript.setAnimation("yellow_R");
                    break;
                case "Up":
                    combosScript.setAnimation("yellow_U");
                    break;
                case "Down":
                    combosScript.setAnimation("yellow_D");
                    break;
                default: break;
            }
        }
        else if (m_comboScores >= 20 && m_comboScores < 50)
        {
            attackAudioScript.goodAttack();
            switch (attackDirection)
            {
                case "Left":
                    combosScript.setAnimation("blue_L");
                    break;
                case "Right":
                    combosScript.setAnimation("blue_R");
                    break;
                case "Up":
                    combosScript.setAnimation("blue_U");
                    break;
                case "Down":
                    combosScript.setAnimation("blue_D");
                    break;
                default: break;
            }
        }
    }
}

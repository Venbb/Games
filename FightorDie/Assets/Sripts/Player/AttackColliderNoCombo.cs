using UnityEngine;
using System.Collections;

public class AttackColliderNoCombo : MonoBehaviour {
    private float liveTime = 0.06f;
    private float timer = 0;

    public GameObject shakeScreenObj;
    ShakeScreen shakeScreenScript;

    public GameObject attackAudioObj;
    attackAudio attackAudioScript;

    public GameObject scoreObj;
    ScoreManager scoreScript;

    private int kills = 0;

    private string attackDirection; //1:left 2:right 3:up 4:down

    public Transform trap;
    public bool isPlayerAttack = false;

    // Use this for initialization


    void Start()
    {
        shakeScreenObj = GameObject.Find("Main Camera");
        shakeScreenScript = shakeScreenObj.GetComponent<ShakeScreen>();

        attackAudioObj = GameObject.Find("AttackAudios");
        attackAudioScript = attackAudioObj.GetComponent<attackAudio>();

        scoreObj = GameObject.Find("Kill");
        scoreScript = scoreObj.GetComponent<ScoreManager>();
    }

    // Update is called once per frame
    void Update()
    {
        if (timer > liveTime)
        {
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
            if (randomKey < 5 && isPlayerAttack)
            {
                isTrap = true;
            }

            kills++;

            float x = other.gameObject.transform.position.x;
            float y = other.gameObject.transform.position.y;
            if (Mathf.Abs(x) > Mathf.Abs(y))
            {
                if (x < 0)
                {
                    attackDirection = "Left";
                    shakeScreenScript.shakeScreen(2);
                    trapPosition = new Vector2(-6f, -0.1f);
                }
                else
                {
                    attackDirection = "Right";
                    shakeScreenScript.shakeScreen(3);
                    trapPosition = new Vector2(6f, -0.25f);
                }
            }
            else if (y > 0)
            {
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

            if (isTrap && isPlayerAttack)
            {
                Instantiate(trap, trapPosition, Quaternion.Euler(0, 0, 0));
            }

        }
        if (other.tag.CompareTo("EnemyBullet") == 0)
        {
            kills++;
            attackAudioScript.hit();
            scoreScript.addScore(other.transform.position);
        }
    }
}

using UnityEngine;
using System.Collections;

public class SkillManager : MonoBehaviour {
    private SkeletonAnimation animationTest;
    BoxCollider2D m_collider;

    public GameObject scoreObj;
    ScoreManager scoreScript;

    public GameObject shakeScreenObj;
    ShakeScreen shakeScreenScript;
    private int m_colliderFrame = 2;
    private bool isLaunch = false;

    public GameObject m_comboObj;
    CombosManager combosScript;
    public GameObject combosObj;
    ComboManager_L comboShowScript;
    private string attackDirection; //1:left 2:right 3:up 4:down
    private int m_comboScores;
    private int kills = 0;

    public GameObject attackAudioObj;
    attackAudio attackAudioScript;

    public Transform m_skillAudio;
    private M_PlayerPrefs m_prefs;
    private AudioManager m_AudioManager;

	// Use this for initialization
	void Start () {
        animationTest = this.GetComponent<SkeletonAnimation>();
        int randkey = Random.Range(0, 100) % 2;
        if (randkey == 0)
        {
            animationTest.state.SetAnimation(1, "lighting1", false);
        }
        else animationTest.state.SetAnimation(2, "lighting2", false);

        m_collider = this.GetComponent<BoxCollider2D>();

        scoreObj = GameObject.Find("Kill");
        scoreScript = scoreObj.GetComponent<ScoreManager>();

        m_comboObj = GameObject.Find("Combos");
        combosScript = m_comboObj.GetComponent<CombosManager>();
        combosObj = GameObject.Find("combos");
        comboShowScript = combosObj.GetComponent<ComboManager_L>();

        m_comboScores = scoreScript.comboScores;
        attackAudioObj = GameObject.Find("AttackAudios");
        attackAudioScript = attackAudioObj.GetComponent<attackAudio>();

        shakeScreenObj = GameObject.Find("Main Camera");
        shakeScreenScript = shakeScreenObj.GetComponent<ShakeScreen>();
        animationTest.state.Event += Event;
        animationTest.state.End += (state, trackIndex) =>
        {
            if (kills == 0) {
                scoreScript.comboScores = 0;
            }
            Destroy(this.gameObject);
        };

        m_AudioManager = GameObject.Find("Audios").GetComponent<AudioManager>();
        m_prefs = GameObject.Find("MyPlayer").GetComponent<M_PlayerPrefs>();
        if (!m_prefs.getAudioMute()) {
            //Instantiate(m_skillAudio, transform.position, transform.rotation);
            m_AudioManager.AttackThunder();
        }

	}

    void Event(Spine.AnimationState state, int trackIndex, Spine.Event e)
    {
        //Debug.Log(trackIndex + " " + state.GetCurrent(trackIndex) + ": event " + e + ", " + e.Int);
        if (e + "" == "launch")
        {
            m_collider.isTrigger = true;
            isLaunch = true;
        }
    }
	
	// Update is called once per frame
	void Update () {
        if (isLaunch) {
            m_colliderFrame--;
            if (m_colliderFrame <0) {
                Destroy(m_collider);
                isLaunch = false;
            }
        }
	}

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag.CompareTo("Enemy") == 0)
        {
            shakeScreenScript.shakeScreen(21);
            scoreScript.addScore(other.transform.position);
            float x = other.gameObject.transform.position.x;
            float y = other.gameObject.transform.position.y;
            if (Mathf.Abs(x) > Mathf.Abs(y))
            {
                if (x < 0)
                {
                    attackDirection = "Left";
                    shakeScreenScript.shakeScreen(2);
                }
                else
                {
                    attackDirection = "Right";
                    shakeScreenScript.shakeScreen(3);
                }
            }
            else if (y > 0)
            {
                attackDirection = "Up";
                shakeScreenScript.shakeScreen(4);
            }
            else
            {
                attackDirection = "Down";
                shakeScreenScript.shakeScreen(5);
            }
            m_comboScores++;
            if (m_comboScores > 1)
            {
                comboShowScript.setComboPosition(other.gameObject.transform.position,0.625f,attackDirection);
            }
            kills++;

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

    void OnDestroy() {
        animationTest.state.Event -= Event;
    }
}

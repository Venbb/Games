using UnityEngine;
using System.Collections;

public class AudioManager : MonoBehaviour {
    public GameObject BackgroundAudios;
    private AudioSource[] m_backgroundAudios;
    public GameObject EnemyAudios;
    private AudioSource[] m_enemyAudios;
    public GameObject OtherAudios;
    private AudioSource[] m_otherAudios;
    public Transform m_SkillAttackThunderAudio;

	// Use this for initialization
	void Start () {
        m_backgroundAudios = BackgroundAudios.GetComponents<AudioSource>();
        m_enemyAudios = EnemyAudios.GetComponents<AudioSource>();
        m_otherAudios = OtherAudios.GetComponents<AudioSource>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    //BackgroundAudios
    public void playInTitle() {
        m_backgroundAudios[1].Stop();
        m_backgroundAudios[0].Play();
    }

    public void playInfight() {
        m_backgroundAudios[0].Stop();
        m_backgroundAudios[1].Play();
        m_otherAudios[0].Play();
    }

    public void playThunder() {
        m_otherAudios[1].Play();
    }

    public void launchSkill() {
        m_otherAudios[2].Play();
    }

    public void AttackThunder()
    {
        Instantiate(m_SkillAttackThunderAudio, Vector3.zero, transform.rotation);
    }

    //EnemyAudios
    public void cheer()
    {
        m_enemyAudios[0].Play();
    }

    public void demonHit() {
        m_enemyAudios[1].Play();
    }

    public void normalkill() {
        m_enemyAudios[2].Play();
    }

    public void archerShoot() {
        m_enemyAudios[3].Play();
    }

    public void archerkill() {
        m_enemyAudios[4].Play();
    }
}

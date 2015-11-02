using UnityEngine;
using System.Collections;

public class CreatUISence : MonoBehaviour {
    public GameObject ReviveSence;
    public GameObject SettlementSence;
    private Transform m_transform;
    private bool isReviveTimeOut = false;
    private ReviveManager m_reviveManager;
	// Use this for initialization
	void Start () {
        m_transform = this.transform;
        m_reviveManager = ReviveSence.GetComponent<ReviveManager>();
	}
	
	// Update is called once per frame
	void Update () {
        if (isReviveTimeOut) {
            loadSettetment();
            isReviveTimeOut = false;
        }
	}

    public void loadRevive() {
        m_reviveManager.setAviliable(true);
    }

    public void loadSettetment() {
        GameObject.Find("TouchController").GetComponent<MyTouchController>().resetReviveTimes();
        SettlementSence.GetComponent<SettetmentManager>().setAviliable(true);
        m_reviveManager.setAviliable(false);
    }

    public void ReviveTimeOut() {
        isReviveTimeOut = true;
    }
}

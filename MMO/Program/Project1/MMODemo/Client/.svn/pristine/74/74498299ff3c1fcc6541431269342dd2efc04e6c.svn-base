using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SelectRole : MonoBehaviour {
    public eJob curjob = eJob.j_jss;
    public int curGender = 0;
    public GameObject nanObj;
    public GameObject nvObj;
    public GameObject[] gameObjects;

    public Image title;
    public Text desc;
    public Image skillicon1;
    public Text skillname1;
    public Text skilldesc1;
    public Image skillicon2;
    public Text skillname2;
    public Text skilldesc2;
    public Image skillicon3;
    public Text skillname3;
    public Text skilldesc3;

    public void OnSelctJob(GameObject gameObject)
    {
        int index = int.Parse(gameObject.name);
        curjob = (eJob)index;
        for (int i = 0; i < gameObjects.Length; i++)
        {
            if (i == index)
            {
                gameObjects[i].SetActive(true);
            }
            else
            {
                gameObjects[i].SetActive(false);
            }
        }
        SetSelectPanel(curjob);
    }
    public void OnSelectGender(GameObject gameObject)
    {
        curGender = int.Parse(gameObject.name);
        SetSelectGender();
    }
    public void SetSelectGender()
    {
        if (curGender == 0)
        {
            nanObj.SetActive(true);
            nvObj.SetActive(false);
        }
        else
        {
            nanObj.SetActive(false);
            nvObj.SetActive(true);
        }
    }
    public void SetSelectPanel(eJob job)
    {
        SelectRoleData selectRole = SelectRoleConfig.Instance.GetSelectRole(job);
        title.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UICreateRole/{0}", selectRole.title));
        title.SetNativeSize();
        desc.text = selectRole.desc;
        skillicon1.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UICreateRole/{0}", selectRole.skillicon1)); ;
        skillname1.text = selectRole.skillname1;
        skilldesc1.text = selectRole.skilldesc1;
        skillicon2.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UICreateRole/{0}", selectRole.skillicon2));
        skillname2.text = selectRole.skillname2;
        skilldesc2.text = selectRole.skilldesc2;
        skillicon3.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/UICreateRole/{0}", selectRole.skillicon3));
        skillname3.text = selectRole.skillname3;
        skilldesc3.text = selectRole.skillname3;
    }
}

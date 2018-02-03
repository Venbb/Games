using UnityEngine;
using UnityEngine.UI;
public class UISeverItem: MonoBehaviour
{
    public int idx;
    public Text mName;
    public eServerState mStatus;
    public GameObject mSignIcon;
    public Image mState;
    public void SetRankData(ServerInfo info)
    {
        idx = info.nSvrId;
        mName.text = info.sName;
        mStatus = info.eState;
        SetState(mStatus);
        if (info.eState == eServerState.Server_State_Recommend)
        {
            mSignIcon.SetActive(true);
        }
        else
        {
            mSignIcon.SetActive(false);
        }
    }
    private void SetState(eServerState state)
    {
        string iconName = "icon_server_fm";
        switch (state)
        {
            case eServerState.Server_State_Busy:
                iconName = "icon_server_fm";
                break;
            case eServerState.Server_State_Good:
                iconName = "icon_server_lc";
                break;
            case eServerState.Server_State_Hot:
                iconName = "icon_server_hb";
                break;
            case eServerState.Server_State_New:
                iconName = "icon_server_lc";
                break;
            case eServerState.Server_State_Recommend:
                iconName = "icon_server_lc";
                break;
        }
        mState.overrideSprite = UGUIUtils.Instance.LoadSimpleImageFromResource(string.Format("GameUI/Common/{0}", iconName));
    }
}


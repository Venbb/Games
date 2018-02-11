using UnityEngine;
using ClientBase.UIFrameWork;
using UnityEngine.UI;
using UMA.CharacterSystem;

public class UICreateRole : UIBase {
    public InputField mNameInput;
    public GameObject mCreateBtn;
    public SelectRole selectRole;
    public UMAOperation operation;
    public SkeletonModifiersPanel modifiersPanel;

    private int CountStringNum(string str)
    {
        int num = 0;

        if (HasInvalidChar(str))
            return -1;

        for (int i = 0; i < str.Length; i++)
        {
            if (IsChineseLetter(str, i))
            {
                num += 2;
            }
            else
                ++num;
        }
        return num;
    }
    private bool HasInvalidChar(string str)
    {
        return (str.IndexOf(' ') >= 0) || str != str.Trim() || str.IndexOf('\r') >= 0 || str.IndexOf('\n') >= 0;
    }
    private bool IsChineseLetter(string input, int index)
    {
        int code = 0;
        int chfrom = System.Convert.ToInt32("4e00", 16);
        int chend = System.Convert.ToInt32("9fff", 16);

        code = System.Char.ConvertToUtf32(input, index);
        if (code >= chfrom && code <= chend)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    private void OnCreatRole()
    {
        UMAPackBase.Instance.Save(modifiersPanel.characterAvatar.umaData.umaRecipe);
        ProtocolFuns.CreateRole(mNameInput.text, 0, 0);
        mCreateBtn.SetActive(false);
    }

    #region 接受界面响应
    public void URandomName()
    {
        mNameInput.text = RandomNameManager.Instance.RandomName();
    }
    public void UCreateRole()
    {
        mNameInput.text = mNameInput.text.Trim();
        if (mNameInput.text.Length == 0)
        {
            //UIManager.Instance.PushScreenTip(StringsMgr.cstr_createrole_long_ero1);
            return;
        }

        if (CountStringNum(mNameInput.text) <= 0)
        {
            //UIManager.Instance.PushScreenTip(StringsMgr.cstr_createrole_name_error);
            return;
        }

        if (CountStringNum(mNameInput.text) > 12)
        {
            //UIManager.Instance.PushScreenTip(StringsMgr.cstr_createrole_long_ero2);
            return;
        }
        OnCreatRole();
    }
    #endregion
    public void GoNext()
    {
        operation.gameObject.SetActive(true);
        selectRole.gameObject.SetActive(false);
        modifiersPanel.OnInitData();
    }
    public void BackOff()
    {
        operation.gameObject.SetActive(false);
        selectRole.gameObject.SetActive(true);
        modifiersPanel.ResetData();
    }
}

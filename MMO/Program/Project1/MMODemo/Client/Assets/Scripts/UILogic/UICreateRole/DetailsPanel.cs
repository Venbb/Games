using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class DetailsPanel : MonoBehaviour {
    public SkeletonModifiersPanel skeletonModifiers;
    public TreeViewControl viewControl;
    public GridLayoutGroup mDetailsGrid;
    public GameObject mBonesElement;
    private List<BonesItem> mDetailsObjList = new List<BonesItem>();
    private eUMAPlace curSelcet = 0;

    private void OnEnable()
    {
        viewControl.ClickItemEvent += OnClickTreeItem;
    }
    private void OnDisable()
    {
        viewControl.ClickItemEvent -= OnClickTreeItem;
    }
    public void OnClickTreeItem(TreeViewItem treeView)
    {
        SetDetailsPanel(treeView.ePart, treeView.eOperation);
    }
    public void SetDetailsPanel(eUMAPart ePart, eOperationPart eOperation)
    {
        if (eOperation == eOperationPart.OP_Adjustment)
        {
            List<BonesTree> bonesTrees = XBonesTreeConfig.Instance.GetBonesTrees(ePart);
            if (bonesTrees.Count > 0)
            {
                curSelcet = bonesTrees[0].place;
                skeletonModifiers.SetDnaDNAComponents(curSelcet);
            }
            int count = mDetailsObjList.Count;
            int index = 0;
            BonesItem item = null;
            foreach (BonesTree bones in bonesTrees)
            {
                if (index < count)
                {
                    item = mDetailsObjList[index].GetComponent<BonesItem>();
                    item.gameObject.SetActive(true);
                    if (bones.place == curSelcet)
                    {
                        item.SetBonesData(bones, true);
                    }
                    else
                    {
                        item.SetBonesData(bones, false);
                    }
                }
                else
                {
                    GameObject ret = GameObject.Instantiate(mBonesElement) as GameObject;
                    ret.transform.SetParent(mDetailsGrid.transform);
                    ret.transform.localScale = Vector3.one;
                    item = ret.GetComponent<BonesItem>();
                    item.gameObject.SetActive(true);
                    if (bones.place == curSelcet)
                    {
                        item.SetBonesData(bones, true);
                    }
                    else
                    {
                        item.SetBonesData(bones, false);
                    }

                    mDetailsObjList.Add(item);
                }
                index++;
            }
            if (index < count)
            {
                for (int i = index; i < count; i++)
                {
                    mDetailsObjList[i].gameObject.SetActive(false);
                }
            }
            mDetailsGrid.useGUILayout = true;
        }
        else if (eOperation == eOperationPart.OP_BrowFigure)
        {
            int count = mDetailsObjList.Count;
            for (int i = 0; i < count; i++)
            {
                mDetailsObjList[i].gameObject.SetActive(false);
            }
        }
        else if (eOperation == eOperationPart.OP_Shape)
        {
            int count = mDetailsObjList.Count;
            for (int i = 0; i < count; i++)
            {
                mDetailsObjList[i].gameObject.SetActive(false);
            }
        }
        else if (eOperation == eOperationPart.OP_None)
        {
            int count = mDetailsObjList.Count;
            for (int i = 0; i < count; i++)
            {
                mDetailsObjList[i].gameObject.SetActive(false);
            }
        }
    }

    public void OnSetSelect(BonesItem bonesItem)
    {
        int count = mDetailsObjList.Count;
        for (int i = 0; i < count; i++)
        {
            if (mDetailsObjList[i].id == bonesItem.id)
            {
                curSelcet = bonesItem.id;
                mDetailsObjList[i].SetSelectState(true);
                skeletonModifiers.SetDnaDNAComponents(curSelcet);
            }
            else
            {
                mDetailsObjList[i].SetSelectState(false);
            }
        }

    }
}

using System.Collections;
using System.Collections.Generic;
using UMA;
using UMA.CharacterSystem;
using UnityEngine;
using UnityEngine.UI;
public class SkeletonModifiersPanel : MonoBehaviour {
    public DynamicCharacterAvatar characterAvatar;
    public DynamicDNAConverterBehaviour dynamicDNAConverterBehaviour;
    public DnaConverterBehaviour dnaConverterBehaviour;
    public List<PropItem> mProplist;
    public ePropType property = ePropType.Position;
    public DNAComponent dxNAEditor;
    public DNAComponent dyNAEditor;
    private Vector3 dxPos;
    private Vector3 dyPos;
    public Vector3 mMidPos;
    public eUMAPlace ePlace = eUMAPlace.UMA_None;
    public TreeViewControl control;
    private GameObject mModel;
    public UIPartPanel uIPart;
    public Image huanyuan;
    public Text hytext;
    private void Awake()
    {
        dxPos = dxNAEditor.transform.localPosition;
        dyPos = dyNAEditor.transform.localPosition;
    }
    public void OnInitData()
    {
        if (characterAvatar == null)
        {
            GenerateOneUMA();
        }
        uIPart.InitTreeView();
    }
    public void ResetData()
    {
        if (mModel != null)
        {
            Destroy(mModel);
        }
        if (characterAvatar != null)
        {
            Destroy(characterAvatar);
        }
        property = ePropType.Position;
        ePlace = eUMAPlace.UMA_None;
    }
    public void GenerateOneUMA()
    {
        Vector3 zeroPos = Vector3.zero;
        mModel = new GameObject("Generated Character");
        mModel.transform.SetParent(ActorManager.Instance.roleRoot.transform);
        mModel.transform.position = zeroPos;
        mModel.transform.rotation = Quaternion.identity;
        characterAvatar = mModel.AddComponent<DynamicCharacterAvatar>();
        characterAvatar.dynamicDNAConverterBehaviour = dynamicDNAConverterBehaviour;
        Object obj1 = Resources.Load("UMADemo/guizu_nv_nl");
        GameObject obj = GameObject.Instantiate(obj1) as GameObject;
        obj.transform.SetParent(mModel.transform);
        obj.transform.position = Vector3.zero;
        obj.transform.rotation = Quaternion.Euler(0,180,0);
        obj.transform.localScale = Vector3.one;
        characterAvatar.umaData = obj.transform.GetComponentInChildren<UMAData>();
        SkinnedMeshRenderer skinnedMesh = characterAvatar.umaData.transform.GetComponent<SkinnedMeshRenderer>();
        characterAvatar.umaData.skeleton = new UMASkeleton(skinnedMesh.rootBone);
        var dnaTypeHash = dnaConverterBehaviour.DNATypeHash;
        if (dnaTypeHash != 0)
        {
            var dna = dnaConverterBehaviour.DNAType.GetConstructor(System.Type.EmptyTypes).Invoke(null) as UMADnaBase;
            dna.DNATypeHash = dnaTypeHash;
            characterAvatar.umaData.umaRecipe.AddDna(dna);
            characterAvatar.umaData.umaRecipe.dnaValues.Add(dna);
        }
        else
        {
            Debug.Log("DNA EEAR");
        }
        dynamicDNAConverterBehaviour.ApplyDynamicDnaAction(characterAvatar.umaData, characterAvatar.umaData.skeleton);
        InitDNAData();
        SetDnaDNAComponents(ePlace, property);
    }
    public void InitDNAData()
    {
        UMADnaBase[] DNA = characterAvatar.GetAllDNA();
        foreach (UMADnaBase d in DNA)
        {
            for (int i = 0; i < d.Values.Length; i++)
            {
                d.Values[i] = XDNAConfig.Instance.GetDnaConfig(d.Names[i]);
            }
        }
        dynamicDNAConverterBehaviour.ApplyDynamicDnaAction(characterAvatar.umaData, characterAvatar.umaData.skeleton);
    }
    public void RemoveDNAChangesFromSkeleton()
    {
        if (huanyuan.gameObject.activeSelf)
        {
            huanyuan.gameObject.SetActive(false);
            hytext.color = new Color(154.0f / 255.0f, 154.0f / 255.0f, 154.0f / 255.0f);
        }
        UMADnaBase[] DNA = characterAvatar.GetAllDNA();
        foreach (UMADnaBase d in DNA)
        {
            for (int i = 0; i < d.Values.Length; i++)
            {
                d.Values[i] = XDNAConfig.Instance.GetDnaConfig(d.Names[i]);
            }
        }
        dynamicDNAConverterBehaviour.RemoveDNAChangesFromSkeleton(characterAvatar.umaData);
        SetDnaDNAComponents(ePlace, property);
    }
    public void ChangePropType(PropItem item)
    {
        property = item.property;
        for (int i = 0; i < mProplist.Count; i++)
        {
            if (item.property == mProplist[i].property)
            {
                mProplist[i].OnSelected(true);
            }
            else
            {
                mProplist[i].OnSelected(false);
            }
        }
        SetDnaDNAComponents(ePlace,property);
    }
    public void SetProItem(eUMAPlace ePlace)
    {
        List<DNAData> Posinfo = XDNAConfig.Instance.GetDnaList(ePlace, ePropType.Position);
        if (Posinfo.Count != 0)
        {
            mProplist[0].OnSetEnble(true);
        }
        else
        {
            mProplist[0].OnSetEnble(false);
        }
        List<DNAData> Rotinfo = XDNAConfig.Instance.GetDnaList(ePlace, ePropType.Rotation);
        if (Rotinfo.Count != 0)
        {
            mProplist[1].OnSetEnble(true);
        }
        else
        {
            mProplist[1].OnSetEnble(false);
        }
        List<DNAData> Sclinfo = XDNAConfig.Instance.GetDnaList(ePlace, ePropType.Scale);
        if (Sclinfo.Count != 0)
        {
            mProplist[2].OnSetEnble(true);
        }
        else
        {
            mProplist[2].OnSetEnble(false);
        }

    }
    public void SetDnaDNAComponents(eUMAPlace place)
    {
        ePlace = place;
        SetDnaDNAComponents(place, property);
    }
    private void SetDnaDNAComponents(eUMAPlace place, ePropType prop)
    {
        SetProItem(place);
        dxNAEditor.gameObject.SetActive(false);
        dyNAEditor.gameObject.SetActive(false);
        List<DNAData> info = XDNAConfig.Instance.GetDnaList(place, prop);
        UMADnaBase[] DNA = characterAvatar.GetAllDNA();
        List<DNAHolder> ValidDNA = new List<DNAHolder>();
        foreach (UMADnaBase d in DNA)
        {
            string[] names = d.Names;
            float[] values = d.Values;

            for (int i = 0; i < names.Length; i++)
            {
                string name = names[i];
                foreach (DNAData data in info)
                {
                    if (name.Equals(data.dnaname))
                    {
                        ValidDNA.Add(new DNAHolder(name, values[i], i, d,data.maxValue,data.mpos, data.uptext,data.lowtext));
                    }
                }
            }
        }
        if (ValidDNA.Count == 1)
        {
            if (ValidDNA[0].mpos == 0)
            {
                dxNAEditor.Initialize(ValidDNA[0].name.BreakupCamelCase(), ValidDNA[0].index, ValidDNA[0].dnaBase, characterAvatar, ValidDNA[0].value, ValidDNA[0].upString, ValidDNA[0].lowString, ValidDNA[0].max);
                dxNAEditor.transform.localPosition = mMidPos;
            }
            else
            {
                dyNAEditor.Initialize(ValidDNA[0].name.BreakupCamelCase(), ValidDNA[0].index, ValidDNA[0].dnaBase, characterAvatar, ValidDNA[0].value, ValidDNA[0].upString, ValidDNA[0].lowString, ValidDNA[0].max);
                dyNAEditor.transform.localPosition = mMidPos;
            }
        }
        else
        {
            foreach (DNAHolder dna in ValidDNA)
            {
                if (dna.mpos == 0)
                {
                    dxNAEditor.Initialize(dna.name.BreakupCamelCase(), dna.index, dna.dnaBase, characterAvatar, dna.value, dna.upString, dna.lowString, dna.max);
                    dxNAEditor.transform.localPosition = dxPos;
                }
                else
                {
                    dyNAEditor.Initialize(dna.name.BreakupCamelCase(), dna.index, dna.dnaBase, characterAvatar, dna.value, dna.upString, dna.lowString, dna.max);
                    dyNAEditor.transform.localPosition = dyPos;
                }
            }
        }
    }
}

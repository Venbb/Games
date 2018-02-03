using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UMA;
using UMA.CharacterSystem;
public class DynamicDemo : UMAAvatarBase
{

    public DynamicDNAConverterBehaviour dynamicDNAConverterBehaviour;
    public DnaConverterBehaviour dnaConverterBehaviour;
    public TestCustomizerDD testCustomizerDD;
    public UMADnaBase[] GetAllDNA()
    {
        return umaData.GetAllDna();
    }
    public void ForceUpdate()
    {
        umaData.skeleton.ResetAll();
        dynamicDNAConverterBehaviour.ApplyDynamicDnaAction(umaData, umaData.skeleton);
    }
    private void Awake()
    {

    }
    private void Start()
    {
        GenerateOneUMA();
    }
    public GameObject GenerateOneUMA()
    {
        Vector3 zeroPos = Vector3.zero;
        GameObject newGO = new GameObject("Generated Character");
        newGO.transform.SetParent(transform);
        newGO.transform.position = zeroPos;
        newGO.transform.rotation = transform.rotation;
        Object obj1 = Resources.Load("UMADemo/guizu_nv_nl");
        GameObject obj = GameObject.Instantiate(obj1) as GameObject;
        obj.transform.SetParent(newGO.transform);
        obj.transform.position = Vector3.zero;
        obj.transform.rotation = Quaternion.identity;
        obj.transform.localScale = Vector3.one;
        umaData = obj.transform.GetComponentInChildren<UMAData>();
        SkinnedMeshRenderer skinnedMesh = umaData.transform.GetComponent<SkinnedMeshRenderer>();
        umaData.skeleton = new UMASkeleton(skinnedMesh.rootBone);
        var dnaTypeHash = dnaConverterBehaviour.DNATypeHash;
        if (dnaTypeHash != 0)
        {
            var dna = dnaConverterBehaviour.DNAType.GetConstructor(System.Type.EmptyTypes).Invoke(null) as UMADnaBase;
            dna.DNATypeHash = dnaTypeHash;
            umaData.umaRecipe.AddDna(dna);
            umaData.umaRecipe.dnaValues.Add(dna);
        }
        else
        {
            Debug.Log("DNA EEAR");
        }
        dynamicDNAConverterBehaviour.ApplyDynamicDnaAction(umaData, umaData.skeleton);
        //GenerateUMAShapes();
        //HumanoidMaleDnaConverterBehaviour.UpdateUMAMaleDNABones(umaData, umaData.skeleton);
        //umaMesh.RetrieveDataFromUnityMesh(umaData.myRenderer);
        //umaMesh.ApplyDataToUnityMesh(umaData.myRenderer, umaData.skeleton);
        testCustomizerDD.ShowHideFaceDNA();
        return newGO;
    }
}

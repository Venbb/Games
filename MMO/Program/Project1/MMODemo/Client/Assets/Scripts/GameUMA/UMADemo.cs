using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UMA;
using UMA.CharacterSystem;

public class UMADemo : MonoBehaviour {
    public DynamicCharacterAvatar characterAvatar;
    public DynamicDNAConverterBehaviour dynamicDNAConverterBehaviour;
    public DnaConverterBehaviour dnaConverterBehaviour;
    //UMAMeshData umaMesh = new UMAMeshData();
    private void OnGUI()
    {
        if (GUILayout.Button("创建角色"))
        {
            GenerateOneUMA();
        }
        if (GUILayout.Button("获取骨骼值"))
        {
            int shullAdjustHash = UMAUtils.StringToHash("shull");
            Debug.Log(characterAvatar.umaData.skeleton.GetPosition(shullAdjustHash));
        }
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
        //GenerateUMAShapes();
        //HumanoidMaleDnaConverterBehaviour.UpdateUMAMaleDNABones(umaData, umaData.skeleton);
        //umaMesh.RetrieveDataFromUnityMesh(umaData.myRenderer);
        //umaMesh.ApplyDataToUnityMesh(umaData.myRenderer, umaData.skeleton);
        return newGO;
    }
    protected virtual void GenerateUMAShapes()
    {
        UMADnaHumanoid umaDna = characterAvatar.umaData.umaRecipe.GetDna<UMADnaHumanoid>();
        if (umaDna == null)
        {
            umaDna = new UMADnaHumanoid();
            characterAvatar.umaData.umaRecipe.AddDna(umaDna);
        }
        umaDna.shullPositionx = 0.5f;
        umaDna.shullPositionz = 0.5f;
        umaDna.shullRotationx = 0.5f;
        umaDna.shullRotationz = 0.5f;
        umaDna.shullSize = 0.5f;

        umaDna.cheek_lPositionx = 0.5f;
        umaDna.cheek_lPositionz = 0.5f;
        umaDna.cheek_lRotationx = 0.5f;
        umaDna.cheek_lRotationz = 0.5f;
        umaDna.cheek_lSize = 0.5f;

        umaDna.cheek_rPositionx = 0.5f;
        umaDna.cheek_rPositionz = 0.5f;
        umaDna.cheek_rRotationx = 0.5f;
        umaDna.cheek_rRotationz = 0.5f;
        umaDna.cheek_rSize = 0.5f;

        umaDna.cheek_02_lPositionx = 0.5f;
        umaDna.cheek_02_lPositionz = 0.5f;
        umaDna.cheek_02_lRotationx = 0.5f;
        umaDna.cheek_02_lRotationz = 0.5f;
        umaDna.cheek_02_lSize = 0.5f;

        umaDna.chin_02_rPositionx = 0.5f;
        umaDna.chin_02_rPositionz = 0.5f;
        umaDna.chin_02_rRotationx = 0.5f;
        umaDna.chin_02_rRotationz = 0.5f;
        umaDna.chin_02_rSize = 0.5f;

        umaDna.chin_03_rPositionx = 0.5f;
        umaDna.chin_03_rPositionz = 0.5f;
        umaDna.chin_03_rRotationx = 0.5f;
        umaDna.chin_03_rRotationz = 0.5f;
        umaDna.chin_03_rSize = 0.5f;

        umaDna.chinPositionx = 0.5f;
        umaDna.chinPositionz = 0.5f;
        umaDna.chinRotationx = 0.5f;
        umaDna.chinRotationz = 0.5f;
        umaDna.chinSize = 0.5f;

        umaDna.cheekbone_rPositionx = 0.5f;
        umaDna.cheekbone_rPositionz = 0.5f;
        umaDna.cheekbone_rRotationx = 0.5f;
        umaDna.cheekbone_rRotationz = 0.5f;
        umaDna.cheekbone_rSize = 0.5f;

        umaDna.brow_rPositionx = 0.5f;
        umaDna.brow_rPositionz = 0.5f;
        umaDna.brow_rRotationx = 0.5f;
        umaDna.brow_rRotationz = 0.5f;
        umaDna.brow_rSize = 0.5f;

        umaDna.tailbrow_rPositionx = 0.5f;
        umaDna.tailbrow_rPositionz = 0.5f;
        umaDna.tailbrow_rRotationx = 0.5f;
        umaDna.tailbrow_rRotationz = 0.5f;
        umaDna.tailbrow_rSize = 0.5f;

        umaDna.canthus_rPositionx = 0.5f;
        umaDna.canthus_rPositionz = 0.5f;
        umaDna.canthus_rRotationx = 0.5f;
        umaDna.canthus_rRotationz = 0.5f;
        umaDna.canthus_rSize = 0.5f;

        umaDna.endeye_rPositionx = 0.5f;
        umaDna.endeye_rPositionz = 0.5f;
        umaDna.endeye_rRotationx = 0.5f;
        umaDna.endeye_rRotationz = 0.5f;
        umaDna.endeye_rSize = 0.5f;

        umaDna.eyePositionx = 0.5f;
        umaDna.eyePositionz = 0.5f;
        umaDna.eyeRotationx = 0.5f;
        umaDna.eyeRotationz = 0.5f;
        umaDna.eyeSize = 0.5f;

        umaDna.upeye_rPositionx = 0.5f;
        umaDna.upeye_rPositionz = 0.5f;
        umaDna.upeye_rRotationx = 0.5f;
        umaDna.upeye_rRotationz = 0.5f;
        umaDna.upeye_rSize = 0.5f;

        umaDna.loweye_rPositionx = 0.5f;
        umaDna.loweye_rPositionz = 0.5f;
        umaDna.loweye_rRotationx = 0.5f;
        umaDna.loweye_rRotationz = 0.5f;
        umaDna.loweye_rSize = 0.5f;

        umaDna.nosePositionx = 0.5f;
        umaDna.nosePositionz = 0.5f;
        umaDna.noseRotationx = 0.5f;
        umaDna.noseRotationz = 0.5f;
        umaDna.noseSize = 0.5f;

        umaDna.tipnosePositionx = 0.5f;
        umaDna.tipnosePositionz = 0.5f;
        umaDna.tipnoseRotationx = 0.5f;
        umaDna.tipnoseRotationz = 0.5f;
        umaDna.tipnoseSize = 0.5f;

        umaDna.nose_upPositionx = 0.5f;
        umaDna.nose_upPositionz = 0.5f;
        umaDna.nose_upRotationx = 0.5f;
        umaDna.nose_upRotationz = 0.5f;
        umaDna.nose_upSize = 0.5f;

        umaDna.nasalnosePositionx = 0.5f;
        umaDna.nasalnosePositionz = 0.5f;
        umaDna.nasalnoseRotationx = 0.5f;
        umaDna.nasalnoseRotationz = 0.5f;
        umaDna.nasalnoseSize = 0.5f;

        umaDna.nosewing_rPositionx = 0.5f;
        umaDna.nosewing_rPositionz = 0.5f;
        umaDna.nosewing_rRotationx = 0.5f;
        umaDna.nosewing_rRotationz = 0.5f;
        umaDna.nosewing_rSize = 0.5f;

        umaDna.mouthPositionx = 0.5f;
        umaDna.mouthPositionz = 0.5f;
        umaDna.mouthRotationx = 0.5f;
        umaDna.mouthRotationz = 0.5f;
        umaDna.mouthSize = 0.5f;

        umaDna.lipmouthPositionx = 0.5f;
        umaDna.lipmouthPositionz = 0.5f;
        umaDna.lipmouthRotationx = 0.5f;
        umaDna.lipmouthRotationz = 0.5f;
        umaDna.lipmouthSize = 0.5f;

        umaDna.upmouthPositionx = 0.5f;
        umaDna.upmouthPositionz = 0.5f;
        umaDna.upmouthRotationx = 0.5f;
        umaDna.upmouthRotationz = 0.5f;
        umaDna.upmouthSize = 0.5f;

        umaDna.lowmouthPositionx = 0.5f;
        umaDna.lowmouthPositionz = 0.5f;
        umaDna.lowmouthRotationx = 0.5f;
        umaDna.lowmouthRotationz = 0.5f;
        umaDna.lowmouthSize = 0.5f;
        //umaDna.shullPositionx = Random.Range(0.3f, 0.5f);
        //umaDna.shullPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.shullRotationx = Random.Range(0.4f, 0.6f);
        //umaDna.shullRotationz = Random.Range(0.495f, 0.51f);
        //umaDna.shullSize = Random.Range(0.485f, 0.515f);

        //umaDna.cheek_lPositionx = Random.Range(0.3f, 0.5f);
        //umaDna.cheek_lPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_lRotationx = Random.Range(0.4f, 0.6f);
        //umaDna.cheek_lRotationz = Random.Range(0.495f, 0.51f);
        //umaDna.cheek_lSize = Random.Range(0.485f, 0.515f);

        //umaDna.cheek_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.cheek_02_lPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_02_lPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_02_lRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_02_lRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.cheek_02_lSize = Random.Range(0.485f, 0.515f);

        //umaDna.chin_02_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.chin_02_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.chin_02_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.chin_02_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.chin_02_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.chin_03_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.chin_03_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.chin_03_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.chin_03_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.chin_03_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.chinPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.chinPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.chinRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.chinRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.chinSize = Random.Range(0.485f, 0.515f);

        //umaDna.cheekbone_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.cheekbone_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.cheekbone_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.cheekbone_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.cheekbone_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.brow_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.brow_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.brow_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.brow_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.brow_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.tailbrow_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.tailbrow_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.tailbrow_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.tailbrow_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.tailbrow_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.canthus_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.canthus_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.canthus_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.canthus_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.canthus_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.endeye_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.endeye_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.endeye_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.endeye_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.endeye_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.eyePositionx = Random.Range(0.485f, 0.515f);
        //umaDna.eyePositionz = Random.Range(0.485f, 0.515f);
        //umaDna.eyeRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.eyeRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.eyeSize = Random.Range(0.485f, 0.515f);

        //umaDna.upeye_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.upeye_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.upeye_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.upeye_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.upeye_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.loweye_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.loweye_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.loweye_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.loweye_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.loweye_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.nosePositionx = Random.Range(0.485f, 0.515f);
        //umaDna.nosePositionz = Random.Range(0.485f, 0.515f);
        //umaDna.noseRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.noseRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.noseSize = Random.Range(0.485f, 0.515f);

        //umaDna.tipnosePositionx = Random.Range(0.485f, 0.515f);
        //umaDna.tipnosePositionz = Random.Range(0.485f, 0.515f);
        //umaDna.tipnoseRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.tipnoseRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.tipnoseSize = Random.Range(0.485f, 0.515f);

        //umaDna.nose_upPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.nose_upPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.nose_upRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.nose_upRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.nose_upSize = Random.Range(0.485f, 0.515f);

        //umaDna.nasalnosePositionx = Random.Range(0.485f, 0.515f);
        //umaDna.nasalnosePositionz = Random.Range(0.485f, 0.515f);
        //umaDna.nasalnoseRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.nasalnoseRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.nasalnoseSize = Random.Range(0.485f, 0.515f);

        //umaDna.nosewing_rPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.nosewing_rPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.nosewing_rRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.nosewing_rRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.nosewing_rSize = Random.Range(0.485f, 0.515f);

        //umaDna.mouthPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.mouthPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.mouthRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.mouthRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.mouthSize = Random.Range(0.485f, 0.515f);

        //umaDna.lipmouthPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.lipmouthPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.lipmouthRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.lipmouthRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.lipmouthSize = Random.Range(0.485f, 0.515f);

        //umaDna.upmouthPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.upmouthPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.upmouthRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.upmouthRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.upmouthSize = Random.Range(0.485f, 0.515f);

        //umaDna.lowmouthPositionx = Random.Range(0.485f, 0.515f);
        //umaDna.lowmouthPositionz = Random.Range(0.485f, 0.515f);
        //umaDna.lowmouthRotationx = Random.Range(0.485f, 0.515f);
        //umaDna.lowmouthRotationz = Random.Range(0.485f, 0.515f);
        //umaDna.lowmouthSize = Random.Range(0.485f, 0.515f);
    }
}

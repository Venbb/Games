using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UMA.PoseTools;

public class UMABonePoseWindow : EditorWindow
{
    public Transform sourceSkeleton;
    public UnityEngine.Object poseFolder;
    private string skelPoseID;
    void OnGUI()
    {
        sourceSkeleton = EditorGUILayout.ObjectField("Rig Prefab", sourceSkeleton, typeof(Transform), true) as Transform;
        poseFolder = EditorGUILayout.ObjectField("Pose Folder", poseFolder, typeof(UnityEngine.Object), false) as UnityEngine.Object;
        EnforceFolder(ref poseFolder);
        EditorGUILayout.Space();
        skelPoseID = EditorGUILayout.TextField("ID", skelPoseID);
        if ((sourceSkeleton == null) || (skelPoseID == null) || (skelPoseID.Length < 1))
        {
            GUI.enabled = false;
        }
        if (GUILayout.Button("Build Pose"))
        {
            string folderPath;
            if (poseFolder != null)
            {
                folderPath = AssetDatabase.GetAssetPath(poseFolder);
            }
            else
            {
                return;
            }
            UMABonePose bonePose = CreatePoseAsset(folderPath, skelPoseID);
            SkinnedMeshRenderer skinnedMesh = sourceSkeleton.GetComponent<SkinnedMeshRenderer>();
            Transform[] sourceBones = UMABonePose.GetTransformsInPrefab(skinnedMesh.rootBone);
            List<UMABonePose.PoseBone> poseList = new List<UMABonePose.PoseBone>();
            foreach (Transform bone in sourceBones)
            {
                UMABonePose.PoseBone poseB = new UMABonePose.PoseBone();
                poseB.bone = bone.name;
                poseB.position = bone.localPosition;
                poseB.rotation = bone.localRotation;
                poseB.scale = new Vector3(bone.localScale.x,
                                        bone.localScale.y,
                                        bone.localScale.z);

                poseList.Add(poseB);
            }
            bonePose.poses = poseList.ToArray();
            EditorUtility.SetDirty(bonePose);
            AssetDatabase.SaveAssets();
        }
        GUI.enabled = true;
    }
    public static UMABonePose CreatePoseAsset(string assetFolder, string assetName)
    {
        if (!System.IO.Directory.Exists(assetFolder))
        {
            System.IO.Directory.CreateDirectory(assetFolder);
        }

        UMABonePose asset = ScriptableObject.CreateInstance<UMABonePose>();

        AssetDatabase.CreateAsset(asset, assetFolder + "/" + assetName + ".asset");

        AssetDatabase.SaveAssets();

        return asset;
    }
    public void EnforceFolder(ref UnityEngine.Object folderObject)
    {
        if (folderObject != null)
        {
            string destpath = AssetDatabase.GetAssetPath(folderObject);

            if (string.IsNullOrEmpty(destpath))
            {
                folderObject = null;
            }
            else if (!System.IO.Directory.Exists(destpath))
            {
                destpath = destpath.Substring(0, destpath.LastIndexOf('/'));
                folderObject = AssetDatabase.LoadMainAssetAtPath(destpath);
            }
        }
    }
    [MenuItem("UMA/BonePose")]
    public static void OpenUMABoneWindow()
    {
        EditorWindow win = EditorWindow.GetWindow(typeof(UMABonePoseWindow));
        win.titleContent.text = "Pose Builder";
    }
}

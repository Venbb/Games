using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif
using System.Collections;
using System.Collections.Generic;
using UMA.PoseTools;

namespace UMA.CharacterSystem
{
    public class DynamicDNAConverterCustomizer : MonoBehaviour
    {
		#if UNITY_EDITOR		
        public GameObject dynamicDnaConverterPrefab;//used for saving dnaConverter as new
        public RuntimeAnimatorController TposeAnimatorController;
        public RuntimeAnimatorController AposeAnimatorController;
        public RuntimeAnimatorController MovementAnimatorController;
        [System.NonSerialized]
        string activeUMARace;
        [SerializeField]
        public List<DynamicDNAConverterBehaviour> availableConverters = new List<DynamicDNAConverterBehaviour>();
        [SerializeField]
        public DynamicDNAConverterBehaviour selectedConverter;

        GameObject converterBackupsFolder = null;

        public DynamicDNAConverterBehaviour converterToImport;

        Dictionary<string, DynamicDNAConverterBehaviour> converterBackups = new Dictionary<string, DynamicDNAConverterBehaviour>();
        Dictionary<string, string[]> dnaAssetNamesBackups = new Dictionary<string, string[]>();
        Dictionary<string, UMABonePose.PoseBone[]> poseBonesBackups = new Dictionary<string, UMABonePose.PoseBone[]>();

		public bool drawBoundsGizmo = true;

		private string bonePoseSaveName;
		private GameObject tempAvatarPreDNA;
		private GameObject tempAvatarPostDNA;
		//used as the 'epsilon' value when comparing bones during a 'create starting Pose from Current DNA' operation
		//decent values are between around 0.000005f and 0.0005f
		public float bonePoseAccuracy = 0.00005f;

		//UndoRedoDelegate
		void OnUndo()
		{
		}

		public void StartListeningForUndo()
		{
			Undo.undoRedoPerformed += OnUndo;
		}
		public void StopListeningForUndo()
		{
			Undo.undoRedoPerformed -= OnUndo;
		}


        void OnApplicationQuit()
        {
            RestoreBackupVersion();
        }
		void OnDrawGizmos()
		{
			//if (drawBoundsGizmo && activeUMA != null)
			//{
			//	if (activeUMA.umaData == null || activeUMA.umaData.GetRenderer(0) == null)
			//		return;
			//	Gizmos.color = Color.white;
			//	Gizmos.DrawWireCube(activeUMA.umaData.GetRenderer(0).bounds.center, activeUMA.umaData.GetRenderer(0).bounds.size);
			//}
		}

        /// <summary>
        /// Imports the settings and assets from another DynamicDNAConverterBehaviour
        /// </summary>
        /// <returns></returns>
        public bool ImportConverterValues()
        {
            if (converterToImport == null)
            {
                Debug.LogWarning("There was no converter to import from");
                return false;
            }
            if (selectedConverter == null)
            {
                Debug.LogWarning("There was no converter to import to");
                return false;
            }
            selectedConverter.startingPose = converterToImport.startingPose;
            selectedConverter.startingPoseWeight = converterToImport.startingPoseWeight;
            selectedConverter.dnaAsset = converterToImport.dnaAsset;
            selectedConverter.skeletonModifiers = converterToImport.skeletonModifiers;
            selectedConverter.hashList = converterToImport.hashList;
            selectedConverter.overallModifiersEnabled = converterToImport.overallModifiersEnabled;
            //.heightModifiers = converterToImport.heightModifiers;
            selectedConverter.radiusAdjust = converterToImport.radiusAdjust;
            selectedConverter.massModifiers = converterToImport.massModifiers;
            Debug.Log("Imported " + converterToImport.name + " settings into " + selectedConverter.name);
            return true;
        }

		private bool LocalTransformsMatch(Transform t1, Transform t2)
		{
			if ((t1.localPosition - t2.localPosition).sqrMagnitude > bonePoseAccuracy) return false;
			if ((t1.localScale - t2.localScale).sqrMagnitude > bonePoseAccuracy) return false;
			if (t1.localRotation != t2.localRotation) return false;

			return true;
		}

		protected void CreateBonePoseCallback(UMAData umaData)
		{
			UMA.PoseTools.UMABonePose bonePose = null;
			if (selectedConverter.startingPose == null)
			{
				bonePose = CreatePoseAsset("", bonePoseSaveName);
			}
			else
			{
				bonePose = selectedConverter.startingPose;
				bonePose.poses = new UMABonePose.PoseBone[1];
			}
			UMAUtils.DestroySceneObject(tempAvatarPreDNA);
			UMAUtils.DestroySceneObject(tempAvatarPostDNA);

			// This can be very helpful for testing
			/*
			bonePose.ApplyPose(skeletonPreDNA, 1.0f);
			*/

			EditorUtility.SetDirty(bonePose);
			AssetDatabase.SaveAssets();
			// Set this asset as the converters pose asset
			selectedConverter.startingPose = bonePose;
			//make sure its fully applied
			selectedConverter.startingPoseWeight = 1f;
		}

        /// <summary>
        /// Calculates the required poses necessary for an UMABonePose asset to render the Avatar in its current post DNA state, 
        /// adds these to the selected converters 'Starting Pose' asset- creating one if necessary and resets current Dna values to 0.
        /// </summary>
        public bool CreateBonePosesFromCurrentDna(string createdAssetName = "")
        {
			if ( selectedConverter == null)
			{
				Debug.LogWarning("activeUMA == null || selectedConverter == null");
                return false;
			}

			bonePoseSaveName = createdAssetName;

			return true;

        }


        #region Save and Backup Methods
        /// <summary>
        /// Makes a backup of the currently selected converter whose values are restored to the current converter when the Application stops playing (unless you Save the changes)
        /// </summary>
        /// <param name="converterToBU"></param>
        public void BackupConverter(DynamicDNAConverterBehaviour converterToBU = null)
        {
            if(converterToBU == null)
            {
                converterToBU = selectedConverter;
            }
            if(converterBackupsFolder == null)
            {
                converterBackupsFolder = new GameObject();
                converterBackupsFolder.name = "CONVERTER BACKUPS DO NOT DELETE";
            }
            if(converterToBU != null)
            {
                if (!converterBackups.ContainsKey(converterToBU.name))
                {
                    var thisConverterBackup = Instantiate<DynamicDNAConverterBehaviour>(converterToBU);
                    thisConverterBackup.transform.parent = converterBackupsFolder.transform;
                    converterBackups[converterToBU.name] = thisConverterBackup;
				}
				if (converterToBU.dnaAsset != null)
				{
					dnaAssetNamesBackups[converterToBU.dnaAsset.name] = (string[])converterToBU.dnaAsset.Names.Clone();
				}
				if (converterToBU.startingPose != null)
				{
					poseBonesBackups[converterToBU.startingPose.name] = DeepPoseBoneClone(converterToBU.startingPose.poses);
				}
			}
		}

        private UMABonePose.PoseBone[] DeepPoseBoneClone(UMABonePose.PoseBone[] posesToCopy)
        {
            var poseBonesCopy = new UMABonePose.PoseBone[posesToCopy.Length];
            for(int i = 0; i < posesToCopy.Length; i++)
            {
                poseBonesCopy[i] = new UMABonePose.PoseBone();
                poseBonesCopy[i].bone = posesToCopy[i].bone;
                poseBonesCopy[i].hash = posesToCopy[i].hash;
                poseBonesCopy[i].position = new Vector3(posesToCopy[i].position.x, posesToCopy[i].position.y, posesToCopy[i].position.z);
                poseBonesCopy[i].rotation = new Quaternion(posesToCopy[i].rotation.x, posesToCopy[i].rotation.y, posesToCopy[i].rotation.z, posesToCopy[i].rotation.w);
                poseBonesCopy[i].scale = new Vector3(posesToCopy[i].scale.x, posesToCopy[i].scale.y, posesToCopy[i].scale.z);
            }
            return poseBonesCopy;
        }
        
        /// <summary>
        /// Restores the converters values back to the original or saved values. Also called when the application stops playing so that any changes made while the game is running are not saved (unless the user calls the SaveChanges method previously).
        /// </summary>
        /// <param name="converterName"></param>
        public void RestoreBackupVersion(string converterName = "")
        {
            if(availableConverters.Count > 0)
            {
                for (int i = 0; i < availableConverters.Count; i++)
                {
                    DynamicDNAConverterBehaviour buConverter;
                    if (converterBackups.TryGetValue(availableConverters[i].name, out buConverter))
                    {
                        if(converterName == "" || converterName == availableConverters[i].name)
                        {
                            availableConverters[i].dnaAsset = buConverter.dnaAsset;
                            if(availableConverters[i].dnaAsset != null)
                            {
                                string[] buNames;
                                if(dnaAssetNamesBackups.TryGetValue(availableConverters[i].dnaAsset.name, out buNames))
                                {
                                    availableConverters[i].dnaAsset.Names = buNames;
                                }
                            }
							//we need to restore these regardless of whether the converter had a startingPose or not when we started playing
							if (availableConverters[i].startingPose != null)
							{
								UMABonePose.PoseBone[] buPoses;
								if (poseBonesBackups.TryGetValue(availableConverters[i].startingPose.name, out buPoses))
								{
									availableConverters[i].startingPose.poses = buPoses;
									EditorUtility.SetDirty(availableConverters[i].startingPose);
									AssetDatabase.SaveAssets();
								}
							}
							availableConverters[i].startingPose = buConverter.startingPose;
                            //
                            availableConverters[i].skeletonModifiers = buConverter.skeletonModifiers;
                            availableConverters[i].hashList = buConverter.hashList;
                            availableConverters[i].overallModifiersEnabled = buConverter.overallModifiersEnabled;
							//new
							availableConverters[i].tightenBounds = buConverter.tightenBounds;
							availableConverters[i].boundsAdjust = buConverter.boundsAdjust;
							//end new
                            availableConverters[i].overallScale = buConverter.overallScale;
                            //availableConverters[i].heightModifiers = buConverter.heightModifiers;
                            availableConverters[i].radiusAdjust = buConverter.radiusAdjust;
                            availableConverters[i].massModifiers = buConverter.massModifiers;
                        }
                    }
                }
            }
        }
        /// <summary>
        /// Saves the current changes to the converter by removing the backup that would otherwise reset the converter when the Application stops playing.
        /// </summary>
        /// <param name="all"></param>
        public void SaveChanges(bool all = false)
        {
            bool doSave = true;
#if UNITY_EDITOR
            doSave = EditorUtility.DisplayDialog("Confirm Save", "This will overwrite the values in the currently selected dna converter. Are you sure?", "Save", "Cancel");
#endif
            if (doSave)
            {
                if (all)
                {
                    foreach(KeyValuePair<string, DynamicDNAConverterBehaviour> kp in converterBackups)
                    {
                        if (kp.Value.dnaAsset != null && dnaAssetNamesBackups.ContainsKey(kp.Value.dnaAsset.name))
                        {
                            EditorUtility.SetDirty(kp.Value.dnaAsset);
                            dnaAssetNamesBackups.Remove(kp.Value.dnaAsset.name);
                        }
                        if (kp.Value.startingPose != null && poseBonesBackups.ContainsKey(kp.Value.startingPose.name))
                        {
                            EditorUtility.SetDirty(kp.Value.startingPose);
                            poseBonesBackups.Remove(kp.Value.startingPose.name);
                        }
                    }
                    if (availableConverters.Count > 0)
                    {
                        for (int i = 0; i < availableConverters.Count; i++)
                        {
                            EditorUtility.SetDirty(availableConverters[i]);
                        }
                    }
                    AssetDatabase.SaveAssets();
                    foreach (KeyValuePair<string, DynamicDNAConverterBehaviour> kp in converterBackups)
                    {
                        Destroy(kp.Value);
                    }
                    converterBackups.Clear();
                    if(availableConverters.Count > 0)
                    {
                        for(int i = 0; i < availableConverters.Count; i++)
                        {
                            BackupConverter(availableConverters[i]);
                        }
                    }
                }
                else
                {
                    if (selectedConverter != null)
                    {
                        if (converterBackups.ContainsKey(selectedConverter.name))
                        {
                            if(converterBackups[selectedConverter.name].dnaAsset != null)
                            {
                                EditorUtility.SetDirty(converterBackups[selectedConverter.name].dnaAsset);
                                dnaAssetNamesBackups.Remove(converterBackups[selectedConverter.name].dnaAsset.name);
                            }
                            if (converterBackups[selectedConverter.name].startingPose != null)
                            {
								EditorUtility.SetDirty(converterBackups[selectedConverter.name].startingPose);
                                poseBonesBackups.Remove(converterBackups[selectedConverter.name].startingPose.name);
                            }
                            EditorUtility.SetDirty(selectedConverter);
                            AssetDatabase.SaveAssets();
                            Destroy(converterBackups[selectedConverter.name]);
                            converterBackups.Remove(selectedConverter.name);
                            BackupConverter();
                        }
                    }
                }
            }
        }
#if UNITY_EDITOR
        /// <summary>
        /// Creates a new Converter Behaviour Prefab with a converter on it that has the current settings. This can then be applied to a Race's Dna Converters.
        /// </summary>
        public void SaveChangesAsNew()
        {
            if(dynamicDnaConverterPrefab == null)
            {
                Debug.LogWarning("There was no prefab set up in the DynamicDnaConverterCustomizer. This must be set in order to save a new prefab.");
                return;
            }
            if(selectedConverter == null)
            {
                Debug.LogWarning("No converter was selected to save!");
                return;
            }
            var fullPath = EditorUtility.SaveFilePanel("Save New DynamicDnaConverterBehaviour", Application.dataPath, "", "prefab");
            var path = fullPath.Replace(Application.dataPath,"Assets");
            var filename = System.IO.Path.GetFileNameWithoutExtension(path);
            var thisNewPrefabGO = Instantiate(dynamicDnaConverterPrefab);
            thisNewPrefabGO.name = filename;
            var newPrefabConverter = thisNewPrefabGO.GetComponent<DynamicDNAConverterBehaviour>();
            if (newPrefabConverter != null)
            {
                newPrefabConverter.dnaAsset = selectedConverter.dnaAsset;
                newPrefabConverter.startingPose = selectedConverter.startingPose;
                newPrefabConverter.skeletonModifiers = selectedConverter.skeletonModifiers;
                newPrefabConverter.hashList = selectedConverter.hashList;
                newPrefabConverter.overallModifiersEnabled = selectedConverter.overallModifiersEnabled;
                newPrefabConverter.overallScale = selectedConverter.overallScale;
                //newPrefabConverter.heightModifiers = selectedConverter.heightModifiers;
                newPrefabConverter.radiusAdjust = selectedConverter.radiusAdjust;
                newPrefabConverter.massModifiers = selectedConverter.massModifiers;
            }
            var newPrefab = PrefabUtility.CreatePrefab(path, thisNewPrefabGO);//couldn't create asset try instantiating first
            if(newPrefab != null)
            {
                EditorUtility.SetDirty(newPrefab);
                AssetDatabase.SaveAssets();
                Debug.Log("Saved your changes to a new converter prefab at " + path);
                Destroy(thisNewPrefabGO);
            }
        }
#endif
        #endregion

        #region Asset Creation
        public UMABonePose CreatePoseAsset(string assetFolder = "", string assetName = "")
        {
            if(assetFolder == "")
            {
                assetFolder = AssetDatabase.GetAssetPath(selectedConverter);
                assetFolder = assetFolder.Substring(0, assetFolder.LastIndexOf('/'));
            }
            if(assetName == "")
            {
                assetName = selectedConverter.name + "StartingPose";
                var uniquePath = AssetDatabase.GenerateUniqueAssetPath(assetFolder + "/" + assetName + ".asset");
                assetName = uniquePath.Replace(assetFolder + "/", "").Replace(".asset", "");
            }

            if (!System.IO.Directory.Exists(assetFolder))
            {
                System.IO.Directory.CreateDirectory(assetFolder);
            }

            UMABonePose asset = ScriptableObject.CreateInstance<UMABonePose>();
            AssetDatabase.CreateAsset(asset, assetFolder + "/" + assetName + ".asset");
            AssetDatabase.SaveAssets();
            return asset;
        }

        public DynamicUMADnaAsset CreateDNAAsset(string assetFolder = "", string assetName = "")
        {
            if (assetFolder == "")
            {
                assetFolder = AssetDatabase.GetAssetPath(selectedConverter);
                assetFolder = assetFolder.Substring(0, assetFolder.LastIndexOf('/'));
            }
            if (assetName == "")
            {
                assetName = selectedConverter.name + "DNAAsset";
                var uniquePath = AssetDatabase.GenerateUniqueAssetPath(assetFolder + "/" + assetName + ".asset");
                assetName = uniquePath.Replace(assetFolder + "/", "").Replace(".asset", "");
            }

            if (!System.IO.Directory.Exists(assetFolder))
            {
                System.IO.Directory.CreateDirectory(assetFolder);
            }

            DynamicUMADnaAsset asset = ScriptableObject.CreateInstance<DynamicUMADnaAsset>();
            AssetDatabase.CreateAsset(asset, assetFolder + "/" + assetName + ".asset");
            AssetDatabase.SaveAssets();
            return asset;
        }
        #endregion
		#endif
    }
}

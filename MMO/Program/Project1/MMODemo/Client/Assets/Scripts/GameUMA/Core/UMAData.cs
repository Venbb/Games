using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA
{
    public class UMAData : MonoBehaviour
    {
        public SkinnedMeshRenderer myRenderer;
        public UMARecipe umaRecipe;
        public UMASkeleton skeleton;
        public GameObject umaRoot;
        /// <summary>
        /// Retrieve DNA by type.
        /// </summary>
        /// <returns>The DNA (or null if not found).</returns>
        /// <param name="type">Type.</param>
        public UMADnaBase GetDna(Type type)
        {
            return umaRecipe.GetDna(type);
        }
        private void Awake()
        {
            SetupOnAwake();
        }
        public void SetupOnAwake()
        {
            umaRoot = gameObject;
        }
        /// <summary>
        /// DynamicUMADna:: Retrieve DNA by dnaTypeNameHash.
        /// </summary>
        /// <returns>The DNA (or null if not found).</returns>
        /// <param name="dnaTypeNameHash">dnaTypeNameHash.</param>
        public UMADnaBase GetDna(int dnaTypeNameHash)
        {
            return umaRecipe.GetDna(dnaTypeNameHash);
        }
        /// <summary>
        /// Gets the complete DNA array.
        /// </summary>
        /// <returns>The DNA array.</returns>
        public UMADnaBase[] GetAllDna()
        {
            return umaRecipe.GetAllDna();
        }
    }
}

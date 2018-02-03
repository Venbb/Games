using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA
{
    [System.Serializable]
    public class UMARecipe
    {
        public List<UMADnaBase> dnaValues = new List<UMADnaBase>();
        Dictionary<int, UMADnaBase> _umaDna;
        protected Dictionary<int, UMADnaBase> umaDna
        {
            get
            {
                if (_umaDna == null)
                {
                    _umaDna = new Dictionary<int, UMADnaBase>();
                    for (int i = 0; i < dnaValues.Count; i++)
                        _umaDna.Add(dnaValues[i].DNATypeHash, dnaValues[i]);
                }
                return _umaDna;
            }
            set
            {
                _umaDna = value;
            }
        }

        public T GetDna<T>()
            where T : UMADnaBase
        {
            UMADnaBase dna;
            if (umaDna.TryGetValue(UMAUtils.StringToHash(typeof(T).Name), out dna))
            {
                return dna as T;
            }
            return null;
        }
        public void AddDna(UMADnaBase dna)
        {
            umaDna.Add(dna.DNATypeHash, dna);
        }
        public void ClearDna()
        {
            umaDna.Clear();
        }
        public void RemoveDna(Type type)
        {
            int dnaTypeNameHash = UMAUtils.StringToHash(type.Name);
            dnaValues.Remove(umaDna[dnaTypeNameHash]);
            umaDna.Remove(dnaTypeNameHash);
        }
        public UMADnaBase GetDna(Type type)
        {
            UMADnaBase dna;
            if (umaDna.TryGetValue(UMAUtils.StringToHash(type.Name), out dna))
            {
                return dna;
            }
            return null;
        }
        public UMADnaBase[] GetAllDna()
        {
            UMADnaBase[] allDNA = new UMADnaBase[umaDna.Values.Count];
            umaDna.Values.CopyTo(allDNA, 0);
            return allDNA;
        }

        /// <summary>
        /// Get DNA of specified type.
        /// </summary>
        /// <returns>The DNA (or null if not found).</returns>
        /// <param name="dnaTypeNameHash">Type.</param>
        public UMADnaBase GetDna(int dnaTypeNameHash)
        {
            UMADnaBase dna;
            if (umaDna.TryGetValue(dnaTypeNameHash, out dna))
            {
                return dna;
            }
            return null;
        }
    }
}

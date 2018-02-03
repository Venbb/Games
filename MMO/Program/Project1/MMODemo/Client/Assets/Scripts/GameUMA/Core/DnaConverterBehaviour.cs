using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA
{
    public class DnaConverterBehaviour : MonoBehaviour
    {

        public DnaConverterBehaviour()
        {
            Prepare();
        }
        public System.Type DNAType;
        public delegate void DNAConvertDelegate(UMAData data, UMASkeleton skeleton);
        public DNAConvertDelegate ApplyDnaAction;
        public virtual void Prepare()
        {
        }
        [SerializeField]
        protected int dnaTypeHash;
        public virtual int DNATypeHash
        {
            set
            {
                dnaTypeHash = value;
            }
            get
            {
                if (dnaTypeHash == 0)
                    dnaTypeHash = UMAUtils.StringToHash(DNAType.Name);
                return dnaTypeHash;
            }
        }
        [SerializeField]
        public string DisplayValue;
    }
}

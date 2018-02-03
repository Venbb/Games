using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace UMA
{
    public abstract class UMADna : UMADnaBase
    {
        public static string[] GetNames(System.Type dnaType)
        {
            if (dnaType == typeof(UMADnaHumanoid))
                return UMADnaHumanoid.GetNames();
            return new string[0];
        }

        public static System.Type GetType(System.String className)
        {
            if ("UMADnaHumanoid" == className) return typeof(UMADnaHumanoid);
            return null;
        }

        public static System.Type[] GetTypes()
        {
            return new System.Type[]
            {
                typeof(UMADnaHumanoid),
            };
        }

        public static UMADnaBase LoadInstance(System.Type dnaType, System.String data)
        {
            if (dnaType == typeof(DynamicUMADna))
                return DynamicUMADna.LoadInstance(data);
            return null;
        }

        public static System.String SaveInstance(UMADnaBase instance)
        {
            System.Type dnaType = instance.GetType();
            if (dnaType == typeof(DynamicUMADna))
                return DynamicUMADna.SaveInstance(instance as DynamicUMADna);
            return null;
        }
    }
}

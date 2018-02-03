using System;
using UMA;

public class DNAHolder : IComparable<DNAHolder>
{
    public string name;
    public float value;
    public int max;
    public string upString;
    public string lowString;
    public int mpos;
    public int index;
    public UMADnaBase dnaBase;
    public DNAHolder(string Name, float Value, int Index, UMADnaBase DNABase, int maxv, int pos, string uptext, string lowtext)
    {
        name = Name;
        value = Value;
        index = Index;
        dnaBase = DNABase;
        max = maxv;
        upString = uptext;
        lowString = lowtext;
        mpos = pos;
    }

    #region IComparable implementation
    public int CompareTo(DNAHolder other)
    {
        return string.Compare(name, other.name);
    }
    #endregion
}
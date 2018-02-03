using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;

public class XDNAConfig : Singleton<XDNAConfig>
{
    public Dictionary<eUMAPlace, List<DNAData>> DNADictionary = new Dictionary<eUMAPlace, List<DNAData>>();
    public Dictionary<string, float> DNAConfig = new Dictionary<string, float>();
    public void LoadTable(List<string[]> lines)
    {
        for (int i = 1; i < lines.Count; ++i)
        {
            LoadSingleLine(lines[i]);
        }
    }
    private void LoadSingleLine(string[] line)
    {
        DNAData dNA = new DNAData();
        dNA.place = (eUMAPlace)int.Parse(line[0]);
        dNA.dnaname = line[1];
        dNA.property = (ePropType)int.Parse(line[2]);
        dNA.mValue = float.Parse(line[3]);
        dNA.maxValue = int.Parse(line[4]);
        dNA.uptext = line[5];
        dNA.lowtext = line[6];
        dNA.mpos = int.Parse(line[7]);
        if (DNADictionary.ContainsKey(dNA.place))
        {
            DNADictionary[dNA.place].Add(dNA);
        }
        else
        {
            List<DNAData> temp = new List<DNAData>();
            temp.Add(dNA);
            DNADictionary.Add(dNA.place, temp);
        }
        if (DNAConfig.ContainsKey(dNA.dnaname))
        {
            DNAConfig[dNA.dnaname] = dNA.mValue;
        }
        else
        {
            DNAConfig.Add(dNA.dnaname, dNA.mValue);
        }

    }
    public float GetDnaConfig(string name)
    {
        if (DNAConfig.ContainsKey(name))
        {
            return DNAConfig[name];
        }
        return 0.5f;
    }
    public List<DNAData> GetDnaList(eUMAPlace ePlace, ePropType property)
    {
        List<DNAData> list = new List<DNAData>();
        if (DNADictionary.ContainsKey(ePlace))
        {
            foreach (DNAData data in DNADictionary[ePlace])
            {
                if (data.property == property)
                {
                    list.Add(data);
                }
            }
        }
        return list;
    }
}
public class DNAData
{
    public eUMAPlace place;
    public ePropType property = ePropType.Position;
    public string dnaname;
    public float mValue;
    public int maxValue;
    public string uptext;
    public string lowtext;
    public int mpos;
}

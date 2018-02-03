using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ClientBase.Singleton;
public class SelectRoleConfig : Singleton<SelectRoleConfig>
{
    public Dictionary<eJob, SelectRoleData> roledictionary = new Dictionary<eJob, SelectRoleData>();
    public void LoadTable(List<string[]> lines)
    {
        for (int i = 1; i < lines.Count; ++i)
        {
            LoadSingleLine(lines[i]);
        }
    }
    private void LoadSingleLine(string[] line)
    {
        SelectRoleData data = new SelectRoleData();
        data.job = (eJob)int.Parse(line[0]);
        data.title = line[1];
        data.desc = line[2];
        data.skillname1 = line[3];
        data.skillicon1 = line[4];
        data.skilldesc1 = line[5];
        data.skillname2 = line[6];
        data.skillicon2 = line[7];
        data.skilldesc2 = line[8];
        data.skillname3 = line[9];
        data.skillicon3 = line[10];
        data.skilldesc3 = line[11];
        if (roledictionary.ContainsKey(data.job))
        {
            roledictionary[data.job] = data;
        }
        else
        {
            roledictionary.Add(data.job, data);
        }
        
    }
    public SelectRoleData GetSelectRole(eJob job)
    {
        if (roledictionary.ContainsKey(job))
        {
            return roledictionary[job];
        }
        return null;
    }
}
public class SelectRoleData
{
    public eJob job;
    public string title;
    public string desc;
    public string skillname1;
    public string skillicon1;
    public string skilldesc1;
    public string skillname2;
    public string skillicon2;
    public string skilldesc2;
    public string skillname3;
    public string skillicon3;
    public string skilldesc3;
}
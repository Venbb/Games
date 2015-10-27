using UnityEngine;
using System.Collections;
using System;
using LitJson;


public class BaseNet : MonoBehaviour {

    protected byte[] args = null;
    protected string m_url = "";

    protected string session;
    protected string key = "test004643";

    protected Component m_Component = null;
    protected string sendMessageMethod = "";

    public delegate void SendMessageDelegate(int code);
    public event SendMessageDelegate m_delegate;
	
    public void DoRequest()
    {
			
        StartCoroutine(DoPost());
    }
    protected IEnumerator DoPost()
    {
		 
	
		if(string.IsNullOrEmpty(m_url))
		{
			
			yield break;
		}
		if(args == null)
		{
		
		yield break;
		}
        WWW  www = new WWW(m_url, args);
          yield return www;
        if (www.error != null)
        {
			Debug.Log(www.url);
			Debug.Log(www.error);
			StopAllCoroutines();
			
        }
        else
        {
            try
            {
                //Debug.Log(www.url);
				Debug.Log(www.text);
                JsonToStr(www.text);
            }
            catch (UnityException ex)
            {
                Debug.LogWarning(ex.Message);
                if (m_delegate != null)
                {
                    m_delegate(0);
                }
            }
            catch (System.Exception ex)
            {
                Debug.LogWarning(ex);
                if (m_delegate != null)
                {
                    m_delegate(0);
                }
            }
			
        }
		
    }


    protected void JsonToStr(string str)
    {
        JsonData jd = JsonMapper.ToObject(str);

        int success = (int)jd["success"];
        int code = (int)jd["code"];

        if (success == 0)
        {
            if (m_delegate != null)
            {
                m_delegate(code);
            }
			
         
        }
        else
        {
            ResultToData(jd);
            if (m_delegate != null)
            {
                m_delegate(1);
            } 
        }
    }


    protected virtual void ResultToData(JsonData pjd)
    {
		
    }
	

    public void setDelegate(SendMessageDelegate p_delegate)
    {
        this.m_delegate += p_delegate;
    }


    public void Destroythis()
    {
        Destroy(gameObject);
    }


}

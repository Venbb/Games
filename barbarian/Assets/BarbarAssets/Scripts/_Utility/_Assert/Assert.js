
#pragma strict

class Assert
{
	
	private static var m_instance : Assert = null;

	static function Singleton()
	{
		if (m_instance == null)
		{
			m_instance = new Assert();
		}
	
		return m_instance;
	}

	private function Assert()
	{
	}

	function AssertNullObject(obj : Object)
	{
		if (obj == null)
		{
			Debug.LogError("There's a null object, please find and fix it.");
		}
	}

	function AssertBoolean(flag : boolean)
	{
		if (!flag)
		{
			Debug.LogError("There's a condition check failed, please find and fix it.");
		}
	}
}
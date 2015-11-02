using UnityEngine;
using System.Collections;

public class InputHelper
{
	public static string Joystick_left = "left";
	public static string Joystick_right = "right";
	public static string Joystick_up = "up";
	public static string Joystick_down = "down";
	public static string Joystick_A = "joystick 1 button 0";//i
	public static string Joystick_B = "joystick 1 button 1";//k
	public static string Joystick_X = "joystick 1 button 2";//l
	public static string Joystick_Y = "joystick 1 button 3";//j
	public static string Joystick_Start = "joystick 1 button 10";
	public static string Joystick_Select = "joystick 1 button 11";
	public static string Joystick_LeftFlipper = "joystick 1 button 4";
	public static string Joystick_RightFlipper = "joystick 1 button 5";

	public static bool GetKeyDown(string keyValue)
	{
		return Input.GetKeyDown(keyValue);
	}
	public static bool GetKeyDown(KeyCode key)
	{
		bool go = Input.GetKeyDown(key);
		if (go)
			return go;
		switch (key)
		{
			case KeyCode.A:
				return GetKeyDown(Joystick_left);
			case KeyCode.W:
				return GetKeyDown(Joystick_up);
			case KeyCode.S:
				return GetKeyDown(Joystick_down);
			case KeyCode.D:
				return GetKeyDown(Joystick_right);
			case KeyCode.I:
				return GetKeyDown(Joystick_A);
			case KeyCode.K:
				return GetKeyDown(Joystick_B);
			case KeyCode.L:
				return GetKeyDown(Joystick_X);
			case KeyCode.J:
				return GetKeyDown(Joystick_Y);
		}
		return go;
	}
}

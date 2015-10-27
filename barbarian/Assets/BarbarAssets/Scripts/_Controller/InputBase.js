#pragma strict
public enum EInputStringName
{
JoystickX,
JoystickY,
Fire1,
Fire2,
Fire3,
Jump,
Back,
Next,
Pause
}
public enum ECurrentButtenID
{
  KatoUpgradeButton,
   FeatsButton,
    SkillButton,
     ItemButton,
      Top,
       End,
        Middle,
         Left,
          Right, 
           Music,
            Sound,
             IsPhone,
              ResetGame,
               Play,
                Tutorial,
                 Options,
                  Credits,
                   Start,
                    Upgrade
}  
class ButtenPressTime
    {
     var m_delayTime:float=0;
    }
    
 function DelayTime( time:ButtenPressTime,delayTime):boolean
    {
       if(Input.GetAxis(EInputStringName.JoystickX.ToString())!=0||Input.GetAxis(EInputStringName.JoystickY.ToString())!=0)
          {
                
         time.m_delayTime-=0.018;
        
          if(time.m_delayTime<=0)
           { 
         
          time.m_delayTime=delayTime;
          return true;
       
            }
        }
      
        
    }    
function GetInputJoystickNameNegative(name:String,buffer:float): boolean
{

if (Input.GetAxis(name) < buffer)
		{	
		
        return true;
      }
else
      return false;
}
function GetInputJoystickNamePositive(name:String,buffer:float): boolean
{

if (Input.GetAxis(name) > buffer)
		{	
		
        return true;
      }
else
      return false;
}

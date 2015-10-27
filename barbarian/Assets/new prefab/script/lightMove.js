#pragma strict
var timecontrol : int;
var direction : int;
function Start () {

}

function Update () {
  timecontrol++;
  if(timecontrol % 100 == 0)
  {
     direction =Random.Range(1,5);
  }
  if(direction == 1)
  {
    this.transform.Translate(Vector3.up*Time.deltaTime*3.0f);
  }
  else if(direction == 2)
  {
    this.transform.Translate(Vector3.down*Time.deltaTime*3.0f);
  }
  else if(direction == 3)
  {
    this.transform.Translate(Vector3.right*Time.deltaTime*3.0f);
  }
  else 
  {
    this.transform.Translate(Vector3.left*Time.deltaTime*3.0f);
  }

}
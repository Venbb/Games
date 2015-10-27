
function Update () {
}

function OnTriggerEnter(collision : Collider) {
    
    Debug.Log("###Enemy have been hitted(Trigger)");
    
    //animation.Stop();
    
    //animation["jump"].wrapMode = WrapMode.Once;
    
    //animation.Play("jump");
}

function OnCollisionEnter(collision : Collision) {
    
    Debug.Log("###Enemy have been hitted(Collider)");
    
    //animation["jump"].wrapMode = WrapMode.Once;
    
    //animation.Play("jump");
}

